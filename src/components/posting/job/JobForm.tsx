
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import JobFormFields from './JobFormFields';
import { PhotoUploadSection } from '@/components/posting/PhotoUploadSection';
import { useJobPosting } from '@/context/JobPostingContext';
import { ExtendedJobFormValues } from '@/types/jobPosting';

interface JobFormProps {
  onSubmit: (data: JobFormValues, uploads?: File[]) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  initialValues?: JobFormValues;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  useContextAPI?: boolean;
  form?: ReturnType<typeof useForm<JobFormValues>>;
}

const JobForm = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  initialValues,
  isCustomTemplate = false,
  maxPhotos = 5,
  useContextAPI = false,
  form: externalForm
}: JobFormProps) => {
  // Local state for file uploads
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(photoUploads || []);
  
  // Access context if enabled
  let jobPostingContext;
  try {
    jobPostingContext = useContextAPI ? useJobPosting() : null;
  } catch (error) {
    console.error("Failed to load job posting context:", error);
    jobPostingContext = null;
  }
  
  // Initialize form with react-hook-form
  const internalForm = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialValues || {}
  });
  
  // Use external form if provided, otherwise use internal form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    watch,
    setValue
  } = externalForm || internalForm;
  
  // Use the correct form for the component
  const effectiveForm = externalForm || internalForm;
  
  // Watch form values for context sync
  const formValues = watch();
  
  // Sync with context if enabled
  useEffect(() => {
    if (useContextAPI && jobPostingContext) {
      // When initialValues change, reset the form
      reset(jobPostingContext.jobData || initialValues || {});
    } else {
      // For legacy mode, just use initialValues
      reset(initialValues || {});
    }
  }, [reset, initialValues, useContextAPI, jobPostingContext]);
  
  // Sync photoUploads with local state
  useEffect(() => {
    setUploadedFiles(photoUploads || []);
  }, [photoUploads]);
  
  // Handle form submission
  const handleFormSubmit = (data: JobFormValues) => {
    try {
      console.log('Form data submitted:', data);
      
      if (useContextAPI && jobPostingContext) {
        // In context mode, update context and call submit handler
        jobPostingContext.updateJobData(data);
      }
      
      // Call the onSubmit handler with form data and uploads
      onSubmit(data, uploadedFiles);
    } catch (error) {
      console.error('Error submitting job form:', error);
    }
  };
  
  // Handle file uploads
  const handleFilesSelected = (files: File[]) => {
    const newUploads = [...uploadedFiles, ...files].slice(0, maxPhotos);
    setUploadedFiles(newUploads);
    
    if (useContextAPI && jobPostingContext) {
      jobPostingContext.setPhotoUploads(newUploads);
    } else {
      setPhotoUploads(newUploads);
    }
  };
  
  // Handle file removal
  const handleFileRemoved = (indexToRemove: number) => {
    const newUploads = uploadedFiles.filter((_, index) => index !== indexToRemove);
    setUploadedFiles(newUploads);
    
    if (useContextAPI && jobPostingContext) {
      jobPostingContext.setPhotoUploads(newUploads);
    } else {
      setPhotoUploads(newUploads);
    }
  };

  // Render with FormProvider
  if (externalForm) {
    return (
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Job form fields */}
        <JobFormFields 
          register={register} 
          errors={errors} 
          control={control}
          watch={watch}
          setValue={setValue}
          isCustomTemplate={isCustomTemplate}
          form={effectiveForm}
        />
        
        {/* Photo uploads section */}
        <PhotoUploadSection
          files={uploadedFiles}
          onFilesSelected={handleFilesSelected}
          onFileRemoved={handleFileRemoved}
          maxFiles={maxPhotos}
        />
        
        {/* Form actions */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8"
          >
            Continue to Review
          </Button>
        </div>
      </form>
    );
  }

  // If no external form is provided, wrap in FormProvider
  return (
    <FormProvider {...internalForm}>
      <form onSubmit={internalForm.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Job form fields */}
        <JobFormFields 
          register={register} 
          errors={errors} 
          control={control}
          watch={watch}
          setValue={setValue}
          isCustomTemplate={isCustomTemplate}
          form={internalForm}
        />
        
        {/* Photo uploads section */}
        <PhotoUploadSection
          files={uploadedFiles}
          onFilesSelected={handleFilesSelected}
          onFileRemoved={handleFileRemoved}
          maxFiles={maxPhotos}
        />
        
        {/* Form actions */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8"
          >
            Continue to Review
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
