
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types/authTypes";

/**
 * Navigate to the appropriate dashboard based on user role
 */
export function navigateToRoleDashboard(navigate: NavigateFunction, role: UserRole | null): void {
  if (!role) {
    navigate('/role-selection');
    return;
  }
  
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      navigate('/dashboard/supplier');
      break;
    case 'renter':
      navigate('/dashboard/artist'); // Renters use artist dashboard for now
      break;
    case 'manager':
      navigate('/dashboard/manager');
      break;
    case 'admin':
      navigate('/dashboard/admin');
      break;
    default:
      navigate('/dashboard');
  }
}

/**
 * Get a personalized greeting based on user name and role
 */
export function getPersonalizedGreeting(name: string, role: UserRole | null): string {
  const defaultGreeting = `Welcome back, ${name}!`;
  
  if (!role) return defaultGreeting;
  
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome to your artist dashboard, ${name}!`;
    case 'customer':
      return `Welcome, ${name}!`;
    case 'salon':
    case 'owner':
      return `Welcome to your salon dashboard, ${name}!`;
    case 'freelancer':
      return `Welcome, Freelancer ${name}!`;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return `Welcome to your supplier dashboard, ${name}!`;
    default:
      return defaultGreeting;
  }
}

/**
 * Check if a user has access to a specific role-based area
 * @param userRole The current user's role
 * @param allowedRoles Array of roles that have access
 * @returns Boolean indicating if the user has access
 */
export function hasRoleAccess(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}
