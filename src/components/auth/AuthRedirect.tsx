
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { navigateToRoleDashboard } from '@/utils/navigation';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user, loading, userRole, userProfile } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/auth/signin');
      return;
    }

    // Redirect based on user role
    if (!userRole && !userProfile?.role) {
      navigate('/profile/role-selection');
      toast.error('Please select your role to continue');
      return;
    }

    // Use the centralized navigation helper
    navigateToRoleDashboard(navigate, userRole || userProfile?.role);
    
  }, [user, userRole, userProfile, loading, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return null;
};
