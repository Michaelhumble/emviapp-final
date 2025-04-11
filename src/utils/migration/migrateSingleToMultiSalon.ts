
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define simplified interface to avoid deep instantiation
interface SalonData {
  id: string;
  owner_id: string;
  salon_name: string;
  logo_url: string | null;
  location: string | null;
  website: string | null;
  instagram: string | null;
  phone: string | null;
  about: string | null;
}

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
    
    // Explicitly type as any to avoid deep instantiation
    const profile = userProfile as any;
    
    // Define the salon name - either get it from profile or use a fallback
    const salonName = profile.salon_name || profile.full_name || 'My Salon';
    
    // Create a new salon record with information from the user profile
    const newSalon: SalonData = {
      id: crypto.randomUUID(), // Generate a UUID for the salon
      owner_id: userId,
      salon_name: salonName,
      logo_url: profile.avatar_url || null,
      location: profile.location || null,
      website: profile.website || null,
      instagram: profile.instagram || null,
      phone: profile.phone || null,
      about: profile.bio || null
    };
    
    // Insert the new salon data
    const { data: insertedSalon, error: insertError } = await supabase
      .from('salons')
      .insert(newSalon)
      .select()
      .single();
    
    if (insertError) {
      console.error('Failed to create salon during migration:', insertError);
      toast.error('Failed to set up your salon. Please try again.');
      return null;
    }
    
    // Migration successful
    console.log('Successfully migrated user to multi-salon model', insertedSalon);
    toast.success('Your salon has been set up successfully!');
    return insertedSalon.id;
  } catch (err) {
    console.error('Error during salon migration:', err);
    toast.error('An unexpected error occurred. Please try again.');
    return null;
  }
};
