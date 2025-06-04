
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

const MysteryRewardClaim = () => {
  const [hasClaimed, setHasClaimed] = useState(false);
  
  // Mock logic - would check real reward status
  const hasUnclaimedReward = !hasClaimed;

  const handleClaim = () => {
    setHasClaimed(true);
    toast.success("🎉 Mystery reward claimed! +25 credits added!");
  };

  if (!hasUnclaimedReward) return null;

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span className="font-medium text-amber-800">Mystery Reward!</span>
        </div>
        <Button 
          size="sm" 
          onClick={handleClaim}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          <Gift className="h-3 w-3 mr-1" />
          Claim
        </Button>
      </div>
      <p className="text-xs text-amber-700 mt-1">
        You've earned a special reward! 🎁
      </p>
    </div>
  );
};

export default MysteryRewardClaim;
