
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ToastProvider } from '@/components/ui/toast-context';
import { AuthProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';
import { SubscriptionProvider } from '@/context/subscription';
import { ProfileProvider } from '@/context/profile';
import { ThemeProvider } from '@/components/theme-provider';

// Page imports - only for existing files
import Jobs from '@/pages/Jobs';
import Artists from '@/pages/Artists';
import Community from '@/pages/Community';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="emvi-ui-theme">
        <AuthProvider>
          <SubscriptionProvider>
            <ProfileProvider>
              <NotificationProvider>
                <ToastProvider>
                  <Router>
                    <div className="min-h-screen bg-background font-sans antialiased">
                      <Routes>
                        <Route path="/jobs/*" element={<Jobs />} />
                        <Route path="/artists" element={<Artists />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/dashboard/*" element={<Dashboard />} />
                        
                        {/* Legacy salon dashboard route - DISABLED */}
                        {/* <Route path="/dashboard/salon" element={<Salon />} /> */}
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </Router>
                  <Toaster />
                </ToastProvider>
              </NotificationProvider>
            </ProfileProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
