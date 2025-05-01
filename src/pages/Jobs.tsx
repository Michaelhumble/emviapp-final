
import { useEffect } from 'react';
import StableJobsPage from './jobs/StableJobsPage';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering via StableJobsPage wrapper");
  }, []);

  // Render the stable jobs page component 
  return <StableJobsPage />;
};

export default Jobs;
