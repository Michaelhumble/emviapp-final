
import { useEffect } from 'react';
import JobsPage from './jobs';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';

const Jobs = () => {
  useEffect(() => {
    // Log page visit
    console.log("Jobs page accessed, rendering JobsPage component");
    document.title = "Beauty Industry Jobs | EmviApp";
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Beauty Industry Jobs | EmviApp</title>
        <meta 
          name="description" 
          content="Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
        />
      </Helmet>
      <JobsPage />
    </Layout>
  );
};

export default Jobs;
