
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'sonner';

// Create a RouteAvailabilityLogger component to help with debugging routes
const logAvailableRoutes = () => {
  if (process.env.NODE_ENV === 'development') {
    console.info('------- EmviApp Route Availability Check -------');
    console.info('The following routes are available in the app:');
    console.info('/ - Home');
    console.info('/jobs - Job Listings');
    console.info('/salons - Salons Directory');
    console.info('/analysis - Analysis Page');
    console.info('/auth/signin or /sign-in - Sign In');
    console.info('/auth/signup or /sign-up - Sign Up');
    console.info('/profile - User Profile');
    console.info('/dashboard - Main Dashboard');
    console.info('Various role-based dashboard routes are also available');
    console.info('-----------------------------------------------');
  }
};

// Log routes in development mode
logAvailableRoutes();

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster position="top-right" />
  </>
);
