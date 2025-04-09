
import { UserProfile as AuthUserProfile, UserRole } from "@/context/auth/types";
import { UserProfile as AppUserProfile } from "@/types/profile";
import { normalizeUserRole } from "@/utils/roleUtils";

/**
 * Adapts the auth context UserProfile to the application UserProfile type
 * This resolves type compatibility issues between different profile definitions
 */
export const adaptUserProfile = (profile: any | null): AppUserProfile | null => {
  if (!profile) return null;
  
  // Normalize the role to ensure type safety with UserRole enum
  const normalizedRole = normalizeUserRole(profile.role);
  
  // Create an adapted profile that matches the application UserProfile type
  const adaptedProfile: AppUserProfile = {
    id: profile.id,
    user_id: profile.id, // Map ID to user_id for compatibility
    full_name: profile.full_name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    bio: profile.bio || '',
    specialty: profile.specialty || '',
    services: [], // Default empty array
    location: profile.location || '',
    social_links: {
      instagram: profile.instagram || '',
      facebook: '',
      twitter: '',
      website: profile.website || ''
    },
    avatar_url: profile.avatar_url || '',
    gallery: [], // Default empty array
    availability: [], // Default empty array
    role: normalizedRole,
    verification_status: 'pending',
    created_at: profile.created_at,
    updated_at: profile.updated_at || '',
    salon_name: profile.salon_name || '',
    company_name: profile.company_name || '',
    product_type: '',
    instagram: profile.instagram || '',
    facebook: '',
    twitter: '',
    website: profile.website || '',
    preferred_language: profile.preferred_language as ('en' | 'vi' | 'es') || 'en',
    profile_views: profile.profile_views || 0,
    account_type: 'free',
    affiliate_code: profile.affiliate_code || '',
    referral_count: profile.referral_count || 0,
    skill_level: profile.skill_level || '',
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    preferences: Array.isArray(profile.preferences) ? profile.preferences : [],
    accepts_bookings: profile.accepts_bookings || false,
    booking_url: profile.booking_url || '',
    boosted_until: profile.boosted_until || '',
    portfolio_urls: Array.isArray(profile.portfolio_urls) ? profile.portfolio_urls : [],
    referral_code: profile.referral_code || ''
  };
  
  return adaptedProfile;
};
