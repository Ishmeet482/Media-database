import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { featuredConfig } from "@/lib/media-config";
import { useMediaBatch, mergeWithConfig } from "@/hooks/useMedia";
import { HeroSkeleton } from "@/components/MediaSkeleton";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const transitionTimeoutRef = useRef<number>();
  const settleTimeoutRef = useRef<number>();

  const { data: mediaItems, isLoading } = useMediaBatch(featuredConfig);
  const featuredCount = featuredConfig.length;

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  const queueTransition = (
    dir: "left" | "right",
    nextSlide: number | ((previous: number) => number),
  ) => {
    if (isTransitioning) return;

    setDirection(dir);
    setIsTransitioning(true);

    transitionTimeoutRef.current = window.setTimeout(() => {
      setCurrent(nextSlide);
      settleTimeoutRef.current = window.setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const navigate = (dir: "left" | "right") => {
    queueTransition(dir, (previous) =>
      dir === "right"
        ? (previous + 1) % featuredCount
        : (previous - 1 + featuredCount) % featuredCount,
    );
  };

  if (isLoading || !mediaItems) return <HeroSkeleton />;

  const media = mediaItems[current];
  const config = featuredConfig[current];
  const item = mergeWithConfig(media, config);
  const backdropSrc = media.backdropUrl || media.posterUrl;

  return (
    <>
      <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {backdropSrc && (
            <img
              src={backdropSrc}
              alt={`${media.title} cinematic scene`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(220 20% 6% / 0.4) 40%, hsl(220 20% 6% / 0.95) 85%, hsl(220 20% 6%) 100%)",
          }}
        />

        {/* Arrow controls */}
        <button
          onClick={() => navigate("left")}
          aria-label="Previous featured item"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-card/40 backdrop-blur-md border border-border/20 text-foreground/60 hover:text-foreground hover:bg-card/60 hover:border-primary/30 hover:scale-110 transition-all duration-300 ease-out"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate("right")}
          aria-label="Next featured item"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-card/40 backdrop-blur-md border border-border/20 text-foreground/60 hover:text-foreground hover:bg-card/60 hover:border-primary/30 hover:scale-110 transition-all duration-300 ease-out"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-16 lg:px-24 max-w-5xl">
          <div
            className="transition-all duration-500 ease-out"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning
                ? `translateX(${direction === "right" ? "-20px" : "20px"})`
                : "translateX(0)",
            }}
          >
            <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-full mb-4">
              {media.type} · {media.year}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-4">
              {media.title}
            </h1>
            <p className="text-lg md:text-xl text-secondary-foreground max-w-xl leading-relaxed mb-6">
              {item.insight || media.overview}
            </p>
            {item.modal && (
              <button
                onClick={() => setModalOpen(true)}
                className="glass-card px-5 py-2.5 text-sm font-medium text-primary border-primary/20 hover:bg-primary/10 hover:scale-[1.03] transition-all duration-300"
              >
                Why It Matters →
              </button>
            )}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {featuredConfig.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === current || isTransitioning) return;
                queueTransition(i > current ? "right" : "left", i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Insight Modal */}
      {item.modal && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="glass-card border-border/30 bg-card/80 backdrop-blur-2xl max-w-md p-0 gap-0">
            <div className="p-6 pb-2">
              <DialogHeader>
                <span className="text-xs font-mono tracking-widest uppercase text-primary mb-2 block">
                  Thought Card
                </span>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {item.modal.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Key insights about {media.title}
                </DialogDescription>
              </DialogHeader>
            </div>
            <div className="px-6 pb-2 space-y-3">
              {item.modal.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
            {item.modal.reflection && (
              <div className="px-6 pb-6 pt-3">
                <p className="text-xs text-muted-foreground italic border-t border-border/30 pt-3">
                  "{item.modal.reflection}"
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default HeroSection;
