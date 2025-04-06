
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';

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
        referral_code,
        skill_level,
        preferences,
        profile_views
      `)
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
    
    // Map database response to UserProfile
    const profile: UserProfile = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      custom_role: data.custom_role,
      bio: data.bio,
      contact_link: data.contact_link,
      instagram: data.instagram,
      website: data.website,
      user_role: data.role,
      created_at: data.created_at,
      salon_name: data.salon_name,
      company_name: data.company_name,
      location: data.location,
      referral_count: data.referral_count,
      affiliate_code: data.affiliate_code,
      badges: data.badges,
      credits: data.credits,
      boosted_until: data.boosted_until,
      preferred_language: data.preferred_language,
      specialty: data.specialty,
      phone: data.phone,
      skills: data.skills,
      profile_views: data.profile_views,
      referral_code: data.referral_code,
      skill_level: data.skill_level,
      preferences: data.preferences,
      role: data.role,
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
    
    // Remove any fields that don't exist in the database
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
        referral_code,
        skill_level,
        preferences,
        profile_views
      `)
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
    
    // Map database response to UserProfile
    const profile: UserProfile = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      custom_role: data.custom_role,
      bio: data.bio,
      contact_link: data.contact_link,
      instagram: data.instagram,
      website: data.website,
      user_role: data.role,
      created_at: data.created_at,
      salon_name: data.salon_name,
      company_name: data.company_name,
      location: data.location,
      referral_count: data.referral_count,
      affiliate_code: data.affiliate_code,
      badges: data.badges,
      credits: data.credits,
      boosted_until: data.boosted_until,
      preferred_language: data.preferred_language,
      specialty: data.specialty,
      phone: data.phone,
      skills: data.skills,
      profile_views: data.profile_views,
      referral_code: data.referral_code,
      skill_level: data.skill_level,
      preferences: data.preferences,
      role: data.role,
    };
    
    return profile;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    return null;
  }
};
