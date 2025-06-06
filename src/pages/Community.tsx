
import Layout from "@/components/layout/Layout";
import CommunityHeroSection from "@/components/community/CommunityHeroSection";
import TrendingTopicsSection from "@/components/community/TrendingTopicsSection";
import MemberHallOfFame from "@/components/community/MemberHallOfFame";
import ValueBlocksSection from "@/components/community/ValueBlocksSection";
import EmotionalPowerSection from "@/components/community/EmotionalPowerSection";
import ViralEngineSection from "@/components/community/ViralEngineSection";
import CommunityWallOfThanks from "@/components/community/CommunityWallOfThanks";
import InvestorMetricsSection from "@/components/community/InvestorMetricsSection";

const Community = () => {
  return (
    <Layout>
      <CommunityHeroSection />
      <TrendingTopicsSection />
      <MemberHallOfFame />
      <ValueBlocksSection />
      <EmotionalPowerSection />
      <ViralEngineSection />
      <CommunityWallOfThanks />
      <InvestorMetricsSection />
    </Layout>
  );
};

export default Community;
