import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

/**
 * Normalizes user roles to handle variations and aliases
 * This is the single source of truth for role normalization
 */
export const normalizeUserRole = (role: string | null): UserRole | null => {
  if (!role) return null;
  
  // Convert role to lowercase for case-insensitive comparison
  const normalizedRole = role.toLowerCase().trim();
  
  // Log the normalization process for debugging
  console.log(`[Role] Normalizing role: ${role} → ${normalizedRole}`);
  
  // Map role variations to standard roles
  switch (normalizedRole) {
    case 'nail technician/artist':
    case 'nail technician':
    case 'nail artist':
    case 'technician':
    case 'nail tech':
    case 'artist':
    case 'renter':
    case 'booth renter':
      console.log('[Role] Normalized to: artist');
      return 'artist';
      
    case 'owner':
    case 'salon owner':
    case 'salon business':
    case 'business owner':
    case 'salon':
      console.log('[Role] Normalized to: salon');
      return 'salon';
      
    case 'beauty supplier':
    case 'vendor':
    case 'supplier':
    case 'beauty vendor':
      console.log('[Role] Normalized to: supplier');
      return 'supplier';
      
    case 'client':
    case 'customer':
    case 'user':
      console.log('[Role] Normalized to: customer');
      return 'customer';
      
    case 'freelancer':
    case 'other':
      return normalizedRole as UserRole;
      
    // Handle unknown roles - Don't default to customer anymore, return null for proper error handling
    default:
      console.warn(`[Role] Unknown role: ${role}, roles should be explicitly mapped`);
      return null;
  }
};

/**
 * Navigates the user to their role-specific dashboard with validation
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
) => {
  console.log("[Dashboard Navigation] Original role:", userRole);
  
  // Normalize the role for consistent routing
  const normalizedRole = normalizeUserRole(userRole as string);
  console.log("[Dashboard Navigation] Normalized role:", normalizedRole);
  
  if (!normalizedRole) {
    console.error("[Dashboard Navigation] No role defined for user");
    navigate("/profile/edit");
    toast.error("Please complete your profile to access your dashboard");
    return;
  }
  
  let targetDashboard = '';
  
  // Route based on normalized role
  switch (normalizedRole) {
    case 'artist':
    case 'nail technician/artist':
      targetDashboard = '/dashboard/artist';
      break;
    case 'salon':
    case 'owner':
      targetDashboard = '/dashboard/salon';
      break;
    case 'customer':
      targetDashboard = '/dashboard/customer';
      break;
    case 'supplier':
      targetDashboard = '/dashboard/supplier';
      break;
    case 'freelancer':
      targetDashboard = '/dashboard/freelancer';
      break;
    case 'other':
      targetDashboard = '/dashboard/other';
      break;
    default:
      console.error("[Dashboard Navigation] Invalid role:", normalizedRole);
      navigate("/profile/edit");
      toast.error("Invalid user role. Please update your profile.");
      return;
  }

  console.log("[Dashboard Navigation] Redirecting to:", targetDashboard);
  // Use direct href navigation for more reliable redirection
  window.location.href = targetDashboard;
};

/**
 * Check if a user is allowed to view a specific route based on their role
 */
export const hasRoleAccess = (
  userRole: UserRole | null,
  allowedRoles: UserRole[]
): boolean => {
  if (!userRole) return false;
  
  // Normalize the user's role
  const normalizedRole = normalizeUserRole(userRole as string);
  
  // Log the access check for debugging
  console.log(`[Role Access] Checking if ${normalizedRole} has access to route requiring: ${allowedRoles.join(', ')}`);
  
  // Check if normalized role is in allowed roles
  const hasAccess = allowedRoles.includes(normalizedRole as UserRole);
  console.log(`[Role Access] Access granted: ${hasAccess}`);
  
  return hasAccess;
};

/**
 * Get a personalized greeting based on user's name and role
 * @param name The user's name
 * @param role The user's role
 * @returns A personalized greeting message
 */
export const getPersonalizedGreeting = (
  name: string,
  role: UserRole | null
): string => {
  if (!name || name.trim() === '') {
    name = "there";
  }
  
  if (!role) {
    return `Hello, ${name}!`;
  }
  
  // Normalize role for consistent greetings
  const normalizedRole = normalizeUserRole(role);

  switch (normalizedRole) {
    case 'artist':
      return `Welcome back, ${name}! Ready to showcase your artistry?`;
    case 'salon':
      return `Hello, ${name}! Managing your salon made easy.`;
    case 'customer':
      return `Welcome, ${name}! Discover your perfect beauty experience.`;
    case 'supplier':
      return `Welcome, ${name}! Showcase your products to businesses.`;
    case 'freelancer':
      return `Hey ${name}! Find your next gig today.`;
    case 'renter':
      return `Welcome, ${name}! Manage your booth rental and clients.`;
    default:
      return `Hello, ${name}! Welcome to your dashboard.`;
  }
};
