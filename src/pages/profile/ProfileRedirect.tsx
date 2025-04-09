
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';

/**
 * This component redirects users to the appropriate profile setup page based on their role
 */
const ProfileRedirect = () => {
  const { userRole, isSignedIn, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait for auth to initialize
    if (loading) return;
    
    // Redirect to login if not signed in
    if (!isSignedIn) {
      navigate('/auth/signin');
      return;
    }
    
    // CHANGED: If no role, redirect to role selection instead of profile edit
    if (!userRole) {
      console.warn("[ProfileRedirect] No role detected, redirecting to role selection");
      navigate('/choose-role');
      return;
    }
    
    // Redirect based on user role
    switch (userRole) {
      case 'artist':
      case 'nail technician/artist':
        navigate('/profile/edit');
        break;
      case 'salon_owner':
      case 'salon':
      case 'owner':
        navigate('/profile/salon/setup');
        break;
      case 'freelancer':
        navigate('/profile/freelancer/setup');
        break;
      case 'other':
        navigate('/profile/other/setup');
        break;
      default:
        navigate('/profile/edit');
    }
  }, [userRole, isSignedIn, loading, navigate]);
  
  // Return loading state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>
  );
};

export default ProfileRedirect;
