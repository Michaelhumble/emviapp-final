
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

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

  const handleDeleteJob = async (jobId: string) => {
    if (!user) {
      toast.error('Please sign in to delete jobs');
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Job deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  if (loading) return <Layout><div className="p-8">Loading jobs...</div></Layout>;
  if (error) return <Layout><div className="p-8">Error loading jobs: {error.message}</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Beauty Industry Jobs</h1>
          <p className="text-gray-600">Find your next opportunity in the beauty industry</p>
        </div>

        <JobsGrid
          jobs={jobs}
          expirations={{}}
          currentUserId={user?.id}
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
          onDelete={handleDeleteJob}
        />
      </div>
    </Layout>
  );
};

export default JobsPage;
