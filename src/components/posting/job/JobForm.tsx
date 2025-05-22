
import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { X, ArrowLeft } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { IndustryType } from '@/utils/posting/types';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  initialValues,
  onBack,
  showVietnameseByDefault = false,
  isCustomTemplate = false,
  maxPhotos = 5
}) => {
  const { toast } = useToast();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  
  const defaultValues: JobFormValues = initialValues || {
    title: '',
    description: '',
    vietnameseDescription: '',
    location: '',
    jobType: 'full-time',
    compensation_details: '',
    salary_range: '',
    experience_level: 'entry', // Updated to match valid enum value
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    requirements: [],
    specialties: [],
    templateType: isCustomTemplate ? 'custom' : 'standard'
  };

  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    setValue, 
    formState: { errors, isValid }
  } = methods;

  // Update the selected industry based on initial values or specialties
  useEffect(() => {
    if (initialValues?.specialties?.length) {
      // Try to determine industry from specialties
      for (const [industry, specs] of Object.entries(beautySpecialties)) {
        if (initialValues.specialties.some(specialty => 
          (specs as string[]).includes(specialty)
        )) {
          setSelectedIndustry(industry as IndustryType);
          break;
        }
      }
    }
  }, [initialValues]);

  // Handle form submission
  const onFormSubmit = (data: JobFormValues) => {
    if (!isValid) {
      toast({
        title: "Form has errors",
        description: "Please fix the issues before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(data);
  };

  // Watch for changes in job type and specialties
  const jobType = watch('jobType');
  const selectedSpecialties = watch('specialties') || [];

  // Handle industry selection
  const handleIndustrySelect = (industry: IndustryType) => {
    setSelectedIndustry(industry);
    
    // Clear previous specialties when changing industry
    setValue('specialties', []);
    
    // Auto-select some common requirements
    if (!watch('requirements')?.length) {
      setValue('requirements', [
        'Clean and organized',
        'Reliable transportation',
        'Client-friendly attitude'
      ]);
    }
  };

  // Toggle Vietnamese section
  const handleToggleVietnamese = () => {
    setShowVietnamese(!showVietnamese);
  };

  // Handle requirements checkbox toggle
  const handleRequirementToggle = (requirement: string) => {
    const current = watch('requirements') || [];
    const updated = current.includes(requirement)
      ? current.filter(r => r !== requirement)
      : [...current, requirement];
    
    setValue('requirements', updated);
  };

  // Handle specialty checkbox toggle
  const handleSpecialtyToggle = (specialty: string) => {
    const current = selectedSpecialties;
    const updated = current.includes(specialty)
      ? current.filter(s => s !== specialty)
      : [...current, specialty];
    
    setValue('specialties', updated);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {/* Back button */}
        {onBack && (
          <div className="mb-4">
            <Button 
              variant="ghost" 
              type="button" 
              onClick={onBack}
              className="flex items-center text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Button>
          </div>
        )}

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Job Information</h2>
          
          <div>
            <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="e.g., Nail Technician, Hair Stylist, Salon Manager"
              {...register('title')}
              className="mt-1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Input
              id="location"
              placeholder="e.g., Los Angeles, CA"
              {...register('location')}
              className="mt-1"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>
          
          <div>
            <Label>Job Type <span className="text-red-500">*</span></Label>
            <Controller
              name="jobType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="full-time" id="full-time" />
                    <Label htmlFor="full-time">Full-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="part-time" id="part-time" />
                    <Label htmlFor="part-time">Part-time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="contract" id="contract" />
                    <Label htmlFor="contract">Contract</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="temporary" id="temporary" />
                    <Label htmlFor="temporary">Temporary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="commission" id="commission" />
                    <Label htmlFor="commission">Commission</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          
          <div>
            <Label>Experience Level <span className="text-red-500">*</span></Label>
            <Controller
              name="experience_level"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entry" id="entry" />
                    <Label htmlFor="entry">Entry Level</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="experienced" id="experienced" />
                    <Label htmlFor="experienced">Experienced</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="senior" id="senior" />
                    <Label htmlFor="senior">Senior</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
        </div>
        
        <Separator />

        {/* Compensation */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Compensation</h2>
          
          <div>
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              placeholder="e.g., $35,000-$50,000/year or $20-30/hour + tips"
              {...register('salary_range')}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="compensation_details">Additional Compensation Details</Label>
            <Textarea
              id="compensation_details"
              placeholder="Include any additional information about commission, benefits, tips, etc."
              {...register('compensation_details')}
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Job Description */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleToggleVietnamese}
              className="text-sm"
            >
              {showVietnamese ? 'Hide Vietnamese' : 'Add Vietnamese'}
            </Button>
          </div>
          
          <div>
            <Label htmlFor="description">Description (English) <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              placeholder="Describe the job responsibilities, requirements, and other details."
              {...register('description')}
              className="mt-1"
              rows={5}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          {showVietnamese && (
            <div>
              <Label htmlFor="vietnameseDescription">Description (Vietnamese)</Label>
              <Textarea
                id="vietnameseDescription"
                placeholder="Mô tả trách nhiệm công việc, yêu cầu và các chi tiết khác."
                {...register('vietnameseDescription')}
                className="mt-1"
                rows={5}
              />
            </div>
          )}
        </div>
        
        <Separator />
        
        {/* Job Requirements and Specialties */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Industry & Specialties</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
              {Object.keys(beautySpecialties).map(industry => (
                <div key={industry} className="relative">
                  <Button
                    type="button"
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    className={`w-full h-full min-h-[60px] p-2 flex flex-col items-center justify-center text-xs sm:text-sm ${
                      selectedIndustry === industry ? 'border-primary border-2' : ''
                    }`}
                    onClick={() => handleIndustrySelect(industry as IndustryType)}
                  >
                    <span className="text-center">{industry.charAt(0).toUpperCase() + industry.slice(1)}</span>
                  </Button>
                </div>
              ))}
            </div>
            
            {selectedIndustry && (
              <div className="mt-4">
                <Label className="font-medium mb-2 block">Specialties (Select all that apply)</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {beautySpecialties[selectedIndustry].map((specialty: string) => (
                    <div key={specialty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`specialty-${specialty}`}
                        checked={selectedSpecialties.includes(specialty)}
                        onCheckedChange={() => handleSpecialtyToggle(specialty)}
                      />
                      <Label htmlFor={`specialty-${specialty}`} className="cursor-pointer text-sm">
                        {specialty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <Label className="font-medium mb-2 block">Job Requirements</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {commonRequirements.map(requirement => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Controller
                    name="requirements"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={`req-${requirement}`}
                        checked={(field.value || []).includes(requirement)}
                        onCheckedChange={() => handleRequirementToggle(requirement)}
                      />
                    )}
                  />
                  <Label htmlFor={`req-${requirement}`} className="cursor-pointer text-sm">
                    {requirement}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          
          <div>
            <Label htmlFor="contactEmail">Contact Email <span className="text-red-500">*</span></Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="e.g., hiring@salon.com"
              {...register('contactEmail')}
              className="mt-1"
            />
            {errors.contactEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              placeholder="e.g., John Smith"
              {...register('contactName')}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              placeholder="e.g., (555) 123-4567"
              {...register('contactPhone')}
              className="mt-1"
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Photo Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Add Photos (Optional)</h2>
          <p className="text-gray-500 text-sm">
            Upload up to {maxPhotos} photos of your salon, workspace, or team.
          </p>
          
          <PhotoUploader
            files={photoUploads}
            onChange={setPhotoUploads}
            maxFiles={maxPhotos}
            accept="image/*"
          />
        </div>
        
        <div className="flex justify-between pt-6">
          {onBack ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default JobForm;
