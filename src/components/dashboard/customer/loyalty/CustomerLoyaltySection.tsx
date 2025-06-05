
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Gift, Trophy } from "lucide-react";

const CustomerLoyaltySection = () => {
  const loyaltyTier = "Gold";
  const currentPoints = 850;
  const nextTierPoints = 1000;
  const progressPercentage = (currentPoints / nextTierPoints) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Loyalty Program
          </CardTitle>
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {loyaltyTier} Status
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Progress to Platinum</span>
            <span className="font-semibold">{currentPoints} / {nextTierPoints}</span>
          </div>
          <Progress 
            value={progressPercentage}
            className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-amber-500"
          />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Gift className="h-4 w-4" />
            <span>Earn {nextTierPoints - currentPoints} more points</span>
          </div>
          <Star className="h-4 w-4 text-yellow-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerLoyaltySection;
