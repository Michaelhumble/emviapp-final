
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/context/auth';
import { SalonProvider } from '@/context/salon';
import { SubscriptionProvider } from '@/context/subscription';
import { NotificationProvider } from '@/context/notification';
import { Toaster } from "@/components/ui/toaster";
import GeneralErrorBoundary from '@/components/error-handling/GeneralErrorBoundary';
import AppRoutes from './routes';

function App() {
  return (
    <HelmetProvider>
      <GeneralErrorBoundary>
        <AuthProvider>
          <SalonProvider>
            <SubscriptionProvider>
              <NotificationProvider>
                <div className="App">
                  <AppRoutes />
                  <Toaster />
                </div>
              </NotificationProvider>
            </SubscriptionProvider>
          </SalonProvider>
        </AuthProvider>
      </GeneralErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
