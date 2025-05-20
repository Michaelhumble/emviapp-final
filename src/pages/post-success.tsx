
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import JobSummary from '@/components/jobs/card-sections/JobSummary';
import { Job } from '@/types/job';

const PostSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobData = location.state?.jobData as (Job | null);
  
  const handleViewListing = () => {
    navigate('/jobs');
  };
  
  const handleCreateAnother = () => {
    navigate('/post-job');
  };

  return (
    <Layout>
      <Helmet>
        <title>Posting Successful | EmviApp</title>
        <meta 
          name="description" 
          content="Your job posting has been successfully submitted."
        />
      </Helmet>

      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Success!</h1>
          <p className="text-lg text-gray-600">Your job posting has been published successfully.</p>
        </div>
        
        <Card className="bg-white shadow-md rounded-lg p-6 mb-8">
          {jobData && (
            <JobSummary
              title={jobData.title || ""}
              description={jobData.description || ""}
              location={jobData.location || ""}
              salonName={jobData.salonName || ""}
              contactEmail={jobData.contactEmail || jobData.contact_info?.email || ""}
              contactPhone={jobData.contactPhone || jobData.contact_info?.phone || ""}
            />
          )}
          {!jobData && (
            <div className="text-center py-8 text-gray-500">
              Job information not available
            </div>
          )}
        </Card>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <Button 
            onClick={handleViewListing}
            className="bg-primary hover:bg-primary/90"
          >
            View Job Listings
          </Button>
          <Button 
            onClick={handleCreateAnother}
            variant="outline"
          >
            Create Another Job Post
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccess;
