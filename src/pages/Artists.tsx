import Layout from "@/components/layout/Layout";
import ArtistRevolutionHero from "@/components/artists/ArtistRevolutionHero";
import ArtistStatsShowcase from "@/components/artists/ArtistStatsShowcase";
import ArtistEmpathyRevolution from "@/components/artists/ArtistEmpathyRevolution";
import ArtistSuccessToolkit from "@/components/artists/ArtistSuccessToolkit";
import ArtistLeaderboardRevolution from "@/components/artists/ArtistLeaderboardRevolution";
import ArtistSuccessStoriesRevolution from "@/components/artists/ArtistSuccessStoriesRevolution";
import ArtistRevolutionCTA from "@/components/artists/ArtistRevolutionCTA";

const Artists = () => {
  return (
    <Layout>
      <ArtistRevolutionHero />
      <ArtistStatsShowcase />
      <ArtistEmpathyRevolution />
      <ArtistSuccessToolkit />
      <ArtistLeaderboardRevolution />
      <ArtistSuccessStoriesRevolution />
      <ArtistRevolutionCTA />
    </Layout>
  );
};

export default Artists;