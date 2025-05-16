
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralStatsProps {
  referralCount: number;
}

const ReferralStats = ({ referralCount }: ReferralStatsProps) => {
  const { userProfile } = useAuth();
  const { t, isVietnamese } = useTranslation();
  
  // Progress calculation (assuming target is 10 referrals)
  const targetReferrals = 10;
  const referralProgress = Math.min(referralCount / targetReferrals * 100, 100);
  
  // Amount needed to reach next milestone
  const creditsPerReferral = 50;
  const earnedCredits = referralCount * creditsPerReferral;
  
  return (
    <>
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">
            {t({
              english: "Your referrals",
              vietnamese: "Số lượt giới thiệu"
            })}
          </span>
          <span className="text-sm font-medium">
            {referralCount}/{targetReferrals}
          </span>
        </div>
        <Progress value={referralProgress} className="h-2" />
        
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              {t({
                english: "Earned", 
                vietnamese: "Đã kiếm được"
              })}
            </p>
            <p className="font-medium">
              {earnedCredits} {t({
                english: "credits", 
                vietnamese: "điểm"
              })}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-600">
              {t({
                english: "Next milestone", 
                vietnamese: "Còn lại để đạt mốc tiếp theo"
              })}
            </p>
            <p className="font-medium">
              {targetReferrals - referralCount} {t({
                english: "referrals", 
                vietnamese: "lượt giới thiệu"
              })}
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        {t({
          english: "Each successful referral brings you 50 Emvi credits.", 
          vietnamese: "Mỗi người được giới thiệu thành công sẽ mang đến cho bạn 50 điểm."
        })}
      </p>
    </>
  );
};

export default ReferralStats;
