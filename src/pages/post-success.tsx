
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import JobPostingSuccess from '@/components/posting/job/JobPostingSuccess';
import { toast } from 'sonner';

const PostSuccess = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isFree = searchParams.get('free') === 'true';
  const jobId = searchParams.get('job_id');
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        // Handle free posts
        if (isFree && jobId) {
          // Fetch the job details from database to confirm it exists
          const { data: job, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', jobId)
            .single();

          if (error) {
            console.error('Error fetching job:', error);
            toast.error('Could not verify job posting');
          } else if (job) {
            setJobDetails({
              jobId: job.id,
              jobTitle: job.title,
              planType: 'Free',
              isLive: true
            });
            toast.success('Your free job posting is now live!');
          }
          setIsLoading(false);
          return;
        }

        // Handle paid posts with Stripe verification
        if (sessionId) {
          const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
            body: { sessionId }
          });

          if (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
            setIsLoading(false);
            return;
          }

          if (data?.success) {
            setJobDetails({
              jobId: data.post_id || 'job-' + Math.random().toString(36).substr(2, 9),
              jobTitle: data.jobTitle || 'Job Posting',
              planType: data.pricing_tier || 'Standard',
              isLive: true
            });
            toast.success('Payment successful! Your job posting is now live.');
          } else {
            toast.error('Payment verification failed');
          }
        } else {
          // Generic success case
          setJobDetails({
            jobId: 'generic-' + Math.random().toString(36).substr(2, 9),
            jobTitle: 'Job Posting',
            planType: 'Standard',
            isLive: true
          });
        }
      } catch (error) {
        console.error('Success page error:', error);
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    handleSuccess();
  }, [sessionId, isFree, jobId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your job posting...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Job Posted Successfully | EmviApp</title>
      </Helmet>
      
      <JobPostingSuccess
        jobId={jobDetails?.jobId}
        jobTitle={jobDetails?.jobTitle || 'Job Posting'}
        planType={jobDetails?.planType || 'Standard'}
        isLive={jobDetails?.isLive || false}
      />
    </Layout>
  );
};

export default PostSuccess;
