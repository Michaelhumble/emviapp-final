import { UserProfile, UserRole } from "@/context/auth/types";
import { supabase } from "@/integrations/supabase/client";

// Calculate the profile completion percentage
export const calculateProfileCompletion = (profile: UserProfile | null, role: UserRole): number => {
  if (!profile) return 0;
  
  // Define the fields required for each role
  const requiredFields: Record<UserRole, string[]> = {
    'artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
    'customer': ['full_name', 'email', 'avatar_url'],
    'salon': ['full_name', 'email', 'salon_name', 'location', 'phone'],
    'owner': ['full_name', 'email', 'salon_name', 'location', 'phone'],
    'vendor': ['full_name', 'email', 'company_name', 'phone'],
    'supplier': ['full_name', 'email', 'company_name', 'phone'],
    'beauty supplier': ['full_name', 'email', 'company_name', 'phone'],
    'freelancer': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location'],
    'nail technician/artist': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location', 'instagram', 'portfolio_urls'],
    'renter': ['full_name', 'email', 'avatar_url', 'bio', 'specialty', 'location'],
    'other': ['full_name', 'email']
  };
  
  // Get the fields required for this role
  const fields = requiredFields[role] || requiredFields.customer;
  
  // Count completed fields
  let completed = 0;
  
  fields.forEach(field => {
    // Handle array fields like portfolio_urls
    if (field === 'portfolio_urls') {
      if (profile.portfolio_urls && profile.portfolio_urls.length > 0) {
        completed++;
      }
    } 
    // Handle other fields
    else {
      const value = profile[field as keyof UserProfile];
      if (value !== undefined && value !== null && value !== '') {
        completed++;
      }
    }
  });
  
  // Calculate percentage
  return Math.round((completed / fields.length) * 100);
};

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
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error marking task as complete:', error);
    return false;
  }
};
