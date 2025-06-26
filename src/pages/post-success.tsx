
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLocation, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import JobPostingSuccess from '@/components/posting/job/JobPostingSuccess';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';
import { toast } from 'sonner';

const PostSuccess = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isFree = searchParams.get('free') === 'true';
  const freeJobId = searchParams.get('jobId');
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleSuccess = async () => {
      // Handle free posting success
      if (isFree) {
        console.log('🆓 Free posting success page');
        setJobDetails({
          jobId: freeJobId || 'free-job-' + Math.random().toString(36).substr(2, 9),
          jobTitle: 'Free Job Posting',
          planType: 'Free'
        });
        setIsLoading(false);
        return;
      }

      // Handle paid posting success (existing logic)
      if (!sessionId) {
        // No session ID, show generic success
        setIsLoading(false);
        return;
      }

      try {
        // Verify the Stripe session and get job details
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

    handleSuccess();
  }, [sessionId, isFree, freeJobId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isFree ? 'Confirming your free posting...' : 'Verifying payment...'}
            </p>
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
      
      <ConfettiExplosion />
      
      <JobPostingSuccess
        jobId={jobDetails?.jobId}
        jobTitle={jobDetails?.jobTitle || 'Job Posting'}
        planType={jobDetails?.planType || 'Standard'}
      />
    </Layout>
  );
};

export default PostSuccess;
