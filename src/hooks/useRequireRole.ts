import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '@/services/profile';

export function useRequireRole() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const p = await getUserProfile();
        if (p && !p.role) {
          navigate('/onboarding/choose-role', { replace: true });
        }
      } catch (e) {
        // Fail silently; do not block navigation
      }
    })();
  }, [navigate]);
}
