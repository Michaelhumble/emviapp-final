import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import JobForm from "./JobForm";
import JobSummary from '@/components/posting/JobSummary';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { usePricingContext } from '@/context/pricing/PricingProvider';
import { uploadFiles, getImageData } from '@/utils/uploadthing'; // Changed to use the mock functions

// Replace useUploadThing and UploadDropzone with mock implementations
// or comment out the affected code
// You would need to replace these imports:
// import { useUploadThing } from "@/utils/uploadthing";
// import { UploadDropzone } from "@/utils/uploadthing";

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onBack?: () => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean; 
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onBack,
  initialTemplate,
  isCustomTemplate = false,
  maxPhotos = 5,
  onStepChange
}) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [formData, setFormData] = useState<JobFormValues>(initialTemplate || {
    title: '',
    description: '',
    location: '',
    salonName: '',
  });
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pricingOptions } = usePricingContext();

  // Mock implementation for handling file uploads
  const handleFileUpload = async (files: File[]) => {
    // Limit the number of files to maxPhotos
    const limitedFiles = files.slice(0, maxPhotos);
    setPhotoUploads(limitedFiles);
    return limitedFiles;
  };
  
  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

  const updateProgress = (newStep: number) => {
    switch (newStep) {
      case 1:
        setProgress(33);
        break;
      case 2:
        setProgress(66);
        break;
      case 3:
        setProgress(100);
        break;
      default:
        setProgress(33);
    }
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    updateProgress(newStep);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    if (step === 1 && onBack) {
      onBack();
      return;
    }
    
    const newStep = step - 1;
    setStep(newStep);
    updateProgress(newStep);
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    setFormData(data);
    
    if (step < 3) {
      nextStep();
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data, photoUploads, pricingOptions);
      if (success) {
        // Reset form or navigate away
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <JobForm 
            initialValues={formData} 
            onSubmit={handleFormSubmit} 
            isLoading={isSubmitting}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Upload Photos</h2>
            <p className="text-gray-600">Add photos of your salon or workplace to attract more applicants.</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    handleFileUpload(Array.from(e.target.files));
                  }
                }}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-2">
                Drag and drop files here or click to browse (max {maxPhotos} photos)
              </p>
            </div>
            
            {photoUploads.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Selected Photos ({photoUploads.length}/{maxPhotos})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Upload ${index + 1}`} 
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPhotoUploads(photoUploads.filter((_, i) => i !== index));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="button" onClick={nextStep}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review & Submit</h2>
            <p className="text-gray-600">Review your job posting before submitting.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Job Preview</h3>
                <JobSummary 
                  title={formData.title || "Job Title"}
                  description={formData.description}
                  location={formData.location}
                  contactEmail={formData.contactEmail}
                  contactPhone={formData.contactPhone}
                  jobType={formData.jobType}
                  salonName={formData.salonName}
                  pricingPlan={pricingOptions.selectedPricingTier ? {
                    id: pricingOptions.selectedPricingTier,
                    name: pricingOptions.selectedPricingTier.charAt(0).toUpperCase() + pricingOptions.selectedPricingTier.slice(1),
                    features: ['Feature 1', 'Feature 2']
                  } : undefined}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Selected Plan</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Plan:</span>
                        <span className="capitalize">{pricingOptions.selectedPricingTier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Duration:</span>
                        <span>{pricingOptions.durationMonths} month(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Auto-renew:</span>
                        <span>{pricingOptions.autoRenew ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {photoUploads.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Photos ({photoUploads.length})</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {photoUploads.map((file, index) => (
                        <img 
                          key={index}
                          src={URL.createObjectURL(file)} 
                          alt={`Upload ${index + 1}`} 
                          className="h-16 w-full object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button 
                type="button" 
                onClick={() => handleFormSubmit(formData)}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Job Posting'}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Job Details</span>
          <span>Photos</span>
          <span>Review & Submit</span>
        </div>
      </div>
      
      <Tabs value={`step-${step}`} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="step-1">Job Details</TabsTrigger>
          <TabsTrigger value="step-2">Photos</TabsTrigger>
          <TabsTrigger value="step-3">Review & Submit</TabsTrigger>
        </TabsList>
        
        <TabsContent value={`step-${step}`} className="mt-0">
          {renderStepContent()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedJobForm;

function toast(arg0: { error: string; }) {
  throw new Error('Function not implemented.');
}
