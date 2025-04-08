
import { supabase } from '@/integrations/supabase/client';

// Credit cost constants
export const CREDIT_COSTS = {
  JOB_POST: 10,
  FEATURED_LISTING: 10,
  BOOST_PROFILE: 15,
  SUPPORT_ARTIST_SMALL: 10,
  SUPPORT_ARTIST_MEDIUM: 25,
  SUPPORT_ARTIST_LARGE: 50,
  FEATURED_SALON_LISTING: 20
};

// Function to check user credits
export const checkCredits = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data?.credits || 0;
  } catch (error) {
    console.error('Error checking credits:', error);
    return 0;
  }
};

// Function to get referral stats for a user
export const getReferralStats = async (userId: string) => {
  try {
    // Mock implementation since count() isn't working as expected
    const { data: completedData, error: completedError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId)
      .eq('status', 'completed');
      
    if (completedError) throw completedError;
    
    // Get total referrals
    const { data: totalData, error: totalError } = await supabase
      .from('referrals')
      .select('*')
      .eq('referrer_id', userId);
      
    if (totalError) throw totalError;
    
    // Get target milestone based on user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (userError) throw userError;
    
    // Determine target milestone based on user role
    const getTargetMilestone = (role: string) => {
      if (role === 'artist' || role === 'nail technician/artist') {
        return 3;
      } else if (role === 'salon' || role === 'owner') {
        return 2;
      } else {
        return 5; // Default for customers and others
      }
    };
    
    const targetMilestone = getTargetMilestone(userData?.role || 'customer');
    const completed = completedData?.length || 0;
    const total = totalData?.length || 0;
    
    return {
      completedReferrals: completed,
      totalReferrals: total,
      targetMilestone,
      nextMilestoneIn: Math.max(0, targetMilestone - completed)
    };
  } catch (error) {
    console.error('Error getting referral stats:', error);
    return {
      completedReferrals: 0,
      totalReferrals: 0,
      targetMilestone: 5,
      nextMilestoneIn: 5
    };
  }
};

// Function to add credits to a user
export const addCredits = async (userId: string, amount: number) => {
  if (!userId) return false;
  
  try {
    const currentCredits = await checkCredits(userId);
    const newCredits = currentCredits + amount;
    
    const { error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', userId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding credits:', error);
    return false;
  }
};

// Function to deduct credits from a user
export const deductCredits = async ({ 
  userId, 
  amount, 
  reason 
}: { 
  userId: string; 
  amount: number; 
  reason: string;
}) => {
  if (!userId) return false;
  
  try {
    const currentCredits = await checkCredits(userId);
    
    // Check if user has enough credits
    if (currentCredits < amount) {
      return false;
    }
    
    const newCredits = currentCredits - amount;
    
    const { error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', userId);
      
    if (error) throw error;
    
    // Log the transaction in activity_log
    await supabase.from('activity_log').insert({
      user_id: userId,
      activity_type: 'credit_deduction',
      description: reason,
      metadata: { amount }
    });
    
    return true;
  } catch (error) {
    console.error('Error deducting credits:', error);
    return false;
  }
};

// Function to support an artist with credits
export const supportArtist = async (
  userId: string,
  artistId: string,
  amount: number,
  message?: string
) => {
  if (!userId || !artistId) return false;
  
  try {
    // First deduct credits from the supporter
    const deductionResult = await deductCredits({
      userId,
      amount,
      reason: `Support artist (${artistId})`
    });
    
    if (!deductionResult) {
      return false;
    }
    
    // Add credits to the artist
    const addResult = await addCredits(artistId, amount);
    
    if (!addResult) {
      // If adding to artist fails, refund the user
      await addCredits(userId, amount);
      return false;
    }
    
    // Log the support action
    await supabase.from('activity_log').insert({
      user_id: userId,
      activity_type: 'support_artist',
      description: `Supported artist with ${amount} credits`,
      metadata: { 
        artistId,
        amount,
        message: message || ''
      }
    });
    
    return true;
  } catch (error) {
    console.error('Error supporting artist:', error);
    return false;
  }
};

// Function to get credit history for a user
export const getCreditsHistory = async (userId: string, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .in('activity_type', ['credit_earned', 'credit_deduction', 'support_artist'])
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    // Transform the data for display
    return (data || []).map(item => ({
      id: item.id,
      date: new Date(item.created_at),
      action: item.activity_type,
      description: item.description,
      value: item.activity_type.includes('deduction') || item.activity_type.includes('support')
        ? -Math.abs(item.metadata?.amount || 0)
        : (item.metadata?.amount || 0),
      action_type: item.activity_type
    }));
  } catch (error) {
    console.error('Error getting credit history:', error);
    return [];
  }
};

// Safe reference handler to prevent TS18047 errors
export const safeRef = <T extends HTMLElement>(ref: React.RefObject<T> | null, callback: (element: T) => void) => {
  if (ref && ref.current) {
    callback(ref.current);
  }
};

// Element measurement function
export const measureElementSize = (ref: React.RefObject<HTMLElement> | null) => {
  if (!ref || !ref.current) return { width: 0, height: 0 };
  
  const element = ref.current;
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

// Scroll to element utility
export const scrollToElement = (ref: React.RefObject<HTMLElement> | null) => {
  if (!ref || !ref.current) return;
  
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Focus element utility
export const focusElement = (ref: React.RefObject<HTMLElement> | null) => {
  if (!ref || !ref.current) return;
  
  if (ref.current instanceof HTMLInputElement || 
      ref.current instanceof HTMLTextAreaElement ||
      ref.current instanceof HTMLSelectElement) {
    ref.current.focus();
  }
};
