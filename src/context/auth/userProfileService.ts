
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from './types';

/**
 * Fetch user profile data
 * @param userId User ID to fetch profile for
 * @returns User profile data
 */
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
    
    return data as unknown as UserProfile;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
};

/**
 * Create an empty profile for a new user
 * @param userId User ID to create profile for
 */
export const createEmptyProfile = async (userId: string): Promise<boolean> => {
  try {
    // Get user information from auth schema if available
    const { data: authUser, error: authError } = await supabase.auth.getUser(userId);
    
    if (authError) {
      console.error('Error getting auth user:', authError);
    }
    
    // Create a basic profile with required fields
    const { error } = await supabase
      .from('users')
      .insert({
        id: userId,
        created_at: new Date().toISOString(),
        // Required fields based on the error message
        email: authUser?.user?.email || `user-${userId.substring(0, 8)}@placeholder.com`,
        full_name: authUser?.user?.user_metadata?.full_name || '',
        // Default role
        role: 'customer',
      });
    
    if (error) {
      console.error('Error creating empty profile:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error creating profile:', error);
    return false;
  }
};

/**
 * Update user profile in database
 * @param userId User ID to update profile for
 * @param updates Profile updates to apply
 */
export const updateUserProfileInDb = async (
  userId: string, 
  updates: Record<string, any>
): Promise<boolean> => {
  try {
    // Create a clean updates object
    const dbUpdates: Record<string, any> = {};
    
    // Map fields from updates to dbUpdates
    // This avoids the TypeScript circular reference issue
    Object.keys(updates).forEach(key => {
      // Handle the special case for role/user_role
      if (key === 'user_role') {
        dbUpdates['role'] = updates[key];
      } else {
        dbUpdates[key] = updates[key];
      }
    });
    
    // Update the profile in Supabase
    const { error } = await supabase
      .from('users')
      .update(dbUpdates)
      .eq('id', userId);
    
    if (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Unexpected error updating profile:', error);
    return false;
  }
};

/**
 * Update user avatar in storage and profile
 * @param userId User ID to update avatar for
 * @param file File to upload as avatar
 */
export const updateUserAvatarInStorage = async (
  userId: string,
  file: File
): Promise<string | null> => {
  try {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);
    
    if (uploadError) {
      console.error('Error uploading avatar:', uploadError);
      return null;
    }
    
    // Get public URL
    const { data } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);
    
    if (!data?.publicUrl) {
      console.error('Could not get public URL for avatar');
      return null;
    }
    
    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: data.publicUrl })
      .eq('id', userId);
    
    if (updateError) {
      console.error('Error updating profile with avatar URL:', updateError);
      return null;
    }
    
    return data.publicUrl;
  } catch (error) {
    console.error('Unexpected error updating avatar:', error);
    return null;
  }
};
