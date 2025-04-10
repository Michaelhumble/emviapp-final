
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// This utility will help migrate users who already have a single salon in the system
// to the new multi-salon model by creating a salon entry for them
export const migrateSingleToMultiSalon = async (userId: string): Promise<string | null> => {
  try {
    // Check if user has any salons already
    const { data: existingSalons } = await supabase
      .from('salons')
      .select('id')
      .eq('owner_id', userId);
    
    // If they already have salons, no need to migrate
    if (existingSalons && existingSalons.length > 0) {
      console.log('User already has salons, no migration needed');
      return existingSalons[0].id;
    }
    
    // Get the user profile to extract salon-related information
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!userProfile) {
      console.error('User profile not found for migration');
      return null;
    }
    
    // Create a new salon record with information from the user profile
    const { data: newSalon, error } = await supabase
      .from('salons')
      .insert({
        owner_id: userId,
        salon_name: userProfile.salon_name || userProfile.full_name || 'My Salon',
        logo_url: userProfile.avatar_url,
        location: userProfile.location,
        website: userProfile.website,
        instagram: userProfile.instagram,
        phone: userProfile.phone,
        about: userProfile.bio
      })
      .select()
      .single();
    
    if (error) {
      console.error('Failed to create salon during migration:', error);
      toast.error('Failed to set up your salon. Please try again.');
      return null;
    }
    
    // Migration successful
    console.log('Successfully migrated user to multi-salon model', newSalon);
    toast.success('Your salon has been set up successfully!');
    return newSalon.id;
  } catch (err) {
    console.error('Error during salon migration:', err);
    toast.error('An unexpected error occurred. Please try again.');
    return null;
  }
};
