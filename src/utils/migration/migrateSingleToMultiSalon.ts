
import { supabase } from '@/integrations/supabase/client';

// Define a simpler type for the salon data to avoid deep type instantiation
interface SalonData {
  id?: string;
  owner_id: string;
  name: string;
  created_at?: string;
}

// Define a simple type for user profile to avoid type errors
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
      .eq('owner_id', userId);
      
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
    
    // Cast to our simpler interface to avoid type issues
    const userProfile = userProfileData as unknown as UserProfile;
    
    // Use salon_name from profile or fallback to business_name or default
    const salonName = 
      userProfile.salon_name || 
      userProfile.business_name || 
      `${userProfile.full_name || 'New'}'s Salon`;
    
    // Create a new salon for the user
    const newSalon: SalonData = {
      owner_id: userId,
      name: salonName,
    };
    
    // Insert the new salon - we're providing the name field but the DB expects salon_name
    const { data: insertedSalon, error: insertError } = await supabase
      .from('salons')
      .insert({
        owner_id: userId,
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
