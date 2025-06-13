
import { NavigateFunction } from 'react-router-dom';
import { UserRole } from '@/context/auth/types';
import { getDashboardRoute } from './roles';

export const navigateToRoleDashboard = (navigate: NavigateFunction, role: UserRole) => {
  const route = getDashboardRoute(role);
  navigate(route);
};
