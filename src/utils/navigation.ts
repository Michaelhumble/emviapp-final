import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";
import { normalizeRole } from "./roles";

/**
 * Navigates the user to their role-specific dashboard with validation
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
) => {
  // Normalize the role for consistent routing
  const normalizedRole = normalizeRole(userRole);
  
  if (!normalizedRole) {
    navigate("/profile/edit");
    toast.error("Please complete your profile to access your dashboard");
    return;
  }
  
  // Store normalized role in localStorage for persistence
  localStorage.setItem('emviapp_user_role', normalizedRole);
  
  // Route based on normalized role
  switch (normalizedRole) {
    case 'artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'manager':
      navigate('/dashboard/manager');
      break;
    case 'other':
    default:
      navigate('/dashboard/other');
      break;
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
    default:
      return `Hello, ${name}! Welcome to your dashboard.`;
  }
};
