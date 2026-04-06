import HeroSection from "@/components/HeroSection";
import TopPicksSection from "@/components/TopPicksSection";
import StoryThemesSection from "@/components/StoryThemesSection";
import ThemedCollections from "@/components/ThemedCollections";
import PersonalNote from "@/components/PersonalNote";
import RecentlyImpressed from "@/components/RecentlyImpressed";
import CursorGlow from "@/components/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay relative">
      <CursorGlow />
      <HeroSection />
      <div className="section-glow">
        <TopPicksSection />
      </div>
      <div className="section-glow">
        <StoryThemesSection />
      </div>
      <div className="section-glow">
        <ThemedCollections />
      </div>
      <div className="section-glow">
        <RecentlyImpressed />
      </div>
      <PersonalNote />

      <footer className="py-10 text-center text-xs text-muted-foreground font-mono tracking-wider">
        Curated with intention · Not a tracker
      </footer>
    </div>
  );
};

export default Index;
