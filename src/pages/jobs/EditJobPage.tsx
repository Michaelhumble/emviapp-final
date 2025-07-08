
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FreeJobPostingForm from '@/components/jobs/FreeJobPostingForm';

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!isSignedIn || !user || !jobId) {
        setError('You must be logged in to edit a job');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching job:', error);
          setError('Job not found or you do not have permission to edit it');
          return;
        }

        if (!data) {
          setError('Job not found');
          return;
        }

        // Only allow editing free jobs for now
        if (data.pricing_tier !== 'free') {
          setError('Only free job posts can be edited at this time');
          return;
        }

        setJob(data);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, isSignedIn, user]);

  const handleJobUpdate = async (updatedData: any) => {
    if (!job) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: updatedData.title,
          category: updatedData.category,
          location: updatedData.location,
          description: updatedData.description,
          compensation_type: updatedData.compensation_type,
          compensation_details: updatedData.compensation_details,
          requirements: updatedData.requirements,
          contact_info: updatedData.contact_info,
          updated_at: new Date().toISOString()
        })
        .eq('id', job.id)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      // Navigate back to jobs with success message
      navigate('/jobs?updated=true');
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please try again.');
    }
  };

  if (!isSignedIn) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must be logged in to edit a job.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading job details...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <Link to="/jobs">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>

          <Alert className="max-w-md mx-auto border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link to="/jobs">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center">Edit Your Free Job</h1>
          <p className="text-center text-gray-600 mt-2">
            Update your job details below
          </p>
        </div>

        <FreeJobPostingForm 
          initialData={job}
          onSuccess={handleJobUpdate}
          isEditMode={true}
        />
      </div>
    </Layout>
  );
};

export default EditJobPage;
