
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useReferralStats } from './referral/useReferralStats';
import { useReferralProgress } from './referral/useReferralProgress';
import { useReferralData } from './referral/useReferralData';
import { useReferralUtils } from './referral/useReferralUtils';
import { toast } from 'sonner';

export const useReferralSystem = () => {
  const { user, userProfile } = useAuth();
  const { referralStats, loading: statsLoading } = useReferralStats();
  const referralProgress = useReferralProgress(referralStats);
  const { referralCode, referralLink, loading: dataLoading } = useReferralData();
  const { copyReferralLink, getMotivationalMessage } = useReferralUtils();
  const [copied, setCopied] = useState(false);
  
  const loading = statsLoading || dataLoading;
  
  // Function to copy referral link
  const handleCopyReferralLink = () => {
    if (referralLink) {
      copyReferralLink(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      
      // Reset copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    }
  };
  
  return {
    user,
    userProfile,
    referralStats,
    referralProgress,
    referralCode,
    referralLink,
    loading,
    copied,
    copyReferralLink: handleCopyReferralLink,
    getMotivationalMessage
  };
};
