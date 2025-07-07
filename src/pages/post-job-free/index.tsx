
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

const PostJobFreePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
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
      <FreeJobPostingForm />
    </Layout>
  );
};

export default PostJobFreePage;
