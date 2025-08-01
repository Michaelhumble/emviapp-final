import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';

const VISITOR_KEY = 'emviapp_first_visit_completed';

/**
 * Component that handles first-time visitor redirects to premium signup
 */
const FirstTimeVisitorRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSignedIn, loading } = useAuth();

  useEffect(() => {
    // Don't redirect while auth is loading
    if (loading) return;

    // Don't redirect if user is signed in
    if (isSignedIn) return;

    // Don't redirect if already on premium signup page
    if (location.pathname === '/auth/premium-signup') return;

    // Don't redirect if this is a specific auth/signup route
    if (location.pathname.startsWith('/auth/') || 
        location.pathname.startsWith('/signup') ||
        location.pathname.startsWith('/signin') ||
        location.pathname.startsWith('/login')) return;

    // Check if visitor has seen the premium signup page before
    const hasSeenPremiumSignup = localStorage.getItem(VISITOR_KEY) === 'true';

    // If first-time visitor (unauthenticated and hasn't seen signup), redirect to premium signup
    if (!hasSeenPremiumSignup && !isSignedIn) {
      navigate('/auth/premium-signup');
    }
  }, [isSignedIn, loading, location.pathname, navigate]);

  return <>{children}</>;
};

export default FirstTimeVisitorRedirect;