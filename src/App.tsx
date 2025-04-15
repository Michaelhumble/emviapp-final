
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/auth';
import { ProfileProvider } from '@/context/profile';
import { ProfileCompletionProvider } from '@/context/profile/ProfileCompletionProvider';
import { NotificationProvider } from '@/context/notification';
import { SubscriptionProvider } from '@/context/subscription';
import { GoogleMapsProvider } from '@/context/maps/GoogleMapsContext';
import { Toaster } from 'sonner';
import AppModifier from './App-Modifier';
import routes from './routes';
import '@/App.css';
import './components/chat/chat.css';
import { supabase } from '@/integrations/supabase/client';
import AuthGuard from './components/auth/AuthGuard';
import { ChatSystem } from './components/chat/ChatSystem';
import { BookingNotificationProvider } from './components/BookingNotificationProvider';

// Function to determine if a route should be protected
const isProtectedRoute = (path: string): boolean => {
  return path.startsWith('/dashboard') || 
         path.startsWith('/profile') || 
         path.startsWith('/settings') ||
         path === '/command-center';
};

function App() {
  const location = useLocation();

  // Handle referral codes in URL
  useEffect(() => {
    const handleReferral = async () => {
      const params = new URLSearchParams(window.location.search);
      const refCode = params.get('ref');
      
      if (refCode) {
        // Store referral code in localStorage for later attribution
        localStorage.setItem('emvi_referral_code', refCode);
        
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        // If user is signed in and has a referral code, attribute the referral
        if (user) {
          const { error } = await supabase.rpc('process_referral', {
            referral_code: refCode,
            new_user_id: user.id
          });
          
          if (error) {
            console.error('Error processing referral:', error);
          }
        }
      }
    };
    
    handleReferral();
  }, [location]);

  return (
    <AuthProvider>
      <ProfileProvider>
        <ProfileCompletionProvider>
          <SubscriptionProvider>
            <NotificationProvider>
              <GoogleMapsProvider>
                <BookingNotificationProvider />
                <AppModifier />
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        isProtectedRoute(route.path) ? (
                          <AuthGuard>{route.element}</AuthGuard>
                        ) : (
                          route.element
                        )
                      }
                    />
                  ))}
                </Routes>
                <Toaster position="top-right" />
                <ChatSystem />
              </GoogleMapsProvider>
            </NotificationProvider>
          </SubscriptionProvider>
        </ProfileCompletionProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
