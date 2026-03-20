import { recentlyImpressedConfig } from "@/lib/media-config";
import { useMediaBatch, mergeWithConfig } from "@/hooks/useMedia";
import { RecentCardSkeleton } from "@/components/MediaSkeleton";

const RecentlyImpressed = () => {
  const { data: mediaItems, isLoading } = useMediaBatch(recentlyImpressedConfig);

  return (
    <section className="py-12 px-6 md:px-16 lg:px-24">
      <div className="flex items-baseline gap-3 mb-6">
        <h2 className="text-xl font-semibold tracking-tight">Currently Thinking About</h2>
        <span className="text-[10px] font-mono text-muted-foreground tracking-wider">
          Updated occasionally
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {isLoading || !mediaItems
          ? Array.from({ length: 3 }).map((_, i) => <RecentCardSkeleton key={i} />)
          : mediaItems.map((media, i) => {
              const config = recentlyImpressedConfig[i];
              const item = mergeWithConfig(media, config);
              return (
                <div
                  key={`${media.source}:${media.id}`}
                  className="rounded-lg bg-card/30 backdrop-blur-md border border-border/15 p-5 border-l-2 border-l-primary/30 opacity-0 animate-fade-in transition-all duration-500 ease-out hover:bg-card/45 hover:border-l-primary/50"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="flex gap-3 items-start mb-2">
                    {media.posterUrl && (
                      <img
                        src={media.posterUrl}
                        alt={media.title}
                        loading="lazy"
                        className="w-10 h-14 rounded object-cover shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="text-sm font-semibold mb-0.5 tracking-tight">{media.title}</h3>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                        {media.type} · {media.year}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.insight || media.overview}
                  </p>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default RecentlyImpressed;
