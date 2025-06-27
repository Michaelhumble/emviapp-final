
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobsData } from '@/hooks/useJobsData';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const EditJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { jobs, loading } = useJobsData();
  const { handleJobPost } = useJobPosting();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation_details: '',
    employment_type: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: ''
    }
  });

  const job = jobs.find(j => j.id === jobId);

  useEffect(() => {
    if (!loading && job) {
      setFormData({
        title: job.title || '',
        description: job.description || '',
        location: job.location || '',
        compensation_details: job.compensation_details || '',
        employment_type: job.employment_type || '',
        requirements: typeof job.requirements === 'string' ? job.requirements : (job.requirements?.join('\n') || ''),
        contact_info: {
          owner_name: job.contact_info?.owner_name || '',
          phone: job.contact_info?.phone || '',
          email: job.contact_info?.email || '',
          notes: job.contact_info?.notes || '',
          zalo: job.contact_info?.zalo || ''
        }
      });
    }
  }, [job, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobId) {
      toast.error('Job ID is missing');
      return;
    }

    try {
      const result = await handleJobPost({
        ...formData,
        id: jobId, // Include the job ID for updates
        pricing_tier: job?.pricing_tier || 'free'
      });

      if (result.success) {
        toast.success('Job updated successfully!');
        navigate('/jobs');
      } else {
        toast.error(result.error || 'Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <Button onClick={() => navigate('/jobs')} className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/jobs')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        
        <h1 className="font-playfair text-3xl font-bold text-gray-900">Edit Job Posting</h1>
        <p className="text-gray-600 font-inter mt-2">Update your job posting details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-playfair text-xl">Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Employment Type
              </label>
              <input
                type="text"
                value={formData.employment_type}
                onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Compensation Details
              </label>
              <input
                type="text"
                value={formData.compensation_details}
                onChange={(e) => setFormData({ ...formData, compensation_details: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Requirements
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={formData.contact_info.owner_name}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact_info: { ...formData.contact_info, owner_name: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.contact_info.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact_info: { ...formData.contact_info, phone: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">
                Email
              </label>
              <input
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: { ...formData.contact_info, email: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/jobs')}
                className="flex-1"
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                className="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl"
              >
                Update Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditJobPage;
