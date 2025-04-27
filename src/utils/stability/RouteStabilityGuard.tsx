import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface StableRouteGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
  isStable?: boolean;
}

/**
 * A component that guards routes that might be unstable.
 * If isStable is false, it will redirect to the fallback path.
 */
export const StableRouteGuard: React.FC<StableRouteGuardProps> = ({
  children,
  fallbackPath = '/',
  isStable = true,
}) => {
  const location = useLocation();

  // If the route is stable, render the children
  if (isStable) {
    return <>{children}</>;
  }

  // Otherwise, redirect to the fallback path
  console.warn(`Route "${location.pathname}" is marked as unstable. Redirecting to ${fallbackPath}`);
  return <Navigate to={fallbackPath} replace />;
};

/**
 * A higher-order component that wraps a component with the StableRouteGuard.
 */
export const withStabilityCheck = (
  Component: React.ComponentType,
  isStable = true,
  fallbackPath = '/'
) => {
  const WrappedComponent = (props: any) => (
    <StableRouteGuard isStable={isStable} fallbackPath={fallbackPath}>
      <Component {...props} />
    </StableRouteGuard>
  );
  
  // Copy the display name for better debugging
  WrappedComponent.displayName = `withStabilityCheck(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};
