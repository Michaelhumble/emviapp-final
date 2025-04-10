
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { ProfileProvider } from '@/context/profile';
import { ProfileCompletionProvider } from '@/context/profile/ProfileCompletionProvider';
import { NotificationProvider } from '@/context/notification';
import { SubscriptionProvider } from '@/context/subscription';
import { Toaster } from 'sonner';
import routes from './routes';
import '@/App.css';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ProfileCompletionProvider>
          <SubscriptionProvider>
            <NotificationProvider>
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
            </NotificationProvider>
          </SubscriptionProvider>
        </ProfileCompletionProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
