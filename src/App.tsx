
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/auth';
import { ProfileProvider } from '@/context/profile';
import { ProfileCompletionProvider } from '@/context/profile/ProfileCompletionProvider';
import routes from '@/routes';
import '@/App.css';

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ProfileCompletionProvider>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
          <Toaster position="top-right" richColors />
        </ProfileCompletionProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
