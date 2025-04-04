
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Json } from '@/integrations/supabase/types';

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

    // Cast userData to include all the possible fields we need
    interface ExtendedUserData {
      id: string;
      email: string;
      full_name: string;
      avatar_url: string | null;
      location: string | null;
      bio: string | null;
      phone: string | null;
      instagram: string | null;
      website: string | null;
      specialty: string | null;
      role: string | null;
      salon_name?: string | null;
      business_address?: string | null;
      company_name?: string | null;
      product_type?: string | null;
      skill_level?: string | null;
      skills?: string[] | null;
      created_at?: string | null;
      updated_at?: string | null;
      badges?: Json | null;
      credits?: number | null;
    }

    // Cast userData to include all fields
    const extendedUserData = userData as ExtendedUserData;

    const profile: UserProfile = {
      id: extendedUserData.id,
      email: extendedUserData.email,
      full_name: extendedUserData.full_name,
      avatar_url: extendedUserData.avatar_url,
      location: extendedUserData.location,
      bio: extendedUserData.bio,
      phone: extendedUserData.phone,
      instagram: extendedUserData.instagram,
      website: extendedUserData.website,
      specialty: extendedUserData.specialty,
      role: userRole,
      skill_level: extendedUserData.skill_level || null,
      skills: extendedUserData.skills || null,
      created_at: extendedUserData.created_at || null,
      updated_at: extendedUserData.updated_at || null,
      ...profileExtras
    };
    
    return profile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
