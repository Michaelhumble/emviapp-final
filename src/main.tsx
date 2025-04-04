
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'sonner';

// Define the available routes in the app for logging and verification
const availableRoutes = [
  '/',
  '/jobs',
  '/salons',
  '/analysis',
  '/auth/signin', '/sign-in',
  '/auth/signup', '/sign-up',
  '/profile',
  '/dashboard',
  '/dashboard/artist',
  '/dashboard/salon',
  '/dashboard/owner',
  '/dashboard/customer',
  '/dashboard/supplier',
  '/dashboard/freelancer',
  '/dashboard/other',
  '/profile/edit',
  '/profile/setup',
  '/profile/other/setup',
  '/profile/freelancer/setup',
  '/profile/salon/setup',
  '/not-found',
  '*' // Catch-all route
];

// Create a RouteAvailabilityLogger component to help with debugging routes
const logAvailableRoutes = () => {
  if (process.env.NODE_ENV === 'development') {
    console.info('------- EmviApp Route Availability Check -------');
    console.info('The following routes are available in the app:');
    
    // Log each route with more details
    availableRoutes.forEach(route => {
      if (route === '*') {
        console.info('* - Catch-all route (redirects to 404)');
        return;
      }
      
      // Get a user-friendly name for the route
      const routeName = route === '/' 
        ? 'Home' 
        : route.split('/').pop()?.charAt(0).toUpperCase() + route.split('/').pop()?.slice(1);
        
      console.info(`${route} - ${routeName}`);
    });
    
    console.info('-----------------------------------------------');
  }
};

// Log routes in development mode
logAvailableRoutes();

createRoot(document.getElementById("root")!).render(
  <>
    <App availableRoutes={availableRoutes} />
    <Toaster position="top-right" />
  </>
);
