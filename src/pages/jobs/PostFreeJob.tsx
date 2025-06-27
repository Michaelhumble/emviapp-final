
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const PostFreeJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error('You must be logged in to post a job');
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
        user_id: user.id,
        pricing_tier: 'free',
        status: 'active'
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) {
        console.error('Error creating job:', error);
        toast.error('Failed to create job posting');
        return;
      }

      toast.success('Job posted successfully!');
      navigate('/jobs');
      
    } catch (error) {
      console.error('Error submitting job:', error);
      toast.error('Failed to create job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        Post a Free Job
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
            {isSubmitting ? 'Posting...' : 'Post Free Job'}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PostFreeJob;
