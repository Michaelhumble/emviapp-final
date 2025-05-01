
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFreshProfileData, profileKeys } from '@/context/auth/utils/profileFetcher';
import { updateUserProfile } from '@/context/auth/userProfileService';
import { UserProfile } from '@/context/auth/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useProfileQuery(userId: string | undefined) {
  const queryClient = useQueryClient();
  
  const {
    data: profileData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: userId ? profileKeys.userData(userId) : profileKeys.all,
    queryFn: async () => {
      if (!userId) return null;
      const result = await fetchFreshProfileData(userId);
      return result;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes - replaces cacheTime
  });

  // Mutation for updating the profile
  const updateProfileMutation = useMutation({
    mutationFn: async (profileUpdate: Partial<UserProfile>) => {
      if (!userId) throw new Error("No user ID provided");
      if (!profileUpdate.id) {
        profileUpdate.id = userId;
      }
      return await updateUserProfile(profileUpdate);
    },
    onSuccess: (updatedProfile) => {
      if (updatedProfile) {
        // Invalidate and refetch the profile query
        queryClient.invalidateQueries({ queryKey: profileKeys.userData(userId!) });
        toast.success("Profile updated successfully");
      }
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  });

  // Function to synchronize role with auth metadata
  const syncRoleWithAuth = async (role: string) => {
    try {
      await supabase.auth.updateUser({
        data: { role }
      });
      return true;
    } catch (error) {
      console.error("Failed to sync role with auth:", error);
      return false;
    }
  };

  return {
    profile: profileData?.profile || null,
    role: profileData?.role || null,
    isLoading,
    isError,
    refreshProfile: refetch,
    updateProfile: updateProfileMutation.mutate,
    isUpdating: updateProfileMutation.isPending, // Updated from isLoading to isPending
    syncRoleWithAuth
  };
}
