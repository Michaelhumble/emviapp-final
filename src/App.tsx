
import { Routes, Route } from 'react-router-dom';
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

function App() {
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
