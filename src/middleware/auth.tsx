import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { isValidRole } from '@/utils/auth/role';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Only protect dashboard routes
        if (!location.pathname.startsWith('/dashboard')) {
          setLoading(false);
          return;
        }

        console.log('[AUTH] middleware: checking dashboard access for', location.pathname);

        // Check if user is authenticated
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.log('[AUTH] middleware: no user, redirecting to signin');
          setLoading(false);
          return;
        }

        setUser(user);

        // Check if user has a valid role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profileError || !isValidRole(profile?.role)) {
          console.log('[AUTH] middleware: invalid role, redirecting to choose-role');
          setProfile(null);
        } else {
          console.log('[AUTH] middleware: valid role =', profile.role);
          setProfile(profile);
        }
      } catch (error) {
        console.error('[AUTH] middleware: error =', error);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Not a dashboard route
  if (!location.pathname.startsWith('/dashboard')) {
    return <>{children}</>;
  }

  // Dashboard route but no user
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Dashboard route but no valid role
  if (!profile || !isValidRole(profile.role)) {
    return <Navigate to="/auth/choose-role" replace />;
  }

  return <>{children}</>;
}