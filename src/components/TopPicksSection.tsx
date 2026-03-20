import { topPicksPrimary, topPicksSecondary } from "@/lib/media-config";
import { useMediaBatch, mergeWithConfig } from "@/hooks/useMedia";
import { CardSkeleton, SmallCardSkeleton } from "@/components/MediaSkeleton";


const TopPicksSection = () => {
  const { data: primaryMedia, isLoading: loadingPrimary } = useMediaBatch(topPicksPrimary);
  const { data: secondaryMedia, isLoading: loadingSecondary } = useMediaBatch(topPicksSecondary);

  return (
    <section className="py-20 px-6 md:px-16 lg:px-24">
      <h2 className="section-title mb-8">Top Picks</h2>

      {/* Primary picks — larger, more visual weight */}
      <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-6">
        {loadingPrimary || !primaryMedia
          ? Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} className="min-w-[300px] max-w-[300px]" />
            ))
          : primaryMedia.map((media, i) => {
              const config = topPicksPrimary[i];
              const item = mergeWithConfig(media, config);
              return (
                <div
                  key={media.id}
                  className="group min-w-[300px] max-w-[300px] rounded-xl bg-card/60 backdrop-blur-xl border border-border/30 p-5 flex flex-col gap-3 opacity-0 animate-fade-in-right cursor-default transition-all duration-500 ease-out hover:border-primary/30 hover:scale-[1.03] hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.2)]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="h-40 rounded-lg overflow-hidden relative">
                    {media.posterUrl ? (
                      <img
                        src={media.posterUrl}
                        alt={media.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                    <div className="relative h-full flex flex-col justify-between p-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
                        {media.type} · {media.year}
                      </span>
                      {item.tag && (
                        <span className="self-start text-[10px] font-mono uppercase tracking-wider text-primary/70 bg-primary/5 border border-primary/10 rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.tag}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {media.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.insight || media.overview}
                  </p>
                </div>
              );
            })}
      </div>

      {/* Secondary picks — smaller, lighter */}
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {loadingSecondary || !secondaryMedia
          ? Array.from({ length: 5 }).map((_, i) => (
              <SmallCardSkeleton key={i} className="min-w-[230px] max-w-[230px]" />
            ))
          : secondaryMedia.map((media, i) => {
              const config = topPicksSecondary[i];
              const item = mergeWithConfig(media, config);
              return (
                <div
                  key={media.id}
                  className="group min-w-[230px] max-w-[230px] rounded-xl bg-card/40 backdrop-blur-xl border border-border/20 p-4 flex flex-col gap-2.5 opacity-0 animate-fade-in-right cursor-default transition-all duration-500 ease-out hover:border-primary/20 hover:scale-[1.03] hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.15)]"
                  style={{ animationDelay: `${(i + 3) * 0.1}s` }}
                >
                  <div className="h-24 rounded-lg overflow-hidden relative">
                    {media.posterUrl ? (
                      <img
                        src={media.posterUrl}
                        alt={media.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
                    <div className="relative h-full flex items-end p-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-foreground/70">
                        {media.type} · {media.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                    {media.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {item.insight || media.overview}
                  </p>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default TopPicksSection;
