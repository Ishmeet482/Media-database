const PersonalNote = () => {
  return (
    <section className="py-12 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto rounded-xl bg-card/25 backdrop-blur-md border border-border/10 p-8 md:p-12 text-center">
        <h2 className="text-xl font-semibold tracking-tight mb-5">Why This Page Exists</h2>
        <p className="text-secondary-foreground leading-relaxed mb-3 text-sm">
          The stories I consume shape how I design systems. Non-linear narratives 
          taught me to think about state management differently. World-building 
          taught me that great architecture is invisible until it breaks. 
          Unreliable narrators remind me that every interface tells a story — 
          and the user is always the protagonist.
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          This page isn't a watchlist. It's a map of influences — 
          how fiction informs the way I build, debug, and think about software.
        </p>
      </div>
    </section>
  );
};

export default PersonalNote;
