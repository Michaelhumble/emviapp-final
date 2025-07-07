
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

interface JobData {
  id: string;
  title: string;
  category: string;
  location: string;
  pricing_tier: string;
  created_at: string;
  status: string;
}

const PostSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const jobType = searchParams.get('type') || 'free';
  
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) {
        console.error('❌ [POST-SUCCESS] No job ID provided in URL');
        setError('No job ID provided');
        setLoading(false);
        return;
      }

      console.log('🔍 [POST-SUCCESS] Fetching job data for ID:', jobId);

      try {
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('id, title, category, location, pricing_tier, created_at, status')
          .eq('id', jobId)
          .single();

        if (fetchError) {
          console.error('❌ [POST-SUCCESS] Error fetching job:', fetchError);
          setError(`Failed to fetch job: ${fetchError.message}`);
          return;
        }

        if (!data) {
          console.error('❌ [POST-SUCCESS] Job not found in database');
          setError('Job not found in database');
          return;
        }

        console.log('✅ [POST-SUCCESS] Job data retrieved:', data);
        setJobData(data);
      } catch (err) {
        console.error('💥 [POST-SUCCESS] Unexpected error:', err);
        setError('Unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Verifying your job posting...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !jobData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card className="max-w-md w-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-red-700">Error</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {error || 'Unable to verify your job posting'}
              </p>
              <div className="space-y-2">
                <Link to="/jobs">
                  <Button variant="outline" className="w-full">
                    View All Jobs
                  </Button>
                </Link>
                <Link to="/post-job-free">
                  <Button className="w-full">
                    Try Posting Again
                  </Button>
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              🎉 Job Posted Successfully!
            </CardTitle>
            <CardDescription className="text-lg">
              Your job posting is now live and attracting qualified candidates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Job Title:</span>
                <span className="font-medium">{jobData.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{jobData.category}</span>
              </div>
              {jobData.location && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{jobData.location}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-purple-600 capitalize">{jobData.pricing_tier}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Job ID:</span>
                <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                  {jobData.id}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your job is now visible to thousands of beauty professionals</li>
                <li>• Candidates can apply directly through the platform</li>
                <li>• You'll receive notifications when applications come in</li>
                <li>• Your posting will remain active for 30 days</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs" className="flex-1">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Your Job
                </Button>
              </Link>
              <Link to="/post-job-free" className="flex-1">
                <Button variant="outline" className="w-full">
                  Post Another Job
                </Button>
              </Link>
            </div>

            <div className="text-xs text-gray-500 text-center pt-4 border-t">
              Need help managing your job postings? Visit our{' '}
              <Link to="/help" className="text-purple-600 hover:underline">
                help center
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccessPage;
