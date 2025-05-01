
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { userRole, loading: roleLoading } = useUserRole(user?.id);

  useEffect(() => {
    if (loading || roleLoading) return;

    if (!user) {
      navigate('/auth/signin');
      return;
    }

    if (!userRole) {
      navigate('/profile/role-selection');
      toast.error('Please select your role to continue');
      return;
    }

    // Handle role-based redirects
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        navigate('/dashboard/artist');
        break;
      case 'salon':
      case 'owner':
        navigate('/dashboard/salon');
        break;
      case 'freelancer':
        navigate('/dashboard/freelancer');
        break;
      case 'customer':
        navigate('/dashboard/customer');
        break;
      case 'supplier':
      case 'beauty supplier':
        navigate('/dashboard/supplier');
        break;
      default:
        navigate('/dashboard/other');
    }
  }, [user, userRole, loading, roleLoading, navigate]);

  if (loading || roleLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return null;
};
