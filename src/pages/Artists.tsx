import Layout from "@/components/layout/Layout";
import ArtistRevolutionHero from "@/components/artists/ArtistRevolutionHero";
import ArtistStatsShowcase from "@/components/artists/ArtistStatsShowcase";
import ArtistEmpathyRevolution from "@/components/artists/ArtistEmpathyRevolution";
import ArtistSuccessToolkit from "@/components/artists/ArtistSuccessToolkit";
import ArtistLeaderboardRevolution from "@/components/artists/ArtistLeaderboardRevolution";
import ArtistSuccessStoriesRevolution from "@/components/artists/ArtistSuccessStoriesRevolution";
import ArtistRevolutionCTA from "@/components/artists/ArtistRevolutionCTA";
import ArtistsForHireStrip from "@/components/home/ArtistsForHireStrip";

const Artists = () => {
  return (
    <Layout>
      <ArtistRevolutionHero />
      <ArtistStatsShowcase />
      <ArtistEmpathyRevolution />
      <ArtistSuccessToolkit />
      <ArtistLeaderboardRevolution />
      <ArtistSuccessStoriesRevolution />

      {/* Artists For Hire Listing (gated) */}
      {/* This section lists artists using FOMO logic without altering existing marketing sections */}
      <div className="mt-8">
        <ArtistsForHireStrip />
      </div>

      <ArtistRevolutionCTA />
    </Layout>
  );
};

export default Artists;