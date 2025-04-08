
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Credit cost constants
export const CREDIT_COSTS = {
  BOOST_ARTIST_PROFILE: 20,
  FEATURED_LISTING: 10,
  SEND_DIRECT_MESSAGE: 5,
  PREMIUM_SEARCH: 2,
  EARLY_ACCESS: 15,
  // Add the missing constants
  SUPPORT_ARTIST_SMALL: 10,
  SUPPORT_ARTIST_MEDIUM: 25,
  SUPPORT_ARTIST_LARGE: 50,
  JOB_POST: 0 // Free for now
};

export interface CreditHistoryItem {
  id: string;
  user_id: string;
  created_at: string;
  action_type: string;
  value: number;
  description: string;
}

export interface CreditFormattedItem {
  id: string;
  date: Date;
  action: string;
  description: string;
  value: number;
  action_type: string;
}

// Get a user's current credit balance
export const checkCredits = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error checking credits:', error);
      return 0;
    }
    
    return data?.credits || 0;
  } catch (err) {
    console.error('Error in checkCredits:', err);
    return 0;
  }
};

// Deduct credits from a user's account
export const deductCredits = async ({ 
  userId, 
  amount, 
  reason 
}: { 
  userId: string; 
  amount: number; 
  reason: string; 
}): Promise<boolean> => {
  try {
    // First check if user has enough credits
    const currentCredits = await checkCredits(userId);
    
    if (currentCredits < amount) {
      toast.error("Not enough credits");
      return false;
    }
    
    // Begin transaction to update credits and add to activity log
    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: currentCredits - amount })
      .eq('id', userId);
    
    if (updateError) {
      console.error('Error deducting credits:', updateError);
      return false;
    }
    
    // Log the credit usage
    const { error: logError } = await supabase
      .from('customer_credits')
      .insert({
        user_id: userId,
        action_type: 'deduction',
        value: -amount,
        description: reason
      });
    
    if (logError) {
      console.error('Error logging credit usage:', logError);
      // Credits were still deducted, so return true
    }
    
    return true;
  } catch (err) {
    console.error('Error in deductCredits:', err);
    return false;
  }
};

// Get credit history for a user
export const getCreditsHistory = async (userId: string, limit: number = 10): Promise<CreditFormattedItem[]> => {
  try {
    const { data, error } = await supabase
      .from('customer_credits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching credit history:', error);
      return [];
    }
    
    return (data || []).map((item: CreditHistoryItem) => ({
      id: item.id,
      date: new Date(item.created_at),
      action: getActionLabel(item.action_type),
      description: item.description || '',
      value: item.value,
      action_type: item.action_type
    }));
  } catch (err) {
    console.error('Error in getCreditsHistory:', err);
    return [];
  }
};

// Helper function to get user-friendly labels for credit actions
const getActionLabel = (actionType: string): string => {
  const actionMap: Record<string, string> = {
    'referral': 'Referral Bonus',
    'signup': 'Welcome Bonus',
    'review': 'Review Reward',
    'deduction': 'Credit Used',
    'purchase': 'Purchased Credits',
    'boost': 'Profile Boost',
    'feature': 'Feature Listing',
    'redemption_boost': 'Redeemed for Boost',
    'redemption_feature': 'Redeemed for Feature'
  };
  
  return actionMap[actionType] || actionType;
};

// Support an artist (send credits/tip)
export const supportArtist = async (
  senderId: string,
  artistId: string,
  amount: number,
  message?: string
): Promise<boolean> => {
  try {
    // Check if sender has enough credits
    const senderCredits = await checkCredits(senderId);
    
    if (senderCredits < amount) {
      toast.error("Not enough credits to support this artist");
      return false;
    }
    
    // Deduct from sender
    const deducted = await deductCredits({
      userId: senderId,
      amount,
      reason: `Support for artist: ${artistId}`
    });
    
    if (!deducted) {
      return false;
    }
    
    // Add to artist - Fix the RPC call issue
    const { data: artistData, error: fetchError } = await supabase
      .from('users')
      .select('credits')
      .eq('id', artistId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching artist credits:', fetchError);
      return false;
    }
    
    // Calculate new credit amount and update
    const newCreditAmount = (artistData?.credits || 0) + amount;
    
    const { error: updateError } = await supabase
      .from('users')
      .update({ credits: newCreditAmount })
      .eq('id', artistId);
    
    if (updateError) {
      console.error('Error adding credits to artist:', updateError);
      // Don't return false here as the sender's credits were already deducted
    }
    
    // Log the transaction for both parties
    await supabase.from('activity_log').insert({
      user_id: senderId,
      activity_type: 'support_sent',
      description: `Supported artist with ${amount} credits`,
      metadata: { 
        recipient_id: artistId,
        amount: amount,
        message: message || ''
      }
    });
    
    await supabase.from('activity_log').insert({
      user_id: artistId,
      activity_type: 'support_received',
      description: `Received ${amount} credits from supporter`,
      metadata: { 
        sender_id: senderId,
        amount: amount,
        message: message || ''
      }
    });
    
    return true;
  } catch (err) {
    console.error('Error in supportArtist:', err);
    return false;
  }
};

// Add missing getReferralStats function
export const getReferralStats = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .rpc('get_user_referral_stats', { user_id: userId });
    
    if (error) {
      console.error('Error fetching referral stats:', error);
      return { referral_count: 0, pending_count: 0, verified_count: 0 };
    }
    
    return data || { referral_count: 0, pending_count: 0, verified_count: 0 };
  } catch (err) {
    console.error('Error in getReferralStats:', err);
    return { referral_count: 0, pending_count: 0, verified_count: 0 };
  }
};
