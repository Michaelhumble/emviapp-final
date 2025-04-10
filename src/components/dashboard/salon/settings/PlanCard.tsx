
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, AlertTriangle } from "lucide-react";
import { SalonPlanType } from "./types";

interface PlanCardProps {
  plan: SalonPlanType;
  isActive: boolean;
  needsUpgrade: boolean;
  onSelect: () => void;
  staffCount: number;
}

export const PlanCard = ({ 
  plan, 
  isActive, 
  needsUpgrade, 
  onSelect,
  staffCount
}: PlanCardProps) => {
  // Check if this plan would solve a staff limit issue
  const solvesProblem = needsUpgrade && staffCount <= plan.staffLimit;
  
  // Check if we're showing the free trial badge
  const showFreeTrialBadge = plan.hasTrial && !isActive;
  
  return (
    <Card className={`relative ${isActive ? 'border-primary ring-1 ring-primary' : ''} ${solvesProblem ? 'border-green-400 bg-green-50/30' : ''}`}>
      {isActive && (
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-primary hover:bg-primary">Current Plan</Badge>
        </div>
      )}
      
      {showFreeTrialBadge && (
        <div className="absolute -top-2 -left-2">
          <Badge className="bg-amber-500 hover:bg-amber-600">Free Trial</Badge>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold">${plan.price}<span className="text-base font-normal">/mo</span></p>
            <p className="text-sm text-muted-foreground">
              {plan.staffLimit === Infinity 
                ? "Unlimited staff" 
                : `Up to ${plan.staffLimit} staff`}
            </p>
          </div>
          
          <ul className="space-y-2 text-sm">
            {plan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
            {plan.features.length > 3 && (
              <li className="text-xs text-muted-foreground pl-6">
                +{plan.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={isActive ? "outline" : (solvesProblem ? "default" : "secondary")}
          className={`w-full ${solvesProblem ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
          onClick={onSelect}
          disabled={isActive}
        >
          {isActive ? (
            "Current Plan"
          ) : solvesProblem ? (
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Recommended Upgrade
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              {plan.price > 0 ? "Switch Plan" : "Select Plan"}
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
