
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Share2, DollarSign, Users, Award, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/auth";

const ArtistReferralCenter = () => {
  const { user, userProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  const [referralGoal, setReferralGoal] = useState(10);
  const [currentProgress, setCurrentProgress] = useState(0);
  
  // Generate a referral link based on user ID
  const referralLink = user ? `https://emviapp.com/ref/${user.id?.substring(0, 8)}` : "https://emviapp.com/join";
  
  // Set referral data
  const referrals = userProfile?.referral_count || 0;
  const earnings = referrals * 5; // $5 per referral
  
  // Calculate progress percentage
  useEffect(() => {
    const percentage = Math.min(100, Math.round((referrals / referralGoal) * 100));
    
    // Animate progress
    const timer = setTimeout(() => {
      setCurrentProgress(percentage);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [referrals, referralGoal]);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Reward tiers
  const rewardTiers = [
    { count: 3, reward: "Free Boost (3 Days)", unlocked: referrals >= 3 },
    { count: 5, reward: "$25 Profile Credit", unlocked: referrals >= 5 },
    { count: 10, reward: "Premium Badge", unlocked: referrals >= 10 }
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-4">
        <CardTitle className="text-xl font-serif flex items-center">
          <Users className="h-5 w-5 text-purple-600 mr-2" />
          Referral Center
        </CardTitle>
        <CardDescription>
          Invite friends and earn rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-purple-100"
        >
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-purple-900">Earn while you share</h4>
              <p className="text-xs text-purple-700 mt-1">
                Get $5 for each friend who joins EmviApp using your link and becomes a verified artist.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium">Your Referral Link</label>
          <div className="flex space-x-2">
            <Input value={referralLink} readOnly className="font-mono text-sm" />
            <Button onClick={handleCopy} variant="outline" className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Referral Goal Progress</span>
            <span className="text-sm">{referrals}/{referralGoal}</span>
          </div>
          <Progress value={currentProgress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
        
        <div className="py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-purple-500 mr-1.5" />
              <span className="text-sm font-medium">Reward Tiers</span>
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-2 rounded-lg border ${
                  tier.unlocked 
                    ? 'bg-purple-50 border-purple-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                    tier.unlocked ? 'bg-purple-100 text-purple-700' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tier.count}
                  </div>
                  <span className={`text-sm ${tier.unlocked ? 'font-medium' : ''}`}>
                    {tier.reward}
                  </span>
                </div>
                {tier.unlocked && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-center">
            <p className="text-xs text-indigo-700 mb-1">Total Referrals</p>
            <AnimatePresence mode="wait">
              <motion.p 
                key={referrals}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="font-bold text-xl text-indigo-900"
              >
                {referrals}
              </motion.p>
            </AnimatePresence>
            {referrals > 0 && (
              <span className="text-xs flex justify-center items-center text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                People joined via your link
              </span>
            )}
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-center">
            <p className="text-xs text-purple-700 mb-1">Earnings</p>
            <AnimatePresence mode="wait">
              <motion.p 
                key={earnings}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="font-bold text-xl text-purple-900"
              >
                ${earnings}
              </motion.p>
            </AnimatePresence>
            <span className="text-xs text-purple-600 mt-1">Lifetime earnings</span>
          </div>
        </div>
        
        <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
          <Share2 className="h-4 w-4 mr-1.5" />
          Share Your Link
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistReferralCenter;
