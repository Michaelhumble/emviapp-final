
import { supabase } from '@/integrations/supabase/client';

export const createDiamondTierFunction = async () => {
  try {
    // This function creates the database function to initialize the Diamond tier waitlist table
    // if it doesn't exist yet
    const { data, error } = await supabase.rpc('create_diamond_tier_waitlist_if_not_exists');
    
    if (error) {
      console.error("Error ensuring diamond tier waitlist table exists:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Exception ensuring diamond tier waitlist table exists:", error);
    return false;
  }
};

export const requestDiamondTierAccess = async (postType: string, additionalInfo: any) => {
  try {
    const { data, error } = await supabase.from('diamond_tier_waitlist').insert({
      post_type: postType,
      additional_info: additionalInfo
    });
    
    if (error) {
      console.error("Error adding to diamond tier waitlist:", error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Exception adding to diamond tier waitlist:", error);
    return { success: false, error };
  }
};
