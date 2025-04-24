
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

interface DashboardSessionProviderProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

const DashboardSessionProvider = ({ 
  children,
  requiredRole
}: DashboardSessionProviderProps) => {
  const { user, userRole, loading } = useAuth();
  const [verifying, setVerifying] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function verifySession() {
      try {
        // Double check session with Supabase directly
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data.session) {
          console.error("Session verification failed:", error || "No session found");
          toast.error("Your session has expired. Please sign in again.");
          navigate('/auth/signin', { replace: true });
          return;
        }

        // If a specific role is required, check it
        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          
          if (!userRole || !roles.includes(userRole)) {
            console.log(`Role mismatch: User has ${userRole}, but ${roles.join(' or ')} required`);
            toast.error("You don't have access to this dashboard.");
            navigate('/dashboard', { replace: true });
            return;
          }
        }

        setSessionValid(true);
      } catch (err) {
        console.error("Error verifying session:", err);
        toast.error("There was a problem verifying your access. Please try again.");
        navigate('/auth/signin', { replace: true });
      } finally {
        setVerifying(false);
      }
    }

    // Only verify when auth loading is complete
    if (!loading) {
      if (!user) {
        navigate('/auth/signin', { replace: true });
      } else {
        verifySession();
      }
    }
  }, [user, userRole, requiredRole, loading, navigate]);

  if (loading || verifying) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader size={24} className="animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!sessionValid || !user) {
    return null; // Navigation happens in the effect
  }

  return <>{children}</>;
};

export default DashboardSessionProvider;
