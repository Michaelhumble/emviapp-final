
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Gift, Users, Trophy, Flame, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CustomerViralReferralCenter = () => {
  const [referralCode] = useState("BEAUTY2024");
  const [referralStats] = useState({
    totalReferred: 8,
    creditsEarned: 240,
    nextReward: 50
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`Join EmviApp with my code: ${referralCode} and get 50% off your first booking!`);
    toast.success("Referral message copied! Share it everywhere! 🚀");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join EmviApp - Premium Beauty Platform',
        text: `Use my code ${referralCode} for 50% off your first booking!`,
        url: `https://emviapp.com/join?ref=${referralCode}`
      });
    } else {
      handleCopyCode();
    }
  };

  const rewards = [
    { count: 1, reward: "$10 credit", icon: Gift, unlocked: true },
    { count: 3, reward: "$25 credit", icon: Star, unlocked: true },
    { count: 5, reward: "$50 credit", icon: Trophy, unlocked: true },
    { count: 10, reward: "$100 credit + VIP status", icon: Flame, unlocked: false }, // Using Flame instead of Fire
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-2 mb-4"
        >
          <Flame className="h-5 w-5 text-orange-600" /> {/* Using Flame instead of Fire */}
          <span className="text-orange-800 font-semibold">Viral Referral Center</span>
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          Turn Your Friends Into Credits! 💰
        </h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Every friend you refer earns you credits AND makes you look like the beauty insider who knows all the best spots
        </p>
      </div>

      {/* Main Referral Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                🎯 Your Personal Referral Code
              </h3>
              
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-4 mb-4">
                <div className="text-3xl font-bold tracking-wider">
                  {referralCode}
                </div>
                <p className="text-purple-100 text-sm mt-1">
                  Each friend gets 50% off • You get $25 credit
                </p>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Now
                </Button>
                
                <Button
                  onClick={handleCopyCode}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">{referralStats.totalReferred}</div>
                <div className="text-white/90 text-sm">Friends Joined</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">${referralStats.creditsEarned}</div>
                <div className="text-white/90 text-sm">Credits Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{referralStats.nextReward}</div>
                <div className="text-white/90 text-sm">Next Reward</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rewards Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Referral Rewards Ladder
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rewards.map((reward, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    reward.unlocked
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <reward.icon className={`h-5 w-5 ${
                      reward.unlocked ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    {reward.unlocked && (
                      <Badge className="bg-green-100 text-green-700">
                        Unlocked!
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    {reward.count} Friend{reward.count > 1 ? 's' : ''}
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    {reward.reward}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Sharing Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-xl rounded-2xl">
          <CardContent className="p-6 text-center text-white">
            <h3 className="text-xl font-bold mb-3">
              🚀 Become a Beauty Influencer
            </h3>
            
            <p className="text-white/90 mb-4">
              Share on your story, post in beauty groups, tell your squad - every share could earn you $25!
            </p>
            
            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                📸 Share to Instagram Story
              </Button>
              
              <Button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                💬 Post in Beauty Groups
              </Button>
              
              <Button
                onClick={handleShare}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                👯‍♀️ Text Your Squad
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerViralReferralCenter;
