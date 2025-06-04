
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
