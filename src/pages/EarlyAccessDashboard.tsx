
import React, { useState } from 'react';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Star, Zap, Users, Crown } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useReferralStats } from '@/hooks/referral/useReferralStats';
import { useReferralData } from '@/hooks/referral/useReferralData';
import { useReferralUtils } from '@/hooks/referral/useReferralUtils';
import { motion } from 'framer-motion';

const EarlyAccessDashboard = () => {
  const { t } = useTranslation();
  const { referralStats, loading: statsLoading } = useReferralStats();
  const { referralLink, referrals, loading: dataLoading } = useReferralData();
  const { copyReferralLink, getMotivationalMessage } = useReferralUtils();
  
  // Calculate progress towards VIP status (mock implementation)
  const requiredReferrals = 10;
  const progress = Math.min(100, Math.round((referralStats.totalReferrals / requiredReferrals) * 100));
  const nextMilestone = Math.max(0, requiredReferrals - referralStats.totalReferrals);
  
  // Placeholder perks
  const perks = [
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      name: "Profile Boosts",
      description: "Your profile appears higher in search results",
      unlocked: progress >= 30
    },
    {
      icon: <Star className="h-5 w-5 text-purple-500" />,
      name: "Early Booking Tools",
      description: "Access to premium booking features",
      unlocked: progress >= 60
    },
    {
      icon: <Crown className="h-5 w-5 text-blue-500" />,
      name: "Premium Customizations",
      description: "Exclusive profile customization options",
      unlocked: progress >= 90
    }
  ];
  
  // Handle share functionality
  const handleShareLink = () => {
    if (referralLink) {
      copyReferralLink(referralLink);
      // You could add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-purple-50/10 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair">
            🎉 Welcome, EmviApp Pioneer!
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            You're part of an exclusive group with early access to EmviApp. Explore your perks and rewards below.
          </p>
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GradientBackground variant="artist" className="p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Your Referrals
              </h2>
              <div className="text-3xl font-bold">
                {statsLoading ? "..." : referralStats.totalReferrals}
              </div>
              <p className="text-sm text-gray-600">
                You've invited {statsLoading ? "..." : referralStats.completedReferrals} friends to join EmviApp
              </p>
              <p className="text-sm italic">
                {getMotivationalMessage(referralStats.totalReferrals, nextMilestone)}
              </p>
            </div>
          </GradientBackground>
          
          <GradientBackground variant="customer" className="p-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Gift className="mr-2 h-5 w-5" />
                EmviCredits Balance
              </h2>
              <div className="text-3xl font-bold">
                💎 {statsLoading ? "..." : referralStats.credits}
              </div>
              <p className="text-sm text-gray-600">
                Use credits for profile boosts, premium features, and special discounts
              </p>
              <p className="text-sm italic">
                Earn more by inviting friends!
              </p>
            </div>
          </GradientBackground>
        </div>
        
        {/* VIP Progress */}
        <GradientBackground variant="default" className="p-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Progress to VIP Status</h2>
            <Progress value={progress} className="h-3" indicatorClassName={`${progress >= 90 ? 'bg-amber-500' : progress >= 60 ? 'bg-purple-500' : 'bg-blue-500'}`} />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Starter</span>
              <span>VIP Member</span>
            </div>
            <p className="text-center mt-2">
              {progress < 100 ? (
                <span>{nextMilestone} more referrals to reach VIP status!</span>
              ) : (
                <span className="font-bold text-amber-600">Congratulations! You've reached VIP status!</span>
              )}
            </p>
          </div>
        </GradientBackground>
        
        {/* Perks Preview */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Exclusive Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-xl p-5 ${perk.unlocked 
                  ? 'border-emvi-accent/30 bg-white shadow-sm' 
                  : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  {perk.icon}
                  <h3 className="font-medium">{perk.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{perk.description}</p>
                
                {perk.unlocked ? (
                  <span className="inline-flex items-center mt-3 text-xs font-medium text-green-700 bg-green-100 rounded-full px-2.5 py-0.5">
                    <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-flex items-center mt-3 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
                    Lock
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Motivational Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 space-y-4"
        >
          <p className="text-lg font-medium italic">
            "The future of the beauty industry is almost here. Keep inviting friends to unlock exclusive perks!"
          </p>
          
          <Button 
            onClick={handleShareLink}
            className="bg-emvi-accent hover:bg-emvi-accent/90"
            size="lg"
          >
            Invite More Friends & Earn Rewards
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          {referralLink && (
            <div className="mt-4 text-sm text-gray-500">
              <p>Your referral link:</p>
              <div className="flex items-center justify-center mt-1">
                <div className="bg-gray-50 border rounded px-3 py-1 max-w-full overflow-hidden text-ellipsis">
                  {referralLink}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyReferralLink(referralLink)} 
                  className="ml-2"
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </motion.div>
        
        {/* Back to Home */}
        <div className="text-center pt-6">
          <Button variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccessDashboard;
