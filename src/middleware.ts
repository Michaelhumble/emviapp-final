import { supabase } from '@/integrations/supabase/client';
import { isValidRole } from '@/utils/auth/role';

// Dashboard route protection middleware
export const checkDashboardAccess = async (pathname: string) => {
  // Only protect dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return { allowed: true };
  }

  try {
    // Check if user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { 
        allowed: false, 
        redirectTo: '/auth/signin' 
      };
    }

    // Check if user has a valid role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !isValidRole(profile?.role)) {
      return { 
        allowed: false, 
        redirectTo: '/auth/choose-role' 
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Dashboard access check error:', error);
    return { 
      allowed: false, 
      redirectTo: '/signin' 
    };
  }
};