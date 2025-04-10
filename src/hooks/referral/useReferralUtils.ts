
import { useAuth } from '@/context/auth';

export const useReferralUtils = () => {
  const { userProfile } = useAuth();
  
  const copyReferralLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const getMotivationalMessage = (referralCount: number, nextMilestoneIn: number, language = 'English') => {
    const isVietnamese = language === 'vi' || language === 'Vietnamese';
    
    if (referralCount === 0) {
      return isVietnamese 
        ? "Bắt đầu giới thiệu để nhận thưởng! Sử dụng mã của bạn."
        : "Start referring to earn rewards! Use your custom link.";
    }
    
    if (nextMilestoneIn <= 1) {
      return isVietnamese 
        ? "Chỉ còn 1 lượt giới thiệu nữa để đạt mốc tiếp theo!"
        : "Just 1 more referral to reach your next milestone!";
    }
    
    if (nextMilestoneIn <= 3) {
      return isVietnamese 
        ? `Còn ${nextMilestoneIn} lượt giới thiệu nữa để đạt mốc tiếp theo!`
        : `Only ${nextMilestoneIn} more referrals to reach your next milestone!`;
    }
    
    if (referralCount >= 1 && referralCount < 5) {
      return isVietnamese 
        ? `Bạn đã giới thiệu ${referralCount} người. Tiếp tục nào!`
        : `You've referred ${referralCount} salons so far. Keep going!`;
    }
    
    if (referralCount >= 5 && referralCount < 10) {
      return isVietnamese 
        ? "Tuyệt vời! Bạn đã đạt được cấp độ 2 của chương trình giới thiệu."
        : "Amazing! You've reached level 2 of the referral program.";
    }
    
    if (referralCount >= 10) {
      return isVietnamese 
        ? "Bạn là người giới thiệu chuyên nghiệp! Cảm ơn vì đã mở rộng cộng đồng!"
        : "You're a power referrer! Thanks for growing our community!";
    }
    
    return isVietnamese 
      ? `Còn ${nextMilestoneIn} lượt giới thiệu nữa để đạt mốc tiếp theo!`
      : `${nextMilestoneIn} more referrals to reach your next reward!`;
  };
  
  return {
    copyReferralLink,
    getMotivationalMessage,
  };
};
