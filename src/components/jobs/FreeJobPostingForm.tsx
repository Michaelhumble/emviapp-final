
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import YesLadder from '@/components/posting/upsell/YesLadder';
import { Sparkles, Heart, Users, MapPin, DollarSign, CheckCircle } from 'lucide-react';

const jobFormSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  category: z.string().min(1, 'Please select a category'),
  location: z.string().min(2, 'Location is required'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  contact_email: z.string().email('Please enter a valid email').optional(),
  contact_phone: z.string().optional(),
  contact_notes: z.string().optional(),
  urgent: z.boolean().default(false),
  weekly_pay: z.boolean().default(false),
  housing_available: z.boolean().default(false),
  will_train: z.boolean().default(false),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const BetterResultsBox = () => (
  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
    <CardContent className="pt-6">
      <div className="flex items-start space-x-3">
        <div className="bg-purple-100 p-2 rounded-full">
          <Sparkles className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-purple-900 mb-2">
            Get 3x More Quality Applications
          </h3>
          <p className="text-purple-700 text-sm mb-4">
            Jobs with detailed descriptions, clear compensation, and specific requirements get significantly more qualified applicants.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-purple-700">Clear job title</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-purple-700">Detailed description</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-purple-700">Compensation info</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-purple-700">Contact details</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [upsellOptions, setUpsellOptions] = useState({
    expertReview: false,
    priorityPlacement: false,
    extendedReach: false
  });

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
      contact_email: user?.email || '',
      contact_phone: '',
      contact_notes: '',
      urgent: false,
      weekly_pay: false,
      housing_available: false,
      will_train: false,
    },
  });

  const handleUpsellChange = (options: typeof upsellOptions) => {
    setUpsellOptions(options);
  };

  const suggestPremium = () => {
    // Could show premium upgrade modal here
    console.log('Suggesting premium upgrade');
  };

  const onSubmit = async (data: JobFormData) => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare job data for Supabase
      const jobData = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        compensation_type: data.compensation_type || '',
        compensation_details: data.compensation_details || '',
        requirements: data.requirements || '',
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
        contact_info: {
          email: data.contact_email || user.email,
          phone: data.contact_phone || '',
          notes: data.contact_notes || '',
        }
      };

      const { data: result, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-POST] Supabase error:', error);
        throw error;
      }

      console.log('✅ [JOB-POST] Job created successfully:', result);
      
      setShowSuccess(true);
      toast.success('🎉 Your job has been posted successfully!');
      
      // Redirect to jobs page after short delay
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);

    } catch (error) {
      console.error('💥 [JOB-POST] Submit error:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Job Posted Successfully! 🎉
          </h2>
          <p className="text-green-700 mb-6">
            Your job posting is now live and visible to thousands of beauty professionals.
            You'll be redirected to the jobs page shortly.
          </p>
          <Button onClick={() => navigate('/jobs')} className="bg-green-600 hover:bg-green-700">
            View Your Job Posting
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Find Your Perfect Team Member
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with thousands of talented beauty professionals looking for their next opportunity
        </p>
      </div>

      <BetterResultsBox />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Experienced Nail Technician"
                            className="h-12"
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
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select job category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="nails">Nail Technician</SelectItem>
                            <SelectItem value="hair">Hair Stylist</SelectItem>
                            <SelectItem value="lashes">Lash Artist</SelectItem>
                            <SelectItem value="massage">Massage Therapist</SelectItem>
                            <SelectItem value="esthetician">Esthetician</SelectItem>
                            <SelectItem value="barber">Barber</SelectItem>
                            <SelectItem value="makeup">Makeup Artist</SelectItem>
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
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Houston, TX"
                            className="h-12"
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
                        <FormLabel>Job Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the role, responsibilities, work environment, and what makes your salon special..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Compensation & Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="compensation_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compensation Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select compensation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="commission">Commission</SelectItem>
                            <SelectItem value="salary">Salary</SelectItem>
                            <SelectItem value="booth_rental">Booth Rental</SelectItem>
                          </SelectContent>
                        </Select>
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
                          <Input
                            placeholder="e.g. $15-20/hour, $800-1200/week, 60% commission"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="weekly_pay"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Weekly Pay
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="housing_available"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Housing Available
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="will_train"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Will Train
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            Urgent Hiring
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List required experience, certifications, skills, or qualifications..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(555) 123-4567"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact_notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Best time to call, preferred contact method, etc."
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <YesLadder 
                onOptionChange={handleUpsellChange}
                suggestPremium={suggestPremium}
              />

              <Card className="sticky top-6">
                <CardContent className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Posting Job...
                      </div>
                    ) : (
                      'Post Job (Free)'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Your job will be visible to thousands of beauty professionals immediately
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FreeJobPostingForm;
