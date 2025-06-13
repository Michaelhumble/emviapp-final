
import { useAuth } from "@/context/auth";

/**
 * Simplified user role hook that uses the centralized auth context
 * This eliminates the complex fallback logic and multiple data sources
 */
export const useUserRole = (userId?: string) => {
  const { userRole, loading, user } = useAuth();
  
  // If a specific userId is requested and it doesn't match current user, return null
  // This maintains backward compatibility but uses centralized state
  if (userId && user?.id !== userId) {
    return {
      userRole: null,
      loading: false,
      hasRole: (role: any) => false
    };
  }

  return { 
    userRole,
    loading,
    // Helper function to check if user has a specific role
    hasRole: (role: any): boolean => {
      if (!userRole) return false;
      return userRole === role;
    }
  };
};
