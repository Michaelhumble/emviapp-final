
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { Share2, Gift, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralTeaser = () => {
  const navigate = useNavigate();
  const { referralStats, referralProgress, loading } = useReferralSystem();

  const handleInviteFriends = () => {
    // Navigate to referral center or open share modal
    navigate('/dashboard/customer?tab=referrals');
  };

  if (loading) {
    return (
      <div className="px-4 py-3 border-b border-gray-100 animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const progressPercentage = referralProgress?.percentage || 0;
  const nextMilestone = referralProgress?.nextMilestone || 3;
  const currentReferrals = referralStats?.completedReferrals || 0;

  return (
    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-emerald-100 rounded-full">
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Invite Friends, Earn Credits!</h4>
            <p className="text-xs text-gray-600">+10 credits per friend</p>
          </div>
        </div>
        <Gift className="h-5 w-5 text-emerald-500" />
      </div>

      {/* Progress to next milestone */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">
            {currentReferrals} of {nextMilestone} friends invited
          </span>
          <span className="text-xs font-medium text-emerald-600">
            {nextMilestone - currentReferrals} more for bonus!
          </span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-emerald-400 to-green-500"
        />
      </div>

      <Button 
        onClick={handleInviteFriends}
        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
        size="sm"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Invite Friends Now
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      {currentReferrals > 0 && (
        <div className="text-center mt-2">
          <span className="text-xs text-emerald-700 font-medium">
            🎉 You've earned {currentReferrals * 10} credits from referrals!
          </span>
        </div>
      )}
    </div>
  );
};

export default ReferralTeaser;
