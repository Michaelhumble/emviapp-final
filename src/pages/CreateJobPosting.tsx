
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a redirect component to ensure our single job posting page is used
const CreateJobPosting = () => {
  return <Navigate to="/post-job" replace />;
};

export default CreateJobPosting;
