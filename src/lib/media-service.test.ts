import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchMediaBatch } from "./media-service";

describe("fetchMediaBatch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("preserves entry order and falls back when an item fails", async () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            title: "First Movie",
            overview: "Alpha",
            release_date: "2024-01-01",
            poster_path: null,
            backdrop_path: null,
            id: 1,
          }),
          { status: 200 },
        ),
      )
      .mockResolvedValueOnce(new Response("boom", { status: 500 }));

    vi.stubGlobal("fetch", fetchMock);

    const result = await fetchMediaBatch([
      { id: 1, source: "tmdb_movie", insight: "First" },
      { id: 2, source: "tmdb_tv", insight: "Second" },
    ]);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: 1,
      source: "tmdb_movie",
      title: "First Movie",
      type: "Film",
    });
    expect(result[1]).toMatchObject({
      id: 2,
      source: "tmdb_tv",
      title: "Unavailable",
      type: "Series",
    });
    expect(warnSpy).toHaveBeenCalledOnce();
  });
});
