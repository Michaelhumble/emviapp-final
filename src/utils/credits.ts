
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
    
    // Create support message record
    const { error: supportError } = await supabase
      .from('support_messages')
      .insert({
        supporter_id: supporterId,
        artist_id: artistId,
        credits: credits,
        message: message || null
      });
      
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
