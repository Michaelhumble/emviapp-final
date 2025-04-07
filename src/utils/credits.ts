
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
    // First get the current credits
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error("Error fetching credits:", fetchError);
      return false;
    }
    
    const currentCredits = userData?.credits || 0;
    
    // Check if user has enough credits
    if (currentCredits < amount) {
      return false;
    }
    
    // Deduct credits from the user's account
    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: currentCredits - amount })
      .eq('id', userId);
      
    if (updateError) {
      console.error("Error deducting credits:", updateError);
      return false;
    }
    
    // Log the activity
    await supabase.from('activity_log').insert({
      user_id: userId,
      activity_type: 'credit_spent',
      description: reason,
      metadata: { credits: amount, action: reason }
    });
    
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
