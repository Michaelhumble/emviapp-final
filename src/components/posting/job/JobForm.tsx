import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { JobFormValues } from './jobFormSchema';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';
import { Separator } from '@/components/ui/separator';
import PhotoUploader from '@/components/posting/PhotoUploader';
import templateGradients from './luxuryGradients';

// Helper utility functions since they were not found in imported module
const convertTextToArray = (text: string): string[] => {
  if (!text) return [];
  // Split by newlines or commas and filter out empty items
  return text.split(/[\n,]+/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

const convertToFormattedText = (items: string[] | undefined): string => {
  if (!items || items.length === 0) return '';
  return items.join('\n');
};

interface JobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[]) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: (data: JobFormValues) => void;
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
  isCustomTemplate = false
}) => {
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const defaultValues: JobFormValues = initialValues || {
    title: '',
    description: '',
    vietnameseDescription: '',
    location: '',
    jobType: 'full-time',
    compensation_details: '',
    salary_range: '',
    experience_level: 'entry',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    specialties: [],
    requirements: [],
  };

  const form = useForm<JobFormValues>({
    defaultValues: defaultValues,
    mode: 'onSubmit'
  });

  useEffect(() => {
    if (initialValues) {
      // Convert arrays back to multiline text for form display
      form.reset({
        ...initialValues,
        requirements: Array.isArray(initialValues.requirements) 
          ? convertToFormattedText(initialValues.requirements)
          : initialValues.requirements,
        specialties: Array.isArray(initialValues.specialties)
          ? convertToFormattedText(initialValues.specialties)
          : initialValues.specialties
      });
    }
  }, [initialValues, form]);

  const onSubmit = (data: JobFormValues) => {
    // Process multiline requirements and specialties into arrays
    const formattedData = {
      ...data,
      requirements: Array.isArray(data.requirements) 
        ? data.requirements 
        : convertTextToArray(data.requirements as string),
      specialties: Array.isArray(data.specialties) 
        ? data.specialties 
        : convertTextToArray(data.specialties as string)
    };
    
    console.log('Submitting form data:', formattedData);
    onBack ? onBack(formattedData) : onSubmit(formattedData, photoUploads);
  };

  const handlePhotoUpload = (files: File[]) => {
    setPhotoUploads(files);
  };

  const handleToggleVietnamese = () => {
    setShowVietnamese(!showVietnamese);
  };

  const templateGradient = initialValues ? templateGradients[initialValues.templateType || 'custom'] : templateGradients['custom'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className={`bg-white shadow-md rounded-lg ${templateGradient}`}>
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Job Details</h2>
              <p className="text-gray-600">Enter the details about the job you're offering.</p>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nail Technician" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Describe the job responsibilities and requirements" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showVietnamese && (
              <FormField
                control={form.control}
                name="vietnameseDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vietnamese Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả công việc bằng tiếng Việt" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!isCustomTemplate && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="showVietnamese">Show Vietnamese Description</Label>
                <Switch
                  id="showVietnamese"
                  checked={showVietnamese}
                  onCheckedChange={handleToggleVietnamese}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., City, State" {...field} />
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
                        <SelectValue placeholder="Select a job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Competitive salary, benefits" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $40,000 - $60,000 per year" {...field} />
                  </FormControl>
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
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="bg-white shadow-md rounded-lg">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="text-gray-600">Enter your contact information for applicants.</p>
            </div>

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
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
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="e.g., john.doe@example.com" {...field} />
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
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="bg-white shadow-md rounded-lg">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Specialties and Requirements</h2>
              <p className="text-gray-600">List the required and desired skills for the job.</p>
            </div>

            <FormField
              control={form.control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the required specialties, separated by commas or new lines"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List the job requirements, separated by commas or new lines"
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <Card className="bg-white shadow-md rounded-lg">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Photo Upload</h2>
              <p className="text-gray-600">Upload photos related to the job or salon.</p>
            </div>

            <PhotoUploader photos={photoUploads} onPhotoUpload={handlePhotoUpload} />
          </div>
        </Card>

        <Separator className="my-4" />

        <div className="flex justify-between">
          {onBack && (
            <Button variant="outline" onClick={() => onBack(form.getValues())}>
              Back
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
