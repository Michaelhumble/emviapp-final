
import React from 'react';
import { Navigate } from 'react-router-dom';

const PostJob = () => {
  // Redirect to the legacy job posting system (production-ready)
  return <Navigate to="/post-job" replace />;
};

export default PostJob;
