import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2, AlertCircle, Wand2, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import NailJobPreviewCard from './NailJobPreviewCard';
import JobPricingTable from '@/components/posting/job/JobPricingTable';

const nailJobFormSchema = z.object({
  planType: z.enum(['free', 'paid'], { 
    required_error: "Please select a plan type" 
  }),
  title: z.string().min(1, "Job title is required"),
  vietnameseTitle: z.string().optional(),
  englishOnly: z.boolean().default(false),
  salonName: z.string().min(1, "Salon name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vietnameseDescription: z.string().optional(),
  salaryRange: z.string().min(1, "Salary range is required"),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNotes: z.string().optional(),
});

type NailJobFormValues = z.infer<typeof nailJobFormSchema>;

interface NailJobPostFormProps {
  onSubmit?: (data: NailJobFormValues) => void;
}

const NailJobPostForm: React.FC<NailJobPostFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'pricing' | 'processing'>('form');
  const [formData, setFormData] = useState<NailJobFormValues | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [hasPostedFreeJob, setHasPostedFreeJob] = useState(false);
  const [isLoadingFreeJobStatus, setIsLoadingFreeJobStatus] = useState(true);
  const [isGeneratingTranslation, setIsGeneratingTranslation] = useState(false);

  const form = useForm<NailJobFormValues>({
    resolver: zodResolver(nailJobFormSchema),
    defaultValues: {
      planType: 'free',
      title: '',
      vietnameseTitle: '',
      englishOnly: false,
      salonName: '',
      location: '',
      description: '',
      vietnameseDescription: '',
      salaryRange: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactNotes: '',
    }
  });

  const selectedPlan = form.watch('planType');
  const englishOnly = form.watch('englishOnly');
  const currentTitle = form.watch('title');
  const currentDescription = form.watch('description');

  // Check if user has already posted a free job
  useEffect(() => {
    const checkFreeJobStatus = async () => {
      if (!isSignedIn || !user) {
        setIsLoadingFreeJobStatus(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('user_id', user.id)
          .eq('pricing_tier', 'free')
          .eq('status', 'active')
          .limit(1);

        if (error) {
          console.error('Error checking free job status:', error);
          setIsLoadingFreeJobStatus(false);
          return;
        }

        const hasFreeJob = data && data.length > 0;
        setHasPostedFreeJob(hasFreeJob);
        if (hasFreeJob) {
          form.setValue('planType', 'paid');
        }
      } catch (error) {
        console.error('Unexpected error checking free job status:', error);
      } finally {
        setIsLoadingFreeJobStatus(false);
      }
    };

    checkFreeJobStatus();
  }, [isSignedIn, user, form]);

  // Auto-generate Vietnamese translation (simulated)
  const generateVietnameseTranslation = async () => {
    if (!currentTitle || (!currentDescription && !englishOnly)) return;
    
    setIsGeneratingTranslation(true);
    
    // Simulate AI translation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simple translation mappings for demo
    const titleTranslations: Record<string, string> = {
      'nail technician': 'Thợ nail',
      'nail tech': 'Thợ nail',
      'manicurist': 'Thợ làm móng',
      'pedicurist': 'Thợ làm móng chân',
    };
    
    const vietnameseTitle = titleTranslations[currentTitle.toLowerCase()] || `Tuyển ${currentTitle}`;
    form.setValue('vietnameseTitle', vietnameseTitle);
    
    if (currentDescription && !englishOnly) {
      const vietnameseDesc = `Chúng tôi đang tìm kiếm một thợ nail có kinh nghiệm để gia nhập đội ngũ của chúng tôi. ${currentDescription.includes('experience') ? 'Cần có kinh nghiệm làm việc.' : ''} Lương hấp dẫn và môi trường làm việc thân thiện.`;
      form.setValue('vietnameseDescription', vietnameseDesc);
    }
    
    setIsGeneratingTranslation(false);
    toast.success('Vietnamese translation generated!');
  };

  // Format salary with /tuần suffix (only add once)
  const formatSalaryForNails = (salary: string) => {
    if (!salary) return '';
    const trimmedSalary = salary.trim();
    if (trimmedSalary.endsWith('/tuần')) return trimmedSalary;
    return `${trimmedSalary}/tuần`;
  };

  // Handle salary input with auto-formatting on blur
  const handleSalaryBlur = (field: any) => {
    const currentValue = field.value;
    if (currentValue && !currentValue.includes('/tuần')) {
      field.onChange(formatSalaryForNails(currentValue));
    }
  };

  const handleFormSubmit = (data: NailJobFormValues) => {
    console.log('Nail job form submitted:', data);
    
    // Validate Vietnamese fields if not English only
    if (!data.englishOnly) {
      if (!data.vietnameseTitle?.trim()) {
        toast.error('Vietnamese title is required (or select "English Only")');
        return;
      }
      if (!data.vietnameseDescription?.trim()) {
        toast.error('Vietnamese description is required (or select "English Only")');
        return;
      }
    }
    
    setFormData(data);
    
    if (data.planType === 'paid') {
      setCurrentStep('pricing');
    } else {
      // Submit free job directly
      submitFreeNailJob(data);
    }
  };

  const submitFreeNailJob = async (data: NailJobFormValues) => {
    if (!isSignedIn || !user) {
      toast.error('You must be logged in to post a job');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title.trim(),
        category: 'Nails',
        location: data.location.trim(),
        description: data.description.trim(),
        vietnamese_title: data.englishOnly ? null : data.vietnameseTitle?.trim(),
        vietnamese_description: data.englishOnly ? null : data.vietnameseDescription?.trim(),
        compensation_details: formatSalaryForNails(data.salaryRange),
        contact_info: {
          owner_name: data.contactName?.trim() || '',
          phone: data.contactPhone?.trim() || '',
          email: data.contactEmail?.trim() || '',
          notes: data.contactNotes?.trim() || ''
        },
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      const { data: insertData, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select();

      if (error) {
        console.error('Error creating nail job:', error);
        toast.error(`Failed to create job: ${error.message}`);
        return;
      }

      toast.success('Nail tech job posted successfully!');
      navigate('/nails-job-success', { 
        state: { 
          jobId: insertData[0].id,
          jobData: insertData[0]
        }
      });

    } catch (error) {
      console.error('Unexpected error creating nail job:', error);
      toast.error('Failed to create job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePricingSelect = async (tier: string, finalPrice: number, durationMonths: number) => {
    if (!formData) return;

    setSelectedPricing({ tier, finalPrice, durationMonths });
    setCurrentStep('processing');

    try {
      if (!user) {
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      // Create Stripe checkout session for paid nail job
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier,
          finalPrice,
          durationMonths,
          jobData: {
            ...formData,
            category: 'Nails',
            compensation_details: formatSalaryForNails(formData.salaryRange),
            vietnamese_title: formData.englishOnly ? null : formData.vietnameseTitle,
            vietnamese_description: formData.englishOnly ? null : formData.vietnameseDescription,
          }
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setCurrentStep('pricing');
        return;
      }

      if (data?.url) {
        toast.success('Redirecting to secure payment...');
        window.location.href = data.url;
      } else {
        toast.error('No checkout URL received');
        setCurrentStep('pricing');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      setCurrentStep('pricing');
    }
  };

  if (isLoadingFreeJobStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Redirecting to secure payment...
          </p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (currentStep === 'pricing' && formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
        <div className="container mx-auto py-8">
          <div className="mb-6">
            <button
              onClick={() => setCurrentStep('form')}
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              ← Back to Job Details
            </button>
          </div>
          
          <JobPricingTable
            onPricingSelect={handlePricingSelect}
            jobData={formData}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50/30 to-indigo-50/20">
      <div className="container mx-auto py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Nail Tech Job</h1>
            <p className="text-gray-600">Create a professional job listing for nail technicians</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <CardTitle className="text-xl text-gray-900">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                    
                    {/* Plan Type Selection */}
                    <FormField
                      control={form.control}
                      name="planType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plan Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={hasPostedFreeJob}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select plan type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free" disabled={hasPostedFreeJob}>
                                Free Job Post {hasPostedFreeJob ? '(Already Used)' : ''}
                              </SelectItem>
                              <SelectItem value="paid">Paid Job Post</SelectItem>
                            </SelectContent>
                          </Select>
                          {hasPostedFreeJob && (
                            <p className="text-sm text-amber-600">
                              You've already posted a free job. Upgrade to paid for additional posts.
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Language Settings */}
                    <FormField
                      control={form.control}
                      name="englishOnly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">English Only</FormLabel>
                            <p className="text-sm text-gray-500">
                              Check this if you only want to post in English
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Job Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title (English) *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Nail Technician" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vietnamese Title */}
                    {!englishOnly && (
                      <FormField
                        control={form.control}
                        name="vietnameseTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title (Vietnamese) *</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Thợ nail" 
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={generateVietnameseTranslation}
                                disabled={isGeneratingTranslation || !currentTitle}
                                className="whitespace-nowrap"
                              >
                                {isGeneratingTranslation ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Wand2 className="h-4 w-4" />
                                )}
                                AI Translate
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Salon Name */}
                    <FormField
                      control={form.control}
                      name="salonName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Salon Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Magic Nails Spa" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Houston, TX" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     {/* Salary Range */}
                     <FormField
                       control={form.control}
                       name="salaryRange"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Salary Range *</FormLabel>
                           <FormControl>
                             <Input 
                               placeholder="e.g., $1,500–$2,200" 
                               {...field}
                               onBlur={() => handleSalaryBlur(field)}
                             />
                           </FormControl>
                           <p className="text-xs text-gray-500">
                             Will automatically add "/tuần" when you finish typing
                           </p>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                    {/* Job Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description (English) *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the job requirements, responsibilities, and benefits..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Vietnamese Description */}
                    {!englishOnly && (
                      <FormField
                        control={form.control}
                        name="vietnameseDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Description (Vietnamese) *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Mô tả công việc, yêu cầu và quyền lợi..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                      
                      <FormField
                        control={form.control}
                        name="contactName"
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
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(XXX) XXX-XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Posting Job...
                        </>
                      ) : selectedPlan === 'paid' ? (
                        'Continue to Pricing'
                      ) : (
                        'Post Free Job'
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <div className="space-y-6">
              <Card className="border-2 border-green-200">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <NailJobPreviewCard
                    title={form.watch('title')}
                    vietnameseTitle={!englishOnly ? form.watch('vietnameseTitle') : ''}
                    salonName={form.watch('salonName')}
                    location={form.watch('location')}
                    description={form.watch('description')}
                    vietnameseDescription={!englishOnly ? form.watch('vietnameseDescription') : ''}
                    salaryRange={formatSalaryForNails(form.watch('salaryRange'))}
                    planType={form.watch('planType')}
                    englishOnly={englishOnly}
                  />
                </CardContent>
              </Card>

              {selectedPlan === 'paid' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Paid jobs get priority placement, longer duration, and include contact information for candidates.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NailJobPostForm;