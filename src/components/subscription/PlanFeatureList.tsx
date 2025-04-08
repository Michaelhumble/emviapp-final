
import { Check, AlertCircle } from "lucide-react";
import { useSubscription } from "@/context/subscription";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlanFeatureListProps {
  features: string[];
  premiumFeatures?: string[];
}

const PlanFeatureList = ({ features, premiumFeatures = [] }: PlanFeatureListProps) => {
  const { hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  
  const handleUpgrade = () => {
    navigate("/checkout");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Included in your plan</h3>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {!hasActiveSubscription && premiumFeatures.length > 0 && (
        <div className="pt-2">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="flex flex-col space-y-4">
              <div>
                <h3 className="text-sm font-medium text-amber-800 mb-2">Premium features available with paid plans:</h3>
                <ul className="space-y-2 text-sm">
                  {premiumFeatures.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-700">{feature}</span>
                    </li>
                  ))}
                  {premiumFeatures.length > 3 && (
                    <li className="text-xs italic text-amber-600">+{premiumFeatures.length - 3} more premium features</li>
                  )}
                </ul>
              </div>
              <Button onClick={handleUpgrade} size="sm" className="w-full sm:w-auto">
                Upgrade Now
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default PlanFeatureList;
