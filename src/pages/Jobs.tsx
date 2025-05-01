
import { useEffect } from 'react';
import JobsPage from './jobs';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering JobsPage component");
    document.title = "Job Listings | EmviApp";
  }, []);

  // Render the actual jobs page component instead of redirecting
  return <JobsPage />;
};

export default Jobs;
