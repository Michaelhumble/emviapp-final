import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { routeByRole } from '@/utils/auth/routeByRole';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Break out of iframe first
        if (typeof window !== 'undefined' && window !== window.top) {
          window.top!.location.href = window.location.href;
          return;
        }

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error('No user found after OAuth callback');
          navigate('/signin', { replace: true });
          return;
        }

        // Upsert profile so email & OAuth behave the same way
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name,
            // Include role from OAuth user metadata if available
            role: user.user_metadata?.role || null
          }, { 
            onConflict: 'id',
            ignoreDuplicates: false 
          });

        if (upsertError) {
          console.error('Profile upsert error:', upsertError);
          // Continue anyway - profile might already exist
        }

        // Fetch user's role from profiles
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
          toast.error('Failed to load profile');
          navigate('/signin', { replace: true });
          return;
        }

        if (!profile?.role) {
          // No role set, redirect to choose role
          navigate('/auth/choose-role', { replace: true });
        } else {
          // Has role, route to correct dashboard
          routeByRole(navigate, profile.role);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication error occurred');
        navigate('/signin', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

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