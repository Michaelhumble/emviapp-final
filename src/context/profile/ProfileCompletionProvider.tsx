
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

  // Calculate profile completion based on user profile data
  const { data: dbCompletionStatus, isLoading } = useSafeQuery<any>({
    queryKey: ['profile-completion', user?.id],
    queryFn: async () => {
      if (!user?.id || !userRole) {
        throw new Error('User or role not found');
      }

      // Get user profile since we removed the view
      const { data: profile, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (profile) {
        // Calculate basic completion based on essential fields
        const requiredFields = ['full_name', 'phone', 'role'];
        const completedFields = requiredFields.filter(field => profile[field]);
        const completionPercentage = Math.round((completedFields.length / requiredFields.length) * 100);
        
        return {
          isComplete: completionPercentage >= 80,
          completionPercentage,
          requiredFields,
          optionalFields: ['bio', 'avatar_url', 'location', 'specialty'],
          minCompletionPercentage: 80,
          missingFields: requiredFields.filter(field => !profile[field])
        };
      }

      return {
        isComplete: false,
        completionPercentage: 0,
        requiredFields: ['full_name', 'phone', 'role'],
        optionalFields: ['bio', 'avatar_url', 'location', 'specialty'],
        minCompletionPercentage: 80,
        missingFields: ['full_name', 'phone', 'role']
      };
    },
    enabled: !!user?.id && !!userRole,
    context: "profile-completion"
  });

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
        const { error } = await (supabase as any)
          .from('profiles')
          .update({ 
            completed_profile_tasks: updatedTasks,
            updated_at: new Date().toISOString()
          } as any)
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
        completionStatus: dbCompletionStatus,
        isLoading,
        isProfileComplete: dbCompletionStatus?.isComplete ?? false,
        completionPercentage: dbCompletionStatus?.completionPercentage || 0,
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
