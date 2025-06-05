
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';
import { ProfileProvider } from '@/context/profile';
import { SubscriptionProvider } from '@/context/subscription';
import AppRoutes from './routes';
import './App.css';

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
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <ProfileProvider>
              <SubscriptionProvider>
                <AppRoutes />
                <Toaster />
              </SubscriptionProvider>
            </ProfileProvider>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
