
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useVoting } from './useVoting';
import { useContests } from './useContests';
import { useApplications } from './useApplications';
import { useWaitlist } from './useWaitlist';
import { useQuestions } from './useQuestions';

export const useCTAInteractions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { submitVote } = useVoting();
  const { enterContest } = useContests();
  const { submitApplication } = useApplications();
  const { joinWaitlist } = useWaitlist();
  const { askQuestion } = useQuestions();

  const handleCTAClick = async (
    ctaType: string, 
    storyId?: string, 
    metadata?: Record<string, any>
  ) => {
    if (!user) {
      toast.error('Please sign in to interact with posts');
      return false;
    }

    setIsLoading(true);
    
    try {
      // Record the interaction first
      const { error } = await supabase
        .from('cta_interactions')
        .insert({
          user_id: user.id,
          cta_type: ctaType,
          story_id: storyId || null,
          metadata: metadata || {}
        });

      if (error) throw error;

      // Handle specific CTA actions
      let actionResult = true;
      
      switch (ctaType) {
        case 'vote_now':
          if (storyId) {
            actionResult = await submitVote(storyId, 'community_story');
          } else if (metadata?.targetId && metadata?.targetType) {
            actionResult = await submitVote(metadata.targetId, metadata.targetType);
          }
          break;
          
        case 'enter_contest':
          // Use the first active contest for demo purposes
          const contestId = metadata?.contestId || 'demo-contest';
          actionResult = await enterContest(contestId, metadata);
          break;
          
        case 'apply_now':
          // Handle different application types
          if (metadata?.applicationType === 'community_question') {
            // This will be handled by the QuestionModal component
            actionResult = true;
          } else if (metadata?.applicationType === 'browse_qa') {
            // This will be handled by the QABrowserModal component
            actionResult = true;
          } else {
            actionResult = await submitApplication(
              metadata?.applicationType || 'general_application',
              storyId,
              metadata
            );
          }
          break;
          
        case 'join_waitlist':
          actionResult = await joinWaitlist(
            metadata?.waitlistType || 'premium_features',
            metadata
          );
          break;
          
        case 'upgrade_premium':
          // For now, just show success message - Stripe integration would go here
          toast.success('Premium upgrade request noted! Our team will contact you soon.');
          break;
          
        default:
          toast.success('Action completed!');
      }

      return actionResult;
    } catch (error) {
      console.error('Error recording CTA interaction:', error);
      toast.error('Failed to complete action. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCTAClick,
    isLoading
  };
};
