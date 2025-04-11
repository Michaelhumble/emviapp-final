import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// This utility will help migrate users who already have a single salon in the system
// to the new multi-salon model by creating a salon entry for them
export const migrateSingleToMultiSalon = (data: any): any => {
  try {
    // Check if user has any salons already
    const { data: existingSalons, error: salonsError } = await supabase
      .from('salons')
      .select('id')
      .eq('owner_id', data.userId);
    
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
      .eq('id', data.userId)
      .single();
    
    if (profileError || !userProfile) {
      console.error('User profile not found for migration:', profileError);
      return null;
    }
    
    // Use type assertion to avoid excessive type instantiation
    const userProfileData = userProfile as Record<string, any>;
    
    // Define the salon name from profile data
    const salonName = userProfileData.salon_name || userProfileData.full_name || 'My Salon';
    
    // Create a new salon record with information from the user profile
    // Generate UUID for the salon
    const salonId = crypto.randomUUID();
    
    const newSalonData = {
      id: salonId,
      owner_id: data.userId,
      salon_name: salonName,
      logo_url: userProfileData.avatar_url,
      location: userProfileData.location,
      website: userProfileData.website,
      instagram: userProfileData.instagram,
      phone: userProfileData.phone,
      about: userProfileData.bio
    };
    
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
