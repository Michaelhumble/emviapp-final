import Layout from "@/components/layout/Layout";
import ArtistHeroSection from "@/components/artists/ArtistHeroSection";
import LiveStatsBar from "@/components/artists/LiveStatsBar";
import EmpathySection from "@/components/artists/EmpathySection";
import WhyArtistsChooseSection from "@/components/artists/WhyArtistsChooseSection";
import LeaderboardSection from "@/components/artists/LeaderboardSection";
import FeaturedSuccessStories from "@/components/artists/FeaturedSuccessStories";
import FinalCTASection from "@/components/artists/FinalCTASection";
import OpenToOffersSection from "@/components/artists/OpenToOffersSection";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Artists = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "opportunities">("overview");

  return (
    <Layout>
      {/* Keep existing hero and stats sections */}
      <ArtistHeroSection />
      <LiveStatsBar />
      
      {/* Add tab navigation for the new section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted/50 rounded-lg p-1">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              size="sm"
            >
              Artist Journey
            </Button>
            <Button
              variant={activeTab === "opportunities" ? "default" : "ghost"}
              onClick={() => setActiveTab("opportunities")}
              size="sm"
            >
              Open to Offers
            </Button>
          </div>
        </div>

        {activeTab === "overview" ? (
          <>
            <EmpathySection />
            <WhyArtistsChooseSection />
            <LeaderboardSection />
            <FeaturedSuccessStories />
            <FinalCTASection />
          </>
        ) : (
          <OpenToOffersSection />
        )}
      </div>
    </Layout>
  );
};

export default Artists;
