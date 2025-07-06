
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
    const verifyPayment = async () => {
      console.log('🔄 [SUCCESS] Verifying payment and ensuring job activation');
      
      if (!sessionId) {
        // No session ID, show generic success
        console.log('ℹ️ [SUCCESS] No session ID - likely free job posting');
        setIsLoading(false);
        return;
      }

      try {
        // Get payment log details first
        const { data: paymentLog, error: paymentError } = await supabase
          .from('payment_logs')
          .select('*')
          .eq('stripe_payment_id', sessionId)
          .single();

        if (paymentError) {
          console.error('❌ [SUCCESS] Error fetching payment log:', paymentError);
          toast.error('Payment verification failed');
          setIsLoading(false);
          return;
        }

        if (paymentLog) {
          console.log('✅ [SUCCESS] Payment log found:', paymentLog.listing_id);
          
          // Double-check that the job is activated (backup to webhook)
          const { data: job, error: jobError } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', paymentLog.listing_id)
            .single();

          if (jobError) {
            console.error('❌ [SUCCESS] Error fetching job:', jobError);
          } else if (job) {
            console.log('🔍 [SUCCESS] Job status check:', job.status);
            
            // If job is still draft, activate it as backup
            if (job.status === 'draft') {
              console.log('🔄 [SUCCESS] Job still in draft, activating as backup...');
              
              const { error: activateError } = await supabase
                .from('jobs')
                .update({ 
                  status: 'active',
                  updated_at: new Date().toISOString()
                })
                .eq('id', job.id);
              
              if (activateError) {
                console.error('❌ [SUCCESS] Backup activation failed:', activateError);
                toast.error('Job activation failed - please contact support');
              } else {
                console.log('✅ [SUCCESS] Backup job activation successful');
                toast.success('Payment successful! Your job posting is now live.');
              }
            } else {
              console.log('✅ [SUCCESS] Job already active via webhook');
              toast.success('Payment successful! Your job posting is now live.');
            }
          }
          
          setJobDetails({
            jobId: paymentLog.listing_id,
            jobTitle: job?.title || 'Job Posting',
            planType: paymentLog.pricing_tier || 'Standard'
          });
        } else {
          console.error('❌ [SUCCESS] No payment log found for session');
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('💥 [SUCCESS] Critical error verifying payment:', error);
        toast.error('Failed to verify payment');
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying payment and activating your job...</p>
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
        jobId={jobDetails?.jobId || 'success-' + Date.now()}
        jobTitle={jobDetails?.jobTitle || 'Job Posting'}
        planType={jobDetails?.planType || 'Standard'}
      />
    </Layout>
  );
};

export default PostSuccess;
