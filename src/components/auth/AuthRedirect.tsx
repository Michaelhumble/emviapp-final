
/**
 * UPDATED AuthRedirect - Now uses centralized routing logic
 * 
 * IMPORTANT: This component has been updated to use the new centralized
 * routing system. All role-based redirects now go through DashboardRouter
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { navigateToRoleDashboard, needsRoleSelection } from '@/utils/roleDashboardMap';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user, userRole, loading, isSignedIn } = useAuth();

  useEffect(() => {
    if (loading) return;

    // NOT SIGNED IN: Redirect to sign in
    if (!isSignedIn || !user) {
      navigate('/auth/signin');
      return;
    }

    // NEEDS ROLE SELECTION: Redirect to onboarding
    if (needsRoleSelection(userRole)) {
      navigate('/onboarding');
      toast.info('Please select your role to continue');
      return;
    }

    // HAS ROLE: Use centralized routing logic
    if (userRole) {
      navigateToRoleDashboard(navigate, userRole);
    }
  }, [user, userRole, loading, isSignedIn, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return null;
};
