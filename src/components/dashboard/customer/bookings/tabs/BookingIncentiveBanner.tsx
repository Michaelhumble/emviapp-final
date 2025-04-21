
import React from "react";
import { Button } from "@/components/ui/button";
import { Gift, Award } from "lucide-react";

interface BookingIncentiveBannerProps {
  currentCredits?: number;
}

const getCreditsToNextReward = (currentCredits?: number) => {
  if (typeof currentCredits !== "number") return null;
  const nextMilestone = Math.ceil((currentCredits + 1) / 100) * 100;
  return nextMilestone - currentCredits;
};

const BookingIncentiveBanner: React.FC<BookingIncentiveBannerProps> = ({
  currentCredits = 0,
}) => {
  const creditsToNext = getCreditsToNextReward(currentCredits);
  const showMilestone = creditsToNext !== null && creditsToNext <= 20 && creditsToNext > 0;

  return (
    <div className="w-full flex flex-col items-center gap-3 mt-8 mb-2 px-2">
      {showMilestone && (
        <div className="w-full bg-gradient-to-r from-purple-100 to-pink-50 border border-purple-200/40 rounded-lg py-3 px-4 flex items-center gap-2 shadow-sm">
          <Award className="h-6 w-6 text-purple-400" />
          <span className="text-sm text-purple-700 font-medium">
            🎯 You're only {creditsToNext} credits away from your next reward! Let’s make it happen.
          </span>
        </div>
      )}

      {/* Soft suggestion section */}
      <div className="w-full bg-white border border-gray-100 rounded-xl shadow-sm px-5 py-5 mb-2 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <span className="font-serif font-semibold text-base text-gray-700 text-center">
            Need help finding your next beauty appointment?
          </span>
          <span className="text-sm text-gray-500 mb-2 text-center">
            We’ll help you book with confidence — and earn rewards while doing it.
          </span>
          <Button 
            asChild 
            variant="default" 
            className="rounded-full font-semibold px-7 py-2 mb-1 text-base shadow-none bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <a href="/explore/artists">Browse Artists</a>
          </Button>
        </div>
      </div>

      {/* Friendly upsell box */}
      <div className="w-full flex items-center gap-2 justify-center bg-pink-50 border border-pink-100 rounded-lg py-2 px-3 mt-1 mb-2">
        <Gift className="h-5 w-5 text-pink-400 mr-1" />
        <span className="text-xs text-pink-700 font-medium">
          🎁 Book 3 more times this month to unlock a surprise reward.
        </span>
      </div>
    </div>
  );
};

export default BookingIncentiveBanner;
