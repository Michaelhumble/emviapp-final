
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { useSubscription } from '@/context/subscription';
import { UpgradeFeature } from '@/components/upgrade/SmartUpgradePrompt';

export const useUpgradePrompt = (feature: UpgradeFeature) => {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();

  const checkAndTriggerUpgrade = (callback?: () => void) => {
    // If user is not logged in or already has a subscription, don't show the prompt
    if (!user || hasActiveSubscription) {
      if (callback) callback();
      return true;
    }
    
    // Show upgrade prompt
    setIsPromptOpen(true);
    return false;
  };

  return {
    isPromptOpen,
    setIsPromptOpen,
    checkAndTriggerUpgrade
  };
};
