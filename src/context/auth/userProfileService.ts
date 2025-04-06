
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
    
    // Create a profile with safe access to fields that may not exist in the database
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
      // Safely handle properties that might not exist in the database
      referral_count: data.referral_count || 0,
      affiliate_code: data.referral_code || '',
      referral_code: data.referral_code || '',
      salon_name: data.salon_name || '',
      company_name: data.company_name || '',
      custom_role: data.custom_role || '',
      contact_link: data.contact_link || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      skill_level: data.skill_level || '',
      profile_views: data.profile_views || 0,
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      credits: data.credits || 0,
      boosted_until: data.boosted_until || null
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
  // Generate referral code if needed
  const referralCode = `EMVI${Math.floor(1000 + Math.random() * 9000)}`;
  
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
    updated_at: new Date().toISOString(),
    referral_code: referralCode,
    credits: 0
    // boosted_until is added conditionally below if it exists in the database
  };
  
  try {
    // Check if boosted_until column exists in users table
    const { error: schemaError } = await supabase
      .from('users')
      .select('boosted_until')
      .limit(1);
      
    // Only add boosted_until to the profile if the column exists
    const profileToInsert = !schemaError ? 
      { ...newProfile, boosted_until: null } : 
      newProfile;
      
    const { data, error } = await supabase
      .from('users')
      .insert([profileToInsert])
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
      // Safely handle properties that might not exist
      referral_count: data.referral_count || 0,
      affiliate_code: data.referral_code || referralCode,
      referral_code: data.referral_code || referralCode,
      salon_name: data.salon_name || '',
      company_name: data.company_name || '',
      custom_role: data.custom_role || '',
      contact_link: data.contact_link || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      skill_level: data.skill_level || '',
      profile_views: data.profile_views || 0,
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      credits: data.credits || 0,
      boosted_until: data.boosted_until || null
    };
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return null;
  }
};
