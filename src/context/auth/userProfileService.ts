
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "./types";
import { Database } from "@/integrations/supabase/types";

// Define a type for the database user row
type DbUser = Database["public"]["Tables"]["users"]["Row"] & {
  salon_name?: string;
  business_address?: string;
  company_name?: string;
  product_type?: string;
  skill_level?: string;
  skills?: string[];
  custom_role?: string;
  preferences?: string[];
  contact_link?: string;
  referral_count?: number;
};

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
    
    // Cast data to our extended DbUser type to handle additional fields
    const userData = data as unknown as DbUser;
    
    // Base profile with common fields
    const baseProfile: UserProfile = {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      avatar_url: userData.avatar_url,
      location: userData.location,
      bio: userData.bio,
      phone: userData.phone,
      instagram: userData.instagram,
      website: userData.website,
      specialty: userData.specialty,
      role: role,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      referral_count: userData.referral_count || 0  // Add default value of 0
    };
    
    // Add optional fields from the database if they exist
    if (userData.salon_name) baseProfile.salon_name = userData.salon_name;
    if (userData.business_address) baseProfile.business_address = userData.business_address;
    if (userData.company_name) baseProfile.company_name = userData.company_name;
    if (userData.product_type) baseProfile.product_type = userData.product_type;
    if (userData.skill_level) baseProfile.skill_level = userData.skill_level;
    if (userData.skills) baseProfile.skills = userData.skills;
    if (userData.custom_role) baseProfile.custom_role = userData.custom_role;
    if (userData.preferences) baseProfile.preferences = userData.preferences;
    if (userData.contact_link) baseProfile.contact_link = userData.contact_link;
    
    return baseProfile;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};
