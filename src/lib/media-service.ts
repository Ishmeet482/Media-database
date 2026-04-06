/**
 * Media Service — Centralized fetching, normalization, and caching for TMDB + Jikan.
 * All API calls route through here. Results are normalized into a consistent shape.
 */

import type { MediaEntry, MediaSource } from "./media-config";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGU4MmNkMWIwMzFiNjNjNDJjNGExMTU0ZTNhMzliOCIsIm5iZiI6MTc3Mzk1MTI4Ni45MDEsInN1YiI6IjY5YmM1OTM2MjJkYjQ3MjhjYWE5ODlkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lTiLPhHScXLQsFVBc0ZrDAVTz3C7KRCpX9QCADUgNhg";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p";
const JIKAN_BASE = "https://api.jikan.moe/v4";

// ── Normalized output ───────────────────────────────────────────

export interface NormalizedMedia {
  id: number;
  source: MediaSource;
  title: string;
  year: string;
  type: string; // "Film", "Series", "Anime"
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
}

const cache = new Map<string, NormalizedMedia>();

function cacheKey(source: MediaSource, id: number): string {
  return `${source}:${id}`;
}

let jikanQueue: Promise<void> = Promise.resolve();

function enqueueJikan<T>(fn: () => Promise<T>): Promise<T> {
  const task = jikanQueue.then(() => fn()).then(
    (result) => {
      return new Promise<T>((resolve) => setTimeout(() => resolve(result), 400));
    },
    (err) => {
      return new Promise<never>((_, reject) => setTimeout(() => reject(err), 400));
    }
  );
  jikanQueue = task.then(() => {}, () => {});
  return task;
}

async function tmdbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TMDB_API_KEY}`, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`TMDB ${path} → ${res.status}`);
  return res.json();
}

interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

interface TmdbTv {
  id: number;
  name: string;
  overview: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
}

function normalizeTmdbMovie(d: TmdbMovie): NormalizedMedia {
  return {
    id: d.id,
    source: "tmdb_movie",
    title: d.title,
    year: d.release_date?.slice(0, 4) ?? "—",
    type: "Film",
    overview: d.overview,
    posterUrl: d.poster_path ? `${TMDB_IMG}/w500${d.poster_path}` : null,
    backdropUrl: d.backdrop_path ? `${TMDB_IMG}/original${d.backdrop_path}` : null,
  };
}

function normalizeTmdbTv(d: TmdbTv): NormalizedMedia {
  return {
    id: d.id,
    source: "tmdb_tv",
    title: d.name,
    year: d.first_air_date?.slice(0, 4) ?? "—",
    type: "Series",
    overview: d.overview,
    posterUrl: d.poster_path ? `${TMDB_IMG}/w500${d.poster_path}` : null,
    backdropUrl: d.backdrop_path ? `${TMDB_IMG}/original${d.backdrop_path}` : null,
  };
}

interface JikanAnime {
  mal_id: number;
  title: string;
  synopsis?: string;
  aired?: { prop?: { from?: { year?: number } } };
  images?: { jpg?: { large_image_url?: string } };
}

async function jikanFetchRaw(id: number): Promise<JikanAnime> {
  const res = await fetch(`${JIKAN_BASE}/anime/${id}`);
  if (res.status === 429) {
    // Retry once after delay on rate limit
    await new Promise((r) => setTimeout(r, 1000));
    const retry = await fetch(`${JIKAN_BASE}/anime/${id}`);
    if (!retry.ok) throw new Error(`Jikan /anime/${id} → ${retry.status}`);
    const json = await retry.json();
    return json.data;
  }
  if (!res.ok) throw new Error(`Jikan /anime/${id} → ${res.status}`);
  const json = await res.json();
  return json.data;
}

function normalizeJikan(d: JikanAnime): NormalizedMedia {
  const year = d.aired?.prop?.from?.year;
  return {
    id: d.mal_id,
    source: "jikan",
    title: d.title,
    year: year ? String(year) : "—",
    type: "Anime",
    overview: d.synopsis ?? "",
    posterUrl: d.images?.jpg?.large_image_url ?? null,
    backdropUrl: null,
  };
}

function createFallbackMedia(entry: MediaEntry): NormalizedMedia {
  return {
    id: entry.id,
    source: entry.source,
    title: "Unavailable",
    year: "—",
    type:
      entry.source === "tmdb_movie"
        ? "Film"
        : entry.source === "tmdb_tv"
          ? "Series"
          : "Anime",
    overview: "Details are temporarily unavailable.",
    posterUrl: null,
    backdropUrl: null,
  };
}

export async function fetchMedia(
  source: MediaSource,
  id: number
): Promise<NormalizedMedia> {
  const key = cacheKey(source, id);
  const cached = cache.get(key);
  if (cached) return cached;

  let result: NormalizedMedia;

  switch (source) {
    case "tmdb_movie": {
      const data = await tmdbFetch<TmdbMovie>(`/movie/${id}`);
      result = normalizeTmdbMovie(data);
      break;
    }
    case "tmdb_tv": {
      const data = await tmdbFetch<TmdbTv>(`/tv/${id}`);
      result = normalizeTmdbTv(data);
      break;
    }
    case "jikan": {
      // Route through global queue to respect rate limits
      const data = await enqueueJikan(() => jikanFetchRaw(id));
      result = normalizeJikan(data);
      break;
    }
  }

  cache.set(key, result);
  return result;
}

/**
 * Batch-fetch multiple media entries.
 * TMDB runs in parallel; Jikan is globally serialized via the queue.
 */
export async function fetchMediaBatch(
  entries: MediaEntry[]
): Promise<NormalizedMedia[]> {
  return Promise.all(
    entries.map(async (entry) => {
      try {
        return await fetchMedia(entry.source, entry.id);
      } catch (error) {
        console.warn(`Failed to load media ${entry.source}:${entry.id}`, error);
        return createFallbackMedia(entry);
      }
    }),
  );
}
