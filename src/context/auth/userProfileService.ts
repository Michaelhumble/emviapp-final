
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { toast } from 'sonner';

/**
 * Fetch user profile from Supabase
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) return null;
  
  try {
    // Get user profile data
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // Transform database record to UserProfile type
    const profile: UserProfile = {
      id: data.id,
      user_id: data.id, // Use id as user_id since it might not exist in DB
      full_name: data.full_name || '',
      email: data.email || '',
      phone: data.phone || '',
      bio: data.bio || '',
      specialty: data.specialty || '',
      // For properties that don't exist in the database, provide default values
      services: [], // Initialize with empty array since it doesn't exist in DB
      location: data.location || '',
      social_links: {
        instagram: data.instagram || '',
        facebook: data.instagram || '', // Use instagram as fallback
        twitter: data.instagram || '', // Use instagram as fallback
        website: data.website || '',
      },
      avatar_url: data.avatar_url || '',
      gallery: [], // Initialize with empty array since it doesn't exist in DB
      availability: [], // Initialize with empty array since it doesn't exist in DB
      role: (data.role as UserRole) || 'customer',
      verification_status: 'pending', // Default since it doesn't exist in DB
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      
      // Optional fields with null-coalescing to handle potential undefined values
      salon_name: typeof data.salon_name === 'string' ? data.salon_name : '',
      company_name: typeof data.salon_name === 'string' ? data.salon_name : '', // Use salon_name as fallback if it exists
      product_type: data.specialty || '', // Use specialty as fallback
      instagram: data.instagram || '',
      facebook: data.instagram || '', // Use instagram as fallback
      twitter: data.instagram || '', // Use instagram as fallback
      website: data.website || '',
      preferred_language: (data.preferred_language as any) || 'en',
      profile_views: 0, // Default since it doesn't exist in DB
      account_type: 'free', // Default since it doesn't exist in DB
      affiliate_code: data.referral_code || '', // Use referral_code as fallback
      referral_code: data.referral_code || '',
      referral_count: data.credits ? 0 : 0, // Default since it doesn't exist in DB
      skill_level: data.specialty || '', // Use specialty as fallback
      skills: [], // Initialize with empty array since it doesn't exist in DB
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      accepts_bookings: Boolean(data.accepts_bookings),
      booking_url: data.booking_url || '',
      boosted_until: data.boosted_until || null,
      profile_completion: typeof data.credits === 'number' ? data.credits : 0, // Use credits as fallback since profile_completion doesn't exist
      completed_profile_tasks: Array.isArray(data.completed_profile_tasks) ? data.completed_profile_tasks : [],
      portfolio_urls: Array.isArray(data.portfolio_urls) ? data.portfolio_urls : [],
      credits: data.credits || 0,
      custom_role: data.custom_role || '',
      contact_link: data.contact_link || '',
      badges: data.badges || [],
    };
    
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    toast.error('Failed to load profile information');
    return null;
  }
};

/**
 * Create a new user profile in Supabase
 */
export const createUserProfile = async (user: any): Promise<UserProfile | null> => {
  if (!user || !user.id) {
    console.error('User data is required to create a profile');
    return null;
  }
  
  try {
    // Extract basic information from user object
    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || '';
    const role = (user.user_metadata?.role as UserRole) || 'customer';
    
    // Default profile data
    const profileData = {
      id: user.id,
      email,
      full_name: fullName,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profile_completion: 0,
      credits: 0,
      completed_profile_tasks: [],
    };
    
    // Insert new profile into database
    const { data, error } = await supabase
      .from('users')
      .upsert(profileData)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      toast.error('Profile creation failed: No data returned');
      return null;
    }
    
    // Transform response to UserProfile type
    return await fetchUserProfile(user.id);
  } catch (error) {
    console.error('Error creating user profile:', error);
    toast.error('Failed to create profile');
    return null;
  }
};

/**
 * Update user profile in Supabase
 */
export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfile | null> => {
  if (!profile.id) {
    console.error('User ID is required to update profile');
    toast.error('Profile update failed: Missing user ID');
    return null;
  }
  
  try {
    // Update profile in database
    const { data, error } = await supabase
      .from('users')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) throw error;
    
    if (!data) {
      toast.error('Profile update failed: No data returned');
      return null;
    }
    
    toast.success('Profile updated successfully');
    
    // Transform response to UserProfile type
    return await fetchUserProfile(profile.id);
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error('Failed to update profile');
    return null;
  }
};
