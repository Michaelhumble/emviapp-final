
import React from 'react';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';

const PostJobFreePage = () => {
  console.log("🚨 PARENT PAGE MOUNTED - post-job-free");
  console.log('🚨 PARENT PAGE MOUNTED - PostJobFreePage is rendering FreeJobPostingForm');
  return <FreeJobPostingForm />;
};

export default PostJobFreePage;
