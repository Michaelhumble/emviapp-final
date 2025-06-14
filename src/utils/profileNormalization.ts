
import { UserProfile, UserRole } from '@/context/auth/types';
import { normalizeRole } from './roles';

/**
 * Safely converts Json arrays to string arrays
 */
const jsonArrayToStringArray = (jsonArray: any): string[] => {
  if (!jsonArray || !Array.isArray(jsonArray)) return [];
  return jsonArray.filter(item => typeof item === 'string');
};

/**
 * Safely converts Json to any array type
 */
const jsonToArray = (json: any): any[] => {
  if (!json || !Array.isArray(json)) return [];
  return json;
};

/**
 * Normalizes raw database profile data to match UserProfile interface
 */
export const normalizeUserProfile = (rawProfile: any): UserProfile => {
  if (!rawProfile) {
    return {
      id: '',
      email: '',
      full_name: null,
      role: null,
      avatar_url: null,
      specialty: null,
      location: null,
      bio: null,
      instagram: null,
      website: null,
      created_at: null,
      updated_at: null,
      custom_role: null,
      contact_link: null,
      badges: null,
      accepts_bookings: null,
      completed_profile_tasks: null,
      portfolio_urls: null,
      referral_code: null,
      credits: null,
      profile_views: null,
      booking_url: null,
      boosted_until: null,
      salon_name: null,
      company_name: null,
      professional_name: null,
      address: null,
      years_experience: null,
      services: null,
      gallery: null,
      preferences: null,
      preferred_language: null,
      referred_by: null,
      referral_count: null,
      independent: null,
      skills: null,
      profile_completion: null,
      phone: null
    };
  }

  // Normalize the role to ensure consistency
  const normalizedRole = normalizeRole(rawProfile.role) as UserRole | null;

  return {
    id: rawProfile.id || '',
    email: rawProfile.email || '',
    full_name: rawProfile.full_name || null,
    role: normalizedRole,
    avatar_url: rawProfile.avatar_url || null,
    specialty: rawProfile.specialty || null,
    location: rawProfile.location || null,
    bio: rawProfile.bio || null,
    instagram: rawProfile.instagram || null,
    website: rawProfile.website || null,
    created_at: rawProfile.created_at || null,
    updated_at: rawProfile.updated_at || null,
    custom_role: rawProfile.custom_role || null,
    contact_link: rawProfile.contact_link || null,
    badges: rawProfile.badges ? jsonArrayToStringArray(rawProfile.badges) : null,
    accepts_bookings: rawProfile.accepts_bookings || null,
    completed_profile_tasks: rawProfile.completed_profile_tasks ? jsonArrayToStringArray(rawProfile.completed_profile_tasks) : null,
    portfolio_urls: rawProfile.portfolio_urls ? jsonArrayToStringArray(rawProfile.portfolio_urls) : null,
    referral_code: rawProfile.referral_code || null,
    credits: rawProfile.credits || null,
    profile_views: rawProfile.profile_views || null,
    booking_url: rawProfile.booking_url || null,
    boosted_until: rawProfile.boosted_until || null,
    salon_name: rawProfile.salon_name || null,
    company_name: rawProfile.company_name || null,
    professional_name: rawProfile.professional_name || null,
    address: rawProfile.address || null,
    years_experience: rawProfile.years_experience || null,
    services: rawProfile.services ? jsonToArray(rawProfile.services) : null,
    gallery: rawProfile.gallery ? jsonArrayToStringArray(rawProfile.gallery) : null,
    preferences: rawProfile.preferences || null,
    preferred_language: rawProfile.preferred_language || null,
    referred_by: rawProfile.referred_by || null,
    referral_count: rawProfile.referral_count || null,
    independent: rawProfile.independent || null,
    skills: rawProfile.skills ? jsonArrayToStringArray(rawProfile.skills) : null,
    profile_completion: rawProfile.profile_completion || null,
    phone: rawProfile.phone || null
  };
};

/**
 * Safely gets profile arrays with defaults
 */
export const getProfileArray = (profile: UserProfile, field: keyof UserProfile): any[] => {
  const value = profile[field];
  if (Array.isArray(value)) return value;
  return [];
};

/**
 * Safely gets profile strings with defaults
 */
export const getProfileString = (profile: UserProfile, field: keyof UserProfile): string => {
  const value = profile[field];
  if (typeof value === 'string') return value;
  return '';
};
