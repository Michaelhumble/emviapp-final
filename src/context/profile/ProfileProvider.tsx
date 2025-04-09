
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

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
  const { user, userProfile } = useAuth();
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

  // Load completed tasks from localStorage and check profile data
  useEffect(() => {
    if (user?.id) {
      // Load from localStorage first
      const savedTasks = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.id}`);
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
      
      // Check profile data to auto-mark tasks as complete
      const autoCompletedTasks = [...parsedTasks];
      
      if (userProfile) {
        if (userProfile.bio) !autoCompletedTasks.includes('bio') && autoCompletedTasks.push('bio');
        if (userProfile.specialty) !autoCompletedTasks.includes('specialty') && autoCompletedTasks.push('specialty');
        if (userProfile.location) !autoCompletedTasks.includes('location') && autoCompletedTasks.push('location');
        if (userProfile.avatar_url) !autoCompletedTasks.includes('profile_picture') && autoCompletedTasks.push('profile_picture');
        
        // Check if portfolio has entries
        if (userProfile.portfolio_urls && userProfile.portfolio_urls.length > 0) {
          !autoCompletedTasks.includes('portfolio') && autoCompletedTasks.push('portfolio');
        }
      }
      
      setCompletedTasks(autoCompletedTasks);
      
      // Calculate completion percentage
      const percentage = Math.round((autoCompletedTasks.length / allTasks.length) * 100);
      setCompletionPercentage(percentage);
      
      // If autoCompletedTasks has more entries than parsedTasks, update localStorage
      if (autoCompletedTasks.length > parsedTasks.length) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(autoCompletedTasks));
      }
    }
  }, [user, userProfile]);

  // Function to mark a task as complete
  const markTaskComplete = (taskId: string) => {
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
      updateUserProgress(updatedTasks, percentage);
    }
  };

  // Check if a task is complete
  const isTaskComplete = (taskId: string): boolean => {
    return completedTasks.includes(taskId);
  };

  // Update user's progress in database
  const updateUserProgress = async (tasks: string[], percentage: number) => {
    if (!user?.id) return;
    
    try {
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
      }
    } catch (error) {
      console.error('Error updating profile progress:', error);
    }
  };

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
