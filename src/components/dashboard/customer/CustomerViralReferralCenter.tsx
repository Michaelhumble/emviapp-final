
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Share2, Copy, Instagram, Twitter, Facebook, MessageCircle, 
  Gift, TrendingUp, Users, Zap, CheckCircle, Fire
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CustomerViralReferralCenter = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const referralCode = userProfile?.referral_code || `BEAUTY${Math.floor(1000 + Math.random() * 9000)}`;
  const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
  const earnedCredits = 847;
  const friendsJoined = 23;
  
  const socialShares = [
    { platform: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-500", action: "Story" },
    { platform: "TikTok", icon: MessageCircle, color: "from-black to-gray-800", action: "Video" },
    { platform: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600", action: "Tweet" },
    { platform: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800", action: "Post" }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied! Share it and earn credits! 🎉");
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative"
    >
      <Card className="border-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 shadow-2xl rounded-3xl overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full"
          />
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"
          />
        </div>
        
        <CardContent className="relative z-10 p-8">
          {/* Header with FOMO */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-6 py-2 mb-4"
            >
              <Fire className="h-5 w-5 text-red-600" />
              <span className="text-red-900 font-bold text-sm">🔥 VIRAL REWARD PROGRAM</span>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-3 font-playfair">
              Invite Friends & Earn Big! 🚀
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Share EmviApp and unlock exclusive rewards. The more you share, the more you earn!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
            >
              <div className="text-3xl font-bold text-yellow-300 mb-1">{earnedCredits}</div>
              <div className="text-white/80 text-sm font-medium">Credits Earned</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
            >
              <div className="text-3xl font-bold text-pink-300 mb-1">{friendsJoined}</div>
              <div className="text-white/80 text-sm font-medium">Friends Joined</div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20"
            >
              <div className="text-3xl font-bold text-green-300 mb-1">+25</div>
              <div className="text-white/80 text-sm font-medium">Per Referral</div>
            </motion.div>
          </div>

          {/* Referral Link */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-semibold">Your Magic Link</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-xl p-3 text-gray-800 font-mono text-sm overflow-hidden">
                {referralLink}
              </div>
              <Button
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-6"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {socialShares.map((social, index) => (
              <motion.div
                key={social.platform}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className={`w-full bg-gradient-to-r ${social.color} hover:shadow-lg text-white border-0 h-12`}
                  onClick={() => toast.success(`Opening ${social.platform} share!`)}
                >
                  <social.icon className="h-4 w-4 mr-2" />
                  {social.action}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* FOMO Banner */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-red-900 font-bold">
              <Zap className="h-5 w-5" />
              <span>🔥 Limited Time: Earn 25 credits per friend (usually 10)! This exclusive rate won't last forever...</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CustomerViralReferralCenter;
