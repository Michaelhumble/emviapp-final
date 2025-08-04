import React, { lazy, Suspense } from 'react';
import { AuthProvider } from '@/context/auth';
import { SecurityProvider } from '@/components/security/SecurityProvider';
import { HelmetProvider } from 'react-helmet-async';
import SimpleLoadingFallback from '@/components/error-handling/SimpleLoadingFallback';

// Lazy load non-critical providers
const SalonProvider = lazy(() => import('@/context/salon').then(module => ({ default: module.SalonProvider })));
const SubscriptionProvider = lazy(() => import('@/context/subscription').then(module => ({ default: module.SubscriptionProvider })));
const NotificationProvider = lazy(() => import('@/context/notification').then(module => ({ default: module.NotificationProvider })));
const RecommendationProvider = lazy(() => import('@/context/RecommendationContext').then(module => ({ default: module.RecommendationProvider })));
const OnboardingProvider = lazy(() => import('@/context/OnboardingContext').then(module => ({ default: module.OnboardingProvider })));

interface OptimizedProvidersProps {
  children: React.ReactNode;
}

export const OptimizedProviders: React.FC<OptimizedProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <SecurityProvider>
        <AuthProvider>
          <Suspense fallback={<SimpleLoadingFallback message="Loading..." />}>
            <SalonProvider>
              <SubscriptionProvider>
                <NotificationProvider>
                  <RecommendationProvider>
                    <OnboardingProvider>
                      {children}
                    </OnboardingProvider>
                  </RecommendationProvider>
                </NotificationProvider>
              </SubscriptionProvider>
            </SalonProvider>
          </Suspense>
        </AuthProvider>
      </SecurityProvider>
    </HelmetProvider>
  );
};