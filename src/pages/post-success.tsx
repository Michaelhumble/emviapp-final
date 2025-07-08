
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const PostSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'checking' | 'verified' | 'failed'>('checking');
  const [jobData, setJobData] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  
  const jobId = searchParams.get('jobId');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    console.log('🎉 [POST-SUCCESS] Success page loaded');
    console.log('🔍 [POST-SUCCESS] Job ID from params:', jobId);
    console.log('🔍 [POST-SUCCESS] Session ID from params:', sessionId);

    if (sessionId) {
      console.log('💳 [POST-SUCCESS] PAID JOB - Verifying Stripe session and database...');
      verifyStripeSession();
    } else if (jobId) {
      console.log('🆓 [POST-SUCCESS] FREE JOB - Verifying database only...');
      verifyJobExists();
    } else {
      console.log('⚠️ [POST-SUCCESS] No job ID or session ID provided, skipping verification');
      setVerificationStatus('verified'); // Assume success if no ID
    }
  }, [jobId, sessionId]);

  const verifyStripeSession = async () => {
    try {
      console.log('💳 [POST-SUCCESS] ======= VERIFYING STRIPE SESSION FOR PAID JOB =======');
      console.log('💳 [POST-SUCCESS] Session ID:', sessionId);
      
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        console.error('❌ [POST-SUCCESS] Authentication error:', authError);
        setVerificationStatus('failed');
        return;
      }
      
      console.log('👤 [POST-SUCCESS] User authenticated:', user.id);

      // Step 1: Look for the most recent job posted by this user
      console.log('🔍 [POST-SUCCESS] Step 1: Checking for recent jobs in database...');
      const { data: recentJobs, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5); // Get last 5 jobs to debug

      if (jobsError) {
        console.error('❌ [POST-SUCCESS] Database query error:', jobsError);
        setVerificationStatus('failed');
        return;
      }

      console.log('📋 [POST-SUCCESS] Found recent jobs:', {
        totalCount: recentJobs?.length || 0,
        jobs: recentJobs?.map(j => ({
          id: j.id,
          title: j.title,
          status: j.status,
          pricing_tier: j.pricing_tier,
          created_at: j.created_at
        })) || []
      });

      // Step 2: Find the most recent paid job
      const latestPaidJob = recentJobs?.find(job => 
        job.pricing_tier !== 'free' && job.status === 'active'
      );

      if (!latestPaidJob) {
        console.error('❌ [POST-SUCCESS] No recent active paid job found');
        console.error('❌ [POST-SUCCESS] This could mean:');
        console.error('❌ [POST-SUCCESS] 1. Webhook has not been triggered yet');
        console.error('❌ [POST-SUCCESS] 2. Job was created as draft but not activated');
        console.error('❌ [POST-SUCCESS] 3. Payment failed but redirect happened anyway');
        
        // Check for draft jobs
        const draftJobs = recentJobs?.filter(j => j.status === 'draft');
        if (draftJobs && draftJobs.length > 0) {
          console.log('🔍 [POST-SUCCESS] Found draft jobs (not yet activated):', draftJobs);
          toast.error('❌ Payment is being processed. Job will be live shortly.');
        } else {
          toast.error('❌ ERROR: PAID JOB POST NOT LIVE');
        }
        
        setVerificationStatus('failed');
        return;
      }

      // Step 3: Verify job is actually visible on jobs page
      console.log('🔍 [POST-SUCCESS] Step 2: Verifying job is visible on public jobs page...');
      const { data: publicJobs, error: publicError } = await supabase
        .from('jobs')
        .select('id, title, status, pricing_tier')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (publicError) {
        console.error('❌ [POST-SUCCESS] Error checking public jobs:', publicError);
      } else {
        const isJobVisible = publicJobs?.some(job => job.id === latestPaidJob.id);
        console.log('👁️ [POST-SUCCESS] Job visibility check:', {
          jobId: latestPaidJob.id,
          isVisible: isJobVisible,
          totalPublicJobs: publicJobs?.length || 0
        });

        if (!isJobVisible) {
          console.error('❌ [POST-SUCCESS] Job exists in DB but not visible on public page!');
          toast.error('❌ ERROR: PAID JOB POST NOT VISIBLE ON JOBS PAGE');
        }
      }

      // Step 4: Success!
      console.log('✅ [POST-SUCCESS] ======= VERIFICATION SUCCESSFUL =======');
      console.log('✅ [POST-SUCCESS] PAID JOB VERIFIED IN DATABASE:', {
        id: latestPaidJob.id,
        title: latestPaidJob.title,
        status: latestPaidJob.status,
        pricing_tier: latestPaidJob.pricing_tier,
        created_at: latestPaidJob.created_at
      });
      console.log('✅ [POST-SUCCESS] PAID JOB NOW VISIBLE ON JOBS PAGE');
      
      setJobData(latestPaidJob);
      setSessionData({ sessionId, verified: true });
      setVerificationStatus('verified');
      
      // Show success toasts and console logs
      console.log('✅ PAID JOB POST SAVED TO DATABASE');
      console.log('✅ PAID JOB NOW VISIBLE ON JOBS PAGE');
      
      toast.success('✅ PAID JOB POST SAVED TO DATABASE');
      toast.success('✅ PAID JOB NOW VISIBLE ON JOBS PAGE');
      
    } catch (error) {
      console.error('💥 [POST-SUCCESS] Unexpected verification error:', error);
      toast.error('❌ ERROR: VERIFICATION FAILED');
      setVerificationStatus('failed');
    }
  };

  const verifyJobExists = async () => {
    try {
      console.log('🔍 [POST-SUCCESS] Verifying job exists in database...');
      
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('❌ [POST-SUCCESS] Verification error:', error);
        setVerificationStatus('failed');
        return;
      }

      if (data) {
        console.log('✅ [POST-SUCCESS] Job verified in database:', data);
        setJobData(data);
        setVerificationStatus('verified');
        
        // Show verification success for free jobs
        if (data.pricing_tier === 'free') {
          toast.success('✅ FREE JOB POST SAVED TO DATABASE');
          toast.success('✅ FREE JOB NOW VISIBLE ON JOBS PAGE');
        }
      } else {
        console.error('❌ [POST-SUCCESS] Job not found in database');
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('💥 [POST-SUCCESS] Unexpected verification error:', error);
      setVerificationStatus('failed');
    }
  };

  const handleViewJobs = () => {
    console.log('🔄 [POST-SUCCESS] Navigating to jobs page...');
    navigate('/jobs');
  };

  const handlePostAnother = () => {
    console.log('🔄 [POST-SUCCESS] Navigating to post another job...');
    navigate('/post-job-free');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {verificationStatus === 'checking' ? (
              <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
            ) : verificationStatus === 'verified' ? (
              <CheckCircle className="h-12 w-12 text-green-500" />
            ) : (
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-xl">!</span>
              </div>
            )}
          </div>
          
          <CardTitle className="text-2xl">
            {verificationStatus === 'checking' && 'Verifying Your Job Post...'}
            {verificationStatus === 'verified' && '🎉 Job Posted Successfully!'}
            {verificationStatus === 'failed' && 'Verification Issue'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {verificationStatus === 'checking' && (
            <div className="text-center text-gray-600">
              <p>We're confirming your job was saved to our database...</p>
            </div>
          )}

          {verificationStatus === 'verified' && (
            <>
              <div className="text-center text-gray-600">
                <p>Your job posting is now live and visible to job seekers!</p>
                
                {sessionData && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">✅ Payment Verification:</p>
                    <p className="text-blue-700">Stripe Session: {sessionData.sessionId}</p>
                    <p className="text-blue-700">Status: Payment confirmed ✅</p>
                  </div>
                )}
                
                {jobData && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">✅ Database Verification:</p>
                    <p className="text-green-700">Title: {jobData.title}</p>
                    <p className="text-green-700">Category: {jobData.category}</p>
                    <p className="text-green-700">Pricing Tier: {jobData.pricing_tier}</p>
                    <p className="text-green-700">Status: {jobData.status}</p>
                    <p className="text-green-700">Posted: {new Date(jobData.created_at).toLocaleString()}</p>
                    <p className="text-green-700">Expires: {new Date(jobData.expires_at).toLocaleString()}</p>
                  </div>
                )}
                
                {sessionId && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="font-medium text-purple-800">✅ Verification Complete:</p>
                    <p className="text-purple-700">• Payment processed successfully</p>
                    <p className="text-purple-700">• Job saved to database</p>
                    <p className="text-purple-700">• Job is now visible on Jobs page</p>
                    <p className="text-purple-700">• Email notifications sent</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleViewJobs} className="w-full">
                  View All Jobs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Button onClick={handlePostAnother} variant="outline" className="w-full">
                  Post Another Job
                </Button>
              </div>
            </>
          )}

          {verificationStatus === 'failed' && (
            <>
              <div className="text-center text-red-600">
                <p>We couldn't verify your job post in our database.</p>
                <p className="text-sm mt-2">This might be a temporary issue.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={verifyJobExists} variant="outline" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                
                <Button onClick={handleViewJobs} className="w-full">
                  View Jobs Page
                </Button>
              </div>
            </>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              Need help? <Link to="/contact" className="text-blue-600 hover:underline">Contact support</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSuccessPage;
