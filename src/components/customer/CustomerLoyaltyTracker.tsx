
import React from "react";
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Gift } from "lucide-react";

const REWARD_MILESTONE = 100; // Example: every 100 credits earns a reward

function getNextMilestone(current: number) {
  // Shows the next multiple of 100 as next milestone
  return Math.ceil((current + 1) / REWARD_MILESTONE) * REWARD_MILESTONE;
}

const CustomerLoyaltyTracker: React.FC = () => {
  const { userProfile } = useAuth();
  const currentCredits = userProfile?.credits || 0;
  const nextMilestone = getNextMilestone(currentCredits);
  const progress = Math.min((currentCredits % REWARD_MILESTONE) / REWARD_MILESTONE * 100, 100);

  // Celebrate milestone
  const gotMilestone = currentCredits > 0 && currentCredits % REWARD_MILESTONE === 0;

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-4">
      <div className="bg-pink-50 border border-pink-100 rounded-xl shadow-sm py-4 px-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="font-semibold text-base flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Loyalty Tracker
          </div>
          <div className="text-amber-600 font-bold flex items-center gap-1">
            {gotMilestone &&
              <Sparkles className="h-5 w-5 animate-pulse text-amber-400" />}
            <span>
              {currentCredits} credit{currentCredits === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Progress value={progress} className="h-2 bg-primary/20" indicatorClassName="bg-gradient-to-r from-amber-400 via-pink-400 to-primary" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>
              {gotMilestone ? (
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-400" />Reward unlocked!
                </span>
              ) : (
                <>Next goal: Earn <b>{nextMilestone}</b> to unlock a free service!</>
              )}
            </span>
            <span>
              {progress.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoyaltyTracker;
