
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { IndustryType } from '@/utils/posting/types';
import { beautySpecialties, commonRequirements, getAllSpecialties } from '@/data/specialties';
import MultiSelect, { Option } from '@/components/ui/multi-select';
import { cn } from '@/lib/utils';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  initialValues?: JobFormValues;
  isSubmitting?: boolean;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

// Helper function to convert string array to Option array
const mapToOptions = (items: string[]): Option[] => {
  return items.map(item => ({ label: item, value: item }));
};

// Helper function to convert Option array to string array
const mapFromOptions = (options: Option[]): string[] => {
  return options.map(option => option.value);
};

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  initialValues,
  isSubmitting = false,
  photoUploads,
  setPhotoUploads,
  onBack,
  showVietnameseByDefault = false,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | null>(null);
  const [jobType, setJobType] = useState<"full-time" | "part-time" | "contract" | "temporary" | "commission">(
    initialValues?.jobType || 'full-time'
  );
  const [experienceLevel, setExperienceLevel] = useState<"entry" | "intermediate" | "experienced" | "senior">(
    initialValues?.experience_level || 'experienced'
  );
  const [includeVietnamese, setIncludeVietnamese] = useState(showVietnameseByDefault);
  
  // Convert string arrays to Option arrays for the MultiSelect component
  const [selectedSpecialties, setSelectedSpecialties] = useState<Option[]>(
    initialValues?.specialties ? mapToOptions(initialValues.specialties) : []
  );
  const [selectedRequirements, setSelectedRequirements] = useState<Option[]>(
    initialValues?.requirements ? mapToOptions(initialValues.requirements) : []
  );
  
  // Available specialties based on selected industry
  const [availableSpecialties, setAvailableSpecialties] = useState<Option[]>([]);
  
  // All common requirements as options
  const requirementOptions = mapToOptions(commonRequirements);

  // Form setup with default values
  const form = useForm<JobFormValues>({
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      jobType: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      contactName: initialValues?.contactName || '',
      contactEmail: initialValues?.contactEmail || '',
      contactPhone: initialValues?.contactPhone || '',
      specialties: initialValues?.specialties || [],
      requirements: initialValues?.requirements || [],
    }
  });

  // Update specialties when industry changes
  useEffect(() => {
    if (selectedIndustry && beautySpecialties[selectedIndustry]) {
      setAvailableSpecialties(mapToOptions(beautySpecialties[selectedIndustry]));
    } else {
      // If no industry is selected, show all specialties
      setAvailableSpecialties(mapToOptions(getAllSpecialties()));
    }
  }, [selectedIndustry]);

  // For handling form submission
  const handleFormSubmit = (data: JobFormValues) => {
    // Convert Option arrays back to string arrays
    const formData: JobFormValues = {
      ...data,
      jobType,
      experience_level: experienceLevel,
      specialties: mapFromOptions(selectedSpecialties),
      requirements: mapFromOptions(selectedRequirements),
    };
    onSubmit(formData);
  };

  // Handler for job type selection with type validation
  const handleJobTypeChange = (value: string) => {
    const allowedJobTypes = ["full-time", "part-time", "contract", "temporary", "commission"] as const;
    if (allowedJobTypes.includes(value as any)) {
      setJobType(value as typeof allowedJobTypes[number]);
    }
  };

  // Handler for experience level selection with type validation
  const handleExperienceLevelChange = (value: string) => {
    const allowedExperienceLevels = ["entry", "intermediate", "experienced", "senior"] as const;
    if (allowedExperienceLevels.includes(value as any)) {
      setExperienceLevel(value as typeof allowedExperienceLevels[number]);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleFormSubmit)}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Job Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <FormLabel htmlFor="title">Job Title</FormLabel>
            <Input
              id="title"
              placeholder="e.g. Experienced Nail Technician Needed"
              {...form.register('title', { required: true })}
            />
          </div>

          {/* Description Tabs (English/Vietnamese) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <FormLabel>Job Description</FormLabel>
              <div className="flex items-center">
                <Checkbox 
                  id="include-vietnamese"
                  checked={includeVietnamese}
                  onCheckedChange={(checked) => setIncludeVietnamese(checked === true)}
                />
                <label htmlFor="include-vietnamese" className="ml-2 text-sm text-gray-600">
                  Include Vietnamese Translation
                </label>
              </div>
            </div>
            
            <Tabs defaultValue="english" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="english">English</TabsTrigger>
                {includeVietnamese && <TabsTrigger value="vietnamese">Vietnamese</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="english">
                <Textarea
                  placeholder="Describe the job, responsibilities, and ideal candidate..."
                  className="min-h-32"
                  {...form.register('description')}
                />
              </TabsContent>
              
              {includeVietnamese && (
                <TabsContent value="vietnamese">
                  <Textarea
                    placeholder="Vietnamese translation of job description..."
                    className="min-h-32"
                    {...form.register('vietnameseDescription')}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              placeholder="e.g. Los Angeles, CA"
              {...form.register('location', { required: true })}
            />
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <FormLabel htmlFor="jobType">Job Type</FormLabel>
            <Select value={jobType} onValueChange={handleJobTypeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <FormLabel htmlFor="experienceLevel">Experience Level</FormLabel>
            <Select value={experienceLevel} onValueChange={handleExperienceLevelChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="experienced">Experienced</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Industry Selector */}
          <div className="space-y-2">
            <FormLabel htmlFor="industry">Industry (for specialized requirements)</FormLabel>
            <Select 
              value={selectedIndustry || ''} 
              onValueChange={(value) => setSelectedIndustry(value as IndustryType || null)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an industry (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nails">Nail Salon</SelectItem>
                <SelectItem value="hair">Hair Salon</SelectItem>
                <SelectItem value="lashes">Lash & Brow</SelectItem>
                <SelectItem value="massage">Massage & Spa</SelectItem>
                <SelectItem value="barber">Barber Shop</SelectItem>
                <SelectItem value="makeup">Makeup Artist</SelectItem>
                <SelectItem value="tattoo">Tattoo Artist</SelectItem>
                <SelectItem value="skincare">Skincare Specialist</SelectItem>
                <SelectItem value="brows">Eyebrow Specialist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Specialties */}
          <div className="space-y-2">
            <FormLabel>Specialties Required</FormLabel>
            <MultiSelect
              options={availableSpecialties}
              selected={selectedSpecialties.map(o => o.value)}
              onChange={(values) => {
                const selectedOptions = availableSpecialties.filter(o => values.includes(o.value));
                setSelectedSpecialties(selectedOptions);
              }}
              placeholder="Select specialties"
            />
          </div>
          
          {/* Requirements */}
          <div className="space-y-2">
            <FormLabel>Job Requirements</FormLabel>
            <MultiSelect
              options={requirementOptions}
              selected={selectedRequirements.map(o => o.value)}
              onChange={(values) => {
                const selectedOptions = requirementOptions.filter(o => values.includes(o.value));
                setSelectedRequirements(selectedOptions);
              }}
              placeholder="Select requirements"
            />
          </div>

          {/* Compensation */}
          <div className="space-y-2">
            <FormLabel htmlFor="salary_range">Salary/Rate Range (Optional)</FormLabel>
            <Input
              id="salary_range"
              placeholder="e.g. $20-25/hr or $50k-60k/year"
              {...form.register('salary_range')}
            />
          </div>

          <div className="space-y-2">
            <FormLabel htmlFor="compensation_details">Compensation Details (Optional)</FormLabel>
            <Textarea
              id="compensation_details"
              placeholder="Additional details about compensation, benefits, commission structure, etc."
              {...form.register('compensation_details')}
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="space-y-2">
              <FormLabel htmlFor="contactName">Contact Name (Optional)</FormLabel>
              <Input
                id="contactName"
                placeholder="Name of the contact person"
                {...form.register('contactName')}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="contactEmail">Contact Email</FormLabel>
              <Input
                id="contactEmail"
                placeholder="Email address for applications"
                type="email"
                {...form.register('contactEmail', { required: true })}
              />
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="contactPhone">Contact Phone (Optional)</FormLabel>
              <Input
                id="contactPhone"
                placeholder="Phone number"
                type="tel"
                {...form.register('contactPhone')}
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          {onBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              Back
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className={cn(onBack ? "ml-auto" : "")}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default JobForm;
