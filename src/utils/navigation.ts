
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

/**
 * Normalizes user roles to handle variations and aliases
 * IMPORTANT: This is the single source of truth for role normalization
 */
const normalizeRole = (role: UserRole | null): UserRole | null => {
  if (!role) return null;
  
  // Convert role to lowercase for case-insensitive comparison
  const normalizedRole = role.toLowerCase() as UserRole;
  
  // Map role variations to standard roles
  switch (normalizedRole) {
    case 'nail technician/artist':
      return 'artist';
    case 'owner':
      return 'salon';
    case 'beauty supplier':
    case 'vendor':
      return 'supplier';
    case 'renter':
      return 'artist'; // Renters see artist dashboard
    default:
      return normalizedRole as UserRole;
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
  const normalizedRole = normalizeRole(userRole);
  console.log("[Dashboard Navigation] Normalized role:", normalizedRole);
  
  if (!normalizedRole) {
    console.error("[Dashboard Navigation] No role defined for user");
    navigate("/profile/edit");
    toast.error("Please complete your profile to access your dashboard");
    return;
  }
  
  // Store normalized role in localStorage for persistence
  localStorage.setItem('emviapp_user_role', normalizedRole);
  
  let targetDashboard = '';
  
  // Route based on normalized role
  switch (normalizedRole) {
    case 'artist':
      targetDashboard = '/dashboard/artist';
      break;
    case 'salon':
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
  navigate(targetDashboard);
};

/**
 * Check if a user is allowed to view a specific route based on their role
 * @param userRole The user's role from auth context
 * @param allowedRoles Array of roles allowed to access the route
 * @returns Boolean indicating if the user has access
 */
export const hasRoleAccess = (
  userRole: UserRole | null,
  allowedRoles: UserRole[]
): boolean => {
  if (!userRole) return false;
  
  // Normalize the user's role
  const normalizedRole = normalizeRole(userRole);
  
  // Check if normalized role is in allowed roles
  return allowedRoles.includes(normalizedRole as UserRole);
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
  const normalizedRole = normalizeRole(role);

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
