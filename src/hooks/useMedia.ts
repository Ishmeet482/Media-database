import { useQuery } from "@tanstack/react-query";
import { fetchMedia, fetchMediaBatch, type NormalizedMedia } from "@/lib/media-service";
import type { MediaSource, MediaEntry } from "@/lib/media-config";

/** Fetch a single media item */
export function useMediaItem(source: MediaSource, id: number) {
  return useQuery<NormalizedMedia>({
    queryKey: ["media", source, id],
    queryFn: () => fetchMedia(source, id),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2,
  });
}

/** Fetch a batch of media items */
export function useMediaBatch(entries: { id: number; source: MediaSource }[]) {
  return useQuery<NormalizedMedia[]>({
    queryKey: ["media-batch", entries.map((e) => `${e.source}:${e.id}`).join(",")],
    queryFn: () => fetchMediaBatch(entries),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    enabled: entries.length > 0,
  });
}

/** Merge fetched API data with local config (insight, tag, modal) */
export function mergeWithConfig(
  media: NormalizedMedia,
  config: MediaEntry
): NormalizedMedia & Pick<MediaEntry, "insight" | "tag" | "modal"> {
  return {
    ...media,
    insight: config.insight,
    tag: config.tag,
    modal: config.modal,
  };
}
