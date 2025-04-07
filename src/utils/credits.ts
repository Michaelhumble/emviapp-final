
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeductCreditsParams {
  userId: string;
  amount: number;
  reason: string;
}

export const CREDIT_COSTS = {
  JOB_POST: 5,
  BOOST_PROFILE: 10,
  FEATURED_JOB: 8,
  FEATURED_LISTING: 10
};

export const deductCredits = async ({ userId, amount, reason }: DeductCreditsParams): Promise<boolean> => {
  if (!userId) {
    console.error("No user ID provided for credit deduction");
    return false;
  }

  try {
    // Use our new SQL function to deduct credits
    const { error } = await supabase.rpc('redeem_credits', {
      p_user_id: userId,
      p_amount: amount,
      p_redemption_type: reason
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
    const { data, error } = await supabase
      .from('customer_credits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
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
