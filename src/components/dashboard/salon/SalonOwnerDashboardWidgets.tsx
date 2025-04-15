
import { useAuth } from "@/context/auth";
import SalonBoostBanner from "@/components/salon/SalonBoostBanner";
import CustomerVisibilityBanner from "./components/CustomerVisibilityBanner";
import PostReachStatsCard from "./components/PostReachStatsCard";
import SalonFeatureCardsGrid from "./components/SalonFeatureCardsGrid";
import SalonSecondaryFeatures from "./components/SalonSecondaryFeatures";
import { toast } from "sonner";

const SalonOwnerDashboardWidgets = () => {
  const { userProfile } = useAuth();
  
  // Mock statistics - would be fetched from backend in a real implementation
  const postViews = 68;
  const localReach = 243;
  const isPremium = false;
  
  const handleBoostClick = () => {
    toast.info("Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page or open a modal
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif">Salon Owner Dashboard</h2>
      
      {/* Salon Boost Banner */}
      <SalonBoostBanner onBoostClick={handleBoostClick} />
      
      {/* Customer Visibility Banner */}
      <CustomerVisibilityBanner />
      
      {/* Post Reach Stats Card */}
      <PostReachStatsCard 
        postViews={postViews} 
        localReach={localReach} 
        isPremium={isPremium}
      />
      
      {/* Feature Cards Grid */}
      <SalonFeatureCardsGrid />
      
      {/* Second Row */}
      <SalonSecondaryFeatures isPremium={isPremium} />
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
