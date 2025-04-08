
export const useReferralUtils = () => {
  const copyReferralLink = (referralLink: string): Promise<boolean> => {
    return navigator.clipboard.writeText(referralLink)
      .then(() => true)
      .catch((err) => {
        console.error('Failed to copy link:', err);
        return false;
      });
  };

  const getMotivationalMessage = (
    completedReferrals: number,
    nextMilestoneIn: number,
    preferred_language: string = 'English'
  ): string => {
    const isVietnamese = preferred_language?.toLowerCase() === 'vietnamese' || preferred_language?.toLowerCase() === 'tiếng việt';
    
    if (nextMilestoneIn <= 1) {
      return isVietnamese ? 'Gần tới phần thưởng rồi!' : 'Almost there!';
    } else if (completedReferrals === 0) {
      return isVietnamese ? 'Mời bạn bè và nhận thưởng từ Emvi!' : 'Invite friends and earn rewards from Emvi!';
    } else {
      const message = isVietnamese 
        ? `Bạn đã giới thiệu ${completedReferrals} người. Chỉ cần thêm ${nextMilestoneIn} để mở khóa phần thưởng!`
        : `You've referred ${completedReferrals} friends. Just ${nextMilestoneIn} more to unlock a bonus reward!`;
      return message;
    }
  };
  
  return {
    copyReferralLink,
    getMotivationalMessage,
  };
};
