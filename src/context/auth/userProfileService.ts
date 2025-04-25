import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from './types';
import { toast } from 'sonner';
import { cacheProfile } from './utils/profileCache';

/**
 * Enhanced fetch user profile from Supabase with improved error handling
 * and optimized for performance
 */
export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) return null;
  
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    if (!data) return null;
    
    const profile: UserProfile = {
      id: data.id,
      full_name: data.full_name || '',
      email: data.email || '',
      phone: data.phone || '',
      bio: data.bio || '',
      specialty: data.specialty || '',
      location: data.location || '',
      avatar_url: data.avatar_url || '',
      role: (data.role as UserRole) || 'customer',
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      instagram: data.instagram || '',
      website: data.website || '',
      preferred_language: data.preferred_language || 'en',
      referral_code: data.referral_code || '',
      affiliate_code: data.referral_code || '',
      booking_url: data.booking_url || '',
      boosted_until: data.boosted_until || null,
      portfolio_urls: Array.isArray(data.portfolio_urls) ? data.portfolio_urls : [],
      credits: typeof data.credits === 'number' ? data.credits : 0,
      contact_link: data.contact_link || '',
      badges: data.badges || [],
      accepts_bookings: Boolean(data.accepts_bookings),
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      completed_profile_tasks: Array.isArray(data.completed_profile_tasks) ? data.completed_profile_tasks : [],
      profile_completion: typeof data.profile_completion === 'number' ? data.profile_completion : 0
    };
    
    cacheProfile(userId, profile, profile.role || null);
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if ((error as any)?.code !== 'PGRST116') {  
      toast.error('Failed to load profile information');
    }
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
    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || '';
    const role = (user.user_metadata?.role as UserRole) || 'customer';
    
    const profileData = {
      id: user.id,
      email,
      full_name: fullName,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      credits: 0,
      completed_profile_tasks: [],
    };
    
    const { error } = await supabase
      .from('users')
      .upsert(profileData);
    
    if (error) throw error;
    
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
    const updateData: Record<string, any> = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    
    if (updateData.created_at && typeof updateData.created_at === 'number') {
      updateData.created_at = new Date(updateData.created_at).toISOString();
    }
    
    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', profile.id);
    
    if (error) throw error;
    
    toast.success('Profile updated successfully');
    
    return await fetchUserProfile(profile.id);
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error('Failed to update profile');
    return null;
  }
};
