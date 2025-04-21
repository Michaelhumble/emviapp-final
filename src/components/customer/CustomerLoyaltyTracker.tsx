
import React from "react";
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Gift } from "lucide-react";

const REWARD_MILESTONE = 100;

function getNextMilestone(current: number) {
  return Math.ceil((current + 1) / REWARD_MILESTONE) * REWARD_MILESTONE;
}

const CustomerLoyaltyTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const currentCredits = userProfile?.credits || 0;
  const nextMilestone = getNextMilestone(currentCredits);
  const progress = Math.min((currentCredits % REWARD_MILESTONE) / REWARD_MILESTONE * 100, 100);
  const gotMilestone = currentCredits > 0 && currentCredits % REWARD_MILESTONE === 0;

  return (
    <div className="w-full max-w-xl mx-auto my-3 sm:my-4 px-0 sm:px-4">
      <div className="bg-pink-50 border border-pink-100 rounded-xl shadow-sm py-4 px-3 sm:px-5 flex flex-col gap-3">
        <div className="flex flex-col xs:flex-row items-center justify-between gap-1 xs:gap-2">
          <div className="font-semibold text-base sm:text-lg flex items-center gap-2 mb-2 xs:mb-0">
            <Gift className="h-5 w-5 text-primary" />
            Loyalty Tracker
          </div>
          <div className="text-amber-600 font-bold flex items-center gap-1 text-base lg:text-lg">
            {gotMilestone &&
              <Sparkles className="h-5 w-5 animate-pulse text-amber-400" />}
            <span>
              {currentCredits} credit{currentCredits === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Progress value={progress} className="h-3 bg-primary/20 min-w-0" indicatorClassName="bg-gradient-to-r from-amber-400 via-pink-400 to-primary" />
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500">
            <span>
              {gotMilestone ? (
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-400" />Reward unlocked!
                </span>
              ) : (
                <>Next goal: <span className="font-bold text-gray-700">{nextMilestone}</span> to unlock a free service!</>
              )}
            </span>
            <span className="text-xs sm:text-sm font-semibold">{progress.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoyaltyTracker;
