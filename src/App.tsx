
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/auth';
import Index from '@/pages/Index';
import PostJob from '@/pages/PostJob';
import Contact from '@/pages/Contact';
import Search from '@/pages/Search';

// Temporary stubs for missing pages
const SalonProfile = () => <div className="p-8 text-center">Salon Profile - Coming Soon</div>;
const PrivacyPolicy = () => <div className="p-8 text-center">Privacy Policy - Coming Soon</div>;
const TermsOfService = () => <div className="p-8 text-center">Terms of Service - Coming Soon</div>;
const CustomerProfile = () => <div className="p-8 text-center">Customer Profile - Coming Soon</div>;
const EditCustomerProfile = () => <div className="p-8 text-center">Edit Customer Profile - Coming Soon</div>;
const SignIn = () => <div className="p-8 text-center">Sign In - Coming Soon</div>;
const SignUp = () => <div className="p-8 text-center">Sign Up - Coming Soon</div>;
const Pricing = () => <div className="p-8 text-center">Pricing - Coming Soon</div>;
const Salons = () => <div className="p-8 text-center">Salons - Coming Soon</div>;
const Jobs = () => <div className="p-8 text-center">Jobs - Coming Soon</div>;
const Services = () => <div className="p-8 text-center">Services - Coming Soon</div>;
const CustomerInvoices = () => <div className="p-8 text-center">Customer Invoices - Coming Soon</div>;
const CustomerAppointments = () => <div className="p-8 text-center">Customer Appointments - Coming Soon</div>;
const CustomerFavorites = () => <div className="p-8 text-center">Customer Favorites - Coming Soon</div>;
const CustomerSettings = () => <div className="p-8 text-center">Customer Settings - Coming Soon</div>;

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
