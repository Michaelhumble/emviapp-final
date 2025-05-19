
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { PricingOptions, PostType } from '@/utils/posting/types';

// Define TypeScript interface for user privileges to include missing properties
interface UserPrivileges {
  is_diamond_invited?: boolean;
  on_diamond_waitlist?: boolean;
}

export const usePostPayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const initiatePayment = async (
    postType: PostType,
    postDetails: any,
    pricingOptions: PricingOptions,
    exactUiPrice?: number
  ) => {
    try {
      console.log('Initiating payment for:', { postType, pricingOptions, exactUiPrice });
      
      setIsLoading(true);
      
      // Validate pricing data to prevent issues
      if (pricingOptions && typeof exactUiPrice !== 'undefined') {
        console.log('Using exact UI price for Stripe:', exactUiPrice);
      } else {
        console.warn('Missing exact UI price - this could cause pricing discrepancies');
      }
      
      // Handle free post case - no payment needed
      if (
        pricingOptions.selectedPricingTier === 'free' || 
        exactUiPrice === 0 || 
        (pricingOptions.selectedPricingTier === 'diamond' && await isUserDiamondEligible())
      ) {
        console.log('Free post or Diamond eligible - skipping payment');
        
        // Create the post directly without payment
        const { data: post, error } = await supabase
          .from('posts')
          .insert({
            ...postDetails,
            status: 'active',
          })
          .select()
          .single();
          
        if (error) {
          console.error('Error creating free post:', error);
          throw error;
        }
        
        return { success: true, post };
      }
      
      // For paid posts, proceed with payment
      const { data: session, error: sessionError } = await supabase.functions.invoke('create-stripe-checkout-session', {
        body: {
          price: exactUiPrice,
          success_url: `${window.location.origin}/dashboard`,
          cancel_url: window.location.href,
          metadata: {
            post_type: postType,
            post_details: JSON.stringify(postDetails),
            pricing_options: JSON.stringify(pricingOptions),
            pricing_tier: pricingOptions.selectedPricingTier
          }
        }
      });
      
      if (sessionError) {
        console.error('Error creating Stripe checkout session:', sessionError);
        toast.error('Error processing payment. Please try again.');
        return { success: false };
      }
      
      // Redirect to Stripe checkout
      window.location.href = session.url;
      
      return { success: true };
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error('Error processing payment. Please try again.');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if user is eligible for Diamond tier without payment
  const isUserDiamondEligible = async (): Promise<boolean> => {
    try {
      // Get the current authenticated user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;
      
      // Fetch user privileges
      const { data } = await supabase
        .from('users') 
        .select('*')
        .eq('id', user.id)
        .single();
      
      // Use optional chaining to safely access properties
      const privileges = data as UserPrivileges;
      
      return !!(privileges?.is_diamond_invited || privileges?.on_diamond_waitlist);
    } catch (error) {
      console.error('Error checking Diamond eligibility:', error);
      return false;
    }
  };

  return {
    initiatePayment,
    isLoading
  };
};
