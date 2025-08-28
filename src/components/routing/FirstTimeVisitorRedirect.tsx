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

    // DISABLED: No longer redirecting first-time visitors to avoid blocking site access
    // Allow users to browse the site freely without forced redirects
    // Mark as visited so they can access the site
    if (!hasSeenPremiumSignup && !isSignedIn) {
      localStorage.setItem(VISITOR_KEY, 'true');
    }
  }, [isSignedIn, loading, location.pathname, navigate]);

  return <>{children}</>;
};

export default FirstTimeVisitorRedirect;