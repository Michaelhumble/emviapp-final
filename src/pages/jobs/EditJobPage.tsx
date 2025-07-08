import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import CleanJobForm from '@/components/posting/job/CleanJobForm';

const EditJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobData();
  }, [jobId, user]);

  const fetchJobData = async () => {
    if (!jobId || !user) {
      setError('Invalid job ID or user not authenticated');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching job data for ID:', jobId);
      
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('user_id', user.id) // Ensure user owns this job
        .single();

      if (fetchError) {
        console.error('❌ Error fetching job:', fetchError);
        if (fetchError.code === 'PGRST116') {
          setError('Job not found or you do not have permission to edit it');
        } else {
          setError('Failed to load job data');
        }
        setLoading(false);
        return;
      }

      if (!data) {
        setError('Job not found');
        setLoading(false);
        return;
      }

      console.log('✅ Job data fetched:', data);
      setJobData(data);
      setLoading(false);
      
    } catch (error) {
      console.error('💥 Unexpected error fetching job:', error);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleJobUpdate = async (formData: any) => {
    if (!jobId || !user) return;

    try {
      console.log('💾 Updating job with data:', formData);
      
      const { error: updateError } = await supabase
        .from('jobs')
        .update({
          title: formData.jobTitle,
          description: formData.description,
          location: formData.location,
          category: formData.category,
          compensation_type: formData.compensationType,
          compensation_details: formData.compensationDetails,
          requirements: formData.requirements,
          contact_info: formData.contactInfo || {},
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('❌ Error updating job:', updateError);
        toast.error('Failed to update job');
        return;
      }

      console.log('✅ Job updated successfully');
      toast.success('Job updated successfully!');
      navigate('/jobs');
      
    } catch (error) {
      console.error('💥 Unexpected error updating job:', error);
      toast.error('An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading job data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <>
        <Helmet>
          <title>Job Not Found - EmviApp</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
          <div className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <div className="space-y-2">
                    <p><strong>Job Not Found</strong></p>
                    <p>{error || 'The job you\'re looking for doesn\'t exist or you don\'t have permission to edit it.'}</p>
                    <div className="mt-4">
                      <Button
                        onClick={() => navigate('/jobs')}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Browse Jobs
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Job: {jobData.title} - EmviApp</title>
        <meta name="description" content={`Edit your job posting: ${jobData.title}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
              
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Edit Job Post</h1>
                <p className="text-gray-600">Update your job posting details</p>
              </div>
            </div>

            {/* Edit Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Editing: {jobData.title}
                </CardTitle>
                <p className="text-gray-600">
                  Make changes to your job posting below. All fields are editable.
                </p>
              </CardHeader>
              <CardContent>
                {/* Note: CleanJobForm would need to be extended to support edit mode with pre-filled data */}
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <p><strong>Current Job Details:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li><strong>Title:</strong> {jobData.title}</li>
                      <li><strong>Category:</strong> {jobData.category}</li>
                      <li><strong>Location:</strong> {jobData.location || 'Not specified'}</li>
                      <li><strong>Status:</strong> {jobData.status}</li>
                      <li><strong>Pricing Tier:</strong> {jobData.pricing_tier}</li>
                    </ul>
                    <p className="mt-2 text-sm">
                      Note: Job editing form integration is in progress. For now, please contact support to edit your job post.
                    </p>
                  </AlertDescription>
                </Alert>
                
                <div className="text-center space-y-4">
                  <Button
                    onClick={() => navigate('/contact')}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Contact Support for Edits
                  </Button>
                  <div>
                    <Button
                      onClick={() => navigate('/jobs')}
                      variant="outline"
                    >
                      Back to Jobs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJobPage;