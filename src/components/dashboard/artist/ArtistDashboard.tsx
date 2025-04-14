
import React from "react";
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import ArtistDashboardHeader from "./ArtistDashboardHeader";
import ArtistWelcomeBanner from "./ArtistWelcomeBanner";
import ArtistPortfolioSection from "./ArtistPortfolioSection";
import ArtistServicesSection from "./ArtistServicesSection";
import ArtistServicesGrid from "./ArtistServicesGrid";
import ArtistToolkitSection from "./ArtistToolkitSection";
import ArtistProfileSetupSection from "./ArtistProfileSetupSection";
import ArtistCreditsRedemption from "./ArtistCreditsRedemption";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistDailyMotivation from "./ArtistDailyMotivation";
import ArtistMetricsSection from "./ArtistMetricsSection";
import UpcomingAppointments from "../common/UpcomingAppointments";

const ArtistDashboard = () => {
  return (
    <div className="space-y-6">
      <ArtistDashboardHeader />
      <ArtistWelcomeBanner />
      
      {/* Add Upcoming Appointments section */}
      <UpcomingAppointments dashboardType="artist" />
      
      <ArtistMetricsSection />
      <ArtistDashboardWidgets />
      <ArtistToolkitSection />
      <ArtistProfileSetupSection />
      <ArtistPortfolioSection />
      <ArtistServicesSection />
      <ArtistCreditsRedemption />
      <ArtistReferralCenter />
      <ArtistDailyMotivation />
    </div>
  );
};

export default ArtistDashboard;
