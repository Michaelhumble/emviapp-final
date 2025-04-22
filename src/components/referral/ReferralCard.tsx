
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, Gift, Share2, Users } from "lucide-react";
import { useState } from "react";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { motion } from "framer-motion";

export const ReferralCard = () => {
  const { 
    referralStats, 
    referralLink, 
    referralProgress, 
    copyReferralLink, 
    loading 
  } = useReferralSystem();
  
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyReferralLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate progress to next milestone
  const progress = referralProgress?.nextMilestone 
    ? (referralStats.completedReferrals / referralProgress.nextMilestone) * 100
    : 100;

  if (loading) {
    return <div className="animate-pulse">Loading referral data...</div>;
  }

  return (
    <Card className="border-purple-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          Invite Friends & Earn Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-sm text-purple-600 mb-1">Total Referrals</div>
            <div className="text-2xl font-bold text-purple-700">
              {referralStats.completedReferrals}
            </div>
          </div>
          <div className="bg-pink-50 rounded-lg p-3">
            <div className="text-sm text-pink-600 mb-1">Credits Earned</div>
            <div className="text-2xl font-bold text-pink-700">
              {referralStats.credits}
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {referralProgress?.nextMilestone && (
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to next milestone</span>
              <span>{referralStats.completedReferrals}/{referralProgress.nextMilestone}</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {referralProgress.nextMilestoneIn} more referrals until your next reward!
            </p>
          </div>
        )}

        {/* Referral Link Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 bg-gray-50 border rounded-md text-sm"
            />
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                className={copied ? "text-green-600" : ""}
              >
                {copied ? <Gift className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Join me on EmviApp',
                      text: 'Check out EmviApp - the best platform for beauty professionals!',
                      url: referralLink
                    });
                  } else {
                    handleCopy();
                  }
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Earn <span className="font-medium text-purple-600">10 credits</span> for each friend who joins!
            Use credits for profile boosts, features, and more.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
