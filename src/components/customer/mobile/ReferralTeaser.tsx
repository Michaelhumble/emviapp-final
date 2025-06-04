
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Users, Gift } from "lucide-react";

const ReferralTeaser = () => {
  // Mock data - would be real in production
  const referralCount = 2;
  const nextMilestone = 5;
  const progressPercentage = (referralCount / nextMilestone) * 100;

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-4 w-4 text-indigo-600" />
        <span className="font-medium text-indigo-800">Invite Friends, Earn Credits!</span>
        <Gift className="h-4 w-4 text-amber-500" />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-indigo-700">
          <span>Friends invited: {referralCount}</span>
          <span>Next reward at {nextMilestone}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-indigo-600">
          Earn 50 credits for each friend who joins! 💰
        </p>
      </div>
    </div>
  );
};

export default ReferralTeaser;
