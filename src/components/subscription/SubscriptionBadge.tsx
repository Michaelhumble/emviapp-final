
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/context/subscription";

interface SubscriptionBadgeProps {
  className?: string;
}

const SubscriptionBadge = ({ className }: SubscriptionBadgeProps) => {
  const { currentPlan, hasActiveSubscription } = useSubscription();
  
  if (!currentPlan) return null;
  
  const getBadgeStyle = () => {
    if (!hasActiveSubscription) return "bg-gray-100 text-gray-500 hover:bg-gray-200";
    switch (currentPlan.tier) {
      case "basic":
        return "bg-blue-100 text-blue-700 hover:bg-blue-200";
      case "professional":
        return "bg-purple-100 text-purple-700 hover:bg-purple-200";
      case "premium":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-500 hover:bg-gray-200";
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`${getBadgeStyle()} ${className || ''}`}
    >
      {currentPlan.name} Plan
    </Badge>
  );
};

export default SubscriptionBadge;
