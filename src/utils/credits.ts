
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define credit costs for various actions
export const CREDIT_COSTS = {
  JOB_POST: 15,
  BOOTH_RENTAL_POST: 10,
  FEATURED_LISTING: 10,
  PROFILE_BOOST: 5,
  URGENT_TAG: 5,
  SUPPORT_ARTIST_SMALL: 10,
  SUPPORT_ARTIST_MEDIUM: 25,
  SUPPORT_ARTIST_LARGE: 50,
  SEND_OFFER: 10
};

// Function to update salon credit display with animation
export const updateSalonCreditDisplay = (
  creditAmount: number,
  ref: React.RefObject<HTMLElement>
) => {
  if (!ref || !ref.current) return;
  
  ref.current.textContent = `${creditAmount}`;
  
  // Create a temporary div for the animation
  const temp = document.createElement('div');
  if (!ref || !ref.current) return;
  
  temp.className = 'text-green-500 font-medium absolute top-0 left-0 opacity-0';
  temp.textContent = '+25';
  ref.current.appendChild(temp);
  
  // Animate the temporary element
  if (!ref || !ref.current) return;
  
  temp.animate([
    { top: '0', opacity: 1 },
    { top: '-20px', opacity: 0 }
  ], {
    duration: 1000,
    easing: 'ease-out'
  });
  
  // Remove the temporary element after the animation
  setTimeout(() => {
    if (ref.current && temp.parentNode === ref.current) {
      ref.current.removeChild(temp);
    }
  }, 1000);
};

// For the video call reporting issue, we need to correct the table name
export const reportVideoCallEngagement = async (userId: string, duration: number) => {
  try {
    // Get the current date in ISO format
    const currentDate = new Date().toISOString();
    
    // Insert a record into the database
    const { data, error } = await supabase
      .from('activity_log')  // Changed to use an existing table
      .insert({
        user_id: userId,
        activity_type: 'video_call',
        description: `Video call completed (${duration} seconds)`,
        metadata: {
          duration_seconds: duration,
          call_date: currentDate,
          status: 'completed'
        }
      });
      
    if (error) {
      console.error('Error reporting video call:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Exception reporting video call:', err);
    return false;
  }
};

// Function to award credits to a user
export const awardCredits = async (userId: string, amount: number, reason: string) => {
  try {
    const { data, error } = await supabase
      .from('customer_credits')  // Using existing table
      .insert([
        { user_id: userId, value: amount, action_type: 'award', description: reason }
      ]);

    if (error) {
      console.error("Error awarding credits:", error);
      toast.error("Failed to award credits.");
      return false;
    }

    // Update user's credit balance in users table
    await updateUserCreditsBalance(userId);

    toast.success(`Successfully awarded ${amount} credits!`);
    return true;
  } catch (error) {
    console.error("Unexpected error awarding credits:", error);
    toast.error("An unexpected error occurred while awarding credits.");
    return false;
  }
};

// Function to deduct credits from a user
export const deductCredits = async ({ userId, amount, reason }: { userId: string, amount: number, reason: string }) => {
  try {
    // First check if user has enough credits
    const currentCredits = await checkCredits(userId);
    if (currentCredits < amount) {
      toast.error("Not enough credits for this action.");
      return false;
    }

    const { data, error } = await supabase
      .from('customer_credits')  // Using existing table
      .insert([
        { user_id: userId, value: -amount, action_type: 'deduct', description: reason }
      ]);

    if (error) {
      console.error("Error deducting credits:", error);
      toast.error("Failed to deduct credits.");
      return false;
    }

    // Update user's credit balance in users table
    await updateUserCreditsBalance(userId);

    toast.success(`Successfully deducted ${amount} credits.`);
    return true;
  } catch (error) {
    console.error("Unexpected error deducting credits:", error);
    toast.error("An unexpected error occurred while deducting credits.");
    return false;
  }
};

// Function to get the total credits for a user
export const getTotalCredits = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('customer_credits')  // Using existing table
      .select('value')
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching credits:", error);
      return 0;
    }

    // Sum the credit amounts
    const totalCredits = data.reduce((sum, item) => sum + item.value, 0);
    return totalCredits;
  } catch (error) {
    console.error("Unexpected error fetching credits:", error);
    return 0;
  }
};

// Function to check a user's credit balance
export const checkCredits = async (userId: string): Promise<number> => {
  try {
    // Get user credit balance from users table
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (error) {
      console.error("Error checking credits:", error);
      return 0;
    }

    return data.credits || 0;
  } catch (error) {
    console.error("Unexpected error checking credits:", error);
    return 0;
  }
};

// Update user's credit balance based on transactions
export const updateUserCreditsBalance = async (userId: string): Promise<boolean> => {
  try {
    // Calculate total from transactions
    const totalCredits = await getTotalCredits(userId);
    
    // Update user record
    const { error } = await supabase
      .from('users')
      .update({ credits: totalCredits })
      .eq('id', userId);
    
    if (error) {
      console.error("Error updating user credit balance:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Unexpected error updating user credit balance:", error);
    return false;
  }
};

// Get credit history for a user
export const getCreditsHistory = async (userId: string, limit = 20): Promise<any[]> => {
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
    console.error("Unexpected error fetching credit history:", error);
    return [];
  }
};

// Get referral statistics for a user
export const getReferralStats = async (userId: string): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId);

    if (error) {
      console.error("Error fetching referral stats:", error);
      return { total: 0, verified: 0, pending: 0 };
    }

    const total = data.length;
    const verified = data.filter(ref => ref.status === 'verified').length;
    const pending = data.filter(ref => ref.status === 'pending').length;

    return { total, verified, pending, data };
  } catch (error) {
    console.error("Unexpected error fetching referral stats:", error);
    return { total: 0, verified: 0, pending: 0 };
  }
};

// Support an artist with credits
export const supportArtist = async (
  userId: string,
  artistId: string,
  amount: number,
  message: string = ""
): Promise<boolean> => {
  try {
    // First deduct credits from the user
    const deductResult = await deductCredits({
      userId,
      amount,
      reason: `Support artist (${artistId})`
    });

    if (!deductResult) {
      return false;
    }

    // Add support record
    const { error } = await supabase
      .from('activity_log')
      .insert({
        user_id: artistId,
        activity_type: 'receive_support',
        description: `Received ${amount} credits as support`,
        metadata: {
          from_user_id: userId,
          amount,
          message,
          is_read: false
        }
      });

    if (error) {
      console.error("Error recording artist support:", error);
      // Since deduction already happened, we don't return false here to avoid
      // the user losing credits without the artist getting support
    }

    // Award credits to the artist
    await awardCredits(artistId, amount, `Support from user (${userId})`);

    return true;
  } catch (error) {
    console.error("Unexpected error supporting artist:", error);
    return false;
  }
};
