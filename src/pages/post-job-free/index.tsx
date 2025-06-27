
import React from 'react';
import Layout from '@/components/layout/Layout';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';

const PostJobFreePage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8">
          <FreeJobPostingForm />
        </div>
      </div>
    </Layout>
  );
};

export default PostJobFreePage;
