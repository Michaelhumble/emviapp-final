
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface FreeJobFormData {
  title: string;
  description: string;
  location: string;
  compensation_details: string;
  contact_phone: string;
  contact_email: string;
}

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FreeJobFormData>();

  const onSubmit = async (data: FreeJobFormData) => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate expires_at as 30 days from now
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { data: job, error } = await supabase
        .from('jobs')
        .insert({
          title: data.title,
          description: data.description,
          location: data.location,
          compensation_details: data.compensation_details,
          contact_info: {
            phone: data.contact_phone,
            email: data.contact_email
          },
          user_id: user.id,
          pricing_tier: 'free',
          status: 'active',
          expires_at: expiresAt.toISOString() // Convert to ISO string for Supabase
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Job posted successfully!');
      
      // Redirect to the actual job detail page using the real job ID
      navigate(`/jobs/${job.id}`);
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p className="text-center text-gray-600">Please sign in to post a job.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              {...register('title', { required: 'Job title is required' })}
              placeholder="e.g., Nail Technician Wanted"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
              placeholder="e.g., Houston, TX"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation</Label>
            <Input
              id="compensation_details"
              {...register('compensation_details')}
              placeholder="e.g., $15-20/hour + tips"
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              {...register('description', { required: 'Job description is required' })}
              placeholder="Describe the position, requirements, and what you're looking for..."
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact_phone">Contact Phone *</Label>
            <Input
              id="contact_phone"
              {...register('contact_phone', { required: 'Contact phone is required' })}
              placeholder="(555) 123-4567"
            />
            {errors.contact_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.contact_phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="contact_email">Contact Email</Label>
            <Input
              id="contact_email"
              type="email"
              {...register('contact_email')}
              placeholder="hiring@yoursalon.com"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Job for Free'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
