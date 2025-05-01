
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/context/auth/types';
import { normalizeRole } from '@/utils/roles';
import { handleRoleChange } from '@/context/auth/utils/roleManagement';

// Query keys for role management
const roleKeys = {
  all: ['userRole'] as const,
  detail: (userId: string) => [...roleKeys.all, userId] as const,
};

export function useRoleQuery(userId: string | undefined) {
  const queryClient = useQueryClient();
  
  const { data: userRole, isLoading, isError } = useQuery({
    queryKey: userId ? roleKeys.detail(userId) : roleKeys.all,
    queryFn: async () => {
      if (!userId) return null;
      
      try {
        // Strategy 1: Try to get role from auth metadata
        const { data, error } = await supabase.auth.getUser();
        
        if (!error && data.user?.user_metadata?.role) {
          const metadataRole = data.user.user_metadata.role as UserRole;
          return normalizeRole(metadataRole);
        }
        
        // Strategy 2: Try to get role from database
        const { data: profile, error: dbError } = await supabase
          .from('users')
          .select('role')
          .eq('id', userId)
          .maybeSingle();
        
        if (!dbError && profile?.role) {
          const databaseRole = profile.role as UserRole;
          return normalizeRole(databaseRole);
        }
        
        // Strategy 3: Fallback to localStorage
        const localStorageRole = localStorage.getItem('emviapp_user_role') as UserRole | null;
        if (localStorageRole) {
          return normalizeRole(localStorageRole);
        }
        
        return null;
      } catch (error) {
        console.error("Error fetching user role:", error);
        
        // Final fallback - check localStorage
        const localStorageRole = localStorage.getItem('emviapp_user_role') as UserRole | null;
        return localStorageRole ? normalizeRole(localStorageRole) : null;
      }
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
  
  // Mutation for updating user role
  const updateRoleMutation = useMutation({
    mutationFn: async (newRole: UserRole) => {
      if (!userId) throw new Error("No user ID provided");
      
      // Handle role change and persist it
      const hasChanged = handleRoleChange(newRole, userRole || null);
      
      if (hasChanged) {
        // Update role in auth metadata
        await supabase.auth.updateUser({
          data: { role: newRole }
        });
        
        // Update role in database
        await supabase.from('users')
          .update({ role: newRole, updated_at: new Date().toISOString() })
          .eq('id', userId);
      }
      
      return hasChanged;
    },
    onSuccess: (hasChanged) => {
      if (hasChanged) {
        // Invalidate role queries
        queryClient.invalidateQueries({ queryKey: roleKeys.detail(userId!) });
      }
    }
  });
  
  // Helper function to check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!userRole) return false;
    return normalizeRole(userRole) === normalizeRole(role);
  };
  
  return {
    userRole,
    isLoading,
    isError,
    updateRole: updateRoleMutation.mutate,
    isUpdating: updateRoleMutation.isPending, // Updated from isLoading to isPending
    hasRole
  };
}
