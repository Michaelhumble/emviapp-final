
import ArtistWelcomeBanner from "../ArtistWelcomeBanner";
import ArtistDashboardProfile from "../ArtistDashboardProfile";
import ArtistPerformanceMetrics from "../ArtistPerformanceMetrics";
import ArtistToolkitSection from "../ArtistToolkitSection";
import DashboardStatusWidgets from "../DashboardStatusWidgets";
import ArtistServicesGrid from "../ArtistServicesGrid";
import ArtistReferralCenter from "../ArtistReferralCenter";
import ArtistCreditsRedemption from "../ArtistCreditsRedemption";
import ArtistBookingCalendar from "../ArtistBookingCalendar";
import ArtistUpgradeSection from "../ArtistUpgradeSection";
import ArtistMotivationalQuote from "../ArtistMotivationalQuote";
import ArtistPortfolio from "../ArtistPortfolio";
import ArtistServices from "../services/ArtistServices";
import ArtistActivityFeed from "../activity/ArtistActivityFeed";
import { useArtistData } from "../context/ArtistDataContext";
import ArtistGoalsProgress from "../ArtistGoalsProgress";
import ArtistReferralRewards from "../ArtistReferralRewards";
import ProfileCompletionTracker from "@/components/profile/ProfileCompletionTracker";
import ServiceManagement from "../services/ServiceManagement";

const ArtistDashboardContent = () => {
  const { artistProfile, firstName, userCredits, handleCopyReferralLink } = useArtistData();

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* 1. Welcome Banner */}
      <ArtistWelcomeBanner firstName={firstName} />
      
      {/* 2. Motivational Quote - Enhanced */}
      <ArtistMotivationalQuote />
      
      {/* 3. Goals & Progress - NEW */}
      <div className="mb-8">
        <ArtistGoalsProgress artistProfile={artistProfile} />
      </div>
      
      {/* 4. Profile Completion Tracker - NEW */}
      <div className="mb-8">
        <ProfileCompletionTracker />
      </div>
      
      {/* 5. Referral Rewards - NEW */}
      <ArtistReferralRewards />
      
      {/* 6. Portfolio Section */}
      <div className="mb-8">
        <ArtistPortfolio />
      </div>
      
      {/* 7. Services Management Section - NEW */}
      <div className="mb-8">
        <ServiceManagement />
      </div>
      
      {/* 8. Services Section */}
      <div className="mb-8">
        <ArtistServices />
      </div>
      
      {/* 9. Profile Header */}
      <ArtistDashboardProfile artistProfile={artistProfile} />
      
      {/* 10. Performance Metrics */}
      <ArtistPerformanceMetrics profileViews={artistProfile?.profile_views || 245} />
      
      {/* 11. Artist Toolkit */}
      <ArtistToolkitSection onCopyReferralLink={handleCopyReferralLink} />
      
      {/* 12. Dashboard Status Widgets */}
      <DashboardStatusWidgets />
      
      {/* 13. Referral Center - IMPROVED */}
      <ArtistReferralCenter />
      
      {/* 14. Credits Redemption Section */}
      <section className="mb-8" id="credits-redemption">
        <h2 className="text-xl font-serif font-semibold mb-4">Redeem Emvi Credits</h2>
        <ArtistCreditsRedemption />
      </section>
      
      {/* 15. Booking Calendar */}
      <section className="mb-8" id="calendar">
        <h2 className="text-xl font-serif font-semibold mb-4">Booking Calendar</h2>
        <ArtistBookingCalendar />
      </section>
      
      {/* 16. Activity Feed */}
      <section className="mb-8" id="activity-feed">
        <h2 className="text-xl font-serif font-semibold mb-4">Recent Activity</h2>
        <ArtistActivityFeed limit={5} />
      </section>
      
      {/* 17. Upgrade Section */}
      <section id="upgrade">
        <h2 className="text-xl font-serif font-semibold mb-4">Unlock Premium Features</h2>
        <ArtistUpgradeSection />
      </section>
    </div>
  );
};

export default ArtistDashboardContent;
