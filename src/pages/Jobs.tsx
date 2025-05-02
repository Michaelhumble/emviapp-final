
import { useEffect } from 'react';
import JobsPage from './jobs';
import { Helmet } from 'react-helmet';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering JobsPage component");
    document.title = "Beauty Industry Jobs | EmviApp";
  }, []);

  return (
    <>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>
      <JobsPage />
    </>
  );
};

export default Jobs;
