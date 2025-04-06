
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { Json } from '@/integrations/supabase/types';

export const createEmptyProfile = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        full_name: '',
        avatar_url: '',
        bio: '',
        contact_link: '',
        role: 'customer', // Default role
        created_at: new Date().toISOString(),
        email: '', // Required field based on the error
        credits: 15, // Starting credits for new users
      });

    if (error) {
      console.error('Error creating user profile:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return false;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    if (!data) {
      console.log('No user profile found for user ID:', userId);
      return null;
    }
    
    // Use type assertion to handle database response
    const dataAny = data as any;
    
    // Create a base profile with all required fields
    const profile: UserProfile = {
      id: dataAny.id || '',
      email: dataAny.email || '',
      full_name: dataAny.full_name || '',
      avatar_url: dataAny.avatar_url || '',
      custom_role: dataAny.custom_role || '',
      bio: dataAny.bio || '',
      contact_link: dataAny.contact_link || '',
      instagram: dataAny.instagram || '',
      website: dataAny.website || '',
      user_role: (dataAny.role as UserRole) || 'customer',
      created_at: dataAny.created_at || '',
      location: dataAny.location || '',
      credits: dataAny.credits || 0,
      boosted_until: dataAny.boosted_until || null,
      role: (dataAny.role as UserRole) || 'customer',
      preferred_language: ((dataAny.preferred_language || 'en') as "en" | "vi" | "es"),
      specialty: dataAny.specialty || '',
      phone: dataAny.phone || '',
    };
    
    // Conditionally add optional fields that might not exist in the database
    if (dataAny.salon_name) profile.salon_name = dataAny.salon_name;
    if (dataAny.company_name) profile.company_name = dataAny.company_name;
    if (dataAny.referral_count !== undefined) profile.referral_count = dataAny.referral_count;
    if (dataAny.affiliate_code) profile.affiliate_code = dataAny.affiliate_code;
    if (dataAny.badges) profile.badges = dataAny.badges as Json;
    if (dataAny.skills) profile.skills = dataAny.skills as string[];
    if (dataAny.profile_views !== undefined) profile.profile_views = dataAny.profile_views;
    if (dataAny.referral_code) profile.referral_code = dataAny.referral_code;
    if (dataAny.skill_level) profile.skill_level = dataAny.skill_level;
    if (dataAny.preferences) profile.preferences = dataAny.preferences;
    
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Fixed function to prevent excessive type instantiation
export const updateUserProfileInDb = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    // Create a simple object with basic types for database updates
    const dbUpdates: Record<string, any> = {};
    
    // Manually copy fields to avoid deep type instantiation issues
    Object.keys(updates).forEach(key => {
      const k = key as keyof typeof updates;
      if (k === 'user_role') {
        // Map user_role to role for database
        dbUpdates['role'] = updates[k];
      } else if (!['facebook', 'twitter'].includes(key)) {
        // Skip fields that don't exist in the database
        dbUpdates[key] = updates[k];
      }
    });
    
    const { error } = await supabase
      .from('users')
      .update({
        ...dbUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
};

export const updateUserAvatarInStorage = async (userId: string, file: File) => {
  try {
    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload the file to storage
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file);

    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return null;
    }

    // Get the public URL of the uploaded file
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    // Update the user's avatar URL in the database
    const { error: updateError } = await supabase
      .from('users')
      .update({
        avatar_url: data.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating avatar URL:', updateError);
      return null;
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error updating avatar:', error);
    return null;
  }
};

export const getUserByUserName = async (username: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
    
    if (!data) {
      console.log('No user profile found for username:', username);
      return null;
    }
    
    // Use type assertion to handle database response
    const dataAny = data as any;
    
    // Create a base profile with all required fields
    const profile: UserProfile = {
      id: dataAny.id || '',
      email: dataAny.email || '',
      full_name: dataAny.full_name || '',
      avatar_url: dataAny.avatar_url || '',
      custom_role: dataAny.custom_role || '',
      bio: dataAny.bio || '',
      contact_link: dataAny.contact_link || '',
      instagram: dataAny.instagram || '',
      website: dataAny.website || '',
      user_role: (dataAny.role as UserRole) || 'customer',
      created_at: dataAny.created_at || '',
      location: dataAny.location || '',
      credits: dataAny.credits || 0,
      boosted_until: dataAny.boosted_until || null,
      role: (dataAny.role as UserRole) || 'customer',
      preferred_language: ((dataAny.preferred_language || 'en') as "en" | "vi" | "es"),
      specialty: dataAny.specialty || '',
      phone: dataAny.phone || '',
    };
    
    // Conditionally add optional fields that might not exist in the database
    if (dataAny.salon_name) profile.salon_name = dataAny.salon_name;
    if (dataAny.company_name) profile.company_name = dataAny.company_name;
    if (dataAny.referral_count !== undefined) profile.referral_count = dataAny.referral_count;
    if (dataAny.affiliate_code) profile.affiliate_code = dataAny.affiliate_code;
    if (dataAny.badges) profile.badges = dataAny.badges as Json;
    if (dataAny.skills) profile.skills = dataAny.skills as string[];
    if (dataAny.profile_views !== undefined) profile.profile_views = dataAny.profile_views;
    if (dataAny.referral_code) profile.referral_code = dataAny.referral_code;
    if (dataAny.skill_level) profile.skill_level = dataAny.skill_level;
    if (dataAny.preferences) profile.preferences = dataAny.preferences;
    
    return profile;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    return null;
  }
};
