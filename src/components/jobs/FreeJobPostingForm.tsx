
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Heart, Users, Star, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

const jobFormSchema = z.object({
  title: z.string().min(2, 'Job title must be at least 2 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  compensation_type: z.string().min(1, 'Please select compensation type'),
  compensation_details: z.string().min(1, 'Please provide compensation details'),
  requirements: z.string().optional(),
  contact_name: z.string().min(2, 'Contact name is required'),
  contact_phone: z.string().min(10, 'Valid phone number is required'),
  contact_email: z.string().email('Valid email is required'),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const FreeJobPostingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

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
      contact_email: '',
    },
  });

  const onSubmit = async (data: JobFormData) => {
    if (!user) {
      toast.error('You must be signed in to post a job');
      return;
    }

    console.log('🆓 [FREE-POST] Starting job submission for user:', user.id);
    setIsSubmitting(true);

    try {
      // Prepare the job data with all required fields
      const jobData = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        compensation_type: data.compensation_type,
        compensation_details: data.compensation_details,
        requirements: data.requirements || '',
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
        contact_info: {
          owner_name: data.contact_name,
          phone: data.contact_phone,
          email: data.contact_email,
        },
      };

      console.log('🆓 [FREE-POST] Submitting job data:', jobData);

      // Insert directly into Supabase jobs table
      const { data: insertedJob, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [FREE-POST] Supabase insert error:', error);
        toast.error(`Failed to post job: ${error.message}`);
        return;
      }

      console.log('✅ [FREE-POST] Job posted successfully:', insertedJob);
      
      // Show success state
      setShowSuccess(true);
      toast.success('Your job has been posted successfully!');
      
      // Reset form
      form.reset();

    } catch (error) {
      console.error('💥 [FREE-POST] Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success screen
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Success! 🎉</h2>
              <p className="text-gray-600 text-lg">
                Your job posting is now live and reaching thousands of talented beauty professionals.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/jobs'}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl"
              >
                View All Jobs
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowSuccess(false)}
                className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl"
              >
                Post Another Job
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 mb-6">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Free Job Posting</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Find Your Perfect Team Member
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with skilled beauty professionals who are passionate about their craft and ready to grow with your business.
            </p>
          </div>

          {/* Yes Ladder */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Quality Candidates</h3>
                <p className="text-sm text-gray-600">Reach verified professionals with proven experience</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Instant Reach</h3>
                <p className="text-sm text-gray-600">Your job goes live immediately to our active community</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Free Forever</h3>
                <p className="text-sm text-gray-600">No hidden fees or subscription required</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Post Your Job Opening
              </CardTitle>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Job Details Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Details</h3>
                      <p className="text-sm text-gray-600">Tell us about the position you're looking to fill</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 font-medium">Job Title *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Senior Hair Stylist"
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
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
                            <FormLabel className="text-gray-900 font-medium">Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="nail-technician">Nail Technician</SelectItem>
                                <SelectItem value="hair-stylist">Hair Stylist</SelectItem>
                                <SelectItem value="esthetician">Esthetician</SelectItem>
                                <SelectItem value="massage-therapist">Massage Therapist</SelectItem>
                                <SelectItem value="lash-technician">Lash Technician</SelectItem>
                                <SelectItem value="makeup-artist">Makeup Artist</SelectItem>
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
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-900 font-medium">Location *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. San Jose, CA"
                              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                              {...field}
                            />
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
                          <FormLabel className="text-gray-900 font-medium">Job Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the role, responsibilities, and what makes this opportunity special..."
                              className="min-h-[120px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Compensation Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Compensation</h3>
                      <p className="text-sm text-gray-600">Help candidates understand the earning potential</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="compensation_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 font-medium">Compensation Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                                  <SelectValue placeholder="Select compensation type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="commission">Commission</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="per_service">Per Service</SelectItem>
                                <SelectItem value="booth_rental">Booth Rental</SelectItem>
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
                            <FormLabel className="text-gray-900 font-medium">Compensation Details *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. $20-25/hour + tips"
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
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
                          <FormLabel className="text-gray-900 font-medium">Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List any specific requirements, experience level, or qualifications..."
                              className="min-h-[80px] border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <p className="text-sm text-gray-600">How can interested candidates reach you?</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-900 font-medium">Contact Name *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
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
                            <FormLabel className="text-gray-900 font-medium">Phone Number *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="(555) 123-4567"
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
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
                            <FormLabel className="text-gray-900 font-medium">Email *</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Posting Your Job...
                        </div>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 mr-2" />
                          Post My Job - Free Forever
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Better Results Box */}
          <Card className="mt-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">💡 Pro Tip for Better Results</h3>
                  <p className="text-green-800 text-sm leading-relaxed">
                    Be specific about your salon culture, growth opportunities, and what makes working with you special. 
                    Professionals want to know they're joining a team that values their skills and supports their career growth.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FreeJobPostingForm;
