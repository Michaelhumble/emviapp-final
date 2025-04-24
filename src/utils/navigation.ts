
import { UserRole } from "@/context/auth/types";
import { NavigateFunction } from "react-router-dom";

export const navigateToRoleDashboard = (navigate: NavigateFunction, role: UserRole): void => {
  switch (role) {
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
};
