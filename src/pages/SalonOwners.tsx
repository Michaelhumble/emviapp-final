
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/salon-owners/HeroSection";
import StatsSection from "@/components/salon-owners/StatsSection";
import FeaturesSection from "@/components/salon-owners/FeaturesSection";
import ArtistProfilesSection from "@/components/salon-owners/ArtistProfilesSection";
import PostJobSection from "@/components/salon-owners/PostJobSection";
import CtaSection from "@/components/salon-owners/CtaSection";
import Map from "@/components/Map";
import BilingualExperienceSection from "@/components/salons/BilingualExperienceSection";

const SalonOwners = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* AI Features Section */}
      <FeaturesSection />

      {/* Bilingual Experience Section */}
      <BilingualExperienceSection />

      {/* Map Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Find Salons in Los Angeles</h2>
        <Map height="500px" className="rounded-lg shadow-lg" />
      </div>

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
