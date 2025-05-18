
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import JobForm from '@/components/posting/job/JobForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateJobPosting = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      console.log('Form submitted:', data);
      toast.success('Job post created successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Create Job Posting | EmviApp</title>
        <meta 
          name="description" 
          content="Create a new job posting to find qualified beauty professionals for your salon."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Job Posting</h1>
          <p className="text-gray-600">Find your perfect employee</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <JobForm 
            onSubmit={handleSubmit}
            photoUploads={[]}
            setPhotoUploads={() => {}}
            isSubmitting={false}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
