
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

// Add the missing function for personalized greeting
export const getPersonalizedGreeting = (name: string, role: UserRole | null): string => {
  const hour = new Date().getHours();
  let timeGreeting = "Hello";
  
  if (hour < 12) {
    timeGreeting = "Good morning";
  } else if (hour < 18) {
    timeGreeting = "Good afternoon";
  } else {
    timeGreeting = "Good evening";
  }
  
  let roleSpecificMessage = "";
  if (role) {
    switch (role) {
      case 'artist':
      case 'nail technician/artist':
        roleSpecificMessage = "Ready to showcase your artistry?";
        break;
      case 'salon':
      case 'owner':
        roleSpecificMessage = "How's your salon doing today?";
        break;
      case 'customer':
        roleSpecificMessage = "Ready for your beauty journey?";
        break;
      case 'freelancer':
        roleSpecificMessage = "Your clients are waiting!";
        break;
      case 'supplier':
        roleSpecificMessage = "Ready to supply beauty essentials?";
        break;
      default:
        roleSpecificMessage = "Welcome to EmviApp!";
    }
  }
  
  return `${timeGreeting}, ${name}${roleSpecificMessage ? `. ${roleSpecificMessage}` : ''}`;
};

// Add the missing function for role access checking
export const hasRoleAccess = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  if (!userRole || !allowedRoles || allowedRoles.length === 0) {
    return false;
  }
  
  return allowedRoles.includes(userRole);
};
