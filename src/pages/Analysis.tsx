
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/analysis/HeroSection";
import RoleBasedImpact from "@/components/analysis/RoleBasedImpact";
import AutomationEngine from "@/components/analysis/AutomationEngine";
import RealNumbers from "@/components/analysis/RealNumbers";
import EmotionalTrust from "@/components/analysis/EmotionalTrust";

const Analysis = () => {
  return (
    <Layout>
      <HeroSection />
      <RoleBasedImpact />
      <AutomationEngine />
      <RealNumbers />
      <EmotionalTrust />
    </Layout>
  );
};

export default Analysis;
