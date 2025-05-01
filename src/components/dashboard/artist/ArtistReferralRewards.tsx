
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useReferralSystem } from "@/hooks/useReferralSystem";
import { useAuth } from "@/context/auth";

const ArtistReferralRewards = () => {
  const { t } = useTranslation();
  const { referralStats, loading } = useReferralSystem();
  const { userProfile } = useAuth();
  
  // Calculate estimated credits from referrals (placeholder logic)
  const creditsFromReferrals = referralStats?.completedReferrals * 5 || 0;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const confettiVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: { 
      scale: 1, 
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-8"
    >
      <Card className="backdrop-blur-sm bg-white/90 border border-purple-100 shadow-sm overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Confetti emoji animation */}
          <motion.div 
            className="absolute top-4 right-4 text-2xl"
            variants={confettiVariants}
          >
            🎉
          </motion.div>
          
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">
              <Gift className="h-5 w-5 text-purple-600" />
            </div>
            
            <div className="flex-1">
              <motion.h3 
                className="text-lg font-medium mb-1"
                variants={itemVariants}
              >
                {t("Your Referral Rewards")}
              </motion.h3>
              
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-purple-50 rounded-lg p-3 flex flex-col">
                    <span className="text-sm text-purple-600 font-medium">
                      {t("Credits Earned")}
                    </span>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-purple-700">
                        {creditsFromReferrals}
                      </span>
                      <span className="text-xs ml-1 text-purple-500 font-medium">
                        {t("credits")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 rounded-lg p-3 flex flex-col">
                    <span className="text-sm text-indigo-600 font-medium">
                      {t("Successful Invites")}
                    </span>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-indigo-700">
                        {referralStats?.completedReferrals || 0}
                      </span>
                      <span className="text-xs ml-1 text-indigo-500 font-medium">
                        {t("friends")}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>
                    {t("Every referral helps grow EmviApp 💖")}
                  </span>
                </div>
                
                <Button className="w-full" asChild>
                  <Link to="/referrals">
                    {t("View Referral History")}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistReferralRewards;
