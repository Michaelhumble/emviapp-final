
import { NavigateFunction } from "react-router-dom";
import { UserRole, LegacyUserRole } from "@/context/auth/types";
import { toast } from "sonner";
import { normalizeUserRole } from "./roleUtils";

/**
 * Navigates the user to their role-specific dashboard with validation
 */
export const navigateToRoleDashboard = (
  navigate: NavigateFunction,
  userRole: UserRole | null
) => {
  console.log("[Dashboard Navigation] Original role:", userRole);
  
  if (!userRole) {
    console.error("[Dashboard Navigation] No role defined for user");
    navigate("/choose-role");
    toast.error("Please select your role to access your dashboard");
    return;
  }
  
  // Normalize role to ensure consistent routing
  const normalizedRole = normalizeUserRole(userRole);
  console.log("[Dashboard Navigation] Normalized role:", normalizedRole);
  
  if (!normalizedRole) {
    console.error("[Dashboard Navigation] Invalid role after normalization");
    navigate("/choose-role");
    toast.error("Your role needs to be set up. Please select a role.");
    return;
  }
  
  let targetDashboard = '';
  
  // Route based on normalized role - STRICT MAPPING
  switch (normalizedRole) {
    case 'artist':
      targetDashboard = '/dashboard/artist';
      break;
    case 'salon_owner':
      targetDashboard = '/dashboard/salon';
      break;
    case 'customer':
      targetDashboard = '/dashboard/customer';
      break;
    case 'supplier':
      targetDashboard = '/dashboard/supplier';
      break;
    case 'freelancer':
      targetDashboard = '/dashboard/freelancer';
      break;
    case 'other':
      targetDashboard = '/dashboard/other';
      break;
    default:
      console.error("[Dashboard Navigation] Invalid role:", normalizedRole);
      navigate("/choose-role");
      toast.error("Invalid user role. Please update your profile.");
      return;
  }

  console.log("[Dashboard Navigation] Redirecting to:", targetDashboard);
  
  // Force navigation to the correct dashboard
  if (window.location.pathname !== targetDashboard) {
    console.log(`[Dashboard Navigation] FORCE REDIRECT: ${window.location.pathname} → ${targetDashboard}`);
    navigate(targetDashboard);
  } else {
    console.log("[Dashboard Navigation] Already on correct dashboard");
  }
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
      return `Welcome back, ${name}! Ready to showcase your artistry?`;
    case 'salon_owner':
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

// Re-export normalizeUserRole for convenience
export { normalizeUserRole };
