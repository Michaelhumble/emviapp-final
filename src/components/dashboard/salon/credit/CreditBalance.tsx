
import { BadgeDollarSign, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { createTranslation } from "../SalonTranslationHelper";

interface CreditBalanceProps {
  credits: number;
  handleBuyCredits: () => void;
  loading: boolean;
}

const CreditBalance = ({ credits, handleBuyCredits, loading }: CreditBalanceProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-purple-700 font-medium">
            {t(createTranslation(
              "Your Credit Balance",
              "Số Dư Credit Của Bạn"
            ))}
          </p>
          <div className="flex items-center space-x-1">
            <BadgeDollarSign className="h-5 w-5 text-purple-600" />
            <span className="text-2xl font-bold text-purple-800">
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                credits
              )}
            </span>
            <span className="text-sm text-purple-700">
              {t(createTranslation(
                "credits",
                "credit"
              ))}
            </span>
          </div>
        </div>
        <Button 
          onClick={handleBuyCredits}
          className="bg-white hover:bg-blue-50 text-blue-600 border border-blue-200"
          disabled={loading}
        >
          {t(createTranslation(
            "Buy Credits",
            "Mua Credit"
          ))}
        </Button>
      </div>
    </div>
  );
};

export default CreditBalance;
