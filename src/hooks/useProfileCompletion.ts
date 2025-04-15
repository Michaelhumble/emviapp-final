
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

interface ProfileCompletionStatus {
  isComplete: boolean;
  completionPercentage: number;
  minCompletionPercentage: number;
  requiredFields: string[];
  optionalFields: string[];
  missingFields: string[];
}

export function useProfileCompletion() {
  const { user, userProfile, userRole } = useAuth();
  const [completionStatus, setCompletionStatus] = useState<ProfileCompletionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      if (!user || !userProfile || !userRole) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // First, fetch profile requirements for the user's role
        const { data: requirementsData, error: requirementsError } = await supabase
          .from("profile_requirements")
          .select("*")
          .eq("role", userRole)
          .single();
        
        if (requirementsError) {
          // If no specific requirements found, use default values
          console.warn("No profile requirements found for role:", userRole);
          
          // Default required fields by role
          const defaultRequiredFields: Record<string, string[]> = {
            artist: ["full_name", "bio", "specialty", "location"],
            owner: ["full_name", "location", "bio", "phone"],
            customer: ["full_name"],
            freelancer: ["full_name", "bio", "specialty", "location"],
            supplier: ["full_name", "location", "phone"],
            renter: ["full_name", "location"],
            other: ["full_name"]
          };
          
          const requiredFields = defaultRequiredFields[userRole as keyof typeof defaultRequiredFields] || ["full_name"];
          const optionalFields = ["instagram", "website", "avatar_url"];
          const minCompletionPercentage = 70;
          
          // Check which required fields are missing
          const missingFields = requiredFields.filter(field => {
            const value = userProfile[field as keyof typeof userProfile];
            return !value || (typeof value === "string" && value.trim() === "");
          });
          
          // Calculate completion percentage
          const totalFields = requiredFields.length + optionalFields.length;
          const filledRequiredFields = requiredFields.length - missingFields.length;
          const filledOptionalFields = optionalFields.filter(field => {
            const value = userProfile[field as keyof typeof userProfile];
            return value && (typeof value !== "string" || value.trim() !== "");
          }).length;
          
          const completionPercentage = Math.round(
            ((filledRequiredFields + filledOptionalFields) / totalFields) * 100
          );
          
          const isComplete = completionPercentage >= minCompletionPercentage;
          
          setCompletionStatus({
            isComplete,
            completionPercentage,
            minCompletionPercentage,
            requiredFields,
            optionalFields,
            missingFields
          });
        } else {
          // Use the requirements from the database
          const requiredFields = requirementsData.required_fields || [];
          const optionalFields = requirementsData.optional_fields || [];
          const minCompletionPercentage = requirementsData.min_completion_percentage || 70;
          
          // Check which required fields are missing
          const missingFields = requiredFields.filter(field => {
            const value = userProfile[field as keyof typeof userProfile];
            return !value || (typeof value === "string" && value.trim() === "");
          });
          
          // Calculate completion percentage
          const totalFields = requiredFields.length + optionalFields.length;
          const filledRequiredFields = requiredFields.length - missingFields.length;
          const filledOptionalFields = optionalFields.filter(field => {
            const value = userProfile[field as keyof typeof userProfile];
            return value && (typeof value !== "string" || value.trim() !== "");
          }).length;
          
          const completionPercentage = Math.round(
            ((filledRequiredFields + filledOptionalFields) / totalFields) * 100
          );
          
          const isComplete = completionPercentage >= minCompletionPercentage;
          
          setCompletionStatus({
            isComplete,
            completionPercentage,
            minCompletionPercentage,
            requiredFields,
            optionalFields,
            missingFields
          });
        }
      } catch (err) {
        console.error("Error fetching profile completion:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch profile completion"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileCompletion();
  }, [user, userProfile, userRole]);

  return { completionStatus, isLoading, error };
}
