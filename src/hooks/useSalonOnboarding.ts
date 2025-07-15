import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';

export const useSalonOnboarding = () => {
  const { userProfile } = useAuth();
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userProfile) {
      checkOnboardingStatus();
    }
  }, [userProfile]);

  const checkOnboardingStatus = () => {
    setIsLoading(true);
    
    // Check if user has completed onboarding
    const hasCompletedTasks = userProfile?.completed_profile_tasks?.length > 0;
    const hasBasicInfo = userProfile?.salon_name && userProfile?.salon_name.length >= 2;
    const hasRole = userProfile?.role === 'owner';
    
    // Show onboarding if:
    // 1. User is a salon owner
    // 2. Has not completed profile tasks
    // 3. Missing basic salon info
    const shouldShow = hasRole && (!hasCompletedTasks || !hasBasicInfo);
    
    setShouldShowOnboarding(shouldShow);
    setIsLoading(false);
  };

  const markOnboardingComplete = () => {
    setShouldShowOnboarding(false);
  };

  const forceShowOnboarding = () => {
    setShouldShowOnboarding(true);
  };

  return {
    shouldShowOnboarding,
    isLoading,
    markOnboardingComplete,
    forceShowOnboarding,
    checkOnboardingStatus
  };
};