import { supabase } from '@/integrations/supabase/client';

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
        redirectTo: '/signin' 
      };
    }

    // Check if user has a role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.role) {
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