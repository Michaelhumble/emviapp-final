
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';

const EditJobPage = () => {
  const { jobId } = useParams();
  const { isSubmitting } = useJobPosting();

  // For now, show a placeholder since we're focusing on jobs creation flow
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to="/jobs">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Edit Job</h1>
          <p className="text-lg text-gray-600 mb-8">
            Job ID: {jobId}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-blue-800 mb-4">
              Job editing functionality is coming soon! 
            </p>
            <Link to="/jobs">
              <Button disabled={isSubmitting}>View All Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditJobPage;
