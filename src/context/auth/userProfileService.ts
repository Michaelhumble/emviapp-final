
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Fetches the user profile data from Supabase
 */
export async function fetchUserProfile(user: SupabaseUser): Promise<UserProfile | null> {
  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
    
    const userRole = userData?.role as UserRole || 'customer';
    
    // Extract role-specific profile data
    let profileExtras = {};

    if (userRole === 'owner' || userRole === 'salon') {
      profileExtras = {
        salon_name: userData?.salon_name || "",
        business_address: userData?.business_address || ""
      };
    } else if (userRole === 'supplier' || userRole === 'beauty supplier' || userRole === 'vendor') {
      profileExtras = {
        company_name: userData?.company_name || "",
        product_type: userData?.product_type || ""
      };
    }

    const profile: UserProfile = {
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
      role: userRole,
      skill_level: userData.skill_level,
      skills: userData.skills,
      created_at: userData.created_at,
      updated_at: userData.updated_at,
      ...profileExtras
    };
    
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
