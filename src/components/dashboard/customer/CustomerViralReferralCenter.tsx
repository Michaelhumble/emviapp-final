
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle2, Share2, Gift, Users, Flame, Sparkles, DollarSign, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CustomerViralReferralCenter = () => {
  const { 
    referralStats, 
    referralCode, 
    referralLink, 
    copyReferralLink, 
    copied,
    nextMilestone 
  } = useReferralSystem();
  
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    if (navigator.share && referralLink) {
      try {
        await navigator.share({
          title: 'Join EmviApp - Get $50 Free Credits!',
          text: 'I found the best beauty platform! Join with my link and we both get $50 in free credits 💰✨',
          url: referralLink,
        });
        toast.success("Shared successfully! 🎉");
      } catch (error) {
        // Fallback to copy
        copyReferralLink();
      }
    } else {
      copyReferralLink();
    }
    
    setTimeout(() => setIsSharing(false), 1000);
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleEditProfile = () => {
    navigate("/profile/edit");
  };

  return (
    <div className="space-y-6">
      {/* Main Viral Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="relative border-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl rounded-3xl overflow-hidden">
          {/* Floating Elements */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 text-white/50" />
            </motion.div>
          </div>
          
          <CardContent className="p-8 text-center relative">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-white" />
              <h2 className="text-3xl font-bold text-white">
                🔥 VIRAL REWARDS CENTER 🔥
              </h2>
              <Trophy className="h-8 w-8 text-white" />
            </div>
            
            <p className="text-white/90 text-lg font-medium mb-6 max-w-2xl mx-auto">
              Share EmviApp with friends and earn <span className="font-bold">$50 FREE CREDITS</span> for every person who joins! 
              No limits, pure cash rewards! 💰
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{referralStats?.total_referrals || 0}</div>
                <div className="text-white/80 text-sm font-medium">Friends Joined</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">${referralStats?.total_earnings || 0}</div>
                <div className="text-white/80 text-sm font-medium">Earned</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">{nextMilestone || 10}</div>
                <div className="text-white/80 text-sm font-medium">Next Bonus</div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={copyReferralLink}
                disabled={copied}
                className="bg-white text-orange-600 hover:bg-white/90 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                    Copied! 🎉
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5 mr-2" />
                    Copy My Link
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleShare}
                disabled={isSharing}
                className="bg-purple-600 text-white hover:bg-purple-700 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
              >
                {isSharing ? (
                  <>
                    <Sparkles className="h-5 w-5 mr-2 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 className="h-5 w-5 mr-2" />
                    Share & Earn $50
                  </>
                )}
              </Button>
            </div>

            {/* Referral Code Display */}
            {referralCode && (
              <div className="mt-6 bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                <p className="text-white/80 text-sm mb-2">Your Referral Code:</p>
                <p className="text-white font-bold text-xl tracking-wider">{referralCode}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Share2,
            title: "1. Share Your Link",
            description: "Send your unique link to friends on social media, text, or email",
            color: "from-blue-500 to-indigo-500"
          },
          {
            icon: Users,
            title: "2. Friends Join",
            description: "When they sign up with your link, they get $25 and you get $50!",
            color: "from-green-500 to-emerald-500"
          },
          {
            icon: DollarSign,
            title: "3. Earn Together",
            description: "Use credits for bookings, treatments, or cash out anytime",
            color: "from-purple-500 to-pink-500"
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Profile Update CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Card className="border-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="h-6 w-6 text-white" />
              <h3 className="text-xl font-bold text-white">
                💎 Complete Your Profile for 2x Earnings!
              </h3>
              <Flame className="h-6 w-6 text-white" />
            </div>
            
            <p className="text-white/90 font-medium mb-4">
              Members with complete profiles earn double referral rewards and get priority booking access
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button 
                onClick={handleEditProfile}
                className="bg-white text-purple-600 hover:bg-white/90 font-bold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              
              <Button 
                onClick={handleViewProfile}
                variant="ghost"
                className="text-white border border-white/30 hover:bg-white/10 font-medium px-6 py-2 rounded-full"
              >
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CustomerViralReferralCenter;
