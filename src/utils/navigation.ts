
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

/**
 * Normalizes user roles to handle variations and aliases
 * @param role The raw user role
 * @returns Normalized role for consistent routing
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
    default:
      return normalizedRole as UserRole;
  }
};

/**
 * Navigates the user to their role-specific dashboard
 * @param navigate The navigate function from react-router-dom
 * @param userRole The user's role from auth context
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
) => {
  console.log("Navigating based on role:", userRole);
  
  // Normalize the role for consistent routing
  const normalizedRole = normalizeRole(userRole);
  console.log("Normalized role:", normalizedRole);
  
  if (!normalizedRole) {
    // If no role defined, navigate to profile page to set role
    navigate("/profile/edit");
    toast.info("Please complete your profile to access your dashboard");
    return;
  }
  
  // Route based on normalized role
  switch (normalizedRole) {
    case 'artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
      navigate('/dashboard/owner');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
      navigate('/dashboard/supplier');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'renter':
      navigate('/dashboard/artist'); // Renters see artist dashboard
      break;
    case 'other':
    default:
      navigate('/dashboard/other');
  }
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
