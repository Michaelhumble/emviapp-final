
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Eye } from 'lucide-react';
import type { Job } from '@/types/job';

const PostSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const type = searchParams.get('type') || 'free';
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      console.log('🔍 [SUCCESS] Fetching job details for:', jobId);

      try {
        const { data: jobData, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (fetchError) {
          console.error('❌ [SUCCESS] Error fetching job:', fetchError);
          setError(`Failed to load job details: ${fetchError.message}`);
        } else if (jobData) {
          console.log('✅ [SUCCESS] Job loaded:', jobData);
          setJob(jobData as Job);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        console.error('💥 [SUCCESS] Unexpected error:', err);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
                <Link to="/jobs">
                  <Button>View All Jobs</Button>
                </Link>
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
                  <p className="text-sm text-green-600 mt-2">
                    Status: {job.status === 'active' ? 'Published' : 'Draft'} • 
                    Tier: {job.pricing_tier || 'Free'}
                  </p>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PostSuccessPage;
