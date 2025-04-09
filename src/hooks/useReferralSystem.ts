
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useReferralData } from './referral/useReferralData';
import { useReferralStats } from './referral/useReferralStats';
import { useReferralProgress } from './referral/useReferralProgress';
import { useReferralUtils } from './referral/useReferralUtils';
import { ReferralData, ReferralStats, ReferralProgress } from '@/components/referral/types';

export const useReferralSystem = () => {
  const { user, userRole } = useAuth();
  const { loading: dataLoading, referralCode, referralLink, referrals } = useReferralData();
  const { loading: statsLoading, referralStats } = useReferralStats();
  const referralProgress = useReferralProgress(referralStats);
  const { copyReferralLink, getMotivationalMessage } = useReferralUtils();
  const [copied, setCopied] = useState(false);
  
  const handleCopyReferralLink = () => {
    copyReferralLink(referralLink)
      .then((success) => {
        if (success) {
          setCopied(true);
          toast.success('Referral link copied to clipboard!');
          setTimeout(() => setCopied(false), 3000);
        } else {
          toast.error('Failed to copy link. Please try again.');
        }
      });
  };

  const getReferralMessage = (preferred_language: string = 'English') => {
    return getMotivationalMessage(
      referralStats.completedReferrals,
      referralProgress.nextMilestoneIn,
      preferred_language
    );
  };
  
  return {
    loading: dataLoading || statsLoading,
    referralCode,
    referralLink,
    referralStats,
    referralProgress,
    referrals,
    copied,
    copyReferralLink: handleCopyReferralLink,
    getMotivationalMessage: getReferralMessage,
  };
};
