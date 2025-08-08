import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile } from '@/services/profile';

export function useRequireRole() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    (async () => {
      try {
        const p = await getUserProfile();
        // Skip if user not logged in or already has role, or we are on the chooser
        if (!p || p.role || pathname.startsWith('/onboarding/choose-role')) return;
        navigate('/onboarding/choose-role', { replace: true });
      } catch (e) {
        // Fail silently; do not block navigation
      }
    })();
  }, [navigate, pathname]);
}
