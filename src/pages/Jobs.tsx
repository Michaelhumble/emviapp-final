
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, redirecting to jobs index page");
    document.title = "Job Listings | EmviApp";
  }, []);

  // Redirect to the implemented jobs page
  return <Navigate to="/jobs" replace />;
};

export default Jobs;
