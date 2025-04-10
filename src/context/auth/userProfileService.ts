
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
      user_id: data.id, // Add user_id matching id
      full_name: data.full_name || '',
      email: data.email || '',
      phone: data.phone || '',
      bio: data.bio || '',
      specialty: data.specialty || '',
      location: data.location || '',
      avatar_url: data.avatar_url || '',
      role: (data.role as string) || 'customer',
      created_at: data.created_at || '',
      updated_at: data.updated_at || '',
      
      // Social media fields
      instagram: data.instagram || '',
      website: data.website || '',
      
      // Additional fields that might exist in DB
      salon_name: data.salon_name || '', 
      company_name: data.company_name || '', 
      preferred_language: data.preferred_language || 'en',
      profile_views: data.profile_views || 0,
      account_type: data.account_type || 'free',
      referral_code: data.referral_code || '',
      referral_count: data.referral_count || 0,
      booking_url: data.booking_url || '',
      boosted_until: data.boosted_until || null,
      skills: data.skills || [],
      portfolio_urls: data.portfolio_urls || [],
      credits: data.credits || 0,
      custom_role: data.custom_role || '',
      contact_link: data.contact_link || '',
      badges: data.badges || [],
      accepts_bookings: Boolean(data.accepts_bookings),
      preferences: Array.isArray(data.preferences) ? data.preferences : [],
      completed_profile_tasks: Array.isArray(data.completed_profile_tasks) ? data.completed_profile_tasks : [],
      services: data.services || []
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
    const role = (user.user_metadata?.role as string) || 'customer';
    
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
    // Create update object with only valid properties for Supabase
    const updateData: any = {
      ...profile,
      updated_at: new Date().toISOString()
    };
    
    // Remove properties that don't exist in the DB schema
    delete updateData.uid;
    delete updateData.displayName;
    delete updateData.photoURL;
    delete updateData.phoneNumber;
    delete updateData.servicesOffered;
    delete updateData.socialLinks;
    delete updateData.gallery;
    delete updateData.pricing;
    delete updateData.paymentPreferences;
    delete updateData.schedulingOptions;
    delete updateData.reviews;
    delete updateData.additionalNotes;
    delete updateData.lastSeen;
    delete updateData.accountType;
    delete updateData.is_active;
    delete updateData.stripeCustomerId;
    delete updateData.stripeSubscriptionId;
    delete updateData.stripePriceId;
    delete updateData.stripeCurrentPeriodEnd;
    delete updateData.emailVerified;
    delete updateData.username;
    delete updateData.firstName;
    delete updateData.lastName;
    delete updateData.gender;
    delete updateData.birthDate;
    delete updateData.address;
    delete updateData.city;
    delete updateData.state;
    delete updateData.zipCode;
    delete updateData.years_experience;
    
    // Update profile in database
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
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
