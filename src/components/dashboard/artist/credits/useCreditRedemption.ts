
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { BoostStatus } from './useProfileBoost';

interface ProcessingState {
  [key: string]: boolean;
}

interface SuccessState {
  [key: string]: boolean;
}

export function useCreditRedemption(
  credits: number,
  boostStatus: BoostStatus,
  onSuccess: () => Promise<boolean>
) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState<ProcessingState>({});
  const [redeemSuccess, setRedeemSuccess] = useState<SuccessState>({});

  const handleRedeemAction = useCallback(async (
    actionName: string,
    creditCost: number,
    actionId: string
  ) => {
    if (!user) {
      toast.error('You must be logged in to redeem credits');
      return;
    }

    if (credits < creditCost) {
      toast.error(`You need ${creditCost} credits for this action. You have ${credits} credits.`);
      return;
    }

    if (actionId === 'profileBoost' && boostStatus.isActive) {
      toast.info('Your profile is already boosted!');
      return;
    }

    try {
      // Mark as processing
      setIsProcessing(prev => ({ ...prev, [actionId]: true }));
      setRedeemSuccess(prev => ({ ...prev, [actionId]: false }));

      // Call the appropriate API based on action ID
      let success = false;

      if (actionId === 'profileBoost') {
        // Call redeem credits function on the server
        const { data, error } = await supabase.functions.invoke('redeem-credits', {
          body: {
            action: 'profile_boost',
            credits: creditCost,
            userId: user.id
          }
        });

        if (error) throw error;
        success = data?.success || false;
      } else if (actionId === 'featuredPosition') {
        // Call redeem credits function for featured position
        const { data, error } = await supabase.functions.invoke('redeem-credits', {
          body: {
            action: 'featured_position',
            credits: creditCost,
            userId: user.id
          }
        });

        if (error) throw error;
        success = data?.success || false;
      } else {
        // Generic credit redemption
        const { error } = await supabase
          .from('customer_credits')
          .insert({
            user_id: user.id,
            action_type: `redemption_${actionId}`,
            value: -creditCost,
            description: `Redeemed for ${actionName}`
          });

        if (error) throw error;
        
        // Update user's credits count
        const { error: updateError } = await supabase
          .from('users')
          .update({
            credits: credits - creditCost,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) throw updateError;
        
        success = true;
      }

      if (success) {
        toast.success(`Successfully redeemed ${creditCost} credits for ${actionName}!`);
        setRedeemSuccess(prev => ({ ...prev, [actionId]: true }));
        
        // Call the onSuccess callback to refresh user data
        await onSuccess();
      } else {
        throw new Error('Redemption was not successful');
      }
    } catch (error) {
      console.error(`Error redeeming credits for ${actionId}:`, error);
      toast.error(`Failed to redeem credits for ${actionName}. Please try again.`);
    } finally {
      setIsProcessing(prev => ({ ...prev, [actionId]: false }));
    }
  }, [user, credits, boostStatus, onSuccess]);

  return {
    isProcessing,
    redeemSuccess,
    handleRedeemAction
  };
}
