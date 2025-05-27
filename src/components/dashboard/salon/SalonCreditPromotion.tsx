
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import CreditBalance from "./credit/CreditBalance";
import ProPlanOffer from "./credit/ProPlanOffer";
import ReferralQuickInfo from "./credit/ReferralQuickInfo";

const SalonCreditPromotion = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [credits, setCredits] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDiscountEligible, setIsDiscountEligible] = useState(false);
  
  const CREDIT_THRESHOLD = 50;
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch credits from user profile
        setCredits(userProfile?.credits || 0);
        
        // Fetch referral count
        const { data, error } = await supabase
          .rpc('get_user_referral_stats', { user_id: user.id });
        
        if (!error && data) {
          // Get the first element if data is an array, otherwise use data directly
          const statsObject = Array.isArray(data) ? data[0] : data;
          setReferralCount(statsObject.referral_count || 0);
          
          // Check if user is eligible for discount
          // Eligible if: credits >= 50 OR has referred at least one salon
          const hasEnoughCredits = (userProfile?.credits || 0) >= CREDIT_THRESHOLD;
          const hasReferredSalon = statsObject.referral_count > 0;
          
          setIsDiscountEligible(hasEnoughCredits || hasReferredSalon);
        }
      } catch (err) {
        console.error("Error fetching credit promotion data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, userProfile]);
  
  const handleBuyCredits = () => {
    toast.info(t({ english: "Credit purchase will be available soon!", vietnamese: "Tính năng mua credit sẽ sớm có sẵn!" }));
  };
  
  const handleUpgrade = () => {
    toast.info(t({ english: "Pro subscription plans will be available soon!", vietnamese: "Gói đăng ký Pro sẽ sớm có sẵn!" }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card className="border-purple-100 overflow-hidden">
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500/10 to-transparent w-32 h-32 -z-0" />
        
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
            {t({ english: "Credit Balance & Pro Plan", vietnamese: "Số Dư Credit & Gói Pro" })}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* Credit Balance Component */}
            <CreditBalance 
              credits={credits} 
              handleBuyCredits={handleBuyCredits} 
              loading={loading}
            />
            
            {/* Pro Plan Offer Component */}
            <ProPlanOffer 
              isDiscountEligible={isDiscountEligible} 
              handleUpgrade={handleUpgrade}
            />
            
            {/* Referral Quick Info Component */}
            <ReferralQuickInfo 
              referralCount={referralCount}
              isDiscountEligible={isDiscountEligible}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonCreditPromotion;
