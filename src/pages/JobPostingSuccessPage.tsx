import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobPostingSuccess from '@/components/posting/job/JobPostingSuccess';

const JobPostingSuccessPage = () => {
  const location = useLocation();
  const { jobId, jobData } = location.state || {};

  // Redirect to job posting if no job data is provided
  if (!jobId || !jobData) {
    return <Navigate to="/post-job" replace />;
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Posted Successfully | EmviApp</title>
        <meta name="description" content="Your job posting has been successfully submitted and is now live." />
      </Helmet>
      
      <JobPostingSuccess jobId={jobId} jobData={jobData} />
    </Layout>
  );
};

export default JobPostingSuccessPage;