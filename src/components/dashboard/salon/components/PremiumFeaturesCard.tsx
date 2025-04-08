
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Star } from "lucide-react";

interface PremiumFeaturesCardProps {
  isPremium: boolean;
}

const PremiumFeaturesCard = ({ isPremium }: PremiumFeaturesCardProps) => {
  return (
    <Card className={isPremium ? "border-green-200" : "border-gray-200"}>
      <CardHeader className={isPremium ? "bg-gradient-to-r from-green-50 to-emerald-50" : ""}>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5 text-indigo-500" />
          {isPremium ? "Premium Features" : "Visibility Options"}
        </CardTitle>
        <CardDescription>
          {isPremium ? "Your premium benefits" : "Enhance your salon's visibility"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPremium ? (
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-500" />
              <span className="text-sm">Premium visibility to local customers</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-500" />
              <span className="text-sm">Locked position in your area</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-500" />
              <span className="text-sm">Targeted customer notifications</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            Boost your salon's visibility with premium features. Show your offers to more customers.
          </p>
        )}
        <Button className={`w-full ${isPremium ? "bg-green-600 hover:bg-green-700" : ""}`} asChild>
          <Link to={isPremium ? "/visibility/stats" : "/visibility/upgrade"}>
            {isPremium ? "View Statistics" : "Upgrade Visibility ($25/mo)"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PremiumFeaturesCard;
