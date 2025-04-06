
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/salon-owners/HeroSection";
import StatsSection from "@/components/salon-owners/StatsSection";
import FeaturesSection from "@/components/salon-owners/FeaturesSection";
import ArtistProfilesSection from "@/components/salon-owners/ArtistProfilesSection";
import PostJobSection from "@/components/salon-owners/PostJobSection";
import CtaSection from "@/components/salon-owners/CtaSection";

const SalonOwners = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* AI Features Section */}
      <FeaturesSection />

      {/* Artist Profiles Section */}
      <ArtistProfilesSection />

      {/* Post Job Section */}
      <PostJobSection />

      {/* CTA Section */}
      <CtaSection />
    </Layout>
  );
};

export default SalonOwners;
