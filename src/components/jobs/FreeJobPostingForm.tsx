
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
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const jobSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_phone: z.string().min(1, 'Contact phone is required'),
  contact_email: z.string().email('Please enter a valid email address'),
});

type JobFormData = z.infer<typeof jobSchema>;

const FreeJobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
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
      contact_email: '',
    },
  });

  const onSubmit = async (data: JobFormData) => {
    console.log('🚀 [JOB-POST] Starting job submission process...');
    
    if (!user) {
      console.error('❌ [JOB-POST] No authenticated user found');
      toast.error('You must be logged in to post a job');
      return;
    }

    console.log('👤 [JOB-POST] Authenticated user:', {
      id: user.id,
      email: user.email
    });

    setIsSubmitting(true);

    try {
      // Prepare the job payload with user_id
      const jobPayload = {
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
        user_id: user.id, // CRITICAL: Include authenticated user's ID
        status: 'active',
        pricing_tier: 'free',
      };

      console.log('📦 [JOB-POST] Prepared payload:', jobPayload);

      // Attempt Supabase insert
      console.log('💾 [JOB-POST] Calling supabase.from("jobs").insert()...');
      const { data: insertedJob, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-POST] Supabase insert error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });
        
        toast.error(`Job posting failed: ${error.message}`, {
          description: error.details || error.hint || 'Please check your permissions and try again',
        });
        return;
      }

      console.log('✅ [JOB-POST] Job successfully inserted:', insertedJob);

      // Verify the job was actually inserted
      const { data: verificationJob, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', insertedJob.id)
        .single();

      if (verifyError) {
        console.error('⚠️ [JOB-POST] Could not verify job insertion:', verifyError);
        toast.warning('Job may have been posted but verification failed');
      } else {
        console.log('✅ [JOB-POST] Job verified in database:', verificationJob);
      }

      toast.success('Job posted successfully!', {
        description: 'Your job is now live and visible to candidates',
      });

      // Redirect to jobs page
      console.log('🔄 [JOB-POST] Redirecting to /jobs...');
      navigate('/jobs');

    } catch (error) {
      console.error('💥 [JOB-POST] Unexpected error during submission:', error);
      toast.error('An unexpected error occurred', {
        description: error instanceof Error ? error.message : 'Please try again later',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
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
                    <Input placeholder="e.g. Senior Nail Technician" {...field} />
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
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                      <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                      <SelectItem value="Esthetician">Esthetician</SelectItem>
                      <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                      <SelectItem value="Barber">Barber</SelectItem>
                      <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Reception">Reception</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
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
                    <Input placeholder="e.g. Los Angeles, CA" {...field} />
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
                      placeholder="Describe the position, responsibilities, and what you're looking for..."
                      className="min-h-32"
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
                      <Input placeholder="e.g. $18-25/hour + tips" {...field} />
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
                      placeholder="List any specific requirements, experience, or qualifications needed..."
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <FormField
                control={form.control}
                name="contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name or hiring manager name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contact_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting Job...' : 'Post Job for Free'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
