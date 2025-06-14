
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate('/auth/signin');
      return;
    }

    if (!userRole) {
      navigate('/profile/role-selection');
      toast.error('Please select your role to continue');
      return;
    }

    // Handle role-based redirects using centralized auth state
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
  }, [user, userRole, loading, navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>;
  }

  return null;
};
