
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { UserProfile } from '@/context/auth/types';
import { calculateProfileCompletion } from '@/utils/supabase-helpers';

// Define the context type
interface ProfileContextType {
  profileCompletion: number;
  incompleteFields: string[];
  refreshProfileCompletion: () => void;
}

// Create the context with default values
const ProfileContext = createContext<ProfileContextType>({
  profileCompletion: 0,
  incompleteFields: [],
  refreshProfileCompletion: () => {},
});

// ProfileProvider component
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userProfile, userRole } = useAuth();
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [incompleteFields, setIncompleteFields] = useState<string[]>([]);

  // Calculate profile completion
  const calculateCompletion = () => {
    if (!userProfile) {
      setProfileCompletion(0);
      setIncompleteFields(['all']);
      return;
    }

    // Get completion percentage from utility function
    const percentage = calculateProfileCompletion(userProfile, userRole);
    setProfileCompletion(percentage);

    // Determine which fields are incomplete
    const incomplete: string[] = [];
    
    if (!userProfile.full_name) incomplete.push('full_name');
    if (!userProfile.bio) incomplete.push('bio');
    if (!userProfile.avatar_url) incomplete.push('avatar_url');
    if (!userProfile.specialty) incomplete.push('specialty');
    if (!userProfile.location) incomplete.push('location');
    if (!userProfile.phone) incomplete.push('phone');
    if (!userProfile.instagram) incomplete.push('instagram');
    if (!userProfile.portfolio_urls || userProfile.portfolio_urls.length === 0) incomplete.push('portfolio');
    
    setIncompleteFields(incomplete);
  };

  // Calculate completion whenever profile changes
  useEffect(() => {
    calculateCompletion();
  }, [userProfile, userRole]);

  // Context value
  const value = {
    profileCompletion,
    incompleteFields,
    refreshProfileCompletion: calculateCompletion,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

// Hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
