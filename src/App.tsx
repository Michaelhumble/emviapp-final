
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth';
import AboutUs from './pages/AboutUs';
import Layout from './components/layout/Layout';
import LanguagePreference from './components/common/LanguagePreference';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route
        path="/sign-in"
        element={user ? <Navigate to="/dashboard" /> : <div>Sign In</div>}
      />
      <Route
        path="/sign-up"
        element={user ? <Navigate to="/dashboard" /> : <div>Sign Up</div>}
      />
      <Route
        path="/dashboard"
        element={user ? <div>Dashboard</div> : <Navigate to="/sign-in" />}
      />
      <Route path="/reset-password" element={<div>Reset Password</div>} />
      <Route path="/update-password" element={<div>Update Password</div>} />
      <Route path="/verify-email" element={<div>Verify Email</div>} />
      <Route path="/terms-of-service" element={<div>Terms of Service</div>} />
      <Route path="/privacy-policy" element={<div>Privacy Policy</div>} />
      <Route path="/salon/:id" element={<div>Salon Profile</div>} />
      <Route path="/post-salon" element={<div>Salon Post</div>} />
      <Route
        path="/post-job"
        element={user ? <div>Post Job</div> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/payment"
        element={user ? <div>Payment Page</div> : <Navigate to="/sign-in" />}
      />
      <Route path="/about" element={<Layout><AboutUs /></Layout>} />
    </Routes>
  );
}

export default App;
