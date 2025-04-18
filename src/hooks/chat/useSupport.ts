import { useEffect } from 'react';
import { useUserTags } from '@/hooks/useUserTags';
import { useAuth } from '@/context/auth';

export const useSupport = () => {
  const { user } = useAuth();
  const { tagUser } = useUserTags();

  useEffect(() => {
    if (!user?.id) return;
    
    // Tag user when they contact support
    const tagSupportUser = async () => {
      await tagUser(user.id, 'needs-help');
    };
    
    tagSupportUser();
  }, [user?.id]);

  // ... keep existing code for support chat functionality if any
};
