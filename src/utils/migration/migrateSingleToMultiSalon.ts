
import { supabase } from '@/integrations/supabase/client';

// Define interface for salon data with correct field names
interface SalonData {
  salon_name: string;
  owner_id?: string; // We'll add this only for local use, not for DB insertion
}

// Define a simple type for user profile
interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  salon_name?: string;
  business_name?: string;
  [key: string]: any;
}

/**
 * This utility function ensures that salon owners who signed up before
 * the multi-salon feature was implemented have a salon record created.
 * 
 * @param userId The ID of the user to migrate
 * @returns The ID of the created salon, or null if no migration needed
 */
export const migrateSingleToMultiSalon = async (userId: string): Promise<string | null> => {
  try {
    // First, check if user already has a salon
    const { data: existingSalons, error: checkError } = await supabase
      .from('salons')
      .select('id')
      .eq('id', userId);
      
    if (checkError) {
      console.error('Error checking for existing salons:', checkError);
      return null;
    }
    
    // If user already has a salon, no migration needed
    if (existingSalons && existingSalons.length > 0) {
      console.log('User already has salon(s), no migration needed');
      return null;
    }
    
    // Get user profile to get the salon name
    const { data: userProfileData, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileError || !userProfileData) {
      console.error('Error fetching user profile:', profileError);
      return null;
    }
    
    const userProfile = userProfileData as UserProfile;
    
    // Use salon_name from profile or fallback to business_name or default
    const salonName = 
      userProfile.salon_name || 
      userProfile.business_name || 
      `${userProfile.full_name || 'New'}'s Salon`;
    
    // Create a new salon record in the database
    // Note: The salons table uses the user ID as the salon ID (based on our schema)
    const { data: insertedSalon, error: insertError } = await supabase
      .from('salons')
      .insert({
        id: userId, // Use the user ID as the salon ID (primary key)
        salon_name: salonName
      })
      .select()
      .single();
      
    if (insertError || !insertedSalon) {
      console.error('Error creating salon during migration:', insertError);
      return null;
    }
    
    console.log('Successfully migrated user to multi-salon:', insertedSalon.id);
    return insertedSalon.id;
    
  } catch (error) {
    console.error('Unexpected error during salon migration:', error);
    return null;
  }
};
