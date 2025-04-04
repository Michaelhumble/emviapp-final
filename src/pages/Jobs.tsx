
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const Jobs = () => {
  useEffect(() => {
    // Redirect to the implemented jobs page after component mounts
    console.log("Jobs page loaded, redirecting to jobs index page");
  }, []);

  // Redirect to the implemented jobs page
  return <Navigate to="/jobs" replace />;
};

export default Jobs;
