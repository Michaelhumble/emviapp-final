import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

interface ProductionRouteGuardProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiresRole?: 'admin' | 'salon_owner' | 'artist' | 'customer';
  devOnly?: boolean;
}

const ProductionRouteGuard: React.FC<ProductionRouteGuardProps> = ({
  children,
  requiresAuth = false,
  requiresRole,
  devOnly = false
}) => {
  const { user, userProfile, loading } = useAuth();

  // Block dev-only routes in production
  if (devOnly && process.env.NODE_ENV === 'production') {
    return <Navigate to="/" replace />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Authentication check
  if (requiresAuth && !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Role-based access
  if (requiresRole && userProfile?.role !== requiresRole) {
    // Redirect based on user's actual role
    const roleRedirects = {
      admin: '/admin/dashboard',
      salon_owner: '/dashboard/salon',
      artist: '/dashboard/artist',
      customer: '/dashboard/customer'
    };
    
    const redirectPath = userProfile?.role ? roleRedirects[userProfile.role as keyof typeof roleRedirects] : '/dashboard';
    return <Navigate to={redirectPath || '/dashboard'} replace />;
  }

  return <>{children}</>;
};

export default ProductionRouteGuard;