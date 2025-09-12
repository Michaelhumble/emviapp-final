import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile } from '@/services/profile';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error('No user found after OAuth callback');
          navigate('/auth/signin');
          return;
        }

        // Check if user has a role in profiles
        const profile = await getUserProfile();
        
        if (profile?.role) {
          // User has role, redirect to correct dashboard
          routeByRole(profile.role);
        } else {
          // No role set, redirect to choose role
          navigate('/auth/choose-role');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication error occurred');
        navigate('/auth/signin');
      }
    };

    handleCallback();
  }, [navigate]);

  const routeByRole = (role: string) => {
    switch (role) {
      case 'salon_owner':
        navigate('/dashboard/salon');
        break;
      case 'artist':
        navigate('/dashboard/profile');
        break;
      case 'freelancer':
        navigate('/dashboard/profile');
        break;
      case 'customer':
      default:
        navigate('/');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-t-2 border-indigo-600 rounded-full mx-auto"></div>
        <p className="text-sm text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;