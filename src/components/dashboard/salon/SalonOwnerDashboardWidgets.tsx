
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import SalonBoostBanner from "@/components/salon/SalonBoostBanner";
import CustomerVisibilityBanner from "./components/CustomerVisibilityBanner";
import PostReachStatsCard from "./components/PostReachStatsCard";
import SalonFeatureCardsGrid from "./components/SalonFeatureCardsGrid";
import SalonSecondaryFeatures from "./components/SalonSecondaryFeatures";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import SimpleLoadingFallback from "@/components/error-handling/SimpleLoadingFallback";
import SalonDashboard from "./SalonDashboard";

interface SalonDashboardData {
  postViews: number;
  localReach: number;
  credits: number;
  isPremium: boolean;
}

const SalonOwnerDashboardWidgets = () => {
  // VISUAL BANNER FOR IDENTIFICATION
  console.log('🔍 RENDERING: src/components/dashboard/salon/SalonOwnerDashboardWidgets.tsx');
  
  const { userProfile, user } = useAuth();
  
  const { data: dashboardData, isLoading } = useSafeQuery<SalonDashboardData>({
    queryKey: ['salon-dashboard-data', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Fetch credits
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('credits, boosted_until')
        .eq('id', user.id)
        .single();
      
      if (userError) throw userError;
      
      // Check for premium/boosted status
      const boostedUntil = userData?.boosted_until ? new Date(userData.boosted_until) : null;
      const isPremium = boostedUntil ? new Date() < boostedUntil : false;
      
      // Get post views from jobs or posts
      let postViews = 0;
      const { count: jobCount } = await supabase
        .from('jobs')
        .select('id', { count: 'exact', head: true })
        .eq('salon_id', user.id);
        
      // For local reach, we'll use a simple formula based on job listings and location
      // In a real implementation, this would come from analytics
      const localReach = Math.max(30, (jobCount || 0) * 30 + Math.floor(Math.random() * 40));
      
      return {
        postViews: jobCount || 0,
        localReach,
        credits: userData?.credits || 0,
        isPremium
      };
    },
    enabled: !!user?.id,
    fallbackData: {
      postViews: 0,
      localReach: 0,
      credits: userProfile?.credits || 0,
      isPremium: false
    },
    context: "salon-dashboard-data"
  });
  
  const handleBoostClick = () => {
    toast.info("Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page or open a modal
  };
  
  return (
    <FallbackBoundary>
      {/* VISUAL BANNER FOR IDENTIFICATION */}
      <div className="w-full bg-purple-600 text-white text-center py-4 text-xl font-bold">
        🔍 THIS IS src/components/dashboard/salon/SalonOwnerDashboardWidgets.tsx
      </div>
      
      <div className="space-y-6">
        <h2 className="text-2xl font-serif">Salon Owner Dashboard</h2>
        
        {/* Enhanced Salon Dashboard */}
        <FallbackBoundary>
          <SalonDashboard />
        </FallbackBoundary>
        
        {/* Customer Visibility Banner */}
        <FallbackBoundary>
          <CustomerVisibilityBanner 
            loading={isLoading}
            credits={dashboardData.credits}
          />
        </FallbackBoundary>
        
        {/* Post Reach Stats Card */}
        <FallbackBoundary>
          <PostReachStatsCard 
            postViews={dashboardData.postViews} 
            localReach={dashboardData.localReach} 
            isPremium={dashboardData.isPremium}
            loading={isLoading}
          />
        </FallbackBoundary>
        
        {/* Feature Cards Grid */}
        <FallbackBoundary>
          <SalonFeatureCardsGrid credits={dashboardData.credits} />
        </FallbackBoundary>
        
        {/* Second Row */}
        <FallbackBoundary>
          <SalonSecondaryFeatures isPremium={dashboardData.isPremium} />
        </FallbackBoundary>
      </div>
    </FallbackBoundary>
  );
};

export default SalonOwnerDashboardWidgets;
