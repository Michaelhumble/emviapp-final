
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
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processSuccess = async () => {
      // Check if this is a free job (has jobId in URL params)
      const jobId = searchParams.get('jobId');
      const jobTitle = searchParams.get('jobTitle');
      const planType = searchParams.get('planType');

      if (jobId && !sessionId) {
        // This is a free job success
        console.log('✅ [DEBUG] Processing free job success:', { jobId, jobTitle, planType });
        setJobDetails({
          jobId: jobId,
          jobTitle: decodeURIComponent(jobTitle || 'Job Posting'),
          planType: planType || 'Free'
        });
        setIsLoading(false);
        return;
      }

      if (!sessionId) {
        // No session ID and no free job params, show generic success
        console.log('✅ [DEBUG] No session ID or job params, showing generic success');
        setIsLoading(false);
        return;
      }

      // This is a paid job, verify payment session
      try {
        console.log('💰 [DEBUG] Verifying payment session:', sessionId);
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
            planType: data.pricing_tier || 'Standard'
          });
          toast.success('Payment successful! Your job posting is now live.');
        } else {
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify payment');
      } finally {
        setIsLoading(false);
      }
    };

    processSuccess();
  }, [sessionId, searchParams]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Post Created Successfully | EmviApp</title>
      </Helmet>
      
      <JobPostingSuccess
        jobId={jobDetails?.jobId}
        jobTitle={jobDetails?.jobTitle || 'Job Posting'}
        planType={jobDetails?.planType || 'Standard'}
      />
    </Layout>
  );
};

export default PostSuccess;
