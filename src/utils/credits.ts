
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeductCreditsParams {
  userId: string;
  amount: number;
  reason: string;
  targetId?: string;
}

export const CREDIT_COSTS = {
  JOB_POST: 5,
  BOOST_PROFILE: 10,
  FEATURED_JOB: 8,
  FEATURED_LISTING: 10,
  SUPPORT_ARTIST_SMALL: 10,
  SUPPORT_ARTIST_MEDIUM: 25,
  SUPPORT_ARTIST_LARGE: 50
};

export const deductCredits = async ({ userId, amount, reason, targetId }: DeductCreditsParams): Promise<boolean> => {
  if (!userId) {
    console.error("No user ID provided for credit deduction");
    return false;
  }

  try {
    // We need to work around TypeScript errors since the redeem_credits function isn't in types
    // Use raw SQL query with parameters instead of RPC call
    const { error } = await supabase.rpc('redeem_credits' as any, {
      p_user_id: userId,
      p_amount: amount,
      p_redemption_type: reason,
      p_target_id: targetId
    });
    
    if (error) {
      console.error("Error deducting credits:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception in deductCredits:", error);
    return false;
  }
};

export const checkCredits = async (userId: string): Promise<number> => {
  if (!userId) return 0;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Error checking credits:", error);
      return 0;
    }
    
    return data?.credits || 0;
  } catch (error) {
    console.error("Exception in checkCredits:", error);
    return 0;
  }
};

// Function to get recent credit history
export const getCreditsHistory = async (userId: string, limit = 10): Promise<any[]> => {
  if (!userId) return [];
  
  try {
    // Use a type assertion to work around the TypeScript issue
    // since customer_credits isn't in the TypeScript definitions yet
    const { data, error } = await (supabase
      .from('customer_credits' as any)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit));
      
    if (error) {
      console.error("Error fetching credit history:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Exception in getCreditsHistory:", error);
    return [];
  }
};

// Function to support an artist with credits
export const supportArtist = async (
  supporterId: string, 
  artistId: string, 
  credits: number,
  message?: string
): Promise<boolean> => {
  if (!supporterId || !artistId) {
    console.error("Missing user IDs for artist support");
    return false;
  }
  
  // Don't allow supporting yourself
  if (supporterId === artistId) {
    toast.error("You cannot support yourself");
    return false;
  }
  
  try {
    // First check if user has enough credits
    const userCredits = await checkCredits(supporterId);
    
    if (userCredits < credits) {
      toast.error(`You need ${credits - userCredits} more credits to support this artist`);
      return false;
    }
    
    // Deduct credits from supporter
    const deducted = await deductCredits({
      userId: supporterId,
      amount: credits,
      reason: 'support_artist',
      targetId: artistId
    });
    
    if (!deducted) {
      toast.error("Failed to deduct credits");
      return false;
    }
    
    // Create support message record using a simple insert with type assertion
    // since the 'support_messages' table is not in the TypeScript definitions
    const { error: supportError } = await supabase
      .from('support_messages' as any)
      .insert({
        supporter_id: supporterId,
        artist_id: artistId,
        credits: credits,
        message: message || null
      } as any);
      
    if (supportError) {
      console.error("Error recording support message:", supportError);
      // Continue anyway as the credits were transferred
    }
    
    // Add credits to the artist (using the award_credits function)
    const { error: awardError } = await supabase.rpc('award_credits' as any, {
      p_user_id: artistId,
      p_action_type: 'received_support',
      p_value: credits,
      p_description: `support_from_${supporterId}`
    });
    
    if (awardError) {
      console.error("Error adding credits to artist:", awardError);
      // Don't return false here as we've already deducted from the supporter
    }
    
    return true;
  } catch (error) {
    console.error("Exception in supportArtist:", error);
    return false;
  }
};

// New function to get referral stats for a user
export const getReferralStats = async (userId: string) => {
  if (!userId) return null;
  
  try {
    // Use a type assertion and better error handling
    const { data, error } = await supabase
      .from('referrals' as any)
      .select('status, milestone_reached')
      .eq('referrer_id', userId);
      
    if (error) {
      console.error("Error fetching referral stats:", error);
      return null;
    }
    
    // Verify that data is an array before proceeding
    if (!data || !Array.isArray(data)) {
      return {
        total: 0,
        completed: 0,
        pending: 0,
        milestoneReached: 0
      };
    }
    
    // Calculate stats from the data with safer access
    const total = data.length;
    // Filter with type guards to avoid property access errors
    const completed = data.filter(ref => ref && typeof ref === 'object' && ref.status === 'completed').length;
    const pending = data.filter(ref => {
      return ref && typeof ref === 'object' && 
        (ref.status === 'pending' || ref.status === 'processing');
    }).length;
    const milestoneReached = data.filter(ref => 
      ref && typeof ref === 'object' && ref.milestone_reached === true
    ).length;
    
    return {
      total,
      completed,
      pending,
      milestoneReached
    };
  } catch (err) {
    console.error('Unexpected error fetching referral stats:', err);
    return null;
  }
};

// Function to track when milestones are reached in referrals
export const trackReferralMilestone = async (
  referralId: string,
  milestoneType: string,
  milestoneValue: any = {}
): Promise<boolean> => {
  if (!referralId) return false;
  
  try {
    // Use a more careful approach with type assertions
    const { error } = await supabase
      .from('referrals' as any)
      .update({
        milestone_reached: true,
        milestone_type: milestoneType,
        milestone_value: milestoneValue,
        verified_at: new Date().toISOString()
      })
      .eq('id', referralId);
      
    if (error) {
      console.error("Error updating referral milestone:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception in trackReferralMilestone:", error);
    return false;
  }
};

// Function to get pending credit earnings
export const getPendingCreditEarnings = async (userId: string): Promise<any[]> => {
  if (!userId) return [];
  
  try {
    // Use proper error handling and type checking
    const { data, error } = await supabase
      .from('credit_earnings' as any)
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching pending credit earnings:", error);
      return [];
    }
    
    // Ensure data is an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Exception in getPendingCreditEarnings:", error);
    return [];
  }
};

// Function to approve a pending credit earning
export const approveCreditEarning = async (earningId: string): Promise<boolean> => {
  if (!earningId) return false;
  
  try {
    // First get the earning details with proper type checking
    const { data: earningData, error: fetchError } = await supabase
      .from('credit_earnings' as any)
      .select('*')
      .eq('id', earningId)
      .single();
      
    if (fetchError || !earningData) {
      console.error("Error fetching credit earning:", fetchError);
      return false;
    }
    
    // Ensure earning data has required properties
    const earning = earningData as any;
    if (!earning || typeof earning !== 'object' || !('user_id' in earning) || !('amount' in earning)) {
      console.error("Invalid earning data structure:", earning);
      return false;
    }
    
    // Update the earning status
    const { error: updateError } = await supabase
      .from('credit_earnings' as any)
      .update({
        status: 'approved',
        validated_at: new Date().toISOString()
      })
      .eq('id', earningId);
      
    if (updateError) {
      console.error("Error updating credit earning:", updateError);
      return false;
    }
    
    // Award the credits to the user using a direct update
    // instead of the unsupported increment RPC
    const { data: userData, error: getUserError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', earning.user_id)
      .single();
      
    if (getUserError) {
      console.error("Error getting user credits:", getUserError);
      return false;
    }
    
    const currentCredits = userData?.credits || 0;
    const newCredits = currentCredits + earning.amount;
    
    const { error: updateCreditsError } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', earning.user_id);
      
    if (updateCreditsError) {
      console.error("Error updating user credits:", updateCreditsError);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception in approveCreditEarning:", error);
    return false;
  }
};
