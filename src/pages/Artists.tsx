
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/artists/HeroSection";
import StatsSection from "@/components/artists/StatsSection";
import AIFeaturesSection from "@/components/artists/AIFeaturesSection";
import JobMatchesSection from "@/components/artists/JobMatchesSection";
import PortfolioSection from "@/components/artists/PortfolioSection";
import SuccessStoriesSection from "@/components/artists/SuccessStoriesSection";
import CtaSection from "@/components/artists/CtaSection";

const Artists = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <AIFeaturesSection />
      <JobMatchesSection />
      <PortfolioSection />
      <SuccessStoriesSection />
      <CtaSection />
    </Layout>
  );
};

export default Artists;
