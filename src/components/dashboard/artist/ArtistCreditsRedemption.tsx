
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CreditOptionCard from "./credits/CreditOptionCard";
import { creditOptions } from "./credits/creditOptions";
import { useAuth } from "@/context/auth";
import BoostStatusBanner from "./credits/BoostStatusBanner";
import { useProfileBoost } from "./credits/useProfileBoost";
import { useCreditRedemption } from "./credits/useCreditRedemption";
import { 
  Sparkles, 
  Gift, 
  TrendingUp, 
  Crown, 
  Zap,
  Star,
  Trophy,
  Target
} from "lucide-react";
import confetti from 'canvas-confetti';

const ArtistCreditsRedemption = () => {
  const { userProfile, refreshUserProfile } = useAuth();
  const credits = userProfile?.credits || 0;
  const [showCelebration, setShowCelebration] = useState(false);
  
  const { 
    boostStatus, 
    loading: boostLoading, 
    error: boostError,
    activateProfileBoost
  } = useProfileBoost();
  
  const {
    isProcessing,
    redeemSuccess,
    handleRedeemAction
  } = useCreditRedemption(credits, boostStatus, async () => {
    await refreshUserProfile();
    return true;
  });

  // Enhanced redemption with celebration
  const handleEnhancedRedemption = async (title: string, creditCost: number, id: string) => {
    await handleRedeemAction(title, creditCost, id);
    
    if (redeemSuccess[id]) {
      // Trigger celebration
      setShowCelebration(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
      });
      
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  // Credit tier calculations
  const creditTier = credits >= 500 ? 'premium' : credits >= 100 ? 'gold' : credits >= 50 ? 'silver' : 'bronze';
  const nextTierThreshold = credits >= 500 ? 1000 : credits >= 100 ? 500 : credits >= 50 ? 100 : 50;
  const progressToNextTier = ((credits % (nextTierThreshold/5)) / (nextTierThreshold/5)) * 100;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'from-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-400 to-orange-500';
      case 'silver': return 'from-gray-400 to-gray-600';
      default: return 'from-bronze-400 to-bronze-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium': return <Crown className="h-5 w-5" />;
      case 'gold': return <Trophy className="h-5 w-5" />;
      case 'silver': return <Star className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Premium Credits Header */}
      <Card className="border-none shadow-xl overflow-hidden">
        <div className={`bg-gradient-to-r ${getTierColor(creditTier)} p-6 text-white relative`}>
          <motion.div
            className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                >
                  {getTierIcon(creditTier)}
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold">Your Credit Empire</h2>
                  <p className="text-white/80 capitalize">{creditTier} Tier Member</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold">{credits}</div>
                <div className="text-white/80 text-sm">Available Credits</div>
              </div>
            </div>

            {/* Tier Progress */}
            <div className="bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
              <motion.div 
                className="bg-white h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextTier}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-white/80 text-sm">
              {nextTierThreshold - (credits % (nextTierThreshold/5))} credits to next tier
            </p>
          </div>
        </div>
      </Card>

      {/* Show boost status if active */}
      {boostStatus.isActive && (
        <BoostStatusBanner expiryDate={boostStatus.expiresAt} />
      )}
      
      {/* Viral Incentive Banner */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="font-semibold text-green-800">Viral Growth Boost</span>
          <Badge className="bg-green-500 text-white">🔥 Hot</Badge>
        </div>
        <p className="text-sm text-green-700 mb-3">
          Artists who boost their profiles get <strong>5x more views</strong> and <strong>3x more bookings</strong>! 
          Don't miss out on this growth opportunity.
        </p>
        <div className="flex items-center gap-2 text-xs text-green-600">
          <Sparkles className="h-3 w-3" />
          <span>✅ Instant profile visibility</span>
          <span>✅ Priority in search results</span>
          <span>✅ Featured artist badge</span>
        </div>
      </motion.div>

      {/* Credit Options Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-5 w-5 text-purple-600" />
          <h3 className="text-xl font-semibold">Redeem Your Credits</h3>
          <Badge className="bg-purple-100 text-purple-700">
            {creditOptions.length} Options Available
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creditOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CreditOptionCard
                title={option.title}
                description={option.description}
                cost={option.credits}
                icon={option.icon}
                isDisabled={
                  credits < option.credits || 
                  (option.id === 'profileBoost' && boostStatus.isActive) ||
                  isProcessing[option.id]
                }
                isProcessing={isProcessing[option.id]}
                isSuccess={redeemSuccess[option.id]}
                onRedeem={() => handleEnhancedRedemption(option.title, option.credits, option.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Celebration Popup */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 shadow-2xl z-50 max-w-sm"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-4xl mb-2"
              >
                🎉
              </motion.div>
              <h4 className="font-bold text-lg mb-1">Credits Redeemed!</h4>
              <p className="text-sm opacity-90 mb-3">
                Your boost is now active! Watch your profile soar! 🚀
              </p>
              <Button 
                size="sm" 
                variant="secondary"
                onClick={() => setShowCelebration(false)}
                className="bg-white/20 hover:bg-white/30 text-white border-none"
              >
                Awesome! ✨
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Credit Earning Tips */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Zap className="h-5 w-5" />
            Earn More Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">👥</span>
              </div>
              <h4 className="font-semibold text-blue-800 mb-1">Refer Friends</h4>
              <p className="text-sm text-blue-600">+10 credits per referral</p>
            </div>
            
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">📸</span>
              </div>
              <h4 className="font-semibold text-purple-800 mb-1">Complete Profile</h4>
              <p className="text-sm text-purple-600">+25 credits bonus</p>
            </div>
            
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-xl">⭐</span>
              </div>
              <h4 className="font-semibold text-green-800 mb-1">Client Reviews</h4>
              <p className="text-sm text-green-600">+5 credits each</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistCreditsRedemption;
