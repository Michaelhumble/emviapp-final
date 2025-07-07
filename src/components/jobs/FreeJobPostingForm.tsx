
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const jobFormSchema = z.object({
  title: z.string().min(3, 'Job title must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_name: z.string().min(2, 'Contact name is required'),
  contact_phone: z.string().min(10, 'Valid phone number is required'),
  contact_email: z.string().email('Valid email is required'),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      category: '',
      location: '',
      description: '',
      compensation_type: '',
      compensation_details: '',
      requirements: '',
      contact_name: '',
      contact_phone: '',
      contact_email: user?.email || '',
    },
  });

  const onSubmit = async (data: JobFormData) => {
    if (!user) {
      toast.error('You must be logged in to post a job');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('🔧 [JOB-POST] Starting job submission...');
      console.log('🔧 [JOB-POST] Supabase URL:', supabase.supabaseUrl);
      console.log('🔧 [JOB-POST] User ID:', user.id);
      console.log('🔧 [JOB-POST] User Email:', user.email);

      // Prepare job data for insertion
      const jobData = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        compensation_type: data.compensation_type || null,
        compensation_details: data.compensation_details || null,
        requirements: data.requirements || null,
        contact_info: {
          owner_name: data.contact_name,
          phone: data.contact_phone,
          email: data.contact_email,
        },
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
      };

      console.log('🔧 [JOB-POST] Job data to insert:', jobData);

      // Insert job into Supabase
      const { data: insertedJob, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-POST] Supabase insert error:', error);
        toast.error(`Failed to post job: ${error.message}`);
        return;
      }

      if (!insertedJob) {
        console.error('❌ [JOB-POST] No job returned from insert');
        toast.error('Failed to create job - no data returned');
        return;
      }

      console.log('✅ [JOB-POST] Job successfully inserted:', insertedJob);
      console.log('✅ [JOB-POST] Job ID:', insertedJob.id);

      // Verify the job exists in the database
      const { data: verificationJob, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', insertedJob.id)
        .single();

      if (verifyError || !verificationJob) {
        console.error('❌ [JOB-POST] Job verification failed:', verifyError);
        toast.error('Job posting verification failed');
        return;
      }

      console.log('✅ [JOB-POST] Job verified in database:', verificationJob);

      toast.success('Job posted successfully!');
      
      // Navigate to success page with job ID
      navigate(`/post-success?jobId=${insertedJob.id}&type=job`);

    } catch (error) {
      console.error('💥 [JOB-POST] Unexpected error:', error);
      toast.error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nail Technician Needed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nails">Nails</SelectItem>
                      <SelectItem value="hair">Hair</SelectItem>
                      <SelectItem value="lashes">Lashes & Brows</SelectItem>
                      <SelectItem value="massage">Massage</SelectItem>
                      <SelectItem value="facial">Facial & Skincare</SelectItem>
                      <SelectItem value="makeup">Makeup</SelectItem>
                      <SelectItem value="barber">Barber</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Jose, CA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="commission">Commission</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensation_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Details</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $20/hour, $50k/year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any specific requirements, certifications, or experience needed..."
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contact_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
