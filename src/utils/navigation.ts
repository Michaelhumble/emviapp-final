
import { UserRole } from '@/context/auth/types';

/**
 * Navigate to the appropriate dashboard based on user role
 */
export const navigateToRoleDashboard = (navigate: (path: string) => void, role: UserRole | null) => {
  if (!role) {
    console.warn('No role provided for dashboard navigation');
    navigate('/dashboard');
    return;
  }

  console.log('Navigating to dashboard for role:', role);

  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      navigate('/dashboard/artist');
      break;
    case 'salon':
    case 'owner':
      navigate('/dashboard/salon');
      break;
    case 'customer':
      navigate('/dashboard/customer');
      break;
    case 'freelancer':
      navigate('/dashboard/freelancer');
      break;
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      navigate('/dashboard/supplier');
      break;
    case 'manager':
      navigate('/dashboard/manager');
      break;
    case 'admin':
      navigate('/dashboard/admin');
      break;
    case 'renter':
      navigate('/dashboard/renter');
      break;
    case 'other':
      navigate('/dashboard/other');
      break;
    default:
      console.warn('Unknown role for navigation:', role);
      navigate('/dashboard');
  }
};

/**
 * Get the dashboard path for a given role without navigating
 */
export const getRoleDashboardPath = (role: UserRole | null): string => {
  if (!role) return '/dashboard';

  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return '/dashboard/artist';
    case 'salon':
    case 'owner':
      return '/dashboard/salon';
    case 'customer':
      return '/dashboard/customer';
    case 'freelancer':
      return '/dashboard/freelancer';
    case 'supplier':
    case 'beauty supplier':
    case 'vendor':
      return '/dashboard/supplier';
    case 'manager':
      return '/dashboard/manager';
    case 'admin':
      return '/dashboard/admin';
    case 'renter':
      return '/dashboard/renter';
    case 'other':
      return '/dashboard/other';
    default:
      return '/dashboard';
  }
};

/**
 * Check if user has access to a specific role
 */
export const hasRoleAccess = (userRole: UserRole | null, requiredRole: UserRole): boolean => {
  return userRole === requiredRole;
};

/**
 * Get personalized greeting based on user role and time
 */
export const getPersonalizedGreeting = (role: UserRole | null, name?: string): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Good day';
  
  if (hour < 12) timeGreeting = 'Good morning';
  else if (hour < 18) timeGreeting = 'Good afternoon';
  else timeGreeting = 'Good evening';
  
  const displayName = name || 'there';
  
  switch (role) {
    case 'artist':
    case 'nail technician/artist':
      return `${timeGreeting}, ${displayName}! Ready to create beautiful nails?`;
    case 'salon':
    case 'owner':
      return `${timeGreeting}, ${displayName}! How's your salon doing today?`;
    case 'customer':
      return `${timeGreeting}, ${displayName}! Looking for your next nail appointment?`;
    default:
      return `${timeGreeting}, ${displayName}!`;
  }
};
