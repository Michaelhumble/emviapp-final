
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface SalonCreditBalanceProps {
  credits: number;
  handleBuyCredits: () => void;
}

const SalonCreditBalance = ({ credits, handleBuyCredits }: SalonCreditBalanceProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden border border-blue-100">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-white/90">{t("Credit Balance")}</h3>
              <p className="text-3xl font-bold mt-1 flex items-baseline">
                <Coins className="h-5 w-5 mr-2 opacity-80" />
                {credits}
                <span className="ml-2 text-sm opacity-75">{t("credits")}</span>
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleBuyCredits}
                className="bg-white text-blue-600 hover:bg-blue-50"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                {t("Buy Credits")}
              </Button>
              
              <Button 
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                size="sm"
                onClick={() => window.location.href = "/boost/salon"}
              >
                <ArrowUpRight className="h-4 w-4 mr-1" />
                {t("Boost Visibility")}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gradient-to-b from-blue-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">{t("Daily Ad Reach")}</p>
              <p className="text-xl font-semibold text-blue-800">+38%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("Visibility Score")}</p>
              <p className="text-xl font-semibold text-blue-800">74/100</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{t("Boost Status")}</p>
              <motion.p 
                className="text-xl font-semibold text-blue-800"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {credits > 0 ? t("Active") : t("Inactive")}
              </motion.p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCreditBalance;
