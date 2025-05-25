
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import JobPostingSuccess from '@/components/posting/job/JobPostingSuccess';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';
import { Job } from '@/types/job';

const PostSuccess = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('id');
  
  const { data: job, isLoading, error } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) return null;
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();
        
      if (error) throw error;
      return data as Job;
    },
    enabled: !!jobId,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <JobPostingSuccess
          jobId={jobId || undefined}
          jobTitle="Job Posting"
          planType="Standard"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Post Created Successfully | EmviApp</title>
      </Helmet>
      
      <ConfettiExplosion />
      
      <JobPostingSuccess
        jobId={jobId || undefined}
        jobTitle={job.title}
        planType={job.pricingTier || job.pricing_tier || 'Standard'}
      />
    </Layout>
  );
};

export default PostSuccess;
