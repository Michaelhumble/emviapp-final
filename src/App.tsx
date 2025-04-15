
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth';
import Layout from './components/layout/Layout';
import { BookingProvider } from './context/booking/BookingProvider';
import { NotificationProvider } from './context/notification';
import { BookingNotificationProvider } from './components/BookingNotificationProvider';
import { useRebookingReminder } from './hooks/useRebookingReminder';

// Import dummy components for scaffolding the structure
import BookingPage from './pages/BookingPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationProvider>
          <BookingProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><div>Landing Page</div></Layout>} />
                <Route path="/auth/signin" element={<Layout><div>Sign In Page</div></Layout>} />
                <Route path="/auth/signup" element={<Layout><div>Sign Up Page</div></Layout>} />
                <Route path="/pricing" element={<Layout><div>Pricing Page</div></Layout>} />
                <Route path="/contact" element={<Layout><div>Contact Page</div></Layout>} />
                <Route path="/about" element={<Layout><div>About Page</div></Layout>} />
                <Route path="/terms" element={<Layout><div>Terms Page</div></Layout>} />
                <Route path="/privacy" element={<Layout><div>Privacy Page</div></Layout>} />
                <Route path="/services" element={<Layout><div>Services Page</div></Layout>} />
                <Route path="/artists" element={<Layout><div>Artists Page</div></Layout>} />
                <Route path="/support" element={<Layout><div>Support Page</div></Layout>} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={<Layout><div>Dashboard Page</div></Layout>} />
                <Route path="/profile" element={<Layout><div>Profile Page</div></Layout>} />
                <Route path="/booking" element={<Layout><BookingPage /></Layout>} />
                <Route path="/checkout" element={<Layout><div>Checkout Page</div></Layout>} />
                
                {/* Role-based Dashboards */}
                <Route path="/dashboard/artist" element={<Layout><div>Artist Dashboard</div></Layout>} />
                <Route path="/dashboard/owner" element={<Layout><div>Owner Dashboard</div></Layout>} />
                <Route path="/dashboard/customer" element={<Layout><div>Customer Dashboard</div></Layout>} />
                
                {/* Error Route */}
                <Route path="*" element={<Layout><div>Error Page</div></Layout>} />
              </Routes>
              <BookingNotificationProvider />
            </Router>
          </BookingProvider>
        </NotificationProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
