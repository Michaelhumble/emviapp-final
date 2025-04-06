
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';

export const createEmptyProfile = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        full_name: '',
        email: '',  // Adding email as required field
        avatar_url: '',
        bio: '',
        contact_link: '',
        role: 'customer', // Default role
        created_at: new Date().toISOString(),
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
      .select(`
        id,
        email,
        full_name,
        avatar_url,
        custom_role,
        bio,
        contact_link,
        instagram,
        website,
        role,
        created_at,
        salon_name,
        company_name,
        location,
        referral_count,
        affiliate_code,
        badges,
        credits,
        boosted_until,
        preferred_language,
        specialty,
        phone,
        skills,
        profile_views,
        referral_code,
        skill_level,
        preferences
      `)
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Create a default profile with null/empty values for all fields
    const defaultProfile: UserProfile = {
      id: userId,
      email: '',
      full_name: '',
      avatar_url: '',
      custom_role: '',
      bio: '',
      contact_link: '',
      instagram: '',
      website: '',
      user_role: null,
      role: null,
      created_at: '',
      salon_name: '',
      company_name: '',
      location: '',
      referral_count: 0,
      affiliate_code: '',
      badges: [],
      credits: 0,
      boosted_until: '',
      preferred_language: '',
      specialty: '',
      phone: '',
      skills: [],
      profile_views: 0,
      referral_code: '',
      skill_level: '',
      preferences: [],
    };
    
    // Merge the retrieved data with the default profile
    const profile: UserProfile = {
      ...defaultProfile,
      id: data.id,
      email: data.email || defaultProfile.email,
      full_name: data.full_name || defaultProfile.full_name,
      avatar_url: data.avatar_url || defaultProfile.avatar_url,
      custom_role: data.custom_role || defaultProfile.custom_role,
      bio: data.bio || defaultProfile.bio,
      contact_link: data.contact_link || defaultProfile.contact_link,
      instagram: data.instagram || defaultProfile.instagram,
      website: data.website || defaultProfile.website,
      user_role: data.role || defaultProfile.user_role,
      role: data.role || defaultProfile.role, // Add role as an alias for user_role
      created_at: data.created_at || defaultProfile.created_at,
      salon_name: data.salon_name || defaultProfile.salon_name,
      company_name: data.company_name || defaultProfile.company_name,
      location: data.location || defaultProfile.location,
      referral_count: data.referral_count || defaultProfile.referral_count,
      affiliate_code: data.affiliate_code || defaultProfile.affiliate_code,
      badges: data.badges || defaultProfile.badges,
      credits: data.credits || defaultProfile.credits,
      boosted_until: data.boosted_until || defaultProfile.boosted_until,
      preferred_language: data.preferred_language || defaultProfile.preferred_language,
      specialty: data.specialty || defaultProfile.specialty,
      phone: data.phone || defaultProfile.phone,
      skills: data.skills || defaultProfile.skills,
      profile_views: data.profile_views || defaultProfile.profile_views,
      referral_code: data.referral_code || defaultProfile.referral_code,
      skill_level: data.skill_level || defaultProfile.skill_level,
      preferences: data.preferences || defaultProfile.preferences,
    };
    
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const updateUserProfileInDb = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    // Map UserProfile fields to database columns
    const dbUpdates: any = { ...updates };
    
    // Handle special case: user_role → role in the database
    if (updates.user_role !== undefined) {
      dbUpdates.role = updates.user_role;
      delete dbUpdates.user_role;
    }
    
    // Remove any fields that don't exist in the database or shouldn't be updated directly
    delete dbUpdates.facebook;
    delete dbUpdates.twitter;
    
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
      .select(`
        id,
        email,
        full_name,
        avatar_url,
        custom_role,
        bio,
        contact_link,
        instagram,
        website,
        role,
        created_at,
        salon_name,
        company_name,
        location,
        referral_count,
        affiliate_code,
        badges,
        credits,
        boosted_until,
        preferred_language,
        specialty,
        phone,
        skills,
        profile_views,
        referral_code,
        skill_level,
        preferences
      `)
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user by username:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Create a default profile with null/empty values
    const defaultProfile: UserProfile = {
      id: '',
      email: '',
      full_name: '',
      avatar_url: '',
      custom_role: '',
      bio: '',
      contact_link: '',
      instagram: '',
      website: '',
      user_role: null,
      role: null,
      created_at: '',
      salon_name: '',
      company_name: '',
      location: '',
      referral_count: 0,
      affiliate_code: '',
      badges: [],
      credits: 0,
      boosted_until: '',
      preferred_language: '',
      specialty: '',
      phone: '',
      skills: [],
      profile_views: 0,
      referral_code: '',
      skill_level: '',
      preferences: [],
    };
    
    // Merge the retrieved data with the default profile
    const profile: UserProfile = {
      ...defaultProfile,
      id: data.id,
      email: data.email || defaultProfile.email,
      full_name: data.full_name || defaultProfile.full_name,
      avatar_url: data.avatar_url || defaultProfile.avatar_url,
      custom_role: data.custom_role || defaultProfile.custom_role,
      bio: data.bio || defaultProfile.bio,
      contact_link: data.contact_link || defaultProfile.contact_link,
      instagram: data.instagram || defaultProfile.instagram,
      website: data.website || defaultProfile.website,
      user_role: data.role || defaultProfile.user_role,
      role: data.role || defaultProfile.role,
      created_at: data.created_at || defaultProfile.created_at,
      salon_name: data.salon_name || defaultProfile.salon_name,
      company_name: data.company_name || defaultProfile.company_name,
      location: data.location || defaultProfile.location,
      referral_count: data.referral_count || defaultProfile.referral_count,
      affiliate_code: data.affiliate_code || defaultProfile.affiliate_code,
      badges: data.badges || defaultProfile.badges,
      credits: data.credits || defaultProfile.credits,
      boosted_until: data.boosted_until || defaultProfile.boosted_until,
      preferred_language: data.preferred_language || defaultProfile.preferred_language,
      specialty: data.specialty || defaultProfile.specialty,
      phone: data.phone || defaultProfile.phone,
      skills: data.skills || defaultProfile.skills,
      profile_views: data.profile_views || defaultProfile.profile_views,
      referral_code: data.referral_code || defaultProfile.referral_code,
      skill_level: data.skill_level || defaultProfile.skill_level,
      preferences: data.preferences || defaultProfile.preferences,
    };
    
    return profile;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    return null;
  }
};
