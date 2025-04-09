
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProfileCompletionContextType {
  completedTasks: string[];
  completionPercentage: number;
  markTaskComplete: (taskId: string) => void;
  isTaskComplete: (taskId: string) => boolean;
  pendingTasks: { id: string; name: string }[];
}

const ProfileCompletionContext = createContext<ProfileCompletionContextType>({
  completedTasks: [],
  completionPercentage: 0,
  markTaskComplete: () => {},
  isTaskComplete: () => false,
  pendingTasks: [],
});

const LOCAL_STORAGE_KEY = 'emviapp_profile_completed_tasks';

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // List of all tasks that need to be completed
  const allTasks = [
    { id: 'bio', name: 'Bio' },
    { id: 'specialty', name: 'Specialty' },
    { id: 'location', name: 'Location' },
    { id: 'profile_picture', name: 'Profile Picture' },
    { id: 'portfolio', name: 'Portfolio' }
  ];

  // Calculate pending tasks based on completed tasks
  const pendingTasks = allTasks.filter(task => !completedTasks.includes(task.id));

  // Check if a task is complete
  const isTaskComplete = (taskId: string): boolean => {
    return completedTasks.includes(taskId);
  };

  // Function to mark a task as complete
  const markTaskComplete = async (taskId: string) => {
    if (!user?.id) return;
    
    console.log(`Marking task as complete: ${taskId}`);
    
    // Only add the task if it's not already completed
    if (!completedTasks.includes(taskId)) {
      const updatedTasks = [...completedTasks, taskId];
      setCompletedTasks(updatedTasks);
      
      // Save to localStorage
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(updatedTasks));
      
      // Update completion percentage
      const percentage = Math.round((updatedTasks.length / allTasks.length) * 100);
      setCompletionPercentage(percentage);
      
      // Update user's progress in database
      await updateUserProgress(updatedTasks, percentage);
      
      // Show toast notification
      toast.success(`${taskId.replace('_', ' ')} completed!`);
      
      // Refresh user profile to ensure all data is up to date
      await refreshUserProfile();
    }
  };

  // Update user's progress in database
  const updateUserProgress = async (tasks: string[], percentage: number) => {
    if (!user?.id) return;
    
    try {
      console.log('Updating user progress:', { tasks, percentage });
      
      const { error } = await supabase
        .from('users')
        .update({
          profile_completion: percentage,
          completed_profile_tasks: tasks,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) {
        console.error('Error updating profile progress:', error);
        toast.error('Failed to update profile progress');
      }
    } catch (error) {
      console.error('Error updating profile progress:', error);
    }
  };

  // Load completed tasks and check profile data
  useEffect(() => {
    if (!user?.id) return;
    
    const checkProfileCompletion = async () => {
      // Start with empty array
      let tasksToMark: string[] = [];
      
      try {
        console.log('Checking profile completion for user:', user.id);
        
        // First check localStorage
        const savedTasks = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.id}`);
        if (savedTasks) {
          console.log('Found tasks in localStorage:', savedTasks);
          tasksToMark = JSON.parse(savedTasks);
        }
        
        // Then check database for completed tasks
        if (userProfile?.completed_profile_tasks && Array.isArray(userProfile.completed_profile_tasks)) {
          console.log('Found tasks in database:', userProfile.completed_profile_tasks);
          
          // Merge with localStorage tasks (prefer database)
          userProfile.completed_profile_tasks.forEach(task => {
            if (!tasksToMark.includes(task)) {
              tasksToMark.push(task);
            }
          });
        }
        
        // Auto-mark tasks as complete if data exists
        if (userProfile) {
          console.log('Checking user profile data for auto-completion');
          
          if (userProfile.bio && !tasksToMark.includes('bio')) {
            console.log('Auto-marking bio as complete');
            tasksToMark.push('bio');
          }
          
          if (userProfile.specialty && !tasksToMark.includes('specialty')) {
            console.log('Auto-marking specialty as complete');
            tasksToMark.push('specialty');
          }
          
          if (userProfile.location && !tasksToMark.includes('location')) {
            console.log('Auto-marking location as complete');
            tasksToMark.push('location');
          }
          
          if (userProfile.avatar_url && !tasksToMark.includes('profile_picture')) {
            console.log('Auto-marking profile_picture as complete');
            tasksToMark.push('profile_picture');
          }
          
          // Check if portfolio has entries
          if (userProfile.portfolio_urls && 
              Array.isArray(userProfile.portfolio_urls) && 
              userProfile.portfolio_urls.length > 0 && 
              !tasksToMark.includes('portfolio')) {
            console.log('Auto-marking portfolio as complete');
            tasksToMark.push('portfolio');
          }
        }
        
        console.log('Final tasks to mark as complete:', tasksToMark);
        
        // Set completed tasks state
        setCompletedTasks(tasksToMark);
        
        // Calculate completion percentage
        const percentage = Math.round((tasksToMark.length / allTasks.length) * 100);
        setCompletionPercentage(percentage);
        
        // Update localStorage
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(tasksToMark));
        
        // Update database if needed
        if (tasksToMark.length > 0) {
          await updateUserProgress(tasksToMark, percentage);
        }
        
      } catch (error) {
        console.error('Error checking profile completion:', error);
      }
    };
    
    checkProfileCompletion();
  }, [user, userProfile]);

  return (
    <ProfileCompletionContext.Provider
      value={{
        completedTasks,
        completionPercentage,
        markTaskComplete,
        isTaskComplete,
        pendingTasks
      }}
    >
      {children}
    </ProfileCompletionContext.Provider>
  );
};

// Hook to use profile completion context
export const useProfileCompletion = () => {
  const context = useContext(ProfileCompletionContext);
  if (context === undefined) {
    throw new Error('useProfileCompletion must be used within a ProfileProvider');
  }
  return context;
};
