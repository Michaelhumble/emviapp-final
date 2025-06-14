
import { NavigateFunction } from 'react-router-dom';
import { UserRole } from '@/context/auth/types';
import { getDashboardRoute } from './roles';

export const navigateToRoleDashboard = (navigate: NavigateFunction, role: UserRole) => {
  const route = getDashboardRoute(role);
  navigate(route);
};

export const hasRoleAccess = (userRole: UserRole | null, requiredRole: string): boolean => {
  if (!userRole) return false;
  
  // Map required roles to UserRole enum values
  const roleMapping: Record<string, UserRole[]> = {
    'customer': ['customer'],
    'artist': ['nail-artist', 'hair-stylist', 'lash-tech', 'barber', 'esthetician', 'massage-therapist', 'freelancer'],
    'salon': ['salon', 'salon-owner', 'owner'],
    'supplier': ['beauty-supplier', 'supplier', 'vendor'],
    'admin': ['admin', 'manager']
  };
  
  const allowedRoles = roleMapping[requiredRole] || [];
  return allowedRoles.includes(userRole);
};

export const getPersonalizedGreeting = (userRole: UserRole | null, name: string = "there") => {
  const firstName = name.split(' ')[0] || name;
  
  switch(userRole) {
    case 'nail-artist':
      return `Welcome back, ${firstName}!`;
    case 'hair-stylist':
      return `Hey ${firstName}, let's create beautiful styles today!`;
    case 'lash-tech':
      return `Hi ${firstName}, ready to enhance those lashes?`;
    case 'barber':
      return `What's up, ${firstName}! Ready for another great day?`;
    case 'esthetician':
      return `Hello ${firstName}, let's help clients glow today!`;
    case 'massage-therapist':
      return `Welcome ${firstName}, ready to help clients relax?`;
    case 'salon-owner':
      return `Good to see you, ${firstName}! How's business today?`;
    case 'freelancer':
      return `Hey ${firstName}, ready to take on new projects?`;
    case 'customer':
      return `Welcome back, ${firstName}!`;
    case 'beauty-supplier':
      return `Hello ${firstName}, ready to connect with more salons?`;
    case 'vendor':
      return `Hi ${firstName}, let's grow your business today!`;
    case 'manager':
      return `Welcome back, Manager ${firstName}!`;
    case 'admin':
      return `Hello Admin ${firstName}!`;
    case 'renter':
      return `Hey ${firstName}, make the most of your space today!`;
    default:
      return `Welcome back, ${firstName}!`;
  }
};
