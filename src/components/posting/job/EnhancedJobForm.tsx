
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import JobForm from './JobForm';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { JobSummary } from '@/components/posting/JobSummary';
import { PricingOptions, JobPricingOption } from '@/utils/posting/types';
import { usePricing } from '@/context/pricing/PricingProvider'; // Fixed import to use usePricing hook instead of usePricingContext

// Mock function instead of useUploadThing
const useUploadImages = () => {
  return {
    startUpload: async (files: File[]) => {
      console.log("Mock upload for files:", files);
      // Return mock URLs
      return files.map(file => ({
        fileUrl: URL.createObjectURL(file),
        fileKey: `mock-key-${file.name}`
      }));
    },
    isUploading: false
  };
};

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 5,
  onStepChange,
}) => {
  const [activeTab, setActiveTab] = useState('details');
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewData, setReviewData] = useState<JobFormValues | null>(null);
  const [previewData, setPreviewData] = useState<JobFormValues | null>(null);
  
  // Use usePricing hook from PricingProvider
  const { pricingOptions, setPricingOptions, priceData } = usePricing();

  // Get the startUpload function from our mock hook
  const { startUpload, isUploading } = useUploadImages();

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: '',
      compensation_type: '',
      compensation_details: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactZalo: '',
      salonName: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
    },
  });

  const { handleSubmit, watch, formState: { errors, isValid } } = methods;
  const watchedValues = watch();

  // Update preview data whenever form values change
  useEffect(() => {
    setPreviewData(watchedValues);
  }, [watchedValues]);

  // Navigate to the next tab when details are completed
  const handleDetailsNext = () => {
    if (Object.keys(errors).length === 0) {
      setActiveTab('pricing');
      onStepChange?.(2);
    }
  };

  // Navigate to the review tab
  const handlePricingNext = () => {
    setReviewData(watchedValues);
    setActiveTab('review');
    onStepChange?.(3);
  };

  // Handle form submission
  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      let uploadedImageUrls: string[] = [];
      
      if (photoUploads.length > 0) {
        try {
          const uploadResults = await startUpload(photoUploads);
          uploadedImageUrls = uploadResults.map(result => result.fileUrl);
        } catch (err) {
          // Fixed error handling to use a proper error object
          console.error("Error uploading images:", err);
          const errorMessage = err instanceof Error ? err.message : String(err);
          toast({ 
            title: "Upload Error", 
            description: `Failed to upload images: ${errorMessage}`,
            variant: "destructive" 
          });
          return;
        }
      }
      
      // Process the form data with uploaded image URLs
      const formData = methods.getValues();
      
      // If we have uploaded images, add the first one to the job post
      if (uploadedImageUrls.length > 0) {
        formData.image = uploadedImageUrls[0];
      }
      
      const result = await onSubmit(formData, photoUploads, pricingOptions);
      
      if (result) {
        // Success handling
        console.log('Job posted successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePhotoUpload = (files: File[]) => {
    if (files.length + photoUploads.length > maxPhotos) {
      // TODO: Show error about max photos
      return;
    }
    setPhotoUploads(prev => [...prev, ...files]);
  };
  
  const removePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case 'details':
        onStepChange?.(1);
        break;
      case 'pricing':
        onStepChange?.(2);
        break;
      case 'review':
        setReviewData(watchedValues);
        onStepChange?.(3);
        break;
      default:
        break;
    }
  };

  // Function to go back
  const handleBack = () => {
    if (activeTab === 'pricing') {
      setActiveTab('details');
      onStepChange?.(1);
    } else if (activeTab === 'review') {
      setActiveTab('pricing');
      onStepChange?.(2);
    } else if (onBack) {
      onBack();
    }
  };

  const getPricingTierLabel = (tierKey: string): JobPricingOption => {
    // Fixed the JobPricingOption type by adding the required properties
    const tierLabels: Record<string, JobPricingOption> = {
      'standard': { 
        id: 'standard', 
        name: 'Standard', 
        price: 25,
        description: 'Basic job listing', 
        tier: 'standard', 
        features: ['Basic visibility', '30-day listing'] 
      },
      'premium': { 
        id: 'premium', 
        name: 'Premium', 
        price: 50,
        description: 'Enhanced visibility for your job posting',
        tier: 'premium', 
        features: ['Higher visibility', 'Featured in search results', '30-day listing'] 
      },
      'gold': { 
        id: 'gold', 
        name: 'Gold', 
        price: 75,
        description: 'Maximum visibility package',
        tier: 'gold', 
        features: ['Top visibility', 'Social media promotion', '30-day listing', 'Highlighted in search'] 
      },
      'diamond': { 
        id: 'diamond', 
        name: 'Diamond', 
        price: 100,
        description: 'Elite visibility package',
        tier: 'diamond', 
        features: ['Premium placement', 'Featured on homepage', 'Email blast to candidates', '45-day listing'] 
      },
      'free': { 
        id: 'free', 
        name: 'Free', 
        price: 0,
        description: 'Limited free listing',
        tier: 'free', 
        features: ['Basic listing', '15-day listing'] 
      }
    };
    
    return tierLabels[tierKey] || tierLabels['standard'];
  };

  // Function to declare toast
  const toast = ({ title, description, variant }: { title: string; description: string; variant?: "default" | "destructive" }) => {
    console.log(`${title}: ${description}`);
    // This would be replaced with your actual toast implementation
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Job Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing Options</TabsTrigger>
            <TabsTrigger value="review">Review & Post</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4 pt-4">
            <JobForm />
            
            <div className="flex justify-between mt-6">
              {onBack && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button 
                onClick={handleDetailsNext} 
                disabled={Object.keys(errors).length > 0}
                className="ml-auto"
              >
                Next: Pricing Options
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Pricing options would go here */}
                <h2 className="text-xl font-semibold mb-4">Select Visibility Package</h2>
                <div className="space-y-4">
                  {/* Pricing options UI here */}
                </div>
              </div>
              
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <PaymentSummary priceData={priceData} />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                Back to Details
              </Button>
              <Button onClick={handlePricingNext}>
                Next: Review
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="review" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Review Your Job Posting</h2>
                {reviewData && (
                  <JobSummary
                    title={reviewData.title}
                    description={reviewData.description}
                    location={reviewData.location}
                    contactEmail={reviewData.contactEmail}
                    contactPhone={reviewData.contactPhone}
                    pricingPlan={getPricingTierLabel(pricingOptions.selectedPricingTier)}
                    jobType={reviewData.jobType}
                    salonName={reviewData.salonName}
                  />
                )}
              </div>
              
              <div>
                <Card>
                  <CardContent className="pt-6">
                    <PaymentSummary priceData={priceData} />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={handleBack}
              >
                Back to Pricing
              </Button>
              <Button 
                onClick={handleSubmit(handleFinalSubmit)}
                disabled={isSubmitting || isUploading}
              >
                {isSubmitting ? 'Processing...' : 'Post Job'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FormProvider>
  );
};

export default EnhancedJobForm;
