
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * This utility function migrates a user from the old single-salon model
 * to the new multi-salon model by creating a salon entity based on
 * their existing user profile data.
 * 
 * @param userId The ID of the user to migrate
 * @returns The ID of the created salon, or null if migration failed
 */
export const migrateSingleToMultiSalon = async (userId: string): Promise<string | null> => {
  try {
    console.log(`Starting migration for user ${userId}...`);
    
    // First, check if the user already has salons
    // Using type assertion to avoid deep type instantiation issues
    const { data: existingSalons, error: existingSalonsError } = await supabase
      .from('salons')
      .select('id')
      .eq('id', userId) as { data: { id: string }[] | null, error: any };
      
    if (existingSalonsError) {
      console.error('Error checking existing salons:', existingSalonsError);
      return null;
    }
      
    if (existingSalons && existingSalons.length > 0) {
      console.log('User already has salons, no migration needed');
      return existingSalons[0].id;
    }
    
    // Get user profile data to create a salon
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single() as { data: any, error: any };
      
    if (userError) {
      console.error('Error fetching user data:', userError);
      return null;
    }
    
    if (!userData) {
      console.error('No user data found');
      return null;
    }

    // Create a salon object with correct properties
    // The database expects id to be provided rather than owner_id
    const salonData = {
      id: userId, // Use the user's ID as the salon ID
      salon_name: userData.salon_name || userData.full_name || 'My Salon',
      logo_url: userData.avatar_url,
      location: userData.location,
      about: userData.bio,
      website: userData.website,
      instagram: userData.instagram,
      phone: userData.phone,
      created_at: new Date().toISOString()
    };
    
    // Create a new salon based on user profile data
    const { data: newSalonData, error: salonError } = await supabase
      .from('salons')
      .insert(salonData)
      .select() as { data: any[] | null, error: any };
      
    if (salonError) {
      console.error('Error creating salon:', salonError);
      return null;
    }
    
    if (newSalonData && newSalonData.length > 0) {
      console.log('Migration successful, salon created with ID:', newSalonData[0].id);
      toast.success('Your salon profile has been migrated to the new system!');
      return newSalonData[0].id;
    }
    
    return null;
  } catch (error) {
    console.error('Migration error:', error);
    return null;
  }
};
