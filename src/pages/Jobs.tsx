
import React, { useEffect } from 'react';
import JobsPage from './jobs';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import CreateJobPosting from './jobs/CreateJobPosting';

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
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/create" element={<CreateJobPosting />} />
      </Routes>
    </Layout>
  );
};

export default Jobs;
