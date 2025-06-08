
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReferralSystem } from '@/hooks/useReferralSystem';
import { Users, Sparkles, Clipboard, Link, CheckCircle2, Trophy, TrendingUp, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

const ReferralWidget = () => {
  const { referralStats, referralProgress, referralLink, copyReferralLink, copied } = useReferralSystem();
  const [showAchievement, setShowAchievement] = useState(false);
  const [pulseRewards, setPulseRewards] = useState(false);

  // Simulate viral metrics
  const [viralMetrics] = useState({
    todayJoins: 2,
    weeklyGrowth: 15,
    socialShares: 8,
    isStreaking: true,
    leaderboardRank: 12
  });

  // Achievement celebration effect
  useEffect(() => {
    if (referralStats.completedReferrals > 0 && referralStats.completedReferrals % 5 === 0) {
      setShowAchievement(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
      });
      setTimeout(() => setShowAchievement(false), 3000);
    }
  }, [referralStats.completedReferrals]);

  // Pulse effect for rewards
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseRewards(true);
      setTimeout(() => setPulseRewards(false), 1000);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle copy with viral feedback
  const handleCopy = () => {
    copyReferralLink();
    
    // Random viral encouragement messages
    const messages = [
      "🚀 Link copied! Share it everywhere!",
      "💎 Spread the magic! Your friends will thank you!",
      "⚡ Copy successful! Time to grow your empire!",
      "🎯 Link ready! Watch your network explode!"
    ];
    
    toast.success(messages[Math.floor(Math.random() * messages.length)]);
  };

  // Calculate streak bonus
  const streakBonus = viralMetrics.isStreaking ? referralStats.completedReferrals * 2 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Premium Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-6 text-white relative overflow-hidden">
          <motion.div
            className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{ 
              scale: pulseRewards ? [1, 1.3, 1] : 1,
              opacity: pulseRewards ? [0.3, 0.8, 0.3] : 0.3
            }}
            transition={{ duration: 2 }}
          />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="h-7 w-7 text-yellow-300" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold">Viral Growth Engine</h3>
                <p className="text-purple-100 text-sm">Build your beauty empire</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {viralMetrics.isStreaking && (
                <Badge className="bg-orange-400 text-orange-900 border-none animate-pulse">
                  🔥 {referralStats.completedReferrals} Day Streak
                </Badge>
              )}
              <Badge className="bg-white/20 text-white border-none">
                #{viralMetrics.leaderboardRank} This Week
              </Badge>
            </div>
          </div>

          {/* Viral Stats Grid */}
          <div className="grid grid-cols-4 gap-3 mt-4 relative z-10">
            <motion.div 
              className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Users className="h-4 w-4 mx-auto mb-1 text-blue-300" />
              <div className="text-lg font-bold">{referralStats.completedReferrals}</div>
              <div className="text-xs text-white/80">Total Invited</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <TrendingUp className="h-4 w-4 mx-auto mb-1 text-green-300" />
              <div className="text-lg font-bold">{viralMetrics.todayJoins}</div>
              <div className="text-xs text-white/80">Today</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Zap className="h-4 w-4 mx-auto mb-1 text-yellow-300" />
              <div className="text-lg font-bold">{referralStats.credits + streakBonus}</div>
              <div className="text-xs text-white/80">Credits</div>
            </motion.div>
            
            <motion.div 
              className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Trophy className="h-4 w-4 mx-auto mb-1 text-orange-300" />
              <div className="text-lg font-bold">+{viralMetrics.weeklyGrowth}%</div>
              <div className="text-xs text-white/80">Growth</div>
            </motion.div>
          </div>

          {/* Progress to Next Milestone */}
          <div className="mt-4 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/90">Next Milestone Reward</span>
              <span className="text-sm font-medium">
                {referralStats.completedReferrals}/{referralProgress?.nextMilestone || 5}
              </span>
            </div>
            <Progress 
              value={(referralProgress?.percentage || 0)} 
              className="h-3 bg-white/20" 
            />
            <motion.p 
              className="mt-2 text-sm text-white/80"
              animate={pulseRewards ? { scale: [1, 1.05, 1] } : {}}
            >
              {referralProgress?.nextMilestoneIn > 0 
                ? `🎁 ${referralProgress.nextMilestoneIn} more for +50 credits bonus!`
                : "🏆 Milestone reached! Claim your reward!"}
            </motion.p>
          </div>

          {/* Referral Link */}
          <div className="mt-4 relative z-10">
            <div className="flex gap-2">
              <div className="bg-white/10 rounded-lg p-3 flex-1 truncate border border-white/20 text-sm backdrop-blur-sm">
                {referralLink}
              </div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="secondary" 
                  className="bg-white hover:bg-white/90 text-purple-600 px-4"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Live Activity</span>
              </div>
              <p className="text-sm text-green-600">
                {viralMetrics.todayJoins} artists joined from your links today! 🎉
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-700">Your Impact</span>
              </div>
              <p className="text-sm text-purple-600">
                You've helped {referralStats.completedReferrals * 3} artists grow their business! 💪
              </p>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div 
            className="mt-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200 text-center"
            whileHover={{ scale: 1.01 }}
          >
            <h4 className="font-semibold text-orange-800 mb-1">Ready to Explode Your Network? 🚀</h4>
            <p className="text-sm text-orange-600 mb-3">
              Share your link on Instagram, TikTok, or with friends and watch your empire grow!
            </p>
            <Button 
              onClick={handleCopy}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Link className="h-4 w-4 mr-2" />
              Copy & Share Now
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Achievement Popup */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-4 shadow-2xl z-50"
          >
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-300" />
              <div>
                <h4 className="font-bold">Achievement Unlocked! 🎉</h4>
                <p className="text-sm opacity-90">You're building an amazing network!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReferralWidget;
