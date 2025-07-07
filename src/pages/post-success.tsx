
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        // No session ID, show generic success for free job
        console.log('ℹ️ [SUCCESS] No session ID - likely free job posting');
        setJobDetails({
          jobId: 'free-job-' + Date.now(),
          jobTitle: 'Job Posting',
          planType: 'Free'
        });
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
        <title>Job Posted Successfully | EmviApp</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Job Posted Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-600">
                  Your job posting "{jobDetails?.jobTitle}" has been published successfully.
                </p>
                <p className="text-sm text-gray-500">
                  Plan: {jobDetails?.planType}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  Your job is now live and visible to beauty professionals on our platform. 
                  You'll receive notifications when candidates apply.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/jobs">
                  <Button className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Your Job
                  </Button>
                </Link>
                
                <Link to="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4">
                <Link to="/post-job" className="text-purple-600 hover:text-purple-700 text-sm">
                  Post Another Job
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccess;
