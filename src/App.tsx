import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth';
import Index from '@/pages/Index';
import PostJob from '@/pages/PostJob';
import SalonProfile from '@/pages/SalonProfile';
import Contact from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import CustomerProfile from '@/pages/customer/CustomerProfile';
import EditCustomerProfile from '@/pages/customer/EditCustomerProfile';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Pricing from '@/pages/Pricing';
import Salons from '@/pages/Salons';
import Jobs from '@/pages/Jobs';
import Services from '@/pages/Services';
import CustomerInvoices from '@/pages/customer/CustomerInvoices';
import CustomerAppointments from '@/pages/customer/CustomerAppointments';
import CustomerFavorites from '@/pages/customer/CustomerFavorites';
import CustomerSettings from '@/pages/customer/CustomerSettings';
import Search from '@/pages/Search';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/salon/:id" element={<SalonProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/pages/customer/profile" element={<CustomerProfile />} />
              <Route path="/pages/customer/edit-profile" element={<EditCustomerProfile />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/salons" element={<Salons />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/services" element={<Services />} />
              <Route path="/customer/invoices" element={<CustomerInvoices />} />
              <Route path="/customer/appointments" element={<CustomerAppointments />} />
              <Route path="/customer/favorites" element={<CustomerFavorites />} />
              <Route path="/customer/settings" element={<CustomerSettings />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
