import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { routeByRole } from '@/utils/auth/routeByRole';
import { isValidRole } from '@/utils/auth/role';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Break out of iframe first (Lovable preview)
        if (typeof window !== 'undefined' && window !== window.top) {
          window.top!.location.href = window.location.href;
          return;
        }

        // Get current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error('No user found after OAuth callback');
          navigate('/auth/signin', { replace: true });
          return;
        }

        // Normalize profile: ensure row exists (id = user.id)
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id,
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User'
          }, { onConflict: 'id' });

        if (upsertError) {
          console.error('Profile upsert error:', upsertError);
          // Continue anyway - profile might already exist
        }

        // Read role from profiles (NOT from metadata)
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
          toast.error('Failed to load profile');
          navigate('/auth/signin', { replace: true });
          return;
        }

        // Optional debug logging
        const isDebugMode = new URLSearchParams(window.location.search).get('debug') === 'role';
        if (isDebugMode) {
          console.log('🔍 Auth Debug:', {
            userId: user.id,
            fetchedRole: profile?.role,
            isValidRole: isValidRole(profile?.role)
          });
        }

        if (!isValidRole(profile?.role)) {
          // No role or invalid → must choose
          const prefill = new URLSearchParams(window.location.search).get('hintRole') ?? '';
          const qs = isValidRole(prefill) ? `?prefill=${prefill}` : '';
          navigate(`/auth/choose-role${qs}`, { replace: true });
        } else {
          // Valid → route to dashboard by role
          routeByRole(navigate, profile.role);
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        toast.error('Authentication error occurred');
        navigate('/auth/signin', { replace: true });
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