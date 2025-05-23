
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobTemplates from '@/components/legacy-job-templates/JobTemplates';

const JobPost = () => {
  const handleTemplateSelect = (template: any) => {
    console.log('Legacy template selected:', template);
    // Handle template selection with the proven legacy system
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job - Billion Dollar Experience | EmviApp</title>
        <meta name="description" content="Post your job with our premium billion-dollar job posting experience" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Post Your Job</h1>
            <p className="text-xl text-gray-600">Find the perfect beauty professional with our premium job posting system</p>
          </div>
          
          <JobTemplates onTemplateSelect={handleTemplateSelect} />
        </div>
      </div>
    </Layout>
  );
};

export default JobPost;
