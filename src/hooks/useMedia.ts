import { useQuery } from "@tanstack/react-query";
import { fetchMediaBatch, type NormalizedMedia } from "@/lib/media-service";
import type { MediaSource, MediaEntry } from "@/lib/media-config";

export function useMediaBatch(entries: { id: number; source: MediaSource }[]) {
  const entryKey = entries.map((entry) => `${entry.source}:${entry.id}`);

  return useQuery<NormalizedMedia[]>({
    queryKey: ["media-batch", entryKey],
    queryFn: () => fetchMediaBatch(entries),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2,
    enabled: entries.length > 0,
  });
}

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
