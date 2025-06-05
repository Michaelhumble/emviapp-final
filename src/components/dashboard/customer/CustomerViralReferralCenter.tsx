
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Share2, Copy, CheckCircle2, Sparkles, Crown, Star, Zap } from "lucide-react";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CustomerViralReferralCenter = () => {
  const { userProfile } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = userProfile?.referral_code || userProfile?.id?.substring(0, 8) || "EMVI2024";
  const referralLink = `https://emviapp.com/join?ref=${referralCode}`;
  const credits = userProfile?.credits ?? 145;
  const referralCount = userProfile?.referral_count ?? 7;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("🎉 Link copied! Share it and earn credits!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join me on EmviApp! 💅✨",
        text: "I'm loving EmviApp for finding amazing beauty services. Join me and we both get rewards!",
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-pink-400/20 to-purple-400/20 rounded-3xl blur-xl" />
      
      <Card className="relative border-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1">
            <Crown className="h-4 w-4 mr-1" />
            VIP MEMBER
          </Badge>
        </div>

        <CardContent className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg"
            >
              <Gift className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Invite Friends & Earn Big! 🚀
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Share EmviApp with friends and unlock exclusive rewards. The more you share, the more you earn!
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 text-purple-600 mr-2" />
                <span className="text-3xl font-bold text-purple-600">{credits}</span>
              </div>
              <p className="text-sm font-medium text-purple-700">Credits Earned</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-pink-600 mr-2" />
                <span className="text-3xl font-bold text-pink-600">{referralCount}</span>
              </div>
              <p className="text-sm font-medium text-pink-700">Friends Joined</p>
            </motion.div>
            
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-2">
                <Zap className="h-6 w-6 text-orange-600 mr-2" />
                <span className="text-3xl font-bold text-orange-600">+25</span>
              </div>
              <p className="text-sm font-medium text-orange-700">Per Referral</p>
            </motion.div>
          </div>

          {/* Referral Link Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
              🔗 Your Magic Link
            </h3>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 px-4 py-3 font-mono text-sm text-gray-700 overflow-hidden">
                {referralLink}
              </div>
              
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleCopy}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleShare}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share with Friends
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-2 border-gradient-to-r from-pink-300 to-purple-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 py-4 rounded-xl"
                onClick={() => toast.info("Invite by email coming soon! 📧")}
              >
                <Gift className="h-5 w-5 mr-2" />
                Invite by Email
              </Button>
            </motion.div>
          </div>

          {/* FOMO Message */}
          <div className="mt-6 text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <p className="text-sm font-medium text-orange-800">
              🔥 <span className="font-bold">Limited Time:</span> Earn 25 credits per friend (usually 10)! 
              This exclusive rate won't last forever...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerViralReferralCenter;
