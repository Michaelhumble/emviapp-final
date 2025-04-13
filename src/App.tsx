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
import { supabase } from '@/integrations/supabase/client';

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
        
        // Optionally, clear the ref parameter from URL to keep it clean
        // This would require more complex history manipulation
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
                <AppModifier />
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
                <Toaster position="top-right" />
              </GoogleMapsProvider>
            </NotificationProvider>
          </SubscriptionProvider>
        </ProfileCompletionProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
