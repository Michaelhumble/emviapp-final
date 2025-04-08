
import { useAuth } from "@/context/auth";
import { Progress } from "@/components/ui/progress";

interface ReferralStatsProps {
  referralCount: number;
}

const ReferralStats = ({ referralCount }: ReferralStatsProps) => {
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === "Vietnamese";
  
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
            {isVietnamese ? "Số lượt giới thiệu" : "Your referrals"}
          </span>
          <span className="text-sm font-medium">
            {referralCount}/{targetReferrals}
          </span>
        </div>
        <Progress value={referralProgress} className="h-2" />
        
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              {isVietnamese ? "Đã kiếm được" : "Earned"}
            </p>
            <p className="font-medium">
              {earnedCredits} {isVietnamese ? "điểm" : "credits"}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-600">
              {isVietnamese ? "Còn lại để đạt mốc tiếp theo" : "Next milestone"}
            </p>
            <p className="font-medium">
              {targetReferrals - referralCount} {isVietnamese ? "lượt giới thiệu" : "referrals"}
            </p>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        {isVietnamese 
          ? "Mỗi người được giới thiệu thành công sẽ mang đến cho bạn 50 điểm." 
          : "Each successful referral brings you 50 Emvi credits."}
      </p>
    </>
  );
};

export default ReferralStats;
