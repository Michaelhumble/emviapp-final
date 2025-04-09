
import { supabase } from "@/integrations/supabase/client";

// Check if a task is complete
export const isTaskComplete = async (userId: string, taskId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('completed_profile_tasks')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    
    return data.completed_profile_tasks && Array.isArray(data.completed_profile_tasks) 
      ? data.completed_profile_tasks.includes(taskId)
      : false;
  } catch (error) {
    console.error('Error checking task completion:', error);
    return false;
  }
};

// Mark a task as complete
export const markTaskComplete = async (userId: string, taskId: string): Promise<boolean> => {
  try {
    const { data: currentData } = await supabase
      .from('users')
      .select('completed_profile_tasks')
      .eq('id', userId)
      .single();
    
    const currentTasks = currentData?.completed_profile_tasks || [];
    
    // Only add the task if it's not already in the array
    if (!currentTasks.includes(taskId)) {
      const updatedTasks = [...currentTasks, taskId];
      
      const { error } = await supabase
        .from('users')
        .update({ completed_profile_tasks: updatedTasks })
        .eq('id', userId);
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error marking task complete:', error);
    return false;
  }
};

// Calculate profile completion percentage
export const calculateProfileCompletion = (
  userProfile: any, 
  userRole: string | null
): number => {
  if (!userProfile) return 0;
  
  let totalFields = 0;
  let completedFields = 0;
  
  // Common fields for all users
  const commonFields = [
    'full_name', 
    'email', 
    'avatar_url', 
    'bio', 
    'location'
  ];
  
  totalFields += commonFields.length;
  commonFields.forEach(field => {
    if (userProfile[field]) completedFields++;
  });
  
  // Role-specific fields
  if (userRole === 'artist' || userRole === 'nail technician/artist') {
    const artistFields = ['specialty', 'instagram', 'website'];
    totalFields += artistFields.length;
    artistFields.forEach(field => {
      if (userProfile[field]) completedFields++;
    });
  }
  
  return Math.round((completedFields / totalFields) * 100);
};
