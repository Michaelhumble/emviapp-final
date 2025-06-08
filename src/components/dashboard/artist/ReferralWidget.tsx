
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Copy, Share2, Users, TrendingUp, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";

const ReferralWidget = () => {
  const [referralCode] = useState("ARTIST2024");
  const [referralStats] = useState({
    totalReferrals: 12,
    thisMonth: 4,
    earnings: 240,
    pending: 80
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`https://emviapp.com/join?ref=${referralCode}`);
    toast.success("Referral link copied! Share it everywhere! 🚀", {
      duration: 3000,
    });
  };

  const handleShare = () => {
    const shareText = `Join me on EmviApp and get your beauty business discovered! Use my code: ${referralCode} 💄✨`;
    
    if (navigator.share) {
      navigator.share({
        title: "Join EmviApp with my referral!",
        text: shareText,
        url: `https://emviapp.com/join?ref=${referralCode}`
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Share message copied! 📋");
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Gift className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Referral Rewards</CardTitle>
              <p className="text-sm text-gray-600">Earn $20 for each artist you invite!</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{referralStats.totalReferrals}</span>
            </div>
            <p className="text-xs text-gray-600">Total Referrals</p>
          </div>
          
          <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">${referralStats.earnings}</span>
            </div>
            <p className="text-xs text-gray-600">Total Earned</p>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Your Referral Code:</p>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-white rounded-lg border-2 border-dashed border-purple-300">
              <p className="font-mono text-center font-bold text-purple-600">{referralCode}</p>
            </div>
            <Button
              onClick={handleCopyCode}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share on Social Media
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50">
              Instagram
            </Button>
            <Button variant="outline" className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50">
              Facebook
            </Button>
            <Button variant="outline" className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50">
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Motivational Message */}
        <motion.div 
          className="text-center p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <p className="text-sm font-semibold text-purple-700">Share & Earn More!</p>
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-xs text-gray-600">
            The more artists you invite, the stronger our community becomes! 💪✨
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ReferralWidget;
