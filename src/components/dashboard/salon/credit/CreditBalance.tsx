
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface CreditBalanceProps {
  credits: number;
  handleBuyCredits: () => void;
  loading?: boolean;
}

const CreditBalance = ({ credits, handleBuyCredits, loading = false }: CreditBalanceProps) => {
  const { t } = useTranslation();
  
  return (
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
  );
};

export default CreditBalance;
