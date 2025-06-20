
import Layout from "@/components/layout/Layout";
import ArtistHeroSection from "@/components/artists/ArtistHeroSection";
import LiveStatsBar from "@/components/artists/LiveStatsBar";
import EmpathySection from "@/components/artists/EmpathySection";
import WhyArtistsChooseSection from "@/components/artists/WhyArtistsChooseSection";
import LeaderboardSection from "@/components/artists/LeaderboardSection";
import FeaturedSuccessStories from "@/components/artists/FeaturedSuccessStories";
import FinalCTASection from "@/components/artists/FinalCTASection";

const Artists = () => {
  return (
    <Layout>
      <ArtistHeroSection />
      <LiveStatsBar />
      <EmpathySection />
      <WhyArtistsChooseSection />
      <LeaderboardSection />
      <FeaturedSuccessStories />
      <FinalCTASection />
    </Layout>
  );
};

export default Artists;
