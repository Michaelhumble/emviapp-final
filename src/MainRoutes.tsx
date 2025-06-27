
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Import your page components here - using dynamic imports for better performance
const HomePage = React.lazy(() => import('./pages/Home'));
const JobsPage = React.lazy(() => import('./pages/Jobs'));
const SalonsPage = React.lazy(() => import('./pages/Salons'));
const ArtistsPage = React.lazy(() => import('./pages/Artists'));
const DashboardPage = React.lazy(() => import('./pages/Dashboard'));
const SignInPage = React.lazy(() => import('./pages/auth/SignIn'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUp'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="salons" element={<SalonsPage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="dashboard/*" element={<DashboardPage />} />
        <Route path="auth/signin" element={<SignInPage />} />
        <Route path="auth/signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
