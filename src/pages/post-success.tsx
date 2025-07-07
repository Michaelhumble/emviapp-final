
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'checking' | 'verified' | 'failed'>('checking');
  const [jobData, setJobData] = useState<any>(null);
  
  const jobId = searchParams.get('jobId');

  useEffect(() => {
    console.log('🎉 [POST-SUCCESS] Success page loaded');
    console.log('🔍 [POST-SUCCESS] Job ID from params:', jobId);

    if (jobId) {
      verifyJobExists();
    } else {
      console.log('⚠️ [POST-SUCCESS] No job ID provided, skipping verification');
      setVerificationStatus('verified'); // Assume success if no ID
    }
  }, [jobId]);

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
                {jobData && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-800">Job Details:</p>
                    <p className="text-green-700">Title: {jobData.title}</p>
                    <p className="text-green-700">Category: {jobData.category}</p>
                    <p className="text-green-700">Posted: {new Date(jobData.created_at).toLocaleString()}</p>
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
