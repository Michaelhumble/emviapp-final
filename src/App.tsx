
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { AuthProvider } from '@/context/auth';
import { SubscriptionProvider } from '@/context/subscription';
import { ProfileCompletionProvider } from '@/context/profile/ProfileCompletionProvider';
import { TooltipProvider } from "@/components/ui/tooltip"

import MainRoutes from './MainRoutes';
import GlobalAuthModal from './components/layout/GlobalAuthModal';
import { AuthModalProvider } from "@/context/auth/AuthModalProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <AuthProvider>
              <AuthModalProvider>
                <SubscriptionProvider>
                  <ProfileCompletionProvider>
                    <MainRoutes />
                    <GlobalAuthModal />
                  </ProfileCompletionProvider>
                </SubscriptionProvider>
              </AuthModalProvider>
            </AuthProvider>
          </BrowserRouter>
        </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
