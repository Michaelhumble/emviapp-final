import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { ToastProvider } from '@/components/ui/toast-context';
import { AuthProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';
import { SubscriptionProvider } from '@/context/subscription';
import { PricingProvider } from '@/context/pricing';
import { ProfileProvider } from '@/context/profile';
import { ThemeProvider } from '@/components/theme-provider';

// Page imports
import Home from '@/pages/Home';
import Jobs from '@/pages/Jobs';
import Artists from '@/pages/Artists';
import Community from '@/pages/Community';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/dashboard';
// Removed import for Salon since we're disabling the route
// import Salon from '@/pages/dashboard/Salon';
import Messages from '@/pages/Messages';
import Salons from '@/pages/Salons';
import ExploreArtists from '@/pages/ExploreArtists';
import CreditPurchasePage from '@/pages/CreditPurchasePage';
import BoothMarketplace from '@/pages/BoothMarketplace';
import Opportunities from '@/pages/Opportunities';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import PasswordReset from '@/pages/PasswordReset';
import EmailConfirmation from '@/pages/EmailConfirmation';
import TermsOfService from '@/pages/TermsOfService';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

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
            <PricingProvider>
              <ProfileProvider>
                <NotificationProvider>
                  <ToastProvider>
                    <Router>
                      <div className="min-h-screen bg-background font-sans antialiased">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/jobs/*" element={<Jobs />} />
                          <Route path="/artists" element={<Artists />} />
                          <Route path="/community" element={<Community />} />
                          <Route path="/dashboard/*" element={<Dashboard />} />
                          
                          {/* Legacy salon dashboard route - DISABLED */}
                          {/* <Route path="/dashboard/salon" element={<Salon />} /> */}
                          
                          <Route path="/messages" element={<Messages />} />
                          <Route path="/salons" element={<Salons />} />
                          <Route path="/explore/artists" element={<ExploreArtists />} />
                          <Route path="/credit-purchase" element={<CreditPurchasePage />} />
                          <Route path="/booths" element={<BoothMarketplace />} />
                          <Route path="/opportunities" element={<Opportunities />} />
                          <Route path="/articles/:articleId" element={<Article />} />
                          <Route path="/articles" element={<Articles />} />
                           <Route path="/password-reset" element={<PasswordReset />} />
                          <Route path="/email-confirmation" element={<EmailConfirmation />} />
                          <Route path="/terms-of-service" element={<TermsOfService />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </Router>
                    <Toaster />
                  </ToastProvider>
                </NotificationProvider>
              </ProfileProvider>
            </PricingProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
