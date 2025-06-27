import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient } from 'react-query';
import { AuthProvider } from '@/context/auth';
import { PricingProvider } from '@/context/pricing/PricingContext';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Salons from './pages/Salons';
import SalonDetail from './pages/salons/SalonDetail';
import Jobs from './pages/Jobs';
import PostJob from './pages/post-job';
import SellSalon from './pages/SellSalon';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AccountSettings from './pages/account/AccountSettings';
import Pricing from './pages/Pricing';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import EnhancedSellSalon from './pages/enhanced-sell-salon';
import FreeJobs from './pages/FreeJobs';

function App() {
  return (
    <QueryClient>
      <AuthProvider>
        <PricingProvider>
          <Toaster />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/salons" element={<Salons />} />
              <Route path="/salons/:id" element={<SalonDetail />} />
              <Route path="/jobs/*" element={<Jobs />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/sell-salon" element={<SellSalon />} />
              <Route path="/community" element={<Community />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/enhanced-sell-salon" element={<EnhancedSellSalon />} />
              <Route path="/free-jobs" element={<FreeJobs />} />
            </Routes>
          </Router>
        </PricingProvider>
      </AuthProvider>
    </QueryClient>
  );
}

export default App;
