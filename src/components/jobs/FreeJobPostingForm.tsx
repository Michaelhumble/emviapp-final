
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Crown, CheckCircle, ArrowRight } from 'lucide-react';
import YesLadder from '@/components/posting/upsell/YesLadder';

const jobFormSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  compensation_type: z.string().optional(),
  compensation_details: z.string().optional(),
  requirements: z.string().optional(),
  owner_name: z.string().min(1, 'Your name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Valid email is required').optional(),
  notes: z.string().optional(),
  weekly_pay: z.boolean().default(false),
  has_housing: z.boolean().default(false),
  owner_will_train: z.boolean().default(false),
  is_urgent: z.boolean().default(false),
});

type JobFormData = z.infer<typeof jobFormSchema>;

const BetterResultsBox = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100 mb-8"
  >
    <div className="flex items-center mb-4">
      <Crown className="text-purple-600 mr-3 h-6 w-6" />
      <h3 className="font-playfair text-xl font-semibold text-gray-900">
        Get Better Applications
      </h3>
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="flex items-start space-x-3">
        <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-800">Be Specific About Pay</p>
          <p className="text-sm text-gray-600">Clear compensation attracts serious candidates</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-800">Highlight Benefits</p>
          <p className="text-sm text-gray-600">Housing, training, weekly pay draws talent</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-800">Describe Your Culture</p>
          <p className="text-sm text-gray-600">Artists want to know about the work environment</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <CheckCircle className="text-green-500 mt-1 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-gray-800">Use Emotional Language</p>
          <p className="text-sm text-gray-600">"Join our family" resonates more than "hiring"</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const FreeJobPostingForm = () => {
  const { user } = useAuth();
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
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      weekly_pay: false,
      has_housing: false,
      owner_will_train: false,
      is_urgent: false,
    },
  });

  const suggestPremium = () => {
    // This would normally trigger premium upsell
    console.log('Premium features suggested');
  };

  const onSubmit = async (data: JobFormData) => {
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const jobData = {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        compensation_type: data.compensation_type || null,
        compensation_details: data.compensation_details || null,
        requirements: data.requirements || null,
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free',
        contact_info: {
          owner_name: data.owner_name,
          phone: data.phone,
          email: data.email || '',
          notes: data.notes || ''
        }
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) {
        console.error('Error inserting job:', error);
        throw error;
      }

      setShowSuccess(true);
      toast.success('Job posted successfully!');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center py-12"
      >
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
              Your Job is Live! ✨
            </h2>
            <p className="text-gray-600 text-lg">
              Qualified beauty professionals can now discover your opportunity
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Your job is now visible to 15,000+ professionals</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Applications will be sent directly to your phone/email</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Your listing stays active for 30 days</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = '/jobs'}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
            >
              View All Jobs
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowSuccess(false)}
              className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl"
            >
              Post Another Job
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <Heart className="text-red-500 mr-2 h-6 w-6" />
          <Sparkles className="text-yellow-500 mr-2 h-6 w-6" />
          <Users className="text-blue-500 h-6 w-6" />
        </div>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Find Your Perfect Team Member
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Connect with passionate beauty professionals who are ready to grow with your salon. 
          Post your opportunity and start building meaningful relationships today.
        </p>
      </motion.div>

      <BetterResultsBox />

      <YesLadder 
        onOptionChange={setUpsellOptions}
        suggestPremium={suggestPremium}
      />

      {/* Main Form */}
      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-8">
          <CardTitle className="font-playfair text-2xl text-gray-900 text-center">
            Tell Us About Your Opportunity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Job Details Section */}
              <div className="space-y-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 border-b border-purple-100 pb-2">
                  Job Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Position Title *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Nail Technician, Hair Stylist, Esthetician"
                            className="border-purple-200 focus:border-purple-400 rounded-xl"
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
                        <FormLabel className="text-gray-700 font-medium">Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-purple-200 focus:border-purple-400 rounded-xl">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                            <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                            <SelectItem value="Esthetician">Esthetician</SelectItem>
                            <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                            <SelectItem value="Receptionist">Receptionist</SelectItem>
                            <SelectItem value="Manager">Manager</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                      <FormLabel className="text-gray-700 font-medium">Location *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="City, State (e.g., San Jose, CA)"
                          className="border-purple-200 focus:border-purple-400 rounded-xl"
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
                      <FormLabel className="text-gray-700 font-medium">Job Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe the role, your salon culture, what makes working with you special..."
                          className="border-purple-200 focus:border-purple-400 rounded-xl min-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Compensation Section */}
              <div className="space-y-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 border-b border-purple-100 pb-2">
                  Compensation & Benefits
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="compensation_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Pay Structure</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-purple-200 focus:border-purple-400 rounded-xl">
                              <SelectValue placeholder="Select pay type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Commission">Commission</SelectItem>
                            <SelectItem value="Hourly">Hourly</SelectItem>
                            <SelectItem value="Salary">Salary</SelectItem>
                            <SelectItem value="Commission + Base">Commission + Base</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
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
                        <FormLabel className="text-gray-700 font-medium">Pay Details</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., $18-25/hr, 60% commission, $800-1200/week"
                            className="border-purple-200 focus:border-purple-400 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Benefits Checkboxes */}
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="weekly_pay"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-purple-300"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-700 font-medium">Weekly Pay</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="has_housing"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-purple-300"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-700 font-medium">Housing Available</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="owner_will_train"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-purple-300"
                          />
                        </FormControl>
                        <FormLabel className="text-gray-700 font-medium">Will Train</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 border-b border-purple-100 pb-2">
                  Contact Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="owner_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Your Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your full name"
                            className="border-purple-200 focus:border-purple-400 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="(555) 123-4567"
                            className="border-purple-200 focus:border-purple-400 rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="border-purple-200 focus:border-purple-400 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Any additional information candidates should know..."
                          className="border-purple-200 focus:border-purple-400 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Posting Your Job...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Post My Job
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
