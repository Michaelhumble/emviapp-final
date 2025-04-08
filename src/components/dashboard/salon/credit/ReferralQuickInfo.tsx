
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralQuickInfoProps {
  referralCount: number;
  isDiscountEligible: boolean;
}

const ReferralQuickInfo = ({ referralCount, isDiscountEligible }: ReferralQuickInfoProps) => {
  const { t } = useTranslation();
  
  return (
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
  );
};

export default ReferralQuickInfo;
