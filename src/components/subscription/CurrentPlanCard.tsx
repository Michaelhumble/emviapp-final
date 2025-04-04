
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/context/subscription";
import { useNavigate } from "react-router-dom";
import { Crown, Check } from "lucide-react";

const CurrentPlanCard = () => {
  const { currentPlan, hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  
  if (!currentPlan) return null;
  
  const handleUpgrade = () => {
    navigate("/checkout");
  };
  
  const getBgGradient = () => {
    if (!hasActiveSubscription) return "from-gray-50 to-gray-100";
    switch (currentPlan.tier) {
      case "basic":
        return "from-blue-50 to-blue-100";
      case "professional":
        return "from-purple-50 to-purple-100";
      case "premium":
        return "from-amber-50 to-amber-100";
      default:
        return "from-gray-50 to-gray-100";
    }
  };
  
  return (
    <Card className={`overflow-hidden bg-gradient-to-br ${getBgGradient()} border`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            {currentPlan.name} Plan
          </CardTitle>
          <CardDescription>
            {hasActiveSubscription ? 'Active subscription' : 'Limited access'}
          </CardDescription>
        </div>
        {hasActiveSubscription && (
          <Crown className={`h-5 w-5 ${
            currentPlan.tier === "premium" ? "text-amber-500" : 
            currentPlan.tier === "professional" ? "text-purple-500" : 
            "text-blue-500"
          }`} />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2 py-2">
          {currentPlan.features.slice(0, 3).map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" aria-hidden="true" />
              <span>{feature}</span>
            </div>
          ))}
          {currentPlan.features.length > 3 && (
            <div className="text-muted-foreground italic text-xs pt-1">
              +{currentPlan.features.length - 3} more benefits
            </div>
          )}
        </div>
        <div className="mt-4 flex items-baseline">
          {hasActiveSubscription ? (
            <span className="text-2xl font-bold">${currentPlan.price}</span>
          ) : (
            <span className="text-lg font-medium">Free Plan</span>
          )}
          {hasActiveSubscription && <span className="text-sm text-gray-500 ml-1">/month</span>}
        </div>
      </CardContent>
      <CardFooter>
        {!hasActiveSubscription || currentPlan.tier !== "premium" ? (
          <Button 
            onClick={handleUpgrade} 
            className="w-full"
            variant={hasActiveSubscription ? "outline" : "default"}
          >
            {hasActiveSubscription ? "Change Plan" : "Upgrade Now"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Premium Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrentPlanCard;
