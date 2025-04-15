
import { useAuth } from "@/context/auth";
import { useSafeQuery } from "./useSafeQuery";
import { ProfileCompletionStatus } from "@/types/profile-completion";
import { supabase } from "@/integrations/supabase/client";

export function useProfileCompletion() {
  const { user, userRole } = useAuth();

  const { data: completionStatus, isLoading } = useSafeQuery<ProfileCompletionStatus>({
    queryKey: ['profile-completion', user?.id],
    queryFn: async () => {
      if (!user?.id || !userRole) {
        throw new Error('User or role not found');
      }

      const { data, error } = await supabase
        .from('profile_completion_view')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Map missing required fields
      const missingFields = (data.required_fields || []).filter(field => {
        const value = data[field];
        return !value || value.length === 0;
      });

      return {
        isComplete: data.is_complete,
        completionPercentage: data.calculated_completion,
        requiredFields: data.required_fields || [],
        optionalFields: data.optional_fields || [],
        minCompletionPercentage: data.min_completion_percentage,
        missingFields
      };
    },
    enabled: !!user?.id && !!userRole,
    context: "profile-completion"
  });

  return {
    completionStatus,
    isLoading,
    isProfileComplete: completionStatus?.isComplete ?? false
  };
}
