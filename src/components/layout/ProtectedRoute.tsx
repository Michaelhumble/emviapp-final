import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth' 
}: ProtectedRouteProps) => {
  const { isSignedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <SimpleLoadingFallback />;
  }

  if (requireAuth && !isSignedIn) {
    // Redirect to auth page with current location as redirect target
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${redirectTo}?redirect=${redirectUrl}`} replace />;
  }

  if (!requireAuth && isSignedIn) {
    // If route doesn't require auth but user is signed in, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;