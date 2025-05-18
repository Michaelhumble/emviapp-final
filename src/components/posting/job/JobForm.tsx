import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
// TODO: Create or import PhotoUploader component
// import PhotoUploader from '@/components/posting/PhotoUploader';
import { JobFormValues } from './jobFormSchema';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';
import { MultiSelect } from '@/components/ui/multi-select';
import { Separator } from '@/components/ui/separator';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads?: File[];
  setPhotoUploads?: (files: File[]) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
}

// Utility functions for converting between text and arrays
const convertTextToArray = (text: string): string[] => {
  if (!text) return [];
  return text.split(/[\n,]/).map(item => item.trim()).filter(Boolean);
};

const convertToFormattedText = (arr: string[] | undefined): string => {
  if (!arr || arr.length === 0) return '';
  return arr.join('\n');
};

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads = [],
  setPhotoUploads = () => {},
  isSubmitting = false,
  initialValues,
  onBack,
  showVietnameseByDefault = false,
  isCustomTemplate = false,
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [requirementsText, setRequirementsText] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');

  // Define the form schema
  const formSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().optional(),
    vietnameseDescription: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    compensation_details: z.string().optional(),
    salary_range: z.string().optional(),
    jobType: z.enum(['full-time', 'part-time', 'contract', 'temporary', 'commission']),
    experience_level: z.enum(['entry', 'intermediate', 'experienced', 'senior']),
    contactEmail: z.string().email("Please enter a valid email address"),
    contactName: z.string().optional(),
    contactPhone: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    specialties: z.array(z.string()).optional(),
    templateType: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      vietnameseDescription: initialValues?.vietnameseDescription || '',
      location: initialValues?.location || '',
      compensation_details: initialValues?.compensation_details || '',
      salary_range: initialValues?.salary_range || '',
      jobType: initialValues?.jobType || 'full-time',
      experience_level: initialValues?.experience_level || 'experienced',
      contactEmail: initialValues?.contactEmail || '',
      contactName: initialValues?.contactName || '',
      contactPhone: initialValues?.contactPhone || '',
      requirements: initialValues?.requirements || [],
      specialties: initialValues?.specialties || [],
      templateType: initialValues?.templateType || '',
    }
  });

  useEffect(() => {
    if (initialValues?.requirements) {
      setRequirementsText(convertToFormattedText(initialValues.requirements));
    }
    if (initialValues?.specialties) {
      setSpecialtiesText(convertToFormattedText(initialValues.specialties));
    }
  }, [initialValues]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Convert requirements and specialties from text to arrays
    const formData = {
      ...data,
      requirements: convertTextToArray(requirementsText),
      specialties: convertTextToArray(specialtiesText),
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Info Tab */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="compensation">Compensation</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
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
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Houston, TX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the job responsibilities, qualifications, and other details..." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vietnamese Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Mô tả công việc bằng tiếng Việt (nếu có)..." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Requirements (Optional)</FormLabel>
              <Textarea
                placeholder="Enter each requirement on a new line..."
                className="min-h-[100px]"
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
              />
            </div>
            
            <div>
              <FormLabel>Specialties (Optional)</FormLabel>
              <Textarea
                placeholder="Enter each specialty on a new line..."
                className="min-h-[100px]"
                value={specialtiesText}
                onChange={(e) => setSpecialtiesText(e.target.value)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="compensation" className="space-y-4">
            <FormField
              control={form.control}
              name="salary_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $50,000 - $60,000 per year" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the compensation structure, benefits, commission rates, etc..." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Smith" {...field} />
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
                  <FormLabel>Contact Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. contact@example.com" {...field} />
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
                  <FormLabel>Contact Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. (123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>
        
        <Separator className="my-6" />
        
        <div className="flex justify-between mt-8">
          {onBack && (
            <Button type="button" variant="outline" onClick={onBack}>
              Back to Templates
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Continue to Preview & Payment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
