
import { Plus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreditBalanceProps {
  credits: number;
  handleBuyCredits: () => void;
  loading?: boolean;
}

const CreditBalance = ({ credits, handleBuyCredits, loading = false }: CreditBalanceProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm text-purple-600">{t("Current Balance")}</p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                    <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs">
                    {t("Credits can be used for boosting your salon, featuring job listings, and accessing premium tools.")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-2xl font-bold text-purple-800">
            {credits} 
            <span className="ml-1 text-sm font-medium">{t("credits")}</span>
          </p>
        </div>
      </div>
      <Button 
        className="bg-white text-purple-600 hover:bg-purple-50 border border-purple-200 shadow-sm"
        onClick={handleBuyCredits}
        disabled={loading}
      >
        <Plus className="h-4 w-4 mr-1" />
        {t("Add Credits")}
      </Button>
    </div>
  );
};

export default CreditBalance;
