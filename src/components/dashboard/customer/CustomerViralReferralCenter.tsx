
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Copy, Users, DollarSign, Crown, Zap, Gift, Sparkles, TrendingUp, Heart, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CustomerViralReferralCenter = () => {
  const { referralStats, referralLink, copyReferralLink, copied } = useReferralSystem();
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();

  const handleShare = async () => {
    if (!referralLink) return;
    
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me on EmviApp!",
          text: "Discover amazing beauty services and earn rewards together! 💄✨",
          url: referralLink,
        });
        toast.success("Shared successfully! 🎉");
      } else {
        copyReferralLink();
        toast.success("Link copied to clipboard! Share it everywhere! 🚀");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        copyReferralLink();
        toast.success("Link copied to clipboard! Share it everywhere! 🚀");
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="space-y-6">
      {/* Main Viral Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="relative border-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 shadow-2xl rounded-3xl overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse" />
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-white rounded-full animate-pulse delay-500" />
          </div>
          
          <CardContent className="relative p-8 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-6 py-2 mb-4">
                <Crown className="h-5 w-5 text-white" />
                <span className="text-white font-bold">VIRAL REWARDS CENTER</span>
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-4 font-playfair">
                Share & Unlock Exclusive Rewards! 🔥
              </h2>
              
              <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed">
                Share EmviApp with friends and unlock exclusive credits, VIP bonuses, and special rewards! No limits, pure viral rewards. 💰
              </p>
            </motion.div>

            {/* Stats Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{referralStats?.completedReferrals || 0}</div>
                <div className="text-white/80 text-sm">Friends Joined</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{referralStats?.credits || 0}</div>
                <div className="text-white/80 text-sm">Credits Earned</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{referralStats?.totalReferrals || 0}</div>
                <div className="text-white/80 text-sm">Total Invites</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleShare}
                disabled={isSharing}
                className="bg-white text-orange-600 hover:bg-white/90 font-bold py-4 px-8 rounded-2xl text-lg shadow-xl transform transition-all hover:scale-105"
              >
                <Share2 className="h-6 w-6 mr-2" />
                {isSharing ? "Sharing..." : "Share My Link"}
              </Button>
              
              <Button
                onClick={copyReferralLink}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-2xl text-lg"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-6 w-6 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Referral Link Display */}
      {referralLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-gray-800">Your Personal Invite Link</h3>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <code className="text-sm text-gray-700 font-mono flex-1 truncate mr-4">
                  {referralLink}
                </code>
                <Button
                  onClick={copyReferralLink}
                  size="sm"
                  variant="outline"
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Reward Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="border-0 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <h3 className="text-xl font-bold text-purple-800">Unlock More Rewards</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-bold text-gray-800">1 Friend</div>
                <div className="text-sm text-gray-600">Starter Bonus</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <div className="font-bold text-gray-800">5 Friends</div>
                <div className="text-sm text-gray-600">VIP Status</div>
              </div>
              <div className="text-center p-4 bg-white/60 rounded-xl">
                <Crown className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="font-bold text-gray-800">10+ Friends</div>
                <div className="text-sm text-gray-600">Diamond Tier</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerViralReferralCenter;
