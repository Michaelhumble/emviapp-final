
export const useReferralUtils = () => {
  const copyReferralLink = async (link: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (error) {
      console.error('Failed to copy referral link:', error);
      return false;
    }
  };

  const getMotivationalMessage = (
    completedReferrals: number, 
    nextMilestoneIn: number,
    language: string = 'English'
  ): string => {
    // Messages for English language
    if (language === 'English' || language === 'en') {
      if (completedReferrals === 0) {
        return "Start sharing your referral link to earn rewards!";
      } else if (nextMilestoneIn === 0) {
        return "Congratulations! You've reached a new milestone!";
      } else if (nextMilestoneIn === 1) {
        return "You're just 1 referral away from the next level!";
      } else if (nextMilestoneIn <= 3) {
        return `Almost there! Only ${nextMilestoneIn} more referrals to level up.`;
      } else {
        return `You've referred ${completedReferrals} people. Keep sharing!`;
      }
    }
    // Messages for Vietnamese language
    else if (language === 'Vietnamese' || language === 'vi') {
      if (completedReferrals === 0) {
        return "Hãy bắt đầu chia sẻ link giới thiệu để kiếm phần thưởng!";
      } else if (nextMilestoneIn === 0) {
        return "Chúc mừng! Bạn đã đạt cột mốc mới!";
      } else if (nextMilestoneIn === 1) {
        return "Bạn chỉ cần 1 lượt giới thiệu nữa để lên cấp!";
      } else if (nextMilestoneIn <= 3) {
        return `Sắp đạt được rồi! Chỉ cần thêm ${nextMilestoneIn} lượt giới thiệu để lên cấp.`;
      } else {
        return `Bạn đã giới thiệu ${completedReferrals} người. Hãy tiếp tục chia sẻ!`;
      }
    }
    // Default to English for other languages
    else {
      return `You've referred ${completedReferrals} people. Keep going!`;
    }
  };

  return {
    copyReferralLink,
    getMotivationalMessage
  };
};
