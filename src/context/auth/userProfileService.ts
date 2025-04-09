
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { Json } from '@/integrations/supabase/types';

/**
 * Fetches the user profile data from Supabase
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    console.log("Fetching user profile for:", userId);
    
    // Get user profile from the database using maybeSingle to prevent errors
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
      console.log('No user profile found');
      return null;
    }
    
    console.log("User profile retrieved:", data);
    
    // Cast role to UserRole and create user profile
    const fetchedRole = data.role ? (data.role as UserRole) : null;
    
    // Create a profile object, safely checking if each property exists
    const profile: UserProfile = {
      id: data.id || userId,
      email: data.email || '',
      full_name: data.full_name || '',
      avatar_url: data.avatar_url || '',
      location: data.location || '',
      bio: data.bio || '',
      phone: data.phone || '',
      instagram: data.instagram || '',
      website: data.website || '',
      specialty: data.specialty || '',
      role: fetchedRole || 'customer',
      created_at: data.created_at || new Date().toISOString(),
      updated_at: data.updated_at || new Date().toISOString(),
      preferred_language: data.preferred_language || '',
      
      // Safely access properties with proper type checking
      salon_name: typeof data.salon_name === 'string' ? data.salon_name : '',
      custom_role: typeof data.custom_role === 'string' ? data.custom_role : '',
      contact_link: typeof data.contact_link === 'string' ? data.contact_link : '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      skill_level: typeof data.skill_level === 'string' ? data.skill_level : '',
      profile_views: typeof data.profile_views === 'number' ? data.profile_views : 0,
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      affiliate_code: typeof data.affiliate_code === 'string' ? data.affiliate_code : '',
      referral_code: typeof data.referral_code === 'string' ? data.referral_code : '',
      referral_count: typeof data.referral_count === 'number' ? data.referral_count : 0,
      credits: typeof data.credits === 'number' ? data.credits : 0,
      boosted_until: typeof data.boosted_until === 'string' ? data.boosted_until : null,
      portfolio_urls: Array.isArray(data.portfolio_urls) ? data.portfolio_urls : [],
      accepts_bookings: typeof data.accepts_bookings === 'boolean' ? data.accepts_bookings : false,
      booking_url: typeof data.booking_url === 'string' ? data.booking_url : '',
      completed_profile_tasks: Array.isArray(data.completed_profile_tasks) ? data.completed_profile_tasks : []
    };
    
    return profile;
  } catch (err) {
    console.error("Error in fetchUserProfile:", err);
    return null;
  }
};

/**
 * Creates a new user profile in Supabase
 */
export const createUserProfile = async (user: User): Promise<UserProfile | null> => {
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
    credits: 0,
    portfolio_urls: []
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
      .maybeSingle();
  
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    // Fetch the newly created profile
    return await fetchUserProfile(user.id);
    
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return null;
  }
};
