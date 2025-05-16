
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { LanguagePreference } from './components/common/LanguagePreference';
import { ResetPassword } from './pages/ResetPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { TermsOfService } from './pages/TermsOfService';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import SalonProfile from './pages/SalonProfile';
import SalonPost from './pages/posting/SalonPost';
import PostJob from './pages/posting/PostJob';
import PaymentPage from './pages/PaymentPage';
import AboutUs from './pages/AboutUs';

function App() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/sign-in"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignIn />}
      />
      <Route
        path="/sign-up"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignUp />}
      />
      <Route
        path="/dashboard"
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/sign-in" />}
      />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/salon/:id" element={<SalonProfile />} />
      <Route path="/post-salon" element={<SalonPost />} />
      <Route
        path="/post-job"
        element={isLoggedIn ? <PostJob /> : <Navigate to="/sign-in" />}
      />
      <Route
        path="/payment"
        element={isLoggedIn ? <PaymentPage /> : <Navigate to="/sign-in" />}
      />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
  );
}

export default App;
