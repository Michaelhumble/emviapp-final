
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
    
    // Handle database fields safely with fallbacks
    // Cast data.role to UserRole to ensure type safety
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
      role: (data.role as UserRole) || 'customer',
      created_at: data.created_at,
      updated_at: data.updated_at,
      preferred_language: data.preferred_language || '',
      // Handle the new fields with appropriate fallbacks
      referral_count: data.credits || 0, // Use credits as fallback for referral_count
      salon_name: data.salon_name || '',
      company_name: data.custom_role || '', // Use custom_role as fallback for company_name
      custom_role: data.custom_role || '',
      contact_link: data.contact_link || '',
      skills: Array.isArray(data.preferences) ? data.preferences : [], // Use preferences array as fallback for skills
      skill_level: data.specialty || '', // Use specialty as fallback for skill_level
      profile_views: typeof data.credits === 'number' ? data.credits : 0, // Use credits as fallback for profile_views
      preferences: Array.isArray(data.preferences) ? data.preferences : []
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
  
  // Create a full UserProfile from the database response
  return {
    id: data.id,
    email: data.email || '',
    full_name: data.full_name || '',
    avatar_url: data.avatar_url || '',
    location: data.location || '',
    bio: data.bio || '',
    phone: data.phone || '',
    instagram: data.instagram || '',
    website: data.website || '',
    specialty: data.specialty || '',
    role: (data.role as UserRole) || 'customer',
    created_at: data.created_at,
    updated_at: data.updated_at,
    preferred_language: data.preferred_language || '',
    // Set default values for the additional fields
    referral_count: data.credits || 0,
    salon_name: '',
    company_name: '',
    custom_role: '',
    contact_link: '',
    skills: [],
    skill_level: '',
    profile_views: 0,
    preferences: []
  };
};
