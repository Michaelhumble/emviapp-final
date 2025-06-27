
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const EditFreeJobForm = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    compensation_details: '',
    requirements: '',
    contact_phone: '',
    contact_email: ''
  });

  useEffect(() => {
    if (!user || !jobId) return;

    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .eq('user_id', user.id)
          .single();

        if (error || !data) {
          toast.error('Job not found or you do not have permission to edit it');
          navigate('/jobs');
          return;
        }

        setFormData({
          title: data.title || '',
          location: data.location || '',
          description: data.description || '',
          compensation_details: data.compensation_details || '',
          requirements: data.requirements || '',
          contact_phone: data.contact_info?.phone || '',
          contact_email: data.contact_info?.email || ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job details');
        navigate('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [user, jobId, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !jobId) return;

    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        compensation_details: formData.compensation_details || null,
        requirements: formData.requirements || null,
        contact_info: {
          phone: formData.contact_phone || null,
          email: formData.contact_email || user.email
        },
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('jobs')
        .update(updateData)
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating job:', error);
        toast.error('Failed to update job. Please try again.');
        return;
      }

      toast.success('Job updated successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!user || !jobId) return;

    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job. Please try again.');
        return;
      }

      toast.success('Job deleted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p>Loading job details...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Edit Job Posting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Nail Technician, Hair Stylist"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location *
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Compensation Details
                </label>
                <Input
                  type="text"
                  value={formData.compensation_details}
                  onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                  placeholder="e.g., $20-25/hour, Commission-based, $40,000-50,000/year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Requirements
                </label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any specific requirements, certifications, or experience needed..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Phone
                </label>
                <Input
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="Your email address"
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
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1"
                >
                  Delete Job
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Updating...' : 'Update Job'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditFreeJobForm;
