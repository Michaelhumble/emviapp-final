
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export interface CompletionTask {
  id: string;
  label: string;
  completed: boolean;
}

export const useProfileCompletion = () => {
  const { userProfile, user } = useAuth();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  useEffect(() => {
    if (!userProfile) return;

    // Check which tasks are complete based on profile data
    const completed: string[] = [];

    // Bio & Specialty check
    if (userProfile.bio && userProfile.specialty) {
      completed.push('bio_specialty');
    }

    // Avatar check
    if (userProfile.avatar_url) {
      completed.push('avatar');
    }

    // Location check
    if (userProfile.location) {
      completed.push('location');
    }

    // Social links check
    if (userProfile.instagram || userProfile.website) {
      completed.push('social_links');
    }

    // Portfolio check (using portfolio_urls from user profile)
    if (Array.isArray(userProfile.portfolio_urls) && userProfile.portfolio_urls.length > 0) {
      completed.push('portfolio');
    }

    setCompletedTasks(completed);
  }, [userProfile]);

  const markTaskComplete = async (taskId: string) => {
    if (!user || completedTasks.includes(taskId)) return;

    // Add to local state first for immediate UI feedback
    setCompletedTasks(prev => [...prev, taskId]);

    // You could also update a specific field in the database if needed
    // This could be used for tracking progress metrics
    
    // For example, updating a completedTasks array in the user profile
    // (This is optional - the code already checks profile fields directly)
    /*
    try {
      await supabase
        .from('users')
        .update({
          completed_tasks: [...completedTasks, taskId]
        })
        .eq('id', user.id);
    } catch (error) {
      console.error('Error updating task completion status:', error);
    }
    */
  };

  const isTaskComplete = (taskId: string): boolean => {
    return completedTasks.includes(taskId);
  };

  const completionPercentage = 
    completedTasks.length > 0 
      ? Math.round((completedTasks.length / 5) * 100) // 5 represents total tasks
      : 0;

  return {
    completedTasks,
    markTaskComplete,
    isTaskComplete,
    completionPercentage
  };
};
