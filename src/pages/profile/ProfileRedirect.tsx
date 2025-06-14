
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
    
    // Redirect based on user role - update role checks
    if (userRole) {
      switch (userRole) {
        case 'nail-artist':
        case 'hair-stylist':
        case 'lash-tech':
        case 'barber':
        case 'esthetician':
        case 'massage-therapist':
          navigate('/profile/artist/setup');
          break;
        case 'salon':
        case 'salon-owner':
        case 'owner':
          navigate('/profile/salon/setup');
          break;
        case 'freelancer':
          navigate('/profile/freelancer/setup');
          break;
        case 'renter':
          navigate('/profile/renter/setup');
          break;
        case 'beauty-supplier':
        case 'supplier':
        case 'vendor':
          navigate('/profile/supplier/setup');
          break;
        case 'customer':
          navigate('/profile/customer/setup');
          break;
        case 'other':
          navigate('/profile/other/setup');
          break;
        default:
          navigate('/profile/edit');
      }
    } else {
      // No role yet, go to profile edit
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
