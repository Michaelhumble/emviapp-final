
import ArtistWelcomeBanner from "../ArtistWelcomeBanner";
import ArtistDashboardProfile from "../ArtistDashboardProfile";
import ArtistPerformanceMetrics from "../ArtistPerformanceMetrics";
import ArtistToolkitSection from "../ArtistToolkitSection";
import DashboardStatusWidgets from "../DashboardStatusWidgets";
import ArtistPortfolioGrid from "../ArtistPortfolioGrid";
import ArtistServicesGrid from "../ArtistServicesGrid";
import ArtistReferralCenter from "../ArtistReferralCenter";
import ArtistCreditsRedemption from "../ArtistCreditsRedemption";
import ArtistBookingCalendar from "../ArtistBookingCalendar";
import ArtistUpgradeSection from "../ArtistUpgradeSection";
import ArtistMotivationalQuote from "../ArtistMotivationalQuote";
import { useArtistData } from "../context/ArtistDataContext";

const ArtistDashboardContent = () => {
  const { artistProfile, firstName, userCredits, handleCopyReferralLink } = useArtistData();

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 1. Welcome Banner */}
      <ArtistWelcomeBanner firstName={firstName} />
      
      {/* 2. Motivational Quote */}
      <ArtistMotivationalQuote />
      
      {/* 3. Profile Header */}
      <ArtistDashboardProfile artistProfile={artistProfile} />
      
      {/* 4. Performance Metrics */}
      <ArtistPerformanceMetrics profileViews={artistProfile?.profile_views || 245} />
      
      {/* 5. Artist Toolkit */}
      <ArtistToolkitSection onCopyReferralLink={handleCopyReferralLink} />
      
      {/* 6. Dashboard Status Widgets */}
      <DashboardStatusWidgets />
      
      {/* 7. Portfolio Grid */}
      <ArtistPortfolioGrid />
      
      {/* 8. Services Grid */}
      <ArtistServicesGrid />
      
      {/* 9. Referral Center */}
      <ArtistReferralCenter />
      
      {/* 10. Credits Redemption Section */}
      <section className="mb-8" id="credits-redemption">
        <h2 className="text-xl font-serif font-semibold mb-4">Redeem Emvi Credits</h2>
        <ArtistCreditsRedemption credits={userCredits} />
      </section>
      
      {/* 11. Booking Calendar */}
      <section className="mb-8" id="calendar">
        <h2 className="text-xl font-serif font-semibold mb-4">Booking Calendar</h2>
        <ArtistBookingCalendar />
      </section>
      
      {/* 12. Upgrade Section */}
      <section id="upgrade">
        <h2 className="text-xl font-serif font-semibold mb-4">Unlock Premium Features</h2>
        <ArtistUpgradeSection />
      </section>
    </div>
  );
};

export default ArtistDashboardContent;
