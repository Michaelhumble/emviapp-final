
import { useAuth } from "@/context/auth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomerDashboardHeader from "./CustomerDashboardHeader";
import CustomerMetricsSection from "./CustomerMetricsSection";
import CustomerMotivationalQuote from "./CustomerMotivationalQuote";
import CustomerWelcomeBanner from "./CustomerWelcomeBanner";
import CustomerBoostTracker from "./CustomerBoostTracker";
import CustomerDashboardStats from "./CustomerDashboardStats";
import { UserProfile } from "@/context/auth/types";
import CustomerDashboardWidgets from "./CustomerDashboardWidgets";
import CustomerCreditsTracker from "@/components/customer/CustomerCreditsTracker";
import ReferralTracker from "@/components/referral/ReferralTracker";

const CustomerDashboard = () => {
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
      <CustomerWelcomeBanner isProfileTrending={isProfileTrending} />
      
      {/* Hero Banner with Cover Photo and Avatar */}
      <CustomerDashboardHeader profile={userProfile as UserProfile} />
      
      {/* Customer Dashboard Stats */}
      <div className="mt-6">
        <CustomerDashboardStats />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Boost Tracker */}
          <CustomerBoostTracker profileViews={userProfile?.profile_views || 0} />
          
          {/* Dashboard Widgets */}
          <CustomerDashboardWidgets />
          
          {/* Motivational Quote */}
          <CustomerMotivationalQuote />
          
          {/* Metrics Section */}
          <CustomerMetricsSection />
        </div>
        
        <div className="space-y-8">
          {/* Add Credits Tracker */}
          <CustomerCreditsTracker />
          
          {/* Enhanced Referral Tracker */}
          <ReferralTracker />
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
