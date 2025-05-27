import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/auth';

// ... keep existing code (all other imports)
import SalonListingSuccess from './pages/SalonListingSuccess';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Toaster />
            <Routes>
              {/* ... keep existing code (all existing routes) */}
              
              {/* Add salon listing success route */}
              <Route path="/salon-listing-success" element={<SalonListingSuccess />} />
              
              {/* ... keep existing code (remaining routes) */}
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
