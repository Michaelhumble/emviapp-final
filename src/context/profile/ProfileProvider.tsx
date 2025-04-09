
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { calculateProfileCompletion } from '@/utils/supabase-helpers';

interface ProfileContextProps {
  isCompleted: boolean;
  completionPercent: number;
  completedTasks: {
    profilePicture: boolean;
    bio: boolean;
    location: boolean;
    specialty: boolean;
    website: boolean;
    instagram: boolean;
  };
  updateProfile: (data: any) => Promise<{ success: boolean; error?: any }>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  
  const [completedTasks, setCompletedTasks] = useState({
    profilePicture: false,
    bio: false,
    location: false,
    specialty: false,
    website: false,
    instagram: false,
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  
  useEffect(() => {
    if (userProfile) {
      // Update completion percent using the helper function
      setCompletionPercent(calculateProfileCompletion(userProfile, userProfile.role || null));
      
      // Check individual tasks
      const tasks = {
        profilePicture: Boolean(userProfile.avatar_url),
        bio: Boolean(userProfile.bio),
        location: Boolean(userProfile.location),
        specialty: Boolean(userProfile.specialty),
        website: Boolean(userProfile.website),
        instagram: Boolean(userProfile.instagram),
      };
      
      setCompletedTasks(tasks);
      
      // Check if profile is considered complete (all required tasks done)
      setIsCompleted(
        tasks.profilePicture && 
        tasks.bio && 
        tasks.location && 
        Boolean(userProfile.role)
      );
      
      // If we have completed_profile_tasks array in the user profile, use it to track task completion
      if (userProfile.completed_profile_tasks && Array.isArray(userProfile.completed_profile_tasks)) {
        setCompletedTasks(prev => ({
          ...prev,
          profilePicture: userProfile.completed_profile_tasks?.includes('profile_picture') || prev.profilePicture,
          bio: userProfile.completed_profile_tasks?.includes('bio') || prev.bio,
          location: userProfile.completed_profile_tasks?.includes('location') || prev.location,
          specialty: userProfile.completed_profile_tasks?.includes('specialty') || prev.specialty,
        }));
      }
    }
  }, [userProfile]);
  
  const updateProfile = async (data: any) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }
    
    try {
      // Update the user profile
      const { error } = await supabase
        .from('users')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh user profile to get updated data
      await refreshUserProfile();
      
      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error };
    }
  };
  
  return (
    <ProfileContext.Provider 
      value={{ 
        isCompleted, 
        completionPercent, 
        completedTasks, 
        updateProfile 
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  
  return context;
};
