
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Share2, 
  Copy, 
  Gift, 
  Crown, 
  Sparkles,
  TrendingUp,
  Heart
} from 'lucide-react';
import { toast } from 'sonner';

const CustomerReferralTracker = () => {
  const referralStats = {
    invited: 3,
    target: 10,
    creditsEarned: 45,
    bonusUnlocked: false
  };

  const progressPercentage = (referralStats.invited / referralStats.target) * 100;

  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/join?ref=customer123`;
    navigator.clipboard.writeText(referralLink).then(() => {
      toast.success("Referral link copied! Share it to earn credits! ✨", {
        duration: 3000,
      });
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join me on EmviApp!',
        text: 'Discover amazing beauty services and artists. Join me on EmviApp!',
        url: `${window.location.origin}/join?ref=customer123`
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-pink-100/30 to-indigo-100/30" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/40 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/40 to-transparent rounded-full blur-xl" />
        
        {/* Shimmering border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        
        <CardContent className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">
                  Invite Friends & Earn
                </h2>
                <p className="text-gray-600 font-['Inter']">Share the beauty, earn amazing rewards</p>
              </div>
            </div>
            
            <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 px-3 py-1">
              <Crown className="h-3 w-3 mr-1" />
              {referralStats.creditsEarned} Credits Earned
            </Badge>
          </div>

          {/* Progress Section */}
          <div className="mb-6 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
            <div className="flex justify-between items-center mb-3">
              <span className="font-['Inter'] font-medium text-gray-700">Referral Progress</span>
              <span className="font-['Inter'] font-bold text-purple-700">
                {referralStats.invited} / {referralStats.target} friends
              </span>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-3 mb-3 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-pink-500 [&>div]:shadow-sm"
            />
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600 font-['Inter']">
                <TrendingUp className="h-4 w-4" />
                {referralStats.target - referralStats.invited} more for bonus reward
              </div>
              <div className="flex items-center gap-1 text-purple-600 font-['Inter'] font-semibold">
                <Gift className="h-4 w-4" />
                +50 credits waiting
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              onClick={handleCopyLink}
              className="h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-['Inter'] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy My Link
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="h-12 border-2 border-purple-200 hover:border-purple-300 text-purple-700 hover:text-purple-800 font-['Inter'] font-semibold bg-white/70 hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Now
            </Button>
          </div>

          {/* Bonus Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span className="font-['Playfair_Display'] font-semibold text-amber-800">
                Bonus Rewards Available
              </span>
            </div>
            <p className="text-amber-700 text-sm font-['Inter']">
              Invite {referralStats.target - referralStats.invited} more friends to unlock exclusive VIP perks and 50 bonus credits!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerReferralTracker;
