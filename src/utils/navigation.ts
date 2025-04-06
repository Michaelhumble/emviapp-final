
import { NavigateFunction } from "react-router-dom";
import { UserRole } from "@/context/auth/types";
import { toast } from "sonner";

/**
 * Navigates the user to their role-specific dashboard
 * @param navigate The navigate function from react-router-dom
 * @param userRole The user's role from auth context
 */
export const navigateToRoleDashboard = (
  navigate: (path: string) => void,
  userRole: string | null | undefined
) => {
  console.log("Navigating based on role:", userRole);

  if (!userRole) {
    // Handle missing role - redirect to role selection
    console.log("No role found, redirecting to select-role");
    navigate("/select-role");
    return;
  }

  // Normalize the role to lowercase for case-insensitive matching
  const normalizedRole = userRole.toLowerCase();

  // Map the role to the appropriate dashboard route
  if (normalizedRole.includes('artist') || normalizedRole === 'nail technician/artist') {
    navigate("/dashboard/artist");
  } else if (normalizedRole === 'salon' || normalizedRole === 'owner') {
    navigate("/dashboard/owner");
  } else if (normalizedRole === 'customer') {
    navigate("/dashboard/customer"); 
  } else if (normalizedRole === 'freelancer') {
    navigate("/dashboard/freelancer");
  } else if (
    normalizedRole === 'supplier' || 
    normalizedRole === 'vendor' || 
    normalizedRole === 'beauty supplier'
  ) {
    navigate("/dashboard/supplier");
  } else if (normalizedRole === 'renter') {
    // Renter is a type of artist in our system
    navigate("/dashboard/artist");
  } else if (normalizedRole === 'other') {
    navigate("/dashboard/other");
  } else {
    // Fallback for unknown roles
    console.warn("Unknown user role:", userRole);
    toast.error(`Unknown role: ${userRole}. Redirecting to general dashboard.`);
    navigate("/dashboard/other");
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
