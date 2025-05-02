
import { useEffect } from 'react';
import JobsPage from './jobs';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering JobsPage component");
    document.title = "Beauty Industry Jobs | EmviApp";
  }, []);

  // Render the actual jobs page component
  return <JobsPage />;
};

export default Jobs;
