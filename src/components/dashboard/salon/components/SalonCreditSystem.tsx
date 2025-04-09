
import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Coins, TrendingUp, CreditCard, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SalonCreditSystemProps {
  credits: number;
  onBuyCredits: () => void;
  onBoostVisibility: () => void;
}

const SalonCreditSystem = ({ 
  credits, 
  onBuyCredits,
  onBoostVisibility
}: SalonCreditSystemProps) => {
  const { t } = useTranslation();
  const [creditUsage, setCreditUsage] = useState({
    thisMonth: 0,
    total: 0
  });
  
  useEffect(() => {
    // Mock data for now, would be fetched from backend in production
    setCreditUsage({
      thisMonth: Math.floor(Math.random() * 20),
      total: Math.floor(Math.random() * 100) + 20
    });
  }, []);
  
  return (
    <Card className="overflow-hidden border-blue-100 shadow-md">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-0 text-white">
          <div className="p-6 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-medium text-white/90 flex items-center gap-2">
                {t("Credit Balance")}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-white/70 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>{t("Credits can be used to boost job posts, increase visibility, and access premium features.")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              
              <p className="text-3xl font-bold mt-1 flex items-center">
                <Coins className="h-6 w-6 mr-2 text-amber-300" />
                {credits}
                <span className="ml-2 text-sm text-white/70">{t("credits")}</span>
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={onBuyCredits}
                className="bg-white text-blue-600 hover:bg-blue-50"
                size="lg"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {t("Buy Credits")}
              </Button>
              
              <Button 
                onClick={onBoostVisibility}
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                size="lg"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {t("Boost Visibility")}
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-b from-blue-600/20 to-indigo-900/30 px-6 py-4 text-sm border-t border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <motion.div 
                className="bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm"
                whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <p className="text-white/70">{t("Job Post Boost")}</p>
                <p className="text-lg font-semibold">10 {t("credits")}</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm"
                whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <p className="text-white/70">{t("Profile Highlight")}</p>
                <p className="text-lg font-semibold">15 {t("credits")}</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 px-4 py-3 rounded-lg backdrop-blur-sm"
                whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <p className="text-white/70">{t("Featured in Search")}</p>
                <p className="text-lg font-semibold">25 {t("credits")}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCreditSystem;
