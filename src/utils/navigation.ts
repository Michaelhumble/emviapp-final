
import { UserRole } from "@/context/auth/types";
import { NavigateFunction } from "react-router-dom";

/**
 * Navigates to the appropriate dashboard based on user role
 */
export function navigateToRoleDashboard(navigate: NavigateFunction, role: UserRole): void {
  console.log("Navigating to dashboard for role:", role);
  
  switch (role.toLowerCase()) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    default:
      navigate('/dashboard');
  }
}

/**
 * Checks if a user has access to a specific role's content
 * @param userRole The current user's role
 * @param requiredRole The role required for access
 * @returns boolean indicating whether access should be granted
 */
export function hasRoleAccess(userRole: UserRole | null | undefined, requiredRole: UserRole): boolean {
  if (!userRole) return false;
  
  // Convert roles to lowercase for comparison
  const currentRole = userRole.toLowerCase();
  const required = requiredRole.toLowerCase();
  
  // Direct match
  if (currentRole === required) return true;
  
  // Special cases for role aliases
  if (required === 'artist' && (currentRole === 'nail technician/artist')) return true;
  if (required === 'salon' && (currentRole === 'owner')) return true;
  
  // Admin has access to everything
  if (currentRole === 'admin') return true;
  
  return false;
}

/**
 * Returns a personalized greeting based on user role
 * @param userRole The user's role
 * @param name The user's name
 * @returns A personalized greeting string
 */
export function getPersonalizedGreeting(userRole: UserRole | null | undefined, name: string): string {
  if (!userRole) return `Welcome, ${name}`;
  
  switch (userRole.toLowerCase()) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome to your studio, ${name}`;
    case 'salon':
    case 'owner':
      return `Welcome to your salon dashboard, ${name}`;
    case 'freelancer':
      return `Ready for today's opportunities, ${name}?`;
    case 'customer':
      return `Hello, ${name}`;
    case 'supplier':
    case 'beauty supplier':
      return `Welcome to your supplier portal, ${name}`;
    case 'admin':
      return `Admin Dashboard: Welcome, ${name}`;
    default:
      return `Welcome to EmviApp, ${name}`;
  }
}
