import { collectionsConfig } from "@/lib/media-config";
import { useMediaBatch } from "@/hooks/useMedia";
import { CollectionCardSkeleton } from "@/components/MediaSkeleton";

const CollectionRow = ({ name, items, index }: { name: string; items: typeof collectionsConfig[0]["items"]; index: number }) => {
  const { data: mediaItems, isLoading } = useMediaBatch(items);

  return (
    <div>
      <h3 className="text-lg font-semibold tracking-tight mb-4 text-secondary-foreground">{name}</h3>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
        {isLoading || !mediaItems
          ? items.map((_, i) => <CollectionCardSkeleton key={i} />)
          : mediaItems.map((media, i) => (
              <div
                key={`${media.source}:${media.id}`}
                className="min-w-[160px] rounded-lg bg-card/30 backdrop-blur-md border border-border/15 p-3.5 flex flex-col gap-2 opacity-0 animate-fade-in-right cursor-default transition-all duration-500 ease-out hover:border-border/40 hover:bg-card/50 hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 0.1 + i * 0.08}s` }}
              >
                <div className="h-20 rounded-md overflow-hidden relative">
                  {media.posterUrl ? (
                    <img
                      src={media.posterUrl}
                      alt={media.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary/50 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                        {media.type}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                </div>
                <h4 className="text-sm font-medium tracking-tight">{media.title}</h4>
                <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">
                  {media.type} · {media.year}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

const ThemedCollections = () => {
  return (
    <section className="py-14 px-6 md:px-16 lg:px-24 space-y-10">
      {collectionsConfig.map((collection, ci) => (
        <CollectionRow
          key={collection.name}
          name={collection.name}
          items={collection.items}
          index={ci}
        />
      ))}
    </section>
  );
};

export default ThemedCollections;
