import { Brain, Layers, GitBranch, Globe } from "lucide-react";

const themes = [
  {
    icon: Brain,
    title: "Psychological Depth",
    description: "I'm obsessed with characters who don't fully understand themselves — unreliable narrators, people rationalizing terrible decisions. It mirrors how I debug systems: the stated intent rarely matches the actual behavior.",
  },
  {
    icon: Layers,
    title: "Complex Systems",
    description: "Give me a story where politics, ecology, and human flaws form feedback loops. I think in systems — cause and effect that cascades three layers deep. That's what makes Dune or Dark feel like home.",
  },
  {
    icon: GitBranch,
    title: "Non-Linear Storytelling",
    description: "Timelines that fork and merge feel natural to me — probably because I spend my days thinking in version control. A story that rewards re-reading the way good code rewards refactoring? That's my thing.",
  },
  {
    icon: Globe,
    title: "World-Building",
    description: "I gravitate toward worlds that feel engineered — consistent rules, emergent behavior, details that compound. If I can poke holes in the logic, I lose interest. If the system holds, I'm completely absorbed.",
  },
];

const StoryThemesSection = () => {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-24">
      <h2 className="section-title mb-3">What I Like in Stories</h2>
      <p className="text-muted-foreground mb-10 max-w-lg">
        The patterns I keep returning to — and why they probably say more about how I think than what I watch.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {themes.map((theme, i) => (
          <div
            key={theme.title}
            className="glass-card p-6 flex flex-col gap-4 opacity-0 animate-fade-in group cursor-default transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-[0_12px_40px_-10px_hsl(var(--primary)/0.15)]"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 ease-out group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)] group-hover:scale-110">
              <theme.icon size={20} className="transition-transform duration-500 ease-out group-hover:rotate-6" />
            </div>
            <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">{theme.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{theme.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryThemesSection;
