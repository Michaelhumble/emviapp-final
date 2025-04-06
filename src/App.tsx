
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { useAuth } from './context/auth';
import { AuthProvider } from './context/auth/AuthProvider';
import Index from './pages/Index';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import JobPost from './pages/posting/JobPost';
import SalonPost from './pages/posting/SalonPost';
import CreateJobPage from './pages/jobs/create';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="emvi-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />

            {/* Jobs */}
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/post/job" element={<JobPost />} />
            <Route path="/post/salon" element={<SalonPost />} />

            {/* Jobs Routes */}
            <Route path="/jobs">
              <Route index element={<Jobs />} />
              <Route path="create" element={<CreateJobPage />} />
            </Route>

            {/* Catch-all route for 404 Not Found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
