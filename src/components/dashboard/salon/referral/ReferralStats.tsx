
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralStatsProps {
  referralCount: number;
}

const ReferralStats = ({ referralCount }: ReferralStatsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-blue-50 rounded-md">
      <div>
        <p className="text-sm font-medium text-blue-700">{t("Your Referrals")}</p>
        <p className="text-xs text-blue-500">{t("Earn 20 credits per successful referral")}</p>
      </div>
      <div className="bg-white py-1 px-3 rounded-full text-blue-600 font-medium border border-blue-100">
        {referralCount}
      </div>
    </div>
  );
};

export default ReferralStats;
