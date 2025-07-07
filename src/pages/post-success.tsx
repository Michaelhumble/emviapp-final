
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Eye, Loader2 } from 'lucide-react';
import type { Job } from '@/types/job';

const PostSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const type = searchParams.get('type') || 'free';
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndVerifyJob = async () => {
      if (!jobId) {
        console.error('❌ [SUCCESS] No job ID provided in URL');
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      console.log('🔍 [SUCCESS] Fetching job details for:', jobId);

      try {
        // Fetch the job from Supabase to verify it exists
        const { data: jobData, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (fetchError) {
          console.error('❌ [SUCCESS] Error fetching job:', {
            error: fetchError.message,
            details: fetchError.details,
            code: fetchError.code
          });
          setError(`Failed to verify job posting: ${fetchError.message}`);
        } else if (jobData) {
          console.log('✅ [SUCCESS] Job successfully verified in database:', jobData);
          setJob(jobData as Job);
          
          // Double-check that the job is active
          if (jobData.status !== 'active') {
            console.warn('⚠️ [SUCCESS] Job found but not active:', jobData.status);
            setError('Job was posted but is not active');
          }
        } else {
          console.error('❌ [SUCCESS] Job not found in database');
          setError('Job not found in database');
        }
      } catch (err) {
        console.error('💥 [SUCCESS] Unexpected error:', err);
        setError('Unexpected error while verifying job posting');
      } finally {
        setLoading(false);
      }
    };

    fetchAndVerifyJob();
  }, [jobId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
                <p>Verifying your job posting...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md border-red-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
                <div className="space-y-2">
                  <Link to="/post-job-free">
                    <Button variant="outline" className="w-full">Try Posting Again</Button>
                  </Link>
                  <Link to="/jobs">
                    <Button className="w-full">View All Jobs</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-green-200">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl text-green-700">
                  Job Posted Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Your Job Listing:</h3>
                  <p className="text-lg font-medium">{job.title}</p>
                  {job.location && <p className="text-gray-600">{job.location}</p>}
                  <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="text-green-600">
                      Status: {job.status === 'active' ? '✅ Published' : '⏳ Draft'}
                    </span>
                    <span className="text-blue-600">
                      Tier: {job.pricing_tier === 'free' ? '🆓 Free' : '⭐ Premium'}
                    </span>
                    <span className="text-gray-600">
                      ID: {job.id.slice(0, 8)}...
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">What's Next?</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Your job is now live and visible to job seekers</li>
                    <li>• Candidates can contact you directly through the provided contact information</li>
                    <li>• Your job will remain active for 30 days</li>
                    {type === 'free' && (
                      <li>• Consider upgrading to a premium listing for better visibility</li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/jobs" className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      View All Jobs
                    </Button>
                  </Link>
                  <Link to="/post-job-free" className="flex-1">
                    <Button className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Post Another Job
                    </Button>
                  </Link>
                </div>

                <div className="text-xs text-gray-500 pt-4 border-t text-center">
                  Job verified in database at {new Date().toLocaleTimeString()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccessPage;
