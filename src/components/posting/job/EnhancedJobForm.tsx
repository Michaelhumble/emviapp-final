import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Zap, Loader2, AlertCircle } from 'lucide-react';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';
import PremiumJobPricingCards from '@/components/posting/job/PremiumJobPricingCards';
import { useToast } from '@/hooks/use-toast';

// Job categories - locked choices
const JOB_CATEGORIES = [
  'Nail Tech',
  'Hair Stylist', 
  'Lash Tech',
  'Barber',
  'Spa',
  'Tattoo',
  'Esthetician',
  'Makeup',
  'Other'
] as const;

const enhancedJobFormSchema = z.object({
  planType: z.enum(['free', 'paid'], { 
    required_error: "Please select a plan type" 
  }),
  title: z.string().min(1, "Job title is required"),
  company: z.string().optional(),
  salonName: z.string().min(1, "Salon name is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  vietnameseDescription: z.string().optional(),
  requirements: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  compensationType: z.string().default("hourly"),
  compensationDetails: z.string().optional(),
  salary: z.string().optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  contactNotes: z.string().optional(),
});

type EnhancedJobFormValues = z.infer<typeof enhancedJobFormSchema>;

interface EnhancedJobFormProps {
  initialValues?: Partial<EnhancedJobFormValues>;
  onSubmit: (data: EnhancedJobFormValues & { photoUploads: File[] }) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ initialValues, onSubmit }) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const { toast } = useToast();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmittingFreeJob, setIsSubmittingFreeJob] = useState(false);
  const [freeJobError, setFreeJobError] = useState<string | null>(null);
  const [freeJobSuccess, setFreeJobSuccess] = useState(false);
  const [hasPostedFreeJob, setHasPostedFreeJob] = useState(false);
  const [isLoadingFreeJobStatus, setIsLoadingFreeJobStatus] = useState(true);
  const [existingFreeJob, setExistingFreeJob] = useState<any>(null);
  
  // Paid job plan selection state
  const [selectedPaidPlan, setSelectedPaidPlan] = useState<string>('');
  const [selectedPaidPrice, setSelectedPaidPrice] = useState<number>(0);
  const [selectedPaidDuration, setSelectedPaidDuration] = useState<number>(1);
  
  console.log('🎯 EnhancedJobForm received initialValues:', initialValues);
  
  const form = useForm<EnhancedJobFormValues>({
    resolver: zodResolver(enhancedJobFormSchema),
    defaultValues: {
      planType: 'free', // Default to free plan
      title: '',
      company: '',
      salonName: '',
      location: '',
      employmentType: '',
      description: '',
      vietnameseDescription: '',
      requirements: [],
      benefits: [],
      compensationType: 'hourly',
      compensationDetails: '',
      salary: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactNotes: '',
      ...initialValues
    }
  });

  const selectedPlan = form.watch('planType');

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
          setExistingFreeJob(data[0]);
          // If user has a free job and no initial values (not editing), force paid plan
          if (!initialValues) {
            form.setValue('planType', 'paid'); // Force paid plan
          }
        } else {
          // If user doesn't have a free job, allow free plan as default
          if (!initialValues) {
            form.setValue('planType', 'free');
          }
        }
      } catch (error) {
        console.error('Unexpected error checking free job status:', error);
      } finally {
        setIsLoadingFreeJobStatus(false);
      }
    };

    checkFreeJobStatus();
  }, [isSignedIn, user, form, initialValues]);

  // Handle editing existing free job
  const handleEditFreeJob = async (data: EnhancedJobFormValues) => {
    console.log('🟡 EDITING EXISTING FREE JOB');
    
    if (!existingFreeJob) {
      setFreeJobError('No existing free job found to edit');
      return;
    }

    // Clear previous states
    setFreeJobError(null);
    setFreeJobSuccess(false);
    
    // Auth check
    if (!isSignedIn || !user) {
      setFreeJobError('You must be logged in to edit a job');
      return;
    }

    // Prepare payload for update
    const updatePayload = {
      title: data.title.trim(),
      category: 'General', // Fixed category since UI no longer shows selection
      location: data.location.trim() || null,
      description: data.description.trim(),
      compensation_type: data.compensationType.trim() || null,
      compensation_details: data.compensationDetails?.trim() || null,
      requirements: data.requirements.join('\n') || null,
      contact_info: {
        owner_name: data.contactName?.trim() || '',
        phone: data.contactPhone?.trim() || '',
        email: data.contactEmail?.trim() || '',
        notes: data.contactNotes?.trim() || ''
      },
      updated_at: new Date().toISOString()
    };

    setIsSubmittingFreeJob(true);

    try {
      const { data: updateData, error } = await supabase
        .from('jobs')
        .update(updatePayload)
        .eq('id', existingFreeJob.id)
        .eq('user_id', user.id)
        .select();

      if (error) {
        console.log('💥 [SUPABASE-ERROR] Update failed:', error);
        setFreeJobError(`Failed to update job: ${error.message}`);
        return;
      }

      console.log('✅ [SUPABASE-SUCCESS] Job updated successfully:', updateData);
      setFreeJobSuccess(true);

      // Navigate to jobs page after a short delay
      setTimeout(() => {
        navigate('/jobs');
      }, 2000);

    } catch (error) {
      console.log('💥 [CATCH-ERROR] Unexpected error:', error);
      setFreeJobError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmittingFreeJob(false);
    }
  };

  // Update form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      console.log('🔄 Updating form with initialValues:', initialValues);
      
      // Reset form with new values
      form.reset({
        planType: initialValues.planType || 'free',
        title: initialValues.title || '',
        company: initialValues.company || '',
        salonName: initialValues.company || initialValues.salonName || '',
        location: initialValues.location || '',
        employmentType: initialValues.employmentType || '',
        description: initialValues.description || '',
        vietnameseDescription: initialValues.vietnameseDescription || '',
        requirements: Array.isArray(initialValues.requirements) ? initialValues.requirements : [],
        benefits: Array.isArray(initialValues.benefits) ? initialValues.benefits : [],
        compensationType: initialValues.compensationType || 'hourly',
        compensationDetails: initialValues.compensationDetails || '',
        salary: initialValues.salary || '',
        contactName: initialValues.contactName || '',
        contactPhone: initialValues.contactPhone || '',
        contactEmail: initialValues.contactEmail || '',
        contactNotes: initialValues.contactNotes || '',
      });
      
      console.log('✅ Form reset complete. Current values:', form.getValues());
    }
  }, [initialValues, form]);

  // Free job submission function (copied from FreeJobPostingForm)
  const handleFreeJobSubmit = async (data: EnhancedJobFormValues) => {
    console.log('🟢 FREE JOB SUBMISSION STARTED');
    
    // Clear previous states
    setFreeJobError(null);
    setFreeJobSuccess(false);
    
    // Auth check
    if (!isSignedIn || !user) {
      console.log('🔐 [AUTH-ERROR] User not authenticated');
      setFreeJobError('You must be logged in to post a job');
      return;
    }

    console.log('🔐 [AUTH-CHECK] User authenticated:', {
      userId: user.id,
      email: user.email
    });

    // Validate form
    if (!data.title.trim()) {
      console.log('❌ [VALIDATION] Title is required');
      setFreeJobError('Job title is required');
      return;
    }
    
    
    if (!data.description.trim()) {
      console.log('❌ [VALIDATION] Description is required');
      setFreeJobError('Job description is required');
      return;
    }

    console.log('✅ [VALIDATION] Form validation passed');

    // Prepare payload (matching FreeJobPostingForm structure)
    const payload = {
      title: data.title.trim(),
      category: 'General', // Fixed category since UI no longer shows selection
      location: data.location.trim() || null,
      description: data.description.trim(),
      vietnamese_description: data.vietnameseDescription?.trim() || null,
      compensation_type: data.compensationType.trim() || null,
      compensation_details: data.compensationDetails?.trim() || null,
      requirements: data.requirements.join('\n') || null,
      contact_info: {
        owner_name: data.contactName?.trim() || '',
        phone: data.contactPhone?.trim() || '',
        email: data.contactEmail?.trim() || '',
        notes: data.contactNotes?.trim() || ''
      },
      user_id: user.id,
      status: 'active',
      pricing_tier: 'free',
      // Store first uploaded image URL (will be implemented with image upload)
      image: photoUploads.length > 0 ? null : null // Placeholder for image upload implementation
    };

    console.log('📋 [PAYLOAD] Prepared payload for Supabase:', payload);

    setIsSubmittingFreeJob(true);

    try {
      console.log('🚀 [SUPABASE-CALL] Calling supabase.from("jobs").insert()');
      
      const { data: insertData, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select();

      console.log('📨 [SUPABASE-RESPONSE] Response received:', {
        data: insertData,
        error,
        hasData: !!insertData,
        dataLength: insertData?.length || 0
      });

      if (error) {
        console.log('💥 [SUPABASE-ERROR] Insert failed:', error);
        setFreeJobError(`Failed to create job: ${error.message}`);
        return;
      }

      if (!insertData || insertData.length === 0) {
        console.log('💥 [SUPABASE-ERROR] No data returned from insert');
        setFreeJobError('Failed to create job: No data returned');
        return;
      }

      console.log('✅ [SUPABASE-SUCCESS] Job created successfully:', insertData[0]);
      setFreeJobSuccess(true);

      // Navigate to jobs page after a short delay
      setTimeout(() => {
        console.log('🔄 [NAVIGATION] Redirecting to /jobs');
        navigate('/jobs');
      }, 2000);

    } catch (error) {
      console.log('💥 [CATCH-ERROR] Unexpected error:', error);
      setFreeJobError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmittingFreeJob(false);
    }
  };

  // Handle paid job plan selection
  const handlePaidPlanSelect = (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('🎯 PAID PLAN SELECTED:', { tier, finalPrice, durationMonths });
    setSelectedPaidPlan(tier);
    setSelectedPaidPrice(finalPrice);
    setSelectedPaidDuration(durationMonths);
  };

  // Handle paid job submission with Stripe checkout
  const handlePaidJobSubmit = async (data: EnhancedJobFormValues) => {
    console.log('💳 PAID JOB SUBMISSION STARTED - Creating Stripe checkout');
    
    // Clear previous states
    setFreeJobError(null);
    setFreeJobSuccess(false);
    
    // Auth check
    if (!isSignedIn || !user) {
      console.log('🔐 [PAID-AUTH-ERROR] User not authenticated');
      setFreeJobError('You must be logged in to post a paid job');
      return;
    }

    // Validate plan selection
    if (!selectedPaidPlan) {
      console.log('❌ [PAID-VALIDATION] No plan selected');
      setFreeJobError('Please select a paid plan before proceeding to payment');
      return;
    }

    console.log('🔐 [PAID-AUTH-CHECK] User authenticated:', {
      userId: user.id,
      email: user.email,
      selectedPlan: selectedPaidPlan,
      selectedPrice: selectedPaidPrice,
      selectedDuration: selectedPaidDuration
    });

    // Validate form
    if (!data.title.trim()) {
      console.log('❌ [PAID-VALIDATION] Title is required');
      setFreeJobError('Job title is required');
      return;
    }
    
    
    if (!data.description.trim()) {
      console.log('❌ [PAID-VALIDATION] Description is required');
      setFreeJobError('Job description is required');
      return;
    }

    console.log('✅ [PAID-VALIDATION] Form validation passed');

    setIsSubmittingFreeJob(true);

    try {
      console.log('🚀 [STRIPE-CHECKOUT] Creating checkout session with plan details');
      
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-job-checkout',
        {
          body: {
            jobData: {
              title: data.title.trim(),
              category: 'General', // Fixed category since UI no longer shows selection
              location: data.location.trim() || '',
              description: data.description.trim(),
              vietnamese_description: data.vietnameseDescription?.trim() || '',
              compensationType: data.compensationType.trim() || '',
              compensationDetails: data.compensationDetails?.trim() || '',
              requirements: data.requirements || [],
              contactName: data.contactName?.trim() || '',
              contactPhone: data.contactPhone?.trim() || '',
              contactEmail: data.contactEmail?.trim() || '',
              contactNotes: data.contactNotes?.trim() || '',
              // Include images (will be processed by edge function)
              photoUploads: photoUploads,
              // Include selected plan details
              selectedPlan: selectedPaidPlan,
              selectedPrice: selectedPaidPrice,
              selectedDuration: selectedPaidDuration
            }
          }
        }
      );

      if (checkoutError) {
        console.error('💥 [STRIPE-ERROR] Checkout creation failed:', checkoutError);
        console.error('💥 [STRIPE-ERROR] Full error object:', JSON.stringify(checkoutError, null, 2));
        
        // Extract the actual error details from the Edge Function response
        let userFriendlyMessage = 'Payment setup failed';
        let debugMessage = '';
        
        try {
          // Check if it's a FunctionsHttpError with details
          if (checkoutError.context?.body) {
            const errorBody = checkoutError.context.body;
            console.error('💥 [STRIPE-ERROR] Function response body:', errorBody);
            
            if (errorBody.error) {
              userFriendlyMessage = `Payment Error: ${errorBody.error}`;
              debugMessage = errorBody.details || errorBody.error;
            }
          }
          // Fallback to direct error properties
          else if (checkoutError.details) {
            userFriendlyMessage = `Edge Function Error: ${checkoutError.details}`;
            debugMessage = checkoutError.details;
          } else if (checkoutError.message) {
            // Handle common Supabase/Edge Function errors
            if (checkoutError.message.includes('Failed to invoke')) {
              userFriendlyMessage = 'Edge Function invocation failed - check function name and deployment';
            } else if (checkoutError.message.includes('STRIPE_SECRET_KEY')) {
              userFriendlyMessage = 'Stripe configuration error: STRIPE_SECRET_KEY not configured';
            } else if (checkoutError.message.includes('Invalid API Key')) {
              userFriendlyMessage = 'Stripe configuration error: Invalid STRIPE_SECRET_KEY';
            } else {
              userFriendlyMessage = `Payment Error: ${checkoutError.message}`;
            }
            debugMessage = checkoutError.message;
          }
          
          console.error('💥 [STRIPE-ERROR] Parsed error for user:', {
            userMessage: userFriendlyMessage,
            debugMessage: debugMessage,
            fullError: checkoutError
          });
        } catch (parseError) {
          console.error('💥 [STRIPE-ERROR] Failed to parse error details:', parseError);
          userFriendlyMessage = `Payment setup failed: ${checkoutError.message || 'Unknown error'}`;
        }
        
        // Show the detailed error to the user (helpful for debugging in development)
        setFreeJobError(userFriendlyMessage);
        return;
      }

      if (!checkoutData?.url) {
        console.error('💥 [STRIPE-ERROR] No checkout URL returned');
        console.error('💥 [STRIPE-ERROR] Full response data:', checkoutData);
        setFreeJobError('Payment setup failed: No checkout URL received from Stripe');
        return;
      }

      console.log('✅ [STRIPE-SUCCESS] Checkout session created, redirecting to:', checkoutData.url);
      
      // Redirect to Stripe Checkout
      window.location.href = checkoutData.url;

    } catch (error) {
      console.error('💥 [STRIPE-CATCH] Unexpected error in paid job submission:', error);
      console.error('💥 [STRIPE-CATCH] Error stack:', error instanceof Error ? error.stack : 'No stack');
      
      // Show the full technical error details
      const fullError = error instanceof Error ? error.message : 'Unknown error occurred';
      setFreeJobError(`Unexpected error: ${fullError}`);
    } finally {
      setIsSubmittingFreeJob(false);
    }
  };

  const handleSubmit = (data: EnhancedJobFormValues) => {
    console.log('📤 Form submitted with data:', data);
    console.log('📷 Photos attached:', photoUploads.length);
    console.log('🎯 Plan type selected:', data.planType);
    
    if (data.planType === 'free') {
      // Check if we're editing an existing free job or creating a new one
      if (hasPostedFreeJob && existingFreeJob) {
        console.log('🟡 Handling free job edit');
        handleEditFreeJob(data);
      } else if (!hasPostedFreeJob) {
        console.log('🟢 Handling new free job creation');
        handleFreeJobSubmit(data);
      } else {
        console.log('❌ Free job limit reached');
        setFreeJobError('You have already used your free job post allowance. Please choose a paid plan.');
      }
    } else {
      // Handle paid job submission through Stripe checkout
      console.log('💳 Handling paid job creation (LIVE MODE - real payment)');
      handlePaidJobSubmit(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-4xl mx-auto p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-12">
            
            {/* Plan Selection - First Step */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Select Your Plan</h2>
                <p className="text-slate-600">Choose between free and paid job posting options</p>
              </div>

              {/* Free Job Eligibility Notice */}
              {hasPostedFreeJob && !isLoadingFreeJobStatus && (
                <Alert className="mb-6 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    You have already used your <strong>one free job post per account</strong>.
                    {existingFreeJob && (
                      <span>
                        {' '}You can edit your existing free job from your dashboard, or choose a paid plan for additional job posts.
                      </span>
                    )}
                    {!existingFreeJob && (
                      <span>
                        {' '}Please choose a paid plan for additional job posts.
                      </span>
                    )}
                  </AlertDescription>
                </Alert>
              )}
              
              <FormField
                control={form.control}
                name="planType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700 mb-4 block">
                      Plan Type *
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card 
                        className={`transition-all duration-200 ${
                          hasPostedFreeJob && !existingFreeJob 
                            ? 'opacity-50 cursor-not-allowed border-gray-300' 
                            : hasPostedFreeJob && existingFreeJob
                            ? 'opacity-50 cursor-not-allowed border-gray-300'
                            : field.value === 'free' 
                              ? 'ring-2 ring-green-500 bg-green-50 cursor-pointer' 
                              : 'hover:bg-slate-50 cursor-pointer'
                        }`}
                        onClick={() => {
                          if (!hasPostedFreeJob) {
                            field.onChange('free');
                          }
                        }}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className={`text-lg ${
                              hasPostedFreeJob ? 'text-gray-500' : 'text-green-600'
                            }`}>
                              Free Job Post
                            </CardTitle>
                            <Badge variant="secondary" className={
                              hasPostedFreeJob 
                                ? 'bg-red-100 text-red-700'
                                : 'bg-green-100 text-green-700'
                            }>
                              {hasPostedFreeJob ? 'ALREADY USED' : 'FREE'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {hasPostedFreeJob ? (
                              <div className="text-sm text-gray-500">
                                You have already used your <strong>one free job post</strong> allowance per account. 
                                {existingFreeJob && ' You can edit your existing free job from your dashboard.'}
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center text-sm text-slate-600">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  Basic job listing
                                </div>
                                <div className="flex items-center text-sm text-slate-600">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  Standard visibility
                                </div>
                                <div className="flex items-center text-sm text-slate-600">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  All job categories
                                </div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card 
                        className={`cursor-pointer transition-all duration-200 ${
                          field.value === 'paid' 
                            ? 'ring-2 ring-purple-500 bg-purple-50' 
                            : 'hover:bg-slate-50'
                        }`}
                        onClick={() => field.onChange('paid')}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-purple-600">Paid/Featured Job Post</CardTitle>
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                              <Zap className="w-3 h-3 mr-1" />
                              FEATURED
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Priority placement
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Enhanced visibility
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                              Premium features & upsells
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            

            <JobDetailsSection control={form.control} />
            <RequirementsSection form={form} />
            <CompensationSection control={form.control} />
            <PhotoUploadSection 
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={5}
            />
            <ContactInfoSection control={form.control} />
            
            {/* Premium Pricing Cards - Show only when paid plan is selected */}
            {selectedPlan === 'paid' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">Choose Your Paid Plan</h2>
                  <p className="text-slate-600">Select the plan that best fits your hiring needs</p>
                </div>
                
                {!selectedPaidPlan && (
                  <Alert className="mb-6 border-purple-200 bg-purple-50">
                    <AlertCircle className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-purple-800">
                      <strong>Plan selection required:</strong> Please choose a paid plan below before proceeding to payment.
                    </AlertDescription>
                  </Alert>
                )}
                
                {selectedPaidPlan && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>{selectedPaidPlan.charAt(0).toUpperCase() + selectedPaidPlan.slice(1)} Plan Selected:</strong> ${selectedPaidPrice.toFixed(2)} for {selectedPaidDuration} month{selectedPaidDuration > 1 ? 's' : ''}
                    </AlertDescription>
                  </Alert>
                )}
                
                <PremiumJobPricingCards 
                  onPricingSelect={handlePaidPlanSelect}
                  jobData={form.getValues()}
                />
              </div>
            )}
            
            {/* Job Error States (both free and paid) */}
            {freeJobError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {freeJobError}
                </AlertDescription>
              </Alert>
            )}
            
            {freeJobSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  🎉 Job posted successfully! Redirecting to jobs page...
                </AlertDescription>
              </Alert>
            )}
            
            {/* Payment Summary for Paid Jobs */}
            {selectedPlan === 'paid' && selectedPaidPlan && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Payment Summary</h3>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-purple-800">
                        {selectedPaidPlan.charAt(0).toUpperCase() + selectedPaidPlan.slice(1)} Plan
                      </span>
                      <p className="text-sm text-purple-600">
                        {selectedPaidDuration} month{selectedPaidDuration > 1 ? 's' : ''} duration
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-purple-800">${selectedPaidPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-8">
              <Button 
                type="submit"
                disabled={
                  (selectedPlan === 'free' && (isSubmittingFreeJob || freeJobSuccess)) ||
                  (selectedPlan === 'paid' && !selectedPaidPlan) ||
                  isSubmittingFreeJob
                }
                className={`px-12 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                  selectedPlan === 'free' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {selectedPlan === 'free' && isSubmittingFreeJob ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting Job...
                  </>
                ) : selectedPlan === 'paid' && isSubmittingFreeJob ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Payment...
                  </>
                ) : selectedPlan === 'free' && freeJobSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Job Posted!
                  </>
                ) : selectedPlan === 'free' ? (
                   hasPostedFreeJob && existingFreeJob ? 'Update Free Job ✨' : 'Post Free Job ✨'
                 ) : selectedPlan === 'paid' && selectedPaidPlan ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Pay ${selectedPaidPrice.toFixed(2)} & Post Job ✨
                  </>
                 ) : (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Select a Plan Above to Continue
                  </>
                 )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EnhancedJobForm;
