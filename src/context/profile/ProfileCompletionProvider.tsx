
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '@/context/auth';

interface ProfileCompletionContextProps {
  completedTasks: string[];
  pendingTasks: string[];
  completionPercentage: number;
  markTaskComplete: (taskId: string) => void;
  isTaskComplete: (taskId: string) => boolean;
}

const ProfileCompletionContext = createContext<ProfileCompletionContextProps | undefined>(undefined);

export const ProfileCompletionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile, user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [pendingTasks, setPendingTasks] = useState<string[]>([]);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    if (!userProfile) return;
    
    // Define required tasks based on user role
    const requiredTasks = [
      'bio',
      'location',
      'profile_picture',
      'specialty',
      'portfolio'
    ];
    
    // Check which tasks are completed
    const completed: string[] = [];
    
    if (userProfile.bio) completed.push('bio');
    if (userProfile.location) completed.push('location');
    if (userProfile.avatar_url) completed.push('profile_picture');
    if (userProfile.specialty) completed.push('specialty');
    if (userProfile.portfolio_urls && userProfile.portfolio_urls.length > 0) completed.push('portfolio');
    
    // Check for completed_profile_tasks in user profile
    if (userProfile.completed_profile_tasks && Array.isArray(userProfile.completed_profile_tasks)) {
      userProfile.completed_profile_tasks.forEach(task => {
        if (!completed.includes(task)) {
          completed.push(task);
        }
      });
    }
    
    // Calculate pending tasks
    const pending = requiredTasks.filter(task => !completed.includes(task));
    
    // Update state
    setCompletedTasks(completed);
    setPendingTasks(pending);
    
    // Calculate completion percentage
    const percentage = Math.round((completed.length / requiredTasks.length) * 100);
    setCompletionPercentage(percentage);
    
  }, [userProfile]);
  
  // Function to mark a task as complete
  const markTaskComplete = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks(prev => [...prev, taskId]);
      setPendingTasks(prev => prev.filter(task => task !== taskId));
      
      // Recalculate percentage
      const totalTasks = completedTasks.length + pendingTasks.length;
      const newPercentage = Math.round(((completedTasks.length + 1) / totalTasks) * 100);
      setCompletionPercentage(newPercentage);
    }
  };
  
  // Function to check if a task is complete
  const isTaskComplete = (taskId: string): boolean => {
    return completedTasks.includes(taskId);
  };
  
  return (
    <ProfileCompletionContext.Provider
      value={{
        completedTasks,
        pendingTasks,
        completionPercentage,
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
