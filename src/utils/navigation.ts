
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";

/**
 * Navigates the user to their role-specific dashboard
 * @param navigate The navigate function from react-router-dom
 * @param userRole The user's role from auth context
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
) => {
  if (!userRole) {
    // If no role defined, navigate to profile page to set role
    navigate("/profile/edit");
    return;
  }
  
  switch (userRole) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/owner');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
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
  return allowedRoles.includes(userRole);
};
