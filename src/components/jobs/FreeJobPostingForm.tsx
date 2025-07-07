
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
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().optional(),
  description: z.string().optional(),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_info: z.object({
    owner_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    notes: z.string().optional(),
  }).optional(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const FreeJobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
      contact_info: {
        owner_name: '',
        phone: '',
        email: '',
        notes: '',
      },
    },
  });

  const onSubmit = async (data: JobFormData) => {
    console.log('🚀 [JOB-FORM] Form submission started');
    console.log('🚀 [JOB-FORM] Job data to submit:', JSON.stringify(data, null, 2));
    console.log('🚀 [JOB-FORM] Current user:', user?.id);

    if (!user) {
      console.error('❌ [JOB-FORM] No user found, cannot submit job');
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        title: data.title,
        category: data.category,
        location: data.location || '',
        description: data.description || '',
        compensation_type: data.compensation_type || '',
        compensation_details: data.compensation_details || '',
        requirements: data.requirements || '',
        contact_info: data.contact_info || {},
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
      };

      console.log('🚀 [JOB-FORM] Final job data for Supabase insert:', JSON.stringify(jobData, null, 2));

      const { data: insertedJob, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select();

      console.log('🚀 [JOB-FORM] Supabase insert response:');
      console.log('🚀 [JOB-FORM] - Data:', insertedJob);
      console.log('🚀 [JOB-FORM] - Error:', error);

      if (error) {
        console.error('❌ [JOB-FORM] Supabase insert error:', error);
        toast.error('Failed to post job: ' + error.message);
        return;
      }

      if (insertedJob && insertedJob.length > 0) {
        console.log('✅ [JOB-FORM] Job successfully inserted with ID:', insertedJob[0].id);
        toast.success('Job posted successfully!');
        form.reset();
        navigate('/jobs');
      } else {
        console.error('❌ [JOB-FORM] No data returned from insert');
        toast.error('Failed to post job - no data returned');
      }

    } catch (error) {
      console.error('💥 [JOB-FORM] Unexpected error during job submission:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Post a Free Job</CardTitle>
            <CardDescription>
              Share your job opportunity with qualified beauty professionals
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
                        <Input placeholder="e.g. Senior Hair Stylist" {...field} />
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
                      <FormLabel>Location</FormLabel>
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
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                          className="min-h-[120px]"
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
                          <SelectItem value="booth_rental">Booth Rental</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
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
                        <Input placeholder="e.g. $15-20/hour, 50-60% commission" {...field} />
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
                          placeholder="Required experience, certifications, skills..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="contact_info.owner_name"
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
                    name="contact_info.phone"
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

                  <FormField
                    control={form.control}
                    name="contact_info.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@salon.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_info.notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
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
                  {isSubmitting ? 'Posting Job...' : 'Post Job'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingForm;
