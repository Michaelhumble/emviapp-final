
import React from 'react';
import { useProfileSync } from '@/hooks/useProfileSync';

/**
 * This component enables real-time profile synchronization
 * without adding any visual elements to the UI.
 * It simply activates the useProfileSync hook when mounted.
 */
export const ProfileSyncNotification: React.FC = () => {
  // Activate the profile sync hook
  useProfileSync();
  
  // This component doesn't render anything visible
  return null;
};
