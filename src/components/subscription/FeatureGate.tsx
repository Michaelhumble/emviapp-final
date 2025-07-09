
import { ReactNode } from "react";
import { PlanTier } from "@/context/subscription/types";
import { useSubscription } from "@/context/subscription";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UpgradeFeature } from "@/components/upgrade/SmartUpgradePrompt";
import PremiumFeatureGate from "@/components/upgrade/PremiumFeatureGate";

interface FeatureGateProps {
  children: ReactNode;
  requiredPlan: PlanTier;
  fallback?: ReactNode;
  showUpgradeModal?: boolean;
  disableOverlay?: boolean;
  upgradeFeature?: UpgradeFeature;
}

const FeatureGate = ({
  children,
  requiredPlan,
  fallback,
  showUpgradeModal = false,
  disableOverlay = false,
  upgradeFeature = "analytics"
}: FeatureGateProps) => {
  const { currentPlan, hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  
  // Helper to determine tier level
  const getTierLevel = (tier: PlanTier): number => {
    const tiers: Record<PlanTier, number> = {
      free: 0,
      basic: 1,
      professional: 2,
      premium: 3,
      diamond: 4
    };
    return tiers[tier] || 0;
  };
  
  // Check if the current plan meets the requirement
  const hasAccess = () => {
    if (!currentPlan) return false;
    if (requiredPlan === 'free') return true;
    
    const currentTierLevel = getTierLevel(currentPlan.tier);
    const requiredTierLevel = getTierLevel(requiredPlan);
    
    return currentTierLevel >= requiredTierLevel;
  };
  
  if (hasAccess()) {
    return <>{children}</>;
  }
  
  if (disableOverlay && fallback) {
    return <>{fallback}</>;
  }
  
  if (showUpgradeModal) {
    return (
      <PremiumFeatureGate feature={upgradeFeature}>
        <div className="relative">
          <div className="opacity-50 pointer-events-none filter grayscale">
            {children}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer z-10">
            <div className="bg-white/90 rounded-lg p-3 shadow-lg text-center">
              <Lock className="h-5 w-5 mx-auto mb-2 text-amber-500" />
              <p className="text-sm font-medium">Premium Feature</p>
              <p className="text-xs text-gray-500">Upgrade to {requiredPlan} plan</p>
            </div>
          </div>
        </div>
      </PremiumFeatureGate>
    );
  }
  
  return (
    <>
      <div className="relative">
        <div className="opacity-50 pointer-events-none filter grayscale">
          {children}
        </div>
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[2px] cursor-pointer z-10"
          onClick={() => navigate('/pricing')}
        >
          <div className="bg-white/90 rounded-lg p-3 shadow-lg text-center">
            <Lock className="h-5 w-5 mx-auto mb-2 text-amber-500" />
            <p className="text-sm font-medium">Premium Feature</p>
            <p className="text-xs text-gray-500">Upgrade to {requiredPlan} plan</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureGate;
