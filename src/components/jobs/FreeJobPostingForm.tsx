
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().optional(),
  description: z.string().optional(),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_email: z.string().optional(),
  contact_notes: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const FreeJobPostingForm = () => {
  console.log('🎯 [FREE-JOB-FORM] Component rendering...');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();

  console.log('🔐 [FREE-JOB-FORM] Auth state:', {
    isSignedIn,
    userId: user?.id,
    userEmail: user?.email,
    hasUser: !!user
  });

  const form = useForm<JobFormValues>({
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
      contact_email: '',
      contact_notes: '',
    }
  });

  const onSubmit = async (data: JobFormValues) => {
    console.log('🎯 [FREE-JOB-FORM] Form submission started');
    console.log('🎯 [FREE-JOB-FORM] Form data received:', data);
    
    // STEP 1: Authentication Check
    if (!isSignedIn || !user) {
      console.error('💥 [FREE-JOB-FORM] Authentication failed:', {
        isSignedIn,
        hasUser: !!user,
        userId: user?.id || 'NO_USER'
      });
      setSubmitError('You must be signed in to post a job. Please sign in and try again.');
      toast.error('Please sign in to post a job');
      return;
    }

    console.log('✅ [FREE-JOB-FORM] Authentication check passed');

    // STEP 2: Build Supabase Payload
    const jobPayload = {
      title: data.title,
      category: data.category,
      location: data.location || '',
      description: data.description || '',
      compensation_type: data.compensation_type || '',
      compensation_details: data.compensation_details || '',
      requirements: data.requirements || '',
      contact_info: {
        owner_name: data.contact_name || '',
        phone: data.contact_phone || '',
        email: data.contact_email || '',
        notes: data.contact_notes || ''
      },
      user_id: user.id, // CRITICAL: Always include user_id
      status: 'active',
      pricing_tier: 'free' // FREE JOB LOGIC: Always set as 'free'
    };

    console.log('🚀 [FREE-JOB-FORM] Supabase payload prepared:', jobPayload);
    console.log('🔍 [FREE-JOB-FORM] FREE JOB BRANCH: This is a FREE job post, no payment required');
    console.log('🔍 [FREE-JOB-FORM] Payload validation:');
    console.log('  - title:', jobPayload.title);
    console.log('  - category:', jobPayload.category);
    console.log('  - user_id:', jobPayload.user_id);
    console.log('  - pricing_tier:', jobPayload.pricing_tier);
    console.log('  - status:', jobPayload.status);

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // STEP 3: Supabase Insert (FREE JOB - NO PAYMENT GATE)
      console.log('🔄 [FREE-JOB-FORM] Calling Supabase insert...');
      
      const { data: insertedJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      console.log('📥 [FREE-JOB-FORM] Supabase insert response:', {
        insertedJob,
        insertError,
        hasData: !!insertedJob,
        hasError: !!insertError
      });

      // STEP 4: Handle Supabase Response
      if (insertError) {
        console.error('💥 [FREE-JOB-FORM] Supabase insert failed:', insertError);
        console.error('💥 [FREE-JOB-FORM] Full error details:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code
        });
        
        setSubmitError(`Failed to post job: ${insertError.message}`);
        toast.error('Failed to post job. Please try again.');
        return;
      }

      if (!insertedJob) {
        console.error('💥 [FREE-JOB-FORM] No job data returned from insert');
        setSubmitError('Job post failed: No data returned');
        toast.error('Job post failed. Please try again.');
        return;
      }

      // STEP 5: Success Handling
      console.log('✅ [FREE-JOB-FORM] Job successfully posted!');
      console.log('✅ [FREE-JOB-FORM] Inserted job details:', {
        id: insertedJob.id,
        title: insertedJob.title,
        user_id: insertedJob.user_id,
        status: insertedJob.status,
        pricing_tier: insertedJob.pricing_tier
      });

      toast.success('Job posted successfully!');
      
      // STEP 6: Navigation/Completion
      console.log('🔄 [FREE-JOB-FORM] Navigating to /jobs page...');
      navigate('/jobs');

    } catch (error) {
      console.error('💥 [FREE-JOB-FORM] Unexpected error during submission:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      console.log('🔄 [FREE-JOB-FORM] Form submission completed, isSubmitting set to false');
    }
  };

  // Authentication Guard UI
  if (!isSignedIn) {
    console.log('🚫 [FREE-JOB-FORM] Rendering authentication guard');
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              You must be signed in to post a job. Please sign in to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/auth/signin')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('✅ [FREE-JOB-FORM] Rendering job posting form');

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Post a Free Job</CardTitle>
          <CardDescription>
            Fill out the form below to post your job opportunity for free.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{submitError}</p>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Nail Technician" {...field} />
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
                        <SelectItem value="nail-technician">Nail Technician</SelectItem>
                        <SelectItem value="hair-stylist">Hair Stylist</SelectItem>
                        <SelectItem value="barber">Barber</SelectItem>
                        <SelectItem value="esthetician">Esthetician</SelectItem>
                        <SelectItem value="massage-therapist">Massage Therapist</SelectItem>
                        <SelectItem value="lash-brow-technician">Lash & Brow Technician</SelectItem>
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
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. San Francisco, CA" {...field} />
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
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the job responsibilities, work environment, and what you're looking for..."
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compensation_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compensation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select compensation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="commission">Commission</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                        <SelectItem value="booth-rental">Booth Rental</SelectItem>
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
                      <Input placeholder="e.g. $20-25/hour, 60% commission, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List any requirements, qualifications, or experience needed..."
                        rows={3}
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
                  name="contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
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
                      <FormLabel>Contact Phone</FormLabel>
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
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Contact Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information for applicants..."
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  'Post Free Job'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
