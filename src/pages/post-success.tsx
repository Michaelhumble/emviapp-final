
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import JobPostingSuccess from '@/components/posting/job/JobPostingSuccess';
import { toast } from 'sonner';

const PostSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isFree = searchParams.get('free') === 'true';
  const jobId = searchParams.get('job_id');
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAndFetchJob = async () => {
      // Handle free posts
      if (isFree && jobId) {
        try {
          // Fetch the job details from the database
          const { data: job, error } = await supabase
            .from('jobs')
            .select('*')
            .eq('id', jobId)
            .single();

          if (error) {
            console.error('Error fetching job:', error);
            toast.error('Could not find your job posting');
            navigate('/jobs');
            return;
          }

          setJobDetails({
            jobId: job.id,
            jobTitle: job.title,
            planType: 'Free',
            isLive: true
          });
          
          toast.success('Your free job posting is now live!');
        } catch (error) {
          console.error('Error fetching job details:', error);
          toast.error('Could not find your job posting');
          navigate('/jobs');
        }
        setIsLoading(false);
        return;
      }

      // Handle paid posts with session verification
      if (sessionId && !isFree) {
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
              planType: data.pricing_tier || 'Standard',
              isLive: true
            });
            toast.success('Payment successful! Your job posting is now live.');
          } else {
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Verification error:', error);
          toast.error('Failed to verify payment');
        }
      } else if (!isFree && !sessionId) {
        // No session ID for non-free post, show generic success
        setJobDetails({
          jobId: 'generic-success',
          jobTitle: 'Your Job Posting',
          planType: 'Standard',
          isLive: true
        });
      }
      
      setIsLoading(false);
    };

    verifyAndFetchJob();
  }, [sessionId, isFree, jobId, navigate]);

  const handleViewJob = () => {
    if (jobId) {
      navigate(`/jobs/${jobId}`);
    } else {
      navigate('/jobs');
    }
  };

  const handleViewAllJobs = () => {
    navigate('/jobs');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your post...</p>
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
        planType={jobDetails?.planType || 'Free'}
        isLive={jobDetails?.isLive || false}
        onViewJob={handleViewJob}
        onViewAllJobs={handleViewAllJobs}
      />
    </Layout>
  );
};

export default PostSuccess;
