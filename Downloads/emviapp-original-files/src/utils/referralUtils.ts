import { supabase } from "../lib/supabaseClient";

/**
 * Generates a unique referral code for a user
 * Format: emvi + random alphanumeric (total 8 chars)
 */
export const generateReferralCode = (): string => {
  // Create a base for the referral code
  const base = 'emvi';
  
  // Generate a random alphanumeric string of length 4
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return base + randomStr;
};

/**
 * Ensures a user has a valid referral code
 */
export const ensureUserHasReferralCode = async (userId: string): Promise<string | null> => {
  try {
    // Check if user already has a referral code
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('referral_code')
      .eq('id', userId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching user:', fetchError);
      return null;
    }
    
    // If user already has a referral code, return it
    if (userData?.referral_code) {
      return userData.referral_code;
    }
    
    // Generate a new code
    let isUnique = false;
    let newCode = '';
    
    // Keep trying until we find a unique code
    while (!isUnique) {
      newCode = generateReferralCode();
      
      // Check if code is unique
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('referral_code', newCode);
        
      if (error) {
        console.error('Error checking referral code uniqueness:', error);
        return null;
      }
      
      isUnique = data.length === 0;
    }
    
    // Update the user with the new referral code
    const { error: updateError } = await supabase
      .from('users')
      .update({ referral_code: newCode })
      .eq('id', userId);
      
    if (updateError) {
      console.error('Error updating user with referral code:', updateError);
      return null;
    }
    
    return newCode;
  } catch (error) {
    console.error('Referral code generation error:', error);
    return null;
  }
};

/**
 * Processes a referral when a new user signs up
 * Now using Supabase functions to handle complex operations
 */
export const processReferral = async (referredByCode: string, newUserId: string): Promise<boolean> => {
  try {
    if (!referredByCode || !newUserId) return false;
    
    // Use the database function to process the referral
    const { data, error } = await supabase
      .rpc('process_referral', { 
        referral_code: referredByCode, 
        new_user_id: newUserId 
      });
    
    if (error) {
      console.error('Error processing referral:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Referral processing error:', error);
    return false;
  }
};

/**
 * Creates a referral link with the user's referral code
 */
export const createReferralLink = (referralCode: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/signup?ref=${referralCode}`;
};

/**
 * Copies the referral link to clipboard
 */
export const copyReferralLink = async (referralCode: string): Promise<boolean> => {
  try {
    const link = createReferralLink(referralCode);
    await navigator.clipboard.writeText(link);
    return true;
  } catch (error) {
    console.error('Failed to copy referral link:', error);
    return false;
  }
};

/**
 * Gets referral statistics for a user from the database
 */
export const getReferralStats = async (userId: string): Promise<{ count: number } | null> => {
  try {
    const { data, error } = await supabase
      .rpc('get_user_referral_stats', { user_id: userId });
      
    if (error) {
      console.error('Error getting referral stats:', error);
      return null;
    }
    
    if (!data || data.length === 0) {
      return { count: 0 };
    }
    
    return { count: data[0].referral_count || 0 };
  } catch (error) {
    console.error('Error fetching referral stats:', error);
    return null;
  }
};
