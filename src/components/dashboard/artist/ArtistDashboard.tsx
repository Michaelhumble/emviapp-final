
import { useAuth } from "@/context/auth";
import ArtistDashboardHeader from "./ArtistDashboardHeader";
import ArtistMetricsSection from "./ArtistMetricsSection";
import ArtistMotivationalQuote from "./ArtistMotivationalQuote";
import ArtistPortfolioSection from "./ArtistPortfolioSection";
import ArtistServicesSection from "./ArtistServicesSection";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistBookingCalendar from "./ArtistBookingCalendar";
import ArtistUpgradeSection from "./ArtistUpgradeSection";
import ArtistDailyMotivation from "./ArtistDailyMotivation";

const ArtistDashboard = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="container mx-auto px-4 pb-20 pt-8">
      {/* Hero Banner with Cover Photo and Avatar */}
      <ArtistDashboardHeader profile={userProfile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Motivational Quote */}
          <ArtistMotivationalQuote />
          
          {/* Metrics Section */}
          <ArtistMetricsSection />
          
          {/* Portfolio Section */}
          <ArtistPortfolioSection />
          
          {/* Services Section */}
          <ArtistServicesSection />
        </div>
        
        <div className="space-y-8">
          {/* Booking Calendar */}
          <ArtistBookingCalendar />
          
          {/* Referral Center */}
          <ArtistReferralCenter />
          
          {/* Upgrade Section */}
          <ArtistUpgradeSection />
          
          {/* Daily Motivation */}
          <ArtistDailyMotivation />
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;
