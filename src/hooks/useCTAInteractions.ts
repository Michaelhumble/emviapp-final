
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useCTAInteractions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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
      const { error } = await supabase
        .from('cta_interactions')
        .insert({
          user_id: user.id,
          cta_type: ctaType,
          story_id: storyId || null,
          metadata: metadata || {}
        });

      if (error) throw error;

      // Show appropriate success message based on CTA type
      switch (ctaType) {
        case 'vote_now':
          toast.success('Vote recorded successfully!');
          break;
        case 'enter_contest':
          toast.success('Contest entry submitted!');
          break;
        case 'apply_now':
          toast.success('Application submitted!');
          break;
        case 'join_waitlist':
          toast.success('Added to waitlist!');
          break;
        case 'upgrade_premium':
          toast.success('Upgrade request noted!');
          break;
        default:
          toast.success('Action completed!');
      }

      return true;
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
