
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Share2, Eye, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

const PostSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get('jobId');
  const postType = searchParams.get('type') || 'job';
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) {
      setError('No job ID provided');
      setLoading(false);
      return;
    }

    const verifyJob = async () => {
      try {
        console.log('🔍 [POST-SUCCESS] Verifying job in Supabase:', jobId);
        
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (fetchError) {
          console.error('❌ [POST-SUCCESS] Error fetching job:', fetchError);
          setError(`Job verification failed: ${fetchError.message}`);
          return;
        }

        if (!data) {
          console.error('❌ [POST-SUCCESS] No job found with ID:', jobId);
          setError('Job not found in database');
          return;
        }

        console.log('✅ [POST-SUCCESS] Job verified:', data);
        
        // Transform to Job interface
        const transformedJob: Job = {
          id: data.id,
          title: data.title || 'Untitled Job',
          category: data.category || 'Other',
          location: data.location || '',
          description: data.description || '',
          user_id: data.user_id || '',
          status: data.status || 'active',
          created_at: data.created_at || new Date().toISOString(),
          compensation_type: data.compensation_type || '',
          compensation_details: data.compensation_details || '',
          requirements: data.requirements || '',
          pricing_tier: data.pricing_tier || 'free',
          contact_info: typeof data.contact_info === 'object' && data.contact_info ? 
            data.contact_info as Job['contact_info'] : {},
        };

        setJob(transformedJob);
        
      } catch (error) {
        console.error('💥 [POST-SUCCESS] Unexpected error:', error);
        setError('Unexpected error during verification');
      } finally {
        setLoading(false);
      }
    };

    verifyJob();
  }, [jobId]);

  const handleViewPost = () => {
    window.open('/jobs', '_blank');
  };

  const handleSharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title || 'Job Opportunity',
        text: `Check out this job opportunity: ${job?.title}`,
        url: window.location.origin + '/jobs',
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/jobs');
      // Could show a toast here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p>Verifying your job posting...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="text-red-600 mb-4">
              <p className="text-lg font-semibold">Verification Failed</p>
              <p>{error}</p>
            </div>
            <Link to="/jobs">
              <Button>Go Back to Jobs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Job Posted Successfully!
            </h1>
            <p className="text-gray-600 text-lg">
              Your job posting is now live and ready to attract qualified candidates.
            </p>
          </div>

          <Card className="bg-gray-50 border-dashed">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Job Title:</span>
                  <span className="font-medium">{job.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{job.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium text-purple-600 capitalize">{job.pricing_tier}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Live
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Job ID:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {job.id}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your job is now visible on the jobs page</li>
              <li>• Candidates can view and apply to your position</li>
              <li>• You'll receive applications via the contact info provided</li>
              <li>• Your posting will remain active for 30 days</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleViewPost}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Jobs Page
            </Button>
            
            <Button
              onClick={handleSharePost}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            <Link to="/post-job-free">
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Post Another
              </Button>
            </Link>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t">
            Need help? Contact our support team or check out our{' '}
            <a href="/help" className="text-purple-600 hover:underline">
              help center
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostSuccessPage;
