import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '@/context/auth';
import { ProfileCompletionStatus } from '@/types/profile-completion';
import { useSafeQuery } from '@/hooks/useSafeQuery';
import { supabase } from '@/integrations/supabase/client';

interface ProfileCompletionContextProps {
  completionStatus: ProfileCompletionStatus | undefined;
  isLoading: boolean;
  isProfileComplete: boolean;
  completionPercentage: number;
  markTaskComplete: (taskId: string) => void;
  isTaskComplete: (taskId: string) => boolean;
}

const ProfileCompletionContext = createContext<ProfileCompletionContextProps | undefined>(undefined);

export const ProfileCompletionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userRole, userProfile } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Define the shape of the database view result
  interface ProfileCompletionResult {
    isComplete: boolean;
    completionPercentage: number;
    requiredFields: string[];
    optionalFields: string[];
    minCompletionPercentage: number;
    missingFields: string[];
  }

  // Fetch profile completion status from the database view
  const { data: dbCompletionStatus, isLoading } = useSafeQuery<ProfileCompletionResult>({
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

  // Cast the database result to our expected ProfileCompletionStatus type
  const completionStatus: ProfileCompletionStatus | undefined = dbCompletionStatus ? {
    isComplete: dbCompletionStatus.isComplete,
    completionPercentage: dbCompletionStatus.completionPercentage,
    requiredFields: dbCompletionStatus.requiredFields,
    optionalFields: dbCompletionStatus.optionalFields,
    minCompletionPercentage: dbCompletionStatus.minCompletionPercentage,
    missingFields: dbCompletionStatus.missingFields
  } : undefined;

  // Load completed tasks from userProfile
  useEffect(() => {
    if (userProfile?.completed_profile_tasks && Array.isArray(userProfile.completed_profile_tasks)) {
      setCompletedTasks(userProfile.completed_profile_tasks);
    }
  }, [userProfile]);
  
  // Function to mark a task as complete
  const markTaskComplete = async (taskId: string) => {
    if (!user) return;
    
    try {
      // Add to local state immediately for UI feedback
      if (!completedTasks.includes(taskId)) {
        const updatedTasks = [...completedTasks, taskId];
        setCompletedTasks(updatedTasks);
        
        // Update in the database
        const { error } = await supabase
          .from('users')
          .update({ 
            completed_profile_tasks: updatedTasks,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (error) {
          console.error('Error updating completed tasks:', error);
          // Revert local state on error
          setCompletedTasks(completedTasks);
        }
      }
    } catch (error) {
      console.error('Error marking task complete:', error);
    }
  };
  
  // Function to check if a task is complete
  const isTaskComplete = (taskId: string): boolean => {
    return completedTasks.includes(taskId);
  };
  
  return (
    <ProfileCompletionContext.Provider
      value={{
        completionStatus,
        isLoading,
        isProfileComplete: completionStatus?.isComplete ?? false,
        completionPercentage: completionStatus?.completionPercentage || 0,
        markTaskComplete,
        isTaskComplete
      }}
    >
      {children}
    </ProfileCompletionContext.Provider>
  );
};

export const useProfileCompletion = () => {
  const context = useContext(ProfileCompletionContext);
  
  if (context === undefined) {
    throw new Error('useProfileCompletion must be used within a ProfileCompletionProvider');
  }
  
  return context;
};
