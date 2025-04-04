
import { UserRole } from "@/context/auth/types";
import { NavigateFunction } from "react-router-dom";

/**
 * Navigates to the appropriate dashboard based on user role
 * @param navigate The React Router navigate function
 * @param userRole The role of the current user
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
): void => {
  if (!userRole) {
    // If no role is found, redirect to the home page
    navigate('/');
    console.log("No user role found, redirecting to home page");
    return;
  }
  
  console.log(`Navigating based on role: ${userRole}`);
  
  switch(userRole) {
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
      navigate('/dashboard/salon');
      break;
    case 'owner':
      navigate('/dashboard/owner');
      break;
    case 'vendor':
    case 'supplier':
    case 'beauty supplier':
      navigate('/dashboard/supplier');
      break;
    case 'freelancer':
    case 'renter':
      navigate('/dashboard/freelancer');
      break;
    case 'other':
      navigate('/dashboard/other');
      break;
    default:
      // Default fallback to home page
      console.log(`Unknown role ${userRole}, redirecting to home page`);
      navigate('/');
      break;
  }
};

/**
 * Returns a personalized greeting based on user role
 * @param name The user's name
 * @param role The user's role
 * @returns Personalized greeting string
 */
export const getPersonalizedGreeting = (name: string, role?: UserRole | null): string => {
  // Default greeting
  if (!role) return `Welcome, ${name}!`;
  
  switch(role) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome back, ${name}! Here's your artist dashboard.`;
    case 'salon':
    case 'owner':
      return `Welcome back, ${name}! Here's your salon dashboard.`;
    case 'vendor':
    case 'supplier':
    case 'beauty supplier':
      return `Welcome back, ${name}! Here's your supplier dashboard.`;
    case 'freelancer':
    case 'renter':
      return `Welcome back, ${name}! Here's your freelancer dashboard.`;
    case 'customer':
      return `Welcome back, ${name}! Here's your customer dashboard.`;
    case 'other':
      return `Welcome back, ${name}! Here's your dashboard.`;
    default:
      return `Welcome back, ${name}!`;
  }
};
