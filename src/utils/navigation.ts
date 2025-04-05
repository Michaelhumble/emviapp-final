
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

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
  
  if (!userRole) {
    // If no role defined, navigate to profile page to set role
    navigate("/profile/edit");
    toast.info("Please complete your profile to access your dashboard");
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

  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return `Welcome back, ${name}! Ready to showcase your artistry?`;
    case 'salon':
    case 'owner':
      return `Hello, ${name}! Managing your salon made easy.`;
    case 'customer':
      return `Welcome, ${name}! Discover your perfect beauty experience.`;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return `Welcome, ${name}! Showcase your products to businesses.`;
    case 'freelancer':
      return `Hey ${name}! Find your next gig today.`;
    case 'renter':
      return `Welcome, ${name}! Manage your booth rental and clients.`;
    default:
      return `Hello, ${name}! Welcome to your dashboard.`;
  }
};
