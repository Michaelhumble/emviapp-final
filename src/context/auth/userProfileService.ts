
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "./types";

// Fetch user profile from Supabase
export const fetchUserProfile = async (user: User): Promise<UserProfile | null> => {
  try {
    // Get the user from the users table
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    if (!data) {
      console.error("No user profile found");
      return null;
    }
    
    // Create and return the user profile based on the role
    const role = data.role as UserRole;
    
    // Base profile with common fields
    const baseProfile: UserProfile = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      location: data.location,
      bio: data.bio,
      phone: data.phone,
      instagram: data.instagram,
      website: data.website,
      specialty: data.specialty,
      role: role,
      // Add custom fields that might be in the database
      salon_name: data.salon_name as string | undefined,
      business_address: data.business_address as string | undefined,
      company_name: data.company_name as string | undefined,
      product_type: data.product_type as string | undefined,
      skill_level: data.skill_level as string | undefined,
      skills: data.skills as string[] | undefined,
      // Add these fields from the database
      created_at: data.created_at,
      updated_at: data.updated_at
    };
    
    return baseProfile;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};
