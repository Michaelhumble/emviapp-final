
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobFormValues } from './jobFormSchema';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
// TODO: Import PhotoUploader component once it's implemented
// import PhotoUploader from '@/components/posting/PhotoUploader';

// Function to convert text with newlines or commas to array
const convertTextToArray = (text: string | undefined): string[] => {
  if (!text) return [];
  // Replace commas with newlines then split by newline
  return text.replace(/,/g, '\n').split('\n').filter(item => item.trim() !== '');
};

// Function to convert array to formatted text
const convertToFormattedText = (arr: string[] | undefined): string => {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join('\n');
};

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
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
}) => {
  const [showVietnameseSection, setShowVietnameseSection] = useState(showVietnameseByDefault);
  
  const form = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      location: '',
      jobType: 'full-time',
      experience_level: 'entry',
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      requirements: [],
      specialties: [],
    },
  });
  
  // Effect to set form values when initialValues change
  useEffect(() => {
    if (initialValues) {
      // Handle specialty and requirements fields - convert arrays to formatted text if needed
      const formattedSpecialties = Array.isArray(initialValues.specialties) 
        ? convertToFormattedText(initialValues.specialties) 
        : initialValues.specialties;
      
      const formattedRequirements = Array.isArray(initialValues.requirements)
        ? convertToFormattedText(initialValues.requirements)
        : initialValues.requirements;
      
      form.reset({
        ...initialValues,
        specialties: formattedSpecialties,
        requirements: formattedRequirements,
      });
      
      if (initialValues.vietnameseDescription) {
        setShowVietnameseSection(true);
      }
    }
  }, [initialValues, form]);
  
  const handleFormSubmit = form.handleSubmit((data) => {
    // Convert requirements and specialties to arrays if they're strings
    const requirements = typeof data.requirements === 'string' 
      ? convertTextToArray(data.requirements)
      : data.requirements || [];
    
    const specialties = typeof data.specialties === 'string'
      ? convertTextToArray(data.specialties)
      : data.specialties || [];

    // Prepare the final data object with proper types
    const finalData: JobFormValues = {
      ...data,
      requirements,
      specialties,
      title: data.title || '', // Ensure required fields have values
      location: data.location || '',
      contactEmail: data.contactEmail || '',
    };
    
    onSubmit(finalData);
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Job Basics Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Job Details</h3>
            
            {/* Job Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Experienced Nail Technician" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Job Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State or Full Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Job Type */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {/* Experience Level */}
            <FormField
              control={form.control}
              name="experience_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="experienced">Experienced</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            {/* Compensation Details */}
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $25-35/hr plus tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Salary Range */}
            <FormField
              control={form.control}
              name="salary_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $50,000-70,000/year" {...field} />
                  </FormControl>
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
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the position, responsibilities, and what you're looking for" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Vietnamese Description - Conditional Rendering */}
            <div className="space-y-2">
              {!showVietnameseSection ? (
                <Button 
                  type="button" 
                  onClick={() => setShowVietnameseSection(true)} 
                  variant="outline"
                  className="w-full"
                >
                  + Add Vietnamese Description
                </Button>
              ) : (
                <FormField
                  control={form.control}
                  name="vietnameseDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vietnamese Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả công việc bằng tiếng Việt" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {/* Requirements */}
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List requirements, one per line" 
                      className="min-h-[120px] py-3 leading-relaxed" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each requirement on a new line or separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Specialties */}
            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List specialties needed, one per line" 
                      className="min-h-[120px] py-3 leading-relaxed" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each specialty on a new line or separated by commas
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            {/* Contact Email */}
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email for applications" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Contact Name */}
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact person's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Contact Phone */}
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Photo Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Photos</h3>
            <div className="mt-2">
              {/* TODO: Replace with actual PhotoUploader once component is available */}
              <p className="text-gray-600 text-sm">Photo upload functionality coming soon</p>
              {/* <PhotoUploader 
                files={photoUploads}
                onFilesChange={setPhotoUploads}
                maxFiles={1}
              /> */}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {onBack && (
              <Button 
                type="button" 
                onClick={onBack} 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            )}
            <Button 
              type="submit" 
              className="flex-1 flex items-center gap-2 justify-center" 
              disabled={isSubmitting}
            >
              Continue
              <ChevronRight size={16} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default JobForm;
