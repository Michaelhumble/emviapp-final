import { NavigateFunction } from 'react-router-dom';

export function routeByRole(navigate: NavigateFunction, role?: string) {
  switch (role) {
    case 'salon_owner': 
      return navigate('/dashboard/salon', { replace: true });
    case 'artist':      
      return navigate('/dashboard/profile', { replace: true });
    case 'freelancer':  
      return navigate('/dashboard/profile', { replace: true });
    case 'customer':
    default:            
      return navigate('/', { replace: true });
  }
}