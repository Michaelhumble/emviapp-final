
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// This utility will help migrate users who already have a single salon in the system
// to the new multi-salon model by creating a salon entry for them
export const migrateSingleToMultiSalon = async (userId: string): Promise<string | null> => {
  try {
    // Check if user has any salons already
    const { data: existingSalons, error: salonsError } = await supabase
      .from('salons')
      .select('id')
      .eq('owner_id', userId);
    
    if (salonsError) {
      console.error('Error checking for existing salons:', salonsError);
      return null;
    }
    
    // If they already have salons, no need to migrate
    if (existingSalons && existingSalons.length > 0) {
      console.log('User already has salons, no migration needed');
      return existingSalons[0].id;
    }
    
    // Get the user profile to extract salon-related information
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError || !userProfile) {
      console.error('User profile not found for migration:', profileError);
      return null;
    }
    
    // Define the salon name - either get it from profile or use a fallback
    const profileData = userProfile as Record<string, any>;
    const salonName = profileData.salon_name || profileData.full_name || 'My Salon';
    
    // Create a new salon record with information from the user profile
    const newSalonData = {
      id: crypto.randomUUID(), // Generate a UUID for the salon
      owner_id: userId,
      salon_name: salonName,
      logo_url: profileData.avatar_url || null,
      location: profileData.location || null,
      website: profileData.website || null,
      instagram: profileData.instagram || null,
      phone: profileData.phone || null,
      about: profileData.bio || null
    };
    
    // Insert the new salon data
    const { data: newSalon, error: insertError } = await supabase
      .from('salons')
      .insert(newSalonData)
      .select()
      .single();
    
    if (insertError) {
      console.error('Failed to create salon during migration:', insertError);
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
