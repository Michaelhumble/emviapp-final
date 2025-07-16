/**
 * UNIVERSAL AUTH & DASHBOARD ROUTING UTILITY
 * Single source of truth for role-to-dashboard mapping
 * 
 * CRITICAL: This file centralizes ALL role→dashboard logic
 * DO NOT duplicate this logic anywhere else in the app
 */

import { UserRole } from '@/context/auth/types';

// Define all possible dashboard routes
export const DASHBOARD_ROUTES = {
  ARTIST: '/dashboard/artist',
  SALON: '/dashboard/salon',
  CUSTOMER: '/dashboard/customer',
  FREELANCER: '/dashboard/freelancer',
  SUPPLIER: '/dashboard/supplier',
  MANAGER: '/dashboard/manager',
  ADMIN: '/dashboard/admin',
  OTHER: '/dashboard/other',
  DEFAULT: '/dashboard/other', // Fallback for unknown roles
  ONBOARDING: '/onboarding' // For users without roles
} as const;

/**
 * SINGLE SOURCE OF TRUTH: Role to Dashboard Mapping
 * This is the ONLY place where role→dashboard logic should exist
 */
export const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  'artist': DASHBOARD_ROUTES.ARTIST,
  'nail technician/artist': DASHBOARD_ROUTES.ARTIST,
  'salon': DASHBOARD_ROUTES.SALON,
  'owner': DASHBOARD_ROUTES.SALON,
  'customer': DASHBOARD_ROUTES.CUSTOMER,
  'freelancer': DASHBOARD_ROUTES.FREELANCER,
  'supplier': DASHBOARD_ROUTES.SUPPLIER,
  'beauty supplier': DASHBOARD_ROUTES.SUPPLIER,
  'vendor': DASHBOARD_ROUTES.SUPPLIER,
  'manager': DASHBOARD_ROUTES.MANAGER,
  'admin': DASHBOARD_ROUTES.ADMIN,
  'renter': DASHBOARD_ROUTES.OTHER,
  'other': DASHBOARD_ROUTES.OTHER
};

/**
 * Get dashboard route for a user role
 * @param role - User's role
 * @returns Dashboard route path
 */
export const getDashboardRoute = (role: UserRole | null | undefined): string => {
  if (!role) {
    console.warn('🚨 No role provided - redirecting to onboarding');
    return DASHBOARD_ROUTES.ONBOARDING;
  }

  const route = ROLE_DASHBOARD_MAP[role];
  if (!route) {
    console.warn(`🚨 Unknown role "${role}" - using default dashboard`);
    return DASHBOARD_ROUTES.DEFAULT;
  }

  console.log(`✅ Role "${role}" → Dashboard "${route}"`);
  return route;
};

/**
 * Check if user needs role selection (onboarding)
 * @param role - User's role
 * @returns True if user needs to select a role
 */
export const needsRoleSelection = (role: UserRole | null | undefined): boolean => {
  return !role || !ROLE_DASHBOARD_MAP[role];
};

/**
 * Navigate to correct dashboard based on role
 * @param navigate - React Router navigate function
 * @param role - User's role
 */
export const navigateToRoleDashboard = (
  navigate: (path: string) => void, 
  role: UserRole | null | undefined
): void => {
  const route = getDashboardRoute(role);
  console.log(`🚀 Navigating to: ${route}`);
  navigate(route);
};

/**
 * Role display names for UI
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
  'artist': 'Nail Artist',
  'nail technician/artist': 'Nail Technician',
  'salon': 'Salon Owner',
  'owner': 'Salon Owner',
  'customer': 'Customer',
  'freelancer': 'Freelancer',
  'supplier': 'Supplier',
  'beauty supplier': 'Beauty Supplier',
  'vendor': 'Vendor',
  'manager': 'Manager',
  'admin': 'Administrator',
  'renter': 'Booth Renter',
  'other': 'Other'
};

/**
 * Get display name for role
 * @param role - User's role
 * @returns Human-readable role name
 */
export const getRoleDisplayName = (role: UserRole | null | undefined): string => {
  if (!role) return 'Unknown Role';
  return ROLE_DISPLAY_NAMES[role] || role;
};