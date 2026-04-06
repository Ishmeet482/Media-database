export type MediaSource = "tmdb_movie" | "tmdb_tv" | "jikan";

export interface MediaEntry {
  id: number;
  source: MediaSource;
  insight?: string;
  tag?: string;
  modal?: {
    title: string;
    insights: string[];
    reflection?: string;
  };
}

export const featuredConfig: MediaEntry[] = [
  {
    id: 62560,
    source: "tmdb_tv",
    insight:
      "The most honest portrayal of loneliness disguised as a hacking show. Every frame is a lesson in unreliable narration and system design.",
    modal: {
      title: "Why Mr. Robot Matters",
      insights: [
        "Systems thinking — every hack mirrors real architectural decisions.",
        "Debugging as metaphor — Elliot debugs society the way we debug code.",
        "Chaos vs. control — entropy isn't the enemy, it's the feature.",
        "Isolation as interface — loneliness shapes how he reads the world.",
      ],
      reflection:
        "It taught me that the best systems are the ones that question themselves.",
    },
  },
  {
    id: 1429,
    source: "tmdb_tv",
    insight:
      "Relentless escalation, political fracture, and some of the sharpest long-range payoff in anime. Every reveal redefines the system.",
    modal: {
      title: "Why Attack on Titan Matters",
      insights: [
        "World-building through constraints — the rules of the world create the tension.",
        "Perspective shifts as architecture — every arc changes how previous events compile.",
        "Power and consequence — scale means nothing without moral cost.",
        "Long-form payoff — early details resolve with unusual precision much later.",
      ],
      reflection:
        "It stands out because the spectacle never replaces the structure underneath it.",
    },
  },
  {
    id: 70523,
    source: "tmdb_tv",
    insight:
      "A German masterpiece in non-linear storytelling. Time isn't a line — it's a graph database with circular references.",
    modal: {
      title: "Why Dark Matters",
      insights: [
        "Non-linear data flow — cause and effect aren't sequential.",
        "Recursion in narrative — loops that resolve only at the base case.",
        "Determinism vs. free will — the ultimate concurrency problem.",
        "World-building as schema design — every detail is a foreign key.",
      ],
      reflection:
        "Proof that complexity, when intentional, becomes elegance.",
    },
  },
  {
    id: 94605,
    source: "tmdb_tv",
    insight: "Stylized world-building and character conflict with unusual visual precision.",
    modal: {
      title: "Why Arcane Matters",
      insights: [
        "Animation used as storytelling, not decoration.",
        "Conflict grows from ideology as much as personality.",
        "Every visual choice reinforces class tension and scale.",
      ],
      reflection:
        "It proves that adaptation can feel authored instead of derivative.",
    },
  },
  {
    id: 37680,
    source: "tmdb_tv",
    insight: "Two lawyers. One degree.",
    modal: {
      title: "Why Suits Matters",
      insights: [
        "Sharp dialogue turns negotiation into strategy and spectacle.",
        "Confidence, timing, and leverage matter as much as legal knowledge.",
        "The show understands that reputation is a currency of its own.",
      ],
      reflection:
        "It works because every win feels earned through pressure, persuasion, and control.",
    },
  },
];

export const topPicksPrimary: MediaEntry[] = [
  {
    id: 95396,
    source: "tmdb_tv",
    insight: "Work-life balance taken to its logical, terrifying extreme.",
    tag: "Identity",
  },
  {
    id: 157336,
    source: "tmdb_movie",
    insight: "Mankind was born on Earth. It was never meant to die here.",
    tag: "Perception",
  },
  {
    id: 95479,
    source: "tmdb_tv",
    insight: "A boy fights... for the right death.",
    tag: "Action",
  },
  {
    id: 37521,
    source: "jikan",
    insight: "I have no enemies.",
    tag: "War and Politics",
  },
];

export const topPicksSecondary: MediaEntry[] = [
  { id: 68721, source: "tmdb_movie", insight: "Unleash the power behind the armor." },
  { id: 100088, source: "tmdb_tv", insight: "Every path has a price." },
  { id: 40075, source: "tmdb_tv", insight: "Just west of weird." },
  { id: 44511, source: "jikan", insight: "He's a devil who doesn't deserve human rights." },
  { id: 19, source: "jikan", insight: "The only thing humans are equal in is death." },
  { id: 66732, source: "tmdb_tv", insight: "It only gets stranger." },
  { id: 42310, source: "jikan", insight: "Just keep running" },
  { id: 264660, source: "tmdb_movie", insight: "The Turing test as a trust exercise. Elegant and cold." },
];

export interface CollectionConfig {
  name: string;
  items: MediaEntry[];
}

export const collectionsConfig: CollectionConfig[] = [
  {
    name: "Mind-Bending Stories",
    items: [
      { id: 1535, source: "jikan" },
      { id: 1396, source: "tmdb_tv" },
      { id: 18397, source: "jikan" },
      { id: 339, source: "jikan" },
      { id: 69061, source: "tmdb_tv" },
    ],
  },
  {
    name: "Best World-Building",
    items: [
      { id: 438631, source: "tmdb_movie" },
      { id: 16498, source: "jikan" },
      { id: 63639, source: "tmdb_tv" },
      { id: 335984, source: "tmdb_movie" },
    ],
  },
  {
    name: "Rewatch Worthy",
    items: [
      { id: 157336, source: "tmdb_movie" },
      { id: 1, source: "jikan" },
      { id: 1429, source: "tmdb_tv" },
      { id: 62560, source: "tmdb_tv" },
      { id: 199, source: "jikan" },
    ],
  },
];

export const recentlyImpressedConfig: MediaEntry[] = [
  { id: 126308, source: "tmdb_tv", insight: "Patience as strategy — in diplomacy and system design." },
  { id: 108545, source: "tmdb_tv", insight: "Scale and uncertainty. How do you architect for the unknowable?" },
  { id: 58391, source: "jikan", insight: "Empathy as the hardest engineering problem." },
];
