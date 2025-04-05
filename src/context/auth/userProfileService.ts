
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';

/**
 * Fetches the user profile data from Supabase
 */
export const fetchUserProfile = async (user: User): Promise<UserProfile | null> => {
  try {
    // Get the user profile from the database
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    if (!data) {
      console.log('No user profile found, creating one...');
      // If no profile exists, create one
      return await createUserProfile(user);
    }
    
    return {
      id: data.id,
      email: data.email || user.email || '',
      full_name: data.full_name || '',
      avatar_url: data.avatar_url || '',
      location: data.location || '',
      bio: data.bio || '',
      phone: data.phone || '',
      instagram: data.instagram || '',
      website: data.website || '',
      specialty: data.specialty || '',
      role: data.role || 'customer',
      created_at: data.created_at,
      updated_at: data.updated_at,
      preferred_language: data.preferred_language || '',
      referral_count: data.referral_count || 0 // Added default value
    };
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    return null;
  }
};

/**
 * Creates a new user profile in Supabase
 */
const createUserProfile = async (user: User): Promise<UserProfile | null> => {
  const newProfile = {
    id: user.id,
    email: user.email || '',
    full_name: '',
    avatar_url: '',
    location: '',
    bio: '',
    phone: '',
    instagram: '',
    website: '',
    specialty: '',
    role: 'customer' as UserRole,
    referral_count: 0, // Added default value
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  const { data, error } = await supabase
    .from('users')
    .insert([newProfile])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
  
  return data as UserProfile;
};
