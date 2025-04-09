
/**
 * Utility hook for referral system operations
 */
export const useReferralUtils = () => {
  // Function to copy the referral link to clipboard
  const copyReferralLink = async (link: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(link);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };
  
  // Get a motivational message based on referral count
  const getMotivationalMessage = (
    referralCount: number,
    nextMilestoneIn: number,
    preferredLanguage: string
  ): string => {
    // Vietnamese translations
    if (preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese') {
      if (referralCount === 0) {
        return 'Bắt đầu bằng việc giới thiệu bạn bè đầu tiên của bạn!';
      } else if (nextMilestoneIn === 1) {
        return 'Chỉ còn 1 giới thiệu nữa để đạt cột mốc tiếp theo!';
      } else {
        return `Còn ${nextMilestoneIn} giới thiệu nữa để đạt đến cột mốc tiếp theo!`;
      }
    }
    
    // Default English
    if (referralCount === 0) {
      return 'Get started by making your first referral!';
    } else if (nextMilestoneIn === 1) {
      return 'Just 1 more referral to reach your next milestone!';
    } else {
      return `${nextMilestoneIn} more referrals until your next milestone!`;
    }
  };
  
  return {
    copyReferralLink,
    getMotivationalMessage
  };
};
