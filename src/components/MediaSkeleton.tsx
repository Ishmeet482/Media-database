/** Reusable skeleton loaders for media cards */

export const HeroSkeleton = () => (
  <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
    <div className="absolute inset-0 bg-card animate-pulse" />
    <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
    <div className="relative z-10 h-full flex flex-col justify-end pb-16 px-6 md:px-16 lg:px-24 max-w-5xl">
      <div className="h-5 w-24 bg-muted rounded-full mb-4 animate-pulse" />
      <div className="h-16 w-80 bg-muted rounded-lg mb-4 animate-pulse" />
      <div className="h-6 w-96 bg-muted/60 rounded-lg mb-2 animate-pulse" />
      <div className="h-6 w-72 bg-muted/40 rounded-lg mb-6 animate-pulse" />
      <div className="h-10 w-40 bg-muted/30 rounded-xl animate-pulse" />
    </div>
  </section>
);

export const CardSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-xl bg-card/60 backdrop-blur-xl border border-border/30 p-5 flex flex-col gap-3 ${className}`}>
    <div className="h-40 rounded-lg bg-muted/40 animate-pulse" />
    <div className="h-5 w-3/4 bg-muted/30 rounded animate-pulse" />
    <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
    <div className="h-4 w-2/3 bg-muted/20 rounded animate-pulse" />
  </div>
);

export const SmallCardSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-xl bg-card/40 backdrop-blur-xl border border-border/20 p-4 flex flex-col gap-2.5 ${className}`}>
    <div className="h-24 rounded-lg bg-muted/30 animate-pulse" />
    <div className="h-4 w-3/4 bg-muted/20 rounded animate-pulse" />
    <div className="h-3 w-full bg-muted/15 rounded animate-pulse" />
  </div>
);

export const CollectionCardSkeleton = () => (
  <div className="min-w-[160px] rounded-lg bg-card/30 backdrop-blur-md border border-border/15 p-3.5 flex flex-col gap-2">
    <div className="h-20 rounded-md bg-muted/30 animate-pulse" />
    <div className="h-4 w-3/4 bg-muted/20 rounded animate-pulse" />
  </div>
);

export const RecentCardSkeleton = () => (
  <div className="rounded-lg bg-card/30 backdrop-blur-md border border-border/15 p-5 border-l-2 border-l-primary/30">
    <div className="h-4 w-1/2 bg-muted/30 rounded animate-pulse mb-2" />
    <div className="h-3 w-full bg-muted/20 rounded animate-pulse" />
  </div>
);
