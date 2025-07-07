
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';
import JobPostingDebugPanel from '@/components/jobs/JobPostingDebugPanel';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

const PostJobFreePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Debug logging
    console.log('🔐 [POST-FREE] Auth state:', { user: user?.id, loading });
    
    if (!loading && !user) {
      console.log('🔐 [POST-FREE] User not authenticated, redirecting to sign in');
      navigate('/auth/signin?redirect=/post-job-free');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p>Redirecting to sign in...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <JobPostingDebugPanel />
          
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Free Job</h1>
              <p className="text-gray-600">
                Reach talented beauty professionals with your job posting
              </p>
            </div>
            
            <FreeJobPostingForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostJobFreePage;
