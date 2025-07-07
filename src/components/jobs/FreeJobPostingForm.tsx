
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

const jobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_name: z.string().min(1, 'Contact name is required'),
  contact_phone: z.string().optional(),
  contact_email: z.string().email('Valid email is required').min(1, 'Email is required'),
  contact_notes: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobSchema>;

const FreeJobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<JobFormValues>({
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
      contact_notes: '',
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    console.log('🚀 [JOB-FORM] Form submission started');
    console.log('🚀 [JOB-FORM] Form data:', data);
    console.log('🚀 [JOB-FORM] Current user:', user);

    if (!user) {
      console.error('❌ [JOB-FORM] No authenticated user found');
      toast.error('You must be signed in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the job payload with all required fields
      const jobPayload = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        compensation_type: data.compensation_type || null,
        compensation_details: data.compensation_details || null,
        requirements: data.requirements || null,
        user_id: user.id, // CRITICAL: Include authenticated user's ID
        status: 'active',
        pricing_tier: 'free',
        contact_info: {
          owner_name: data.contact_name,
          phone: data.contact_phone || null,
          email: data.contact_email,
          notes: data.contact_notes || null,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      };

      console.log('📤 [JOB-FORM] Sending payload to Supabase:', jobPayload);

      const { data: insertedJob, error } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-FORM] Supabase insert error:', error);
        console.error('❌ [JOB-FORM] Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        toast.error(`Failed to post job: ${error.message}`);
        return;
      }

      console.log('✅ [JOB-FORM] Job posted successfully:', insertedJob);
      toast.success('Job posted successfully!');
      
      // Reset form
      form.reset();
      
      // Redirect to jobs page to see the new job
      navigate('/jobs');
      
    } catch (error) {
      console.error('💥 [JOB-FORM] Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <CardDescription>
          Fill out the form below to post your job listing for free
        </CardDescription>
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
                      <SelectItem value="Receptionist">Receptionist</SelectItem>
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
                      placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum 10 characters required
                  </FormDescription>
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
                        <SelectItem value="commission_hourly">Commission + Hourly</SelectItem>
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
                      <Input placeholder="e.g. $18-25/hour plus tips" {...field} />
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
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Information Section */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
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
                      <FormLabel>Phone Number</FormLabel>
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
                    <FormLabel>Email Address *</FormLabel>
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
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
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
