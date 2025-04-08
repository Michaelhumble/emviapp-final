
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  CreditCard, 
  BadgeDollarSign, 
  Plus, 
  Users, 
  ExternalLink,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SalonCreditPromotion = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [credits, setCredits] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDiscountEligible, setIsDiscountEligible] = useState(false);
  
  const REGULAR_PRICE = 99.99;
  const DISCOUNT_PRICE = 49.99;
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
          setReferralCount(data.referral_count || 0);
          
          // Check if user is eligible for discount
          // Eligible if: credits >= 50 OR has referred at least one salon
          const hasEnoughCredits = (userProfile?.credits || 0) >= CREDIT_THRESHOLD;
          const hasReferredSalon = (data.referral_count || 0) > 0;
          
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
    toast.info(t("Credit purchase will be available soon!"));
  };
  
  const handleUpgrade = () => {
    toast.info(t("Pro subscription plans will be available soon!"));
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
            {t("Credit Balance & Pro Plan")}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col space-y-4">
            {/* Credit Balance */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-600">{t("Current Balance")}</p>
                <p className="text-2xl font-bold text-purple-800">{credits} {t("credits")}</p>
              </div>
              <Button 
                className="bg-white text-purple-600 hover:bg-purple-50 border border-purple-200"
                onClick={handleBuyCredits}
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-1" />
                {t("Add Credits")}
              </Button>
            </div>
            
            {/* Pro Plan Promotion */}
            <div className="relative bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 p-4 rounded-xl">
              {isDiscountEligible && (
                <div className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t("50% OFF")}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-blue-800 flex items-center">
                    Emvi Pro 
                    <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {isDiscountEligible ? t("Special Offer") : t("Premium")}
                    </span>
                  </h3>
                  
                  <div className="flex items-center mt-1">
                    <p className="text-lg font-bold text-blue-600">
                      ${isDiscountEligible ? DISCOUNT_PRICE : REGULAR_PRICE}
                      <span className="text-xs font-normal text-blue-500">/month</span>
                    </p>
                    
                    {isDiscountEligible && (
                      <p className="ml-2 text-sm line-through text-blue-400">${REGULAR_PRICE}</p>
                    )}
                  </div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs text-blue-500 mt-1 cursor-help">
                          {isDiscountEligible ? 
                            t("You qualify for the discount price!") : 
                            t("Giới thiệu thêm hoặc sử dụng tín dụng để nhận giảm giá.")}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-[200px]">
                          {t("Earn 50+ credits or refer a salon owner to qualify for our special price.")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleUpgrade}
                >
                  {t("Upgrade")}
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="flex items-center text-xs text-blue-700">
                  <div className="h-4 w-4 mr-1 rounded-full bg-blue-100 flex items-center justify-center">✓</div>
                  {t("Priority Listings")}
                </div>
                <div className="flex items-center text-xs text-blue-700">
                  <div className="h-4 w-4 mr-1 rounded-full bg-blue-100 flex items-center justify-center">✓</div>
                  {t("Unlimited Job Posts")}
                </div>
              </div>
            </div>
            
            {/* Referral Quick Info */}
            <div className="flex items-center justify-between bg-blue-50 py-2 px-3 rounded-md">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm text-blue-700">
                  {t("Your Referrals")}: <strong>{referralCount}</strong>
                </span>
              </div>
              
              {!isDiscountEligible && referralCount === 0 && (
                <Button 
                  variant="link" 
                  className="text-blue-600 p-0 h-auto text-xs"
                  onClick={() => document.getElementById('referral-card')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t("Refer to Save")} →
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalonCreditPromotion;
