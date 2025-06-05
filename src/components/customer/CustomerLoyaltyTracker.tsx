
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Gift } from "lucide-react";

const CustomerLoyaltyTracker = () => {
  const loyaltyLevel = "Gold";
  const currentPoints = 850;
  const nextLevelPoints = 1000;
  const progressPercentage = (currentPoints / nextLevelPoints) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Loyalty Status
          </CardTitle>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {loyaltyLevel} Member
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next level</span>
            <span className="font-medium">{currentPoints} / {nextLevelPoints} points</span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-yellow-600"
          />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Gift className="h-4 w-4" />
          <span>{nextLevelPoints - currentPoints} points until Platinum status</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerLoyaltyTracker;
