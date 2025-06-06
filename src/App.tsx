
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/auth';
import { NotificationProvider } from '@/context/notification';
import AppRoutes from '@/routes';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <AppRoutes />
          <Toaster />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
