import { supabase } from '@/integrations/supabase/client';

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
    // Get completed referrals count
    const { data: completedData, error: completedError } = await supabase
      .from('referrals')
      .select('count')
      .eq('referrer_id', userId)
      .eq('status', 'completed')
      .count();
      
    if (completedError) throw completedError;
    
    // Get total referrals count
    const { data: totalData, error: totalError } = await supabase
      .from('referrals')
      .select('count')
      .eq('referrer_id', userId)
      .count();
      
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
    const completed = completedData?.[0]?.count || 0;
    const total = totalData?.[0]?.count || 0;
    
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

// Mock implementation to handle null ref errors
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

// Safe reference handler for fix TS18047 errors
export const safeRef = <T extends HTMLElement>(ref: React.RefObject<T>, callback: (element: T) => void) => {
  if (ref && ref.current) {
    callback(ref.current);
  }
};

// This is a placeholder for any element reference functions that might be in the original file
export const measureElementSize = (ref: React.RefObject<HTMLElement>) => {
  if (!ref || !ref.current) return { width: 0, height: 0 };
  
  const element = ref.current;
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

export const scrollToElement = (ref: React.RefObject<HTMLElement>) => {
  if (!ref || !ref.current) return;
  
  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const focusElement = (ref: React.RefObject<HTMLElement>) => {
  if (!ref || !ref.current) return;
  
  if (ref.current instanceof HTMLInputElement || 
      ref.current instanceof HTMLTextAreaElement ||
      ref.current instanceof HTMLSelectElement) {
    ref.current.focus();
  }
};
