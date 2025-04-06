
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/auth';
import { ProfileProvider } from './context/profile';
import { SubscriptionProvider } from './context/subscription';
import { Toaster } from '@/components/ui/sonner';
import App from './App';

// Import styles
import './index.css';

// Create query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
