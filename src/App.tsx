
import React from 'react';
import { AuthProvider } from '@/context/auth';
import AppRoutes from '@/routes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
