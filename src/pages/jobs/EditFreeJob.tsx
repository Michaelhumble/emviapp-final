
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobMutations } from '@/hooks/jobs/useJobMutations';
import { useJobQueries } from '@/hooks/jobs/useJobQueries';
import { useJobValidation } from '@/hooks/jobs/useJobValidation';
import JobFormFields from '@/components/jobs/JobFormFields';
import { JobFormData } from '@/types/job';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

const EditFreeJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { user, userRole } = useAuth();
  const { updateJob, deleteJob, loading } = useJobMutations();
  const { fetchJobById } = useJobQueries();
  const { validateJobForm } = useJobValidation();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    compensation_type: 'hourly',
    compensation_details: '',
    employment_type: 'full-time',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: '',
    }
  });
  
  const [initialLoading, setInitialLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        navigate('/jobs');
        return;
      }

      try {
        const job = await fetchJobById(jobId);
        if (!job) {
          toast.error('Job not found');
          navigate('/jobs');
          return;
        }

        // Check permissions
        const hasPermission = user?.id === job.user_id || userRole === 'admin';
        if (!hasPermission) {
          toast.error('You do not have permission to edit this job');
          navigate('/jobs');
          return;
        }

        setCanEdit(true);
        
        // Populate form with job data
        setFormData({
          title: job.title || '',
          location: job.location || '',
          description: job.description || '',
          compensation_type: job.compensation_type || 'hourly',
          compensation_details: job.compensation_details || '',
          employment_type: job.employment_type || 'full-time',
          contact_info: {
            owner_name: job.contact_info?.owner_name || '',
            phone: job.contact_info?.phone || '',
            email: job.contact_info?.email || '',
            notes: job.contact_info?.notes || '',
            zalo: job.contact_info?.zalo || '',
          }
        });
      } catch (error) {
        console.error('Error loading job:', error);
        toast.error('Failed to load job details');
        navigate('/jobs');
      } finally {
        setInitialLoading(false);
      }
    };

    loadJob();
  }, [jobId, user?.id, userRole, navigate, fetchJobById]);

  const handleFieldChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobId || !canEdit) return;
    
    try {
      // Validate form data
      validateJobForm(formData);
      
      // Update job
      const success = await updateJob(jobId, formData);
      
      if (success) {
        navigate('/jobs', { 
          state: { message: 'Job updated successfully!' }
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Please check all required fields');
      }
    }
  };

  const handleDelete = async () => {
    if (!jobId || !canEdit) return;
    
    const confirmed = window.confirm('Are you sure you want to delete this job? This action cannot be undone.');
    if (!confirmed) return;
    
    const success = await deleteJob(jobId);
    if (success) {
      navigate('/jobs', { 
        state: { message: 'Job deleted successfully!' }
      });
    }
  };

  if (initialLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!canEdit) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <Helmet>
        <title>Edit Job | EmviApp</title>
        <meta name="description" content="Edit your job listing" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back to Jobs
            </Button>
          </div>

          {/* Edit Job Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Edit Job</CardTitle>
              <p className="text-blue-50">
                Update your job posting details
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <JobFormFields
                  formData={formData}
                  onChange={handleFieldChange}
                  onContactInfoChange={handleContactInfoChange}
                />

                {/* Action Buttons */}
                <div className="pt-6 border-t flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/jobs')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Deleting...' : 'Delete Job'}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !formData.title || !formData.location}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? 'Updating...' : 'Update Job'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default EditFreeJob;
