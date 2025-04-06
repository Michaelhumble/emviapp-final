
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
import ArtistDashboardWidgets from "./ArtistDashboardWidgets";
import { UserProfile } from "@/context/auth/types";

const ArtistDashboard = () => {
  const { userProfile } = useAuth();
  const [isProfileTrending, setIsProfileTrending] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  
  // Motivational messages for artists
  const motivationalMessages = [
    "Your creativity changes lives. Keep sharing your art with the world!",
    "Every stroke, every design, is your unique signature on the world.",
    "Today is your canvas, create something beautiful!",
    "Your art is your voice. Make it heard!",
    "Your skills are rare and valuable. Never forget your worth.",
    "The beauty industry needs innovators like you.",
    "Great artists don't wait for inspiration—they create it!",
    "Your clients don't just want your services, they want YOUR unique style.",
    "You don't just do beauty, you transform confidence."
  ];

  // Check if profile is trending and rotate welcome messages
  useEffect(() => {
    // Set trending status
    if (userProfile?.profile_views && userProfile.profile_views > 30) {
      setIsProfileTrending(true);
    }
    
    // Rotate motivational messages
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    setWelcomeMessage(motivationalMessages[randomIndex]);
    
    // Change message every 12 hours
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * motivationalMessages.length);
      setWelcomeMessage(motivationalMessages[newIndex]);
    }, 43200000); // 12 hours
    
    return () => clearInterval(interval);
  }, [userProfile]);
  
  return (
    <div className="container mx-auto px-4 pb-20 pt-8">
      {/* New Welcome Banner with Motivational Quotes */}
      <ArtistWelcomeBanner isProfileTrending={isProfileTrending} customMessage={welcomeMessage} />
      
      {/* Hero Banner with Cover Photo and Avatar */}
      <ArtistDashboardHeader profile={userProfile as UserProfile} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Boost Tracker */}
          <ArtistBoostTracker profileViews={userProfile?.profile_views || 0} />
          
          {/* Toolkit Section */}
          <ArtistToolkit />
          
          {/* Dashboard Widgets */}
          <ArtistDashboardWidgets />
          
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
