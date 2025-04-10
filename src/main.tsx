
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Create query client
const queryClient = new QueryClient();

// Set favicon
const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
if (link) {
  link.href = "/lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png";
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
);
