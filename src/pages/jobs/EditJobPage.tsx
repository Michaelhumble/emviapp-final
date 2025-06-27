
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useJobsData } from '@/hooks/useJobsData';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Job } from '@/types/job';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getJobById, updateJob } = useJobsData();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: ''
    }
  });

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        toast.error('Job ID not found');
        navigate('/jobs');
        return;
      }

      try {
        const jobData = await getJobById(jobId);
        
        // Check if user is the owner
        if (!user || jobData.user_id !== user.id) {
          toast.error('You can only edit your own jobs');
          navigate('/jobs');
          return;
        }

        setJob(jobData);
        setFormData({
          title: jobData.title || '',
          description: jobData.description || '',
          location: jobData.location || '',
          compensation_type: jobData.employment_type || '',
          compensation_details: jobData.compensation_details || '',
          requirements: jobData.requirements || '',
          contact_info: {
            owner_name: jobData.contact_info?.owner_name || '',
            phone: jobData.contact_info?.phone || '',
            email: jobData.contact_info?.email || '',
            notes: jobData.contact_info?.notes || '',
            zalo: jobData.contact_info?.zalo || ''
          }
        });
      } catch (error) {
        console.error('Error loading job:', error);
        toast.error('Failed to load job');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId, user, getJobById, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job || !user) return;
    
    setSubmitting(true);
    
    try {
      const { error } = await updateJob(job.id, {
        ...formData,
        user_id: user.id
      });

      if (error) {
        throw error;
      }

      toast.success('Job updated successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contact_')) {
      const contactField = name.replace('contact_', '');
      setFormData(prev => ({
        ...prev,
        contact_info: {
          ...prev.contact_info,
          [contactField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Loading job...</div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Job not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Edit Job Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="compensation_type" className="block text-sm font-medium mb-2">
                  Employment Type
                </label>
                <select
                  id="compensation_type"
                  name="compensation_type"
                  value={formData.compensation_type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="commission">Commission</option>
                </select>
              </div>

              <div>
                <label htmlFor="compensation_details" className="block text-sm font-medium mb-2">
                  Compensation Details
                </label>
                <input
                  type="text"
                  id="compensation_details"
                  name="compensation_details"
                  value={formData.compensation_details}
                  onChange={handleInputChange}
                  placeholder="e.g., $20/hour, 60% commission"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium mb-2">
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div>
                  <label htmlFor="contact_owner_name" className="block text-sm font-medium mb-2">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contact_owner_name"
                    name="contact_owner_name"
                    value={formData.contact_info.owner_name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_info.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    value={formData.contact_info.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? 'Updating...' : 'Update Job'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditJobPage;
