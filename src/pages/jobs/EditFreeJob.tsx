
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useJobPermissions } from '@/hooks/useJobPermissions';
import { toast } from 'sonner';

const EditFreeJob = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const { canEditJob } = useJobPermissions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    compensation_details: '',
    compensation_type: 'hourly',
    requirements: '',
    contact_phone: '',
    contact_email: '',
    contact_name: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        toast.error('Job ID not found');
        navigate('/jobs');
        return;
      }

      try {
        const { data: job, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error || !job) {
          toast.error('Job not found');
          navigate('/jobs');
          return;
        }

        // Check permissions
        if (!canEditJob(job)) {
          toast.error('You do not have permission to edit this job');
          navigate('/jobs');
          return;
        }

        // Populate form data
        setFormData({
          title: job.title || '',
          location: job.location || '',
          description: job.description || '',
          compensation_details: job.compensation_details || '',
          compensation_type: job.compensation_type || 'hourly',
          requirements: job.requirements || '',
          contact_phone: job.contact_info?.phone || '',
          contact_email: job.contact_info?.email || '',
          contact_name: job.contact_info?.owner_name || ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job');
        navigate('/jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, canEditJob, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !jobId) {
      toast.error('Invalid request');
      return;
    }

    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        compensation_details: formData.compensation_details,
        compensation_type: formData.compensation_type,
        requirements: formData.requirements,
        contact_info: {
          phone: formData.contact_phone,
          email: formData.contact_email || user.email,
          owner_name: formData.contact_name
        },
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', jobId);

      if (error) {
        console.error('Error updating job:', error);
        toast.error('Failed to update job posting');
        return;
      }

      toast.success('Job updated successfully!');
      navigate('/jobs');
      
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-8 max-w-4xl">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-4xl">
      {/* Back button */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/jobs")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Button>
      </div>

      <h1 className="text-3xl font-playfair font-bold mb-6">
        Edit Free Job
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Nail Technician Needed"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Houston, TX"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the job, responsibilities, and requirements..."
            className="min-h-[120px]"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <select
              id="compensation_type"
              name="compensation_type"
              value={formData.compensation_type}
              onChange={handleInputChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="hourly">Hourly</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="commission">Commission</option>
              <option value="salary">Salary</option>
            </select>
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              name="compensation_details"
              value={formData.compensation_details}
              onChange={handleInputChange}
              placeholder="e.g., $15-20/hour + tips"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleInputChange}
            placeholder="List any specific requirements, skills, or experience needed..."
            className="min-h-[80px]"
          />
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>

            <div>
              <Label htmlFor="contact_phone">Phone Number</Label>
              <Input
                id="contact_phone"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="contact_email">Email</Label>
            <Input
              id="contact_email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleInputChange}
              placeholder={user?.email || "your@email.com"}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/jobs')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? 'Updating...' : 'Update Job'}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default EditFreeJob;
