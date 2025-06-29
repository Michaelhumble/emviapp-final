
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from '@/hooks/useJobsData';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const { user } = useAuth();
  const {
    jobs,
    loading,
    error,
    renewalJobId,
    setActiveRenewalJobId,
    refetch
  } = useJobsData();

  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenewJob = async (job: Job) => {
    if (!user) {
      toast.error('Please sign in to renew jobs');
      return;
    }
    
    setIsRenewing(true);
    setActiveRenewalJobId(job.id);
    
    try {
      // Add 30 days to current expiration
      const newExpiresAt = new Date();
      newExpiresAt.setDate(newExpiresAt.getDate() + 30);
      
      const { error } = await supabase
        .from('jobs')
        .update({
          expires_at: newExpiresAt.toISOString(),
          status: 'active'
        })
        .eq('id', job.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Job renewed successfully!');
      refetch();
    } catch (error) {
      console.error('Error renewing job:', error);
      toast.error('Failed to renew job');
    } finally {
      setIsRenewing(false);
      setActiveRenewalJobId(null);
    }
  };

  // Debug logging
  console.log('📊 Jobs Page Debug:', {
    jobsCount: jobs.length,
    loading,
    error: error?.message,
    jobs: jobs.map(j => ({ id: j.id, title: j.title, pricing_tier: j.pricing_tier }))
  });

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs from database...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Jobs</h2>
            <p className="text-red-600 mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Beauty Industry Jobs</h1>
            <p className="text-gray-600">
              Find your next opportunity in the beauty industry 
              <span className="text-sm text-blue-600 ml-2">
                ({jobs.length} jobs from database)
              </span>
            </p>
          </div>
          
          <Link to="/jobs/create">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Jobs Found</h3>
            <p className="text-gray-600 mb-4">There are currently no active job postings in the database.</p>
            <Link to="/jobs/create">
              <Button>Post the First Job</Button>
            </Link>
          </div>
        ) : (
          <UnifiedJobFeed
            jobs={jobs}
            onRenew={handleRenewJob}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
          />
        )}
      </div>
    </Layout>
  );
};

export default JobsPage;
