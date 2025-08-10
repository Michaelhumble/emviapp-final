/**
 * CENTRALIZED DASHBOARD ROUTER
 * Single source of truth for all dashboard routing logic
 * 
 * CRITICAL: This component handles ALL role-based dashboard routing
 * DO NOT duplicate dashboard routing logic anywhere else
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { navigateToRoleDashboard, needsRoleSelection } from '@/utils/roleDashboardMap';
import RoleSelectionModal from '@/components/auth/RoleSelectionModal';

// Import all dashboard components
import ProfileDashboard from '@/pages/dashboard/Profile';
import SalonDashboard from '@/pages/dashboard/Salon';
import CustomerDashboard from '@/pages/dashboard/Customer';
import SupplierDashboard from '@/pages/dashboard/Supplier';
import ManagerDashboard from '@/pages/dashboard/Manager';
import OtherDashboard from '@/pages/dashboard/Other';

const DashboardRouter: React.FC = () => {
  const { isSignedIn, userRole, user, loading } = useAuth();
  const navigate = useNavigate();

  // Debug current auth state
  console.log('🚀 DashboardRouter State:', {
    isSignedIn,
    userRole,
    hasUser: !!user,
    loading
  });

  useEffect(() => {
    // AUTHENTICATION CHECK: Redirect to sign-in if not authenticated
    if (!loading && !isSignedIn) {
      console.log('🔐 DashboardRouter: User not signed in, redirecting to sign-in');
      navigate('/signin');
      return;
    }

    // ROLE CHECK: If authenticated but no role, stay on current page (modal will show)
    if (!loading && isSignedIn && needsRoleSelection(userRole)) {
      console.log('🔄 DashboardRouter: User needs role selection');
      // Don't navigate - let the modal handle role selection
      return;
    }

    // DASHBOARD ROUTING: Navigate to correct dashboard if not already there
    if (!loading && isSignedIn && userRole) {
      const currentPath = window.location.pathname;
      const targetPath = getDashboardPathForRole(userRole);
      
      if (currentPath === '/dashboard' && targetPath !== '/dashboard') {
        console.log(`🎯 DashboardRouter: Redirecting from /dashboard to ${targetPath}`);
        navigate(targetPath);
      }
    }
  }, [isSignedIn, userRole, loading, navigate]);

  // LOADING STATE: Show loading while auth is resolving
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // UNAUTHENTICATED STATE: Should be handled by useEffect redirect
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // ROLE SELECTION STATE: Show modal for role selection
  if (needsRoleSelection(userRole)) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-white text-2xl mb-4">Welcome to EmviApp!</h2>
            <p className="text-purple-200">Please select your role to continue...</p>
          </div>
        </div>
        
        {user && (
          <RoleSelectionModal
            open={true}
            onOpenChange={() => {}} // Keep modal open until role is selected
            userId={user.id}
          />
        )}
      </>
    );
  }

  // DASHBOARD RENDERING: Show correct dashboard based on role
  return renderDashboardForRole(userRole);
};

/**
 * Get dashboard path for a role (helper function)
 */
function getDashboardPathForRole(role: string): string {
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
    case 'freelancer':
      return '/dashboard/profile';
    case 'salon':
    case 'owner':
      return '/dashboard/salon';
    case 'customer':
      return '/dashboard/customer';
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return '/dashboard/supplier';
    case 'manager':
      return '/dashboard/manager';
    default:
      return '/dashboard/other';
  }
}

/**
 * Render correct dashboard component based on role
 */
function renderDashboardForRole(role: string | null) {
  console.log(`🎨 DashboardRouter: Rendering dashboard for role: ${role}`);
  
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
    case 'freelancer':
      return <ProfileDashboard />;
    case 'salon':
    case 'owner':
      return <SalonDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return <SupplierDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    default:
      console.log(`⚠️ DashboardRouter: Unknown role "${role}", showing Other dashboard`);
      return <OtherDashboard />;
  }
}

export default DashboardRouter;