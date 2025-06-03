
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
    // Get user profile data
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    if (!data) return null;
    
    // Transform database record to UserProfile type with safe fallbacks
    const profile: UserProfile = {
      id: data.id,
      email: data.email || '',
      full_name: data.full_name || null,
      phone: data.phone || null,
      role: (data.role as UserRole) || null,
      avatar_url: data.avatar_url || null,
      specialty: data.specialty || null,
      location: data.location || null,
      bio: data.bio || null,
      instagram: data.instagram || null,
      website: data.website || null,
      created_at: data.created_at || null,
      updated_at: data.updated_at || null,
      
      // Additional database fields
      custom_role: data.custom_role || null,
      contact_link: data.contact_link || null,
      badges: Array.isArray(data.badges) ? data.badges : null,
      accepts_bookings: data.accepts_bookings || null,
      completed_profile_tasks: Array.isArray(data.completed_profile_tasks) ? data.completed_profile_tasks : null,
      
      // Social and professional fields
      portfolio_urls: Array.isArray(data.portfolio_urls) ? data.portfolio_urls : null,
      referral_code: data.referral_code || null,
      credits: typeof data.credits === 'number' ? data.credits : null,
      profile_views: typeof (data as any).profile_views === 'number' ? (data as any).profile_views : null,
      booking_url: data.booking_url || null,
      boosted_until: data.boosted_until || null,
      
      // Salon-specific - use safe access with proper typing
      salon_name: (data as any).salon_name || null,
      company_name: (data as any).company_name || null,
      professional_name: (data as any).professional_name || null,
      address: data.location || null, // Use location field for address compatibility
      
      // Experience and services - use safe access
      years_experience: typeof (data as any).years_experience === 'number' ? (data as any).years_experience : null,
      services: Array.isArray((data as any).services) ? (data as any).services : null,
      gallery: Array.isArray((data as any).gallery) ? (data as any).gallery : null,
      preferences: Array.isArray(data.preferences) ? data.preferences : null,
    };
    
    // Also update the cache for faster subsequent access
    cacheProfile(userId, profile, profile.role || null);
    
    return profile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // Only show toast in interactive contexts, not during initial loading
    if ((error as any)?.code !== 'PGRST116') { // Not the "No rows returned" error
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
    // Extract basic information from user object
    const email = user.email || '';
    const fullName = user.user_metadata?.full_name || null;
    const role = (user.user_metadata?.role as UserRole) || 'customer';
    
    // Default profile data
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
    
    // Insert new profile into database
    const { error } = await supabase
      .from('users')
      .upsert(profileData);
    
    if (error) throw error;
    
    // Fetch the full profile after creating
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
    // Convert any number values for created_at to string to satisfy TypeScript
    const updateData: Record<string, any> = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    
    // Ensure created_at is a string if it exists
    if (updateData.created_at && typeof updateData.created_at === 'number') {
      updateData.created_at = new Date(updateData.created_at).toISOString();
    }
    
    // Update profile in database
    const { error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', profile.id);
    
    if (error) throw error;
    
    toast.success('Profile updated successfully');
    
    // Fetch the updated profile - this also updates the cache
    return await fetchUserProfile(profile.id);
  } catch (error) {
    console.error('Error updating user profile:', error);
    toast.error('Failed to update profile');
    return null;
  }
};
