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
  category: z.enum(JOB_CATEGORIES, { 
    required_error: "Please select a beauty industry category" 
  }),
  otherCategoryDescription: z.string().optional(),
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
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmittingFreeJob, setIsSubmittingFreeJob] = useState(false);
  const [freeJobError, setFreeJobError] = useState<string | null>(null);
  const [freeJobSuccess, setFreeJobSuccess] = useState(false);
  const [hasPostedFreeJob, setHasPostedFreeJob] = useState(false);
  const [isLoadingFreeJobStatus, setIsLoadingFreeJobStatus] = useState(true);
  const [existingFreeJob, setExistingFreeJob] = useState<any>(null);
  
  console.log('🎯 EnhancedJobForm received initialValues:', initialValues);
  
  const form = useForm<EnhancedJobFormValues>({
    resolver: zodResolver(enhancedJobFormSchema),
    defaultValues: {
      planType: 'free', // Default to free plan
      category: 'Nail Tech', // Default to first option
      otherCategoryDescription: '',
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

  const selectedCategory = form.watch('category');
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
      category: data.category.trim(),
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
        category: initialValues.category || 'Nail Tech',
        otherCategoryDescription: initialValues.otherCategoryDescription || '',
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
    
    if (!data.category.trim()) {
      console.log('❌ [VALIDATION] Category is required');
      setFreeJobError('Category is required');
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
      category: data.category.trim(),
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
      user_id: user.id,
      status: 'active',
      pricing_tier: 'free'
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
      // Handle paid job submission (existing flow)
      onSubmit({ ...data, photoUploads });
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
            
            {/* Category Selection - Required Second Step */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Beauty Industry Category</h2>
                <p className="text-slate-600">Select the primary category for this job posting</p>
              </div>
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">
                      Job Category *
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full h-12 text-base">
                          <SelectValue placeholder="Select a beauty industry category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_CATEGORIES.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Other Category Description Field */}
              {selectedCategory === 'Other' && (
                <div className="mt-4">
                  <FormField
                    control={form.control}
                    name="otherCategoryDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-slate-700">
                          Please specify the job category
                        </FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            className="w-full h-12 px-4 text-base border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="e.g., Massage Therapist, Receptionist, etc."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
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
            
            {/* Free Job Error/Success States */}
            {selectedPlan === 'free' && freeJobError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {freeJobError}
                </AlertDescription>
              </Alert>
            )}
            
            {selectedPlan === 'free' && freeJobSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  🎉 Job posted successfully! Redirecting to jobs page...
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-end pt-8">
              <Button 
                type="submit"
                disabled={selectedPlan === 'free' && (isSubmittingFreeJob || freeJobSuccess)}
                className={`px-12 py-4 text-lg font-semibold rounded-xl shadow-lg ${
                  selectedPlan === 'free' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                }`}
              >
                {selectedPlan === 'free' && isSubmittingFreeJob ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting Job...
                  </>
                ) : selectedPlan === 'free' && freeJobSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Job Posted!
                  </>
                ) : selectedPlan === 'free' ? (
                   hasPostedFreeJob && existingFreeJob ? 'Update Free Job ✨' : 'Post Free Job ✨'
                 ) : (
                  'Continue to Pricing ✨'
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
