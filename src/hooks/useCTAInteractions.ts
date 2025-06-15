
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useVoting } from './useVoting';
import { useContests } from './useContests';
import { useApplications } from './useApplications';
import { useWaitlist } from './useWaitlist';
import { toast } from 'sonner';

export const useCTAInteractions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { submitVote } = useVoting();
  const { enterContest } = useContests();
  const { submitApplication } = useApplications();
  const { joinWaitlist } = useWaitlist();

  const handleCTAClick = async (
    type: string, 
    targetId?: string, 
    metadata?: Record<string, any>
  ) => {
    if (!user) {
      toast.error('Please sign in to continue');
      return false;
    }

    setIsLoading(true);
    let success = false;

    try {
      switch (type) {
        case 'vote_now':
          success = await submitVote(targetId || '', 'community_poll');
          break;
        case 'enter_contest':
          success = await enterContest(targetId || '', metadata);
          break;
        case 'apply_now':
          success = await submitApplication('community_feature', targetId, metadata);
          break;
        case 'join_waitlist':
          success = await joinWaitlist('premium_features', metadata);
          break;
        case 'upgrade_premium':
          // Handle premium upgrade
          toast.success('Redirecting to premium upgrade...');
          success = true;
          break;
        default:
          toast.error('Unknown action type');
          break;
      }
    } catch (error) {
      console.error('Error handling CTA click:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }

    return success;
  };

  return {
    handleCTAClick,
    isLoading
  };
};
