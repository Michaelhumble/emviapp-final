
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect all job creation to the unified form
const CreateJobPosting = () => {
  return <Navigate to="/post-job-free" replace />;
};

export default CreateJobPosting;
