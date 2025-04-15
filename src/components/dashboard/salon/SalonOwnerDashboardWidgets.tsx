
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import SalonBoostBanner from "@/components/salon/SalonBoostBanner";
import CustomerVisibilityBanner from "./components/CustomerVisibilityBanner";
import PostReachStatsCard from "./components/PostReachStatsCard";
import SalonFeatureCardsGrid from "./components/SalonFeatureCardsGrid";
import SalonSecondaryFeatures from "./components/SalonSecondaryFeatures";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SalonOwnerDashboardWidgets = () => {
  const { userProfile, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    postViews: 0,
    localReach: 0,
    credits: 0,
    isPremium: false
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id) return;
      
      setLoading(true);
      try {
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
        
        setDashboardData({
          postViews: jobCount || 0,
          localReach,
          credits: userData?.credits || 0,
          isPremium
        });
      } catch (error) {
        console.error("Error fetching salon dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user?.id]);
  
  const handleBoostClick = () => {
    toast.info("Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page or open a modal
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Salon Owner Dashboard</h2>
      
      {/* Salon Boost Banner */}
      <SalonBoostBanner 
        onBoostClick={handleBoostClick} 
        loading={loading}
        isPremium={dashboardData.isPremium}
      />
      
      {/* Customer Visibility Banner */}
      <CustomerVisibilityBanner 
        loading={loading}
        credits={dashboardData.credits}
      />
      
      {/* Post Reach Stats Card */}
      <PostReachStatsCard 
        postViews={dashboardData.postViews} 
        localReach={dashboardData.localReach} 
        isPremium={dashboardData.isPremium}
        loading={loading}
      />
      
      {/* Feature Cards Grid */}
      <SalonFeatureCardsGrid credits={dashboardData.credits} />
      
      {/* Second Row */}
      <SalonSecondaryFeatures isPremium={dashboardData.isPremium} />
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
