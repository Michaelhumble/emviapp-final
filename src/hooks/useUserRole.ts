
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/context/auth/types";
import { normalizeRole } from "@/utils/roles";

/**
 * Hook to get the user's role with multiple fallbacks
 * This serves as a single source of truth for role information
 */
export const useUserRole = (userId: string | undefined) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!userId) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      try {
        // Strategy 1: Try to get role from auth metadata (most accurate)
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (!authError && user?.user_metadata?.role) {
          const metadataRole = user.user_metadata.role as UserRole;
          const normalizedMetadataRole = normalizeRole(metadataRole);
          setUserRole(normalizedMetadataRole);
          setLoading(false);
          return;
        }

        // Strategy 2: Try to get role from database
        const { data: profile, error: dbError } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .maybeSingle();
        
        if (!dbError && profile?.role) {
          const databaseRole = profile.role as UserRole;
          const normalizedDbRole = normalizeRole(databaseRole);
          setUserRole(normalizedDbRole);
          setLoading(false);
          return;
        }

        // Strategy 3: Fallback to localStorage
        const localStorageRole = localStorage.getItem('emviapp_user_role') as UserRole | null;
        if (localStorageRole) {
          const normalizedLocalRole = normalizeRole(localStorageRole);
          setUserRole(normalizedLocalRole);
          setLoading(false);
          return;
        }

        // No role found
        setUserRole(null);
        setLoading(false);
      } catch (error) {
        // Final fallback - check localStorage one more time
        const localStorageRole = localStorage.getItem('emviapp_user_role') as UserRole | null;
        const normalizedLocalRole = normalizeRole(localStorageRole);
        setUserRole(normalizedLocalRole);
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [userId]);

  return { 
    userRole,
    loading,
    // Helper function to check if user has a specific role
    hasRole: (role: UserRole): boolean => {
      if (!userRole) return false;
      return normalizeRole(userRole) === normalizeRole(role);
    }
  };
};
