
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ArtistDashboardHeader from "./ArtistDashboardHeader";
import ArtistMetricsSection from "./ArtistMetricsSection";
import ArtistMotivationalQuote from "./ArtistMotivationalQuote";
import ArtistPortfolioSection from "./ArtistPortfolioSection";
import ArtistServicesSection from "./ArtistServicesSection";
import ArtistReferralCenter from "./ArtistReferralCenter";
import ArtistBookingCalendar from "./ArtistBookingCalendar";
import ArtistUpgradeSection from "./ArtistUpgradeSection";
import ArtistDailyMotivation from "./ArtistDailyMotivation";
import ArtistToolkit from "./ArtistToolkit";
import ArtistWelcomeBanner from "./ArtistWelcomeBanner";
import ArtistBoostTracker from "./ArtistBoostTracker";
import { UserProfile } from "@/context/auth/types";

const ArtistDashboard = () => {
  const { userProfile } = useAuth();
  const [isProfileTrending, setIsProfileTrending] = useState(false);
  
  // Check if profile is trending (for demo purposes, set to true if profile views > 30)
  useEffect(() => {
    if (userProfile?.profile_views && userProfile.profile_views > 30) {
      setIsProfileTrending(true);
    }
  }, [userProfile]);
  
  return (
    <div className="container mx-auto px-4 pb-20 pt-8">
      {/* New Welcome Banner with Motivational Quotes */}
      <ArtistWelcomeBanner isProfileTrending={isProfileTrending} />
      
      {/* Hero Banner with Cover Photo and Avatar */}
      <ArtistDashboardHeader profile={userProfile as UserProfile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Boost Tracker */}
          <ArtistBoostTracker profileViews={userProfile?.profile_views || 0} />
          
          {/* Toolkit Section */}
          <ArtistToolkit />
          
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
          {/* Enhanced Referral Center */}
          <ArtistReferralCenter />
          
          {/* Booking Calendar */}
          <ArtistBookingCalendar />
          
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
