
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralStatsProps {
  referralCount: number;
}

const ReferralStats = ({ referralCount }: ReferralStatsProps) => {
  const { t } = useTranslation();
  
  const calculateCreditsEarned = (count: number) => {
    return count * 50;
  };
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">{t("Salons Referred")}</p>
          <p className="text-2xl font-bold text-blue-600">{referralCount}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">{t("Credits Earned")}</p>
          <p className="text-2xl font-bold text-blue-600">{calculateCreditsEarned(referralCount)}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-100">
        <p className="text-sm text-center text-blue-800">
          {t("Next milestone: ")}
          <span className="font-medium">
            {referralCount < 5 ? 
              t(`${5 - referralCount} more referrals to reach Silver status`) : 
              t(`${10 - referralCount} more referrals to reach Gold status`)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ReferralStats;
