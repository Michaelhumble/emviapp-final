import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';

interface SmartCTAButtonProps {
  primaryText: string;
  primaryRoute: string;
  secondaryText?: string;
  secondaryRoute?: string;
  intent: 'signup' | 'post-job' | 'browse' | 'general';
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  requiresAuth?: boolean;
  showDualCTA?: boolean;
}

/**
 * Smart CTA Button with intelligent routing and dual CTA support
 * Automatically handles auth state and provides optimal user flows
 */
const SmartCTAButton: React.FC<SmartCTAButtonProps> = ({
  primaryText,
  primaryRoute,
  secondaryText,
  secondaryRoute,
  intent,
  size = 'default',
  variant = 'default',
  className = '',
  requiresAuth = false,
  showDualCTA = true
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Smart routing logic based on auth state and intent
  const getSmartRoute = (route: string): string => {
    if (requiresAuth && !user) {
      return `/auth/signin?redirect=${encodeURIComponent(route)}`;
    }
    return route;
  };

  // Get appropriate secondary CTA based on context
  const getSecondaryCTA = () => {
    if (secondaryText && secondaryRoute) {
      return { text: secondaryText, route: secondaryRoute };
    }

    // Smart defaults based on intent and auth state
    if (user) {
      switch (intent) {
        case 'signup':
          return { text: 'Browse Jobs', route: '/jobs' };
        case 'post-job':
          return { text: 'Browse Jobs', route: '/jobs' };
        case 'browse':
          return { text: 'Post a Job', route: '/post-job' };
        default:
          return { text: 'Dashboard', route: '/dashboard' };
      }
    } else {
      switch (intent) {
        case 'signup':
          return { text: 'Already have account? Sign In', route: '/auth/signin' };
        case 'post-job':
          return { text: 'Browse First', route: '/jobs' };
        case 'browse':
          return { text: 'Sign Up', route: '/auth/signup' };
        default:
          return { text: 'Sign In', route: '/auth/signin' };
      }
    }
  };

  const handlePrimaryClick = () => {
    const smartRoute = getSmartRoute(primaryRoute);
    navigate(smartRoute);
  };

  const handleSecondaryClick = () => {
    const secondary = getSecondaryCTA();
    const smartRoute = getSmartRoute(secondary.route);
    navigate(smartRoute);
  };

  const secondary = getSecondaryCTA();

  return (
    <div className={`flex flex-col sm:flex-row gap-4 items-center justify-center ${className}`}>
      {/* Primary CTA */}
      <Button
        onClick={handlePrimaryClick}
        size={size}
        variant={variant}
        className="min-w-[200px] sm:min-w-[250px] font-semibold"
      >
        {primaryText}
      </Button>

      {/* Secondary CTA */}
      {showDualCTA && (
        <Button
          onClick={handleSecondaryClick}
          size={size}
          variant="outline"
          className="min-w-[200px] sm:min-w-[250px] font-medium"
        >
          {secondary.text}
        </Button>
      )}
    </div>
  );
};

export default SmartCTAButton;