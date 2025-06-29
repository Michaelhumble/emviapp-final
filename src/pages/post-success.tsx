
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
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        // No session ID, show generic success (likely free post)
        setJobDetails({
          jobId: 'free-post-' + Math.random().toString(36).substr(2, 9),
          jobTitle: 'Job Posting',
          planType: 'Free'
        });
        setIsLoading(false);
        return;
      }

      try {
        console.log('Verifying payment session:', sessionId);
        
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          console.error('Payment verification error:', error);
          setHasError(true);
          toast.error('Unable to verify your payment. Please contact support with your payment confirmation.');
          setIsLoading(false);
          return;
        }

        if (data?.success) {
          setJobDetails({
            jobId: data.post_id || 'job-' + Math.random().toString(36).substr(2, 9),
            jobTitle: data.jobTitle || 'Job Posting',
            planType: data.pricing_tier || 'Premium'
          });
          
          // Verify job was actually created in database
          if (data.post_id) {
            try {
              const { data: jobCheck, error: jobError } = await supabase
                .from('jobs')
                .select('id, title, status')
                .eq('id', data.post_id)
                .single();

              if (jobError || !jobCheck) {
                console.error('Job verification failed:', jobError);
                toast.error('Payment processed but job creation needs attention. Please contact support.');
                setHasError(true);
              } else if (jobCheck.status !== 'active') {
                console.warn('Job created but not active:', jobCheck);
                toast.warning('Job created but may need approval. You\'ll be notified when it\'s live.');
              } else {
                toast.success('Payment successful! Your job posting is now live.');
              }
            } catch (dbError) {
              console.error('Database verification error:', dbError);
              toast.warning('Payment processed successfully. If your job doesn\'t appear shortly, please contact support.');
            }
          } else {
            toast.success('Payment successful! Your job posting has been created.');
          }
        } else {
          console.error('Payment verification failed:', data);
          setHasError(true);
          toast.error('Payment verification failed. Please contact support with your payment confirmation.');
        }
      } catch (error) {
        console.error('Payment verification network error:', error);
        setHasError(true);
        toast.error('Network error during verification. Please contact support if your payment was charged.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium mb-2">Verifying your payment...</p>
            <p className="text-sm text-gray-500">Please don't close this page</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (hasError) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl max-w-md mx-4">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Verification Issue</h2>
            <p className="text-gray-600 mb-6">
              We're having trouble verifying your payment. If you were charged, please contact our support team with your payment confirmation.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
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
