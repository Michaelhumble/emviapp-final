import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth';
import { SubscriptionProvider } from '@/context/subscription';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import AuthGuard from '@/components/auth/AuthGuard';
import RoleDashboardLayout from '@/components/dashboard/RoleDashboardLayout';
import Jobs from '@/pages/Jobs';
import Profile from '@/pages/Profile';
import Artists from '@/pages/Artists';
import Community from '@/pages/Community';

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
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
          <SubscriptionProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  {/* Public Routes - commented out missing pages */}
                  {/* <Route path="/" element={<Home />} /> */}
                  <Route path="/jobs" element={<Jobs />} />
                  {/* <Route path="/salons" element={<Salons />} /> */}
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/community" element={<Community />} />
                  
                  {/* Profile Routes */}
                  <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
                  
                  {/* Dashboard Routes - only keep working ones */}
                  <Route path="/dashboard/owner" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} />
                  
                  {/* Commented out missing dashboard routes */}
                  {/* <Route path="/dashboard/supplier" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} /> */}
                  {/* <Route path="/dashboard/customer" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} /> */}
                  {/* <Route path="/dashboard/other" element={<AuthGuard><RoleDashboardLayout /></AuthGuard>} /> */}
                  
                  {/* Catch-all route - redirect to jobs for now */}
                  <Route path="*" element={<Jobs />} />
                </Routes>
              </div>
            </Router>
            <Toaster />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
