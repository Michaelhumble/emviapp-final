
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/context/subscription";
import { useMemo } from "react";
import { Crown, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SubscriptionStatusCard = () => {
  const { currentPlan, hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  
  const planColor = useMemo(() => {
    if (!currentPlan) return "bg-gray-50 border-gray-200";
    if (!hasActiveSubscription) return "bg-gray-50 border-gray-200";
    
    switch (currentPlan.tier) {
      case "basic":
        return "bg-blue-50 border-blue-200";
      case "professional":
        return "bg-purple-50 border-purple-200";
      case "premium":
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  }, [currentPlan, hasActiveSubscription]);
  
  const planTextColor = useMemo(() => {
    if (!currentPlan || !hasActiveSubscription) return "text-gray-600";
    
    switch (currentPlan.tier) {
      case "basic":
        return "text-blue-800";
      case "professional":
        return "text-purple-800";
      case "premium":
        return "text-amber-800";
      default:
        return "text-gray-600";
    }
  }, [currentPlan, hasActiveSubscription]);
  
  const handleManagePlan = () => {
    navigate("/checkout");
  };

  if (!currentPlan) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className={`${planColor} border`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {hasActiveSubscription ? (
                <Crown className={`h-5 w-5 ${planTextColor}`} />
              ) : (
                <Lock className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className={`font-medium ${planTextColor}`}>
                  {hasActiveSubscription ? `${currentPlan.name} Plan` : 'Free Plan'}
                </p>
                <p className="text-xs text-gray-500">
                  {hasActiveSubscription 
                    ? 'All premium features unlocked'
                    : 'Limited features available'
                  }
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleManagePlan}
              className={hasActiveSubscription ? planTextColor : ""}
            >
              {hasActiveSubscription ? "Manage" : "Upgrade"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SubscriptionStatusCard;
