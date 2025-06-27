
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

  if (loading) return <Layout><div className="p-8">Loading jobs...</div></Layout>;
  if (error) return <Layout><div className="p-8">Error loading jobs: {error.message}</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Beauty Industry Jobs</h1>
            <p className="text-gray-600">Find your next opportunity in the beauty industry</p>
          </div>
          
          <Link to="/jobs/create">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Post a Job
            </Button>
          </Link>
        </div>

        <UnifiedJobFeed
          jobs={jobs}
          onRenew={handleRenewJob}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />
      </div>
    </Layout>
  );
};

export default JobsPage;
