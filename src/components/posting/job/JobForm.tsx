
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { getJobTemplate } from '@/utils/jobTemplates';
// Remove the PhotoUpload import that's causing issues

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: JobFormValues;
  industry?: string;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  defaultValues,
  industry = "nails" // Default to nails industry if none specified
}) => {
  const { user } = useAuth();
  const [selectedIndustry, setSelectedIndustry] = useState(industry);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  
  // Get template based on industry and user data
  const templateValues = getJobTemplate(selectedIndustry, {
    phoneNumber: user?.phoneNumber,
    email: user?.email
  });
  
  // Initialize form with default values from props (for editing) or template values (for new posts)
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || templateValues
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  // Update form when industry changes
  useEffect(() => {
    if (!defaultValues && selectedIndustry) {
      const template = getJobTemplate(selectedIndustry, {
        phoneNumber: user?.phoneNumber,
        email: user?.email
      });
      
      // Apply template values to form
      Object.entries(template).forEach(([key, value]) => {
        if (value) {
          setValue(key as keyof JobFormValues, value);
        }
      });
    }
  }, [selectedIndustry, user, defaultValues, setValue]);

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setRequirements([...requirements, currentRequirement.trim()]);
      setCurrentRequirement('');
      
      // Update the form value
      const updatedRequirements = [...requirements, currentRequirement.trim()];
      setValue('requirements', updatedRequirements);
    }
  };

  // Handle industry change
  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Job Details</h3>
          
          {/* Add Industry Selection */}
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nails">Nails</SelectItem>
                <SelectItem value="hair">Hair</SelectItem>
                <SelectItem value="tattoo">Tattoo</SelectItem>
                <SelectItem value="eyebrowLash">Eyebrow & Lash</SelectItem>
                <SelectItem value="massage">Massage</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">Select industry for smart job template suggestions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <Input type="text" id="title" {...register("title")} />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <Input type="text" id="location" {...register("location")} />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
            <Textarea id="description" rows={4} {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary Range (Optional)</label>
              <Input type="text" id="salary" {...register("salary")} />
            </div>
            
            <div>
              <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
              <Select defaultValue={watch('jobType')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email (Optional)</label>
              <Input type="email" id="contactEmail" {...register("contactEmail")} />
              {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail.message}</p>}
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
              <Input type="tel" id="phoneNumber" {...register("phoneNumber")} />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Additional Details</h3>
          
          <div>
            <label htmlFor="jobSummary" className="block text-sm font-medium text-gray-700">Job Summary (Optional)</label>
            <Textarea id="jobSummary" rows={2} {...register("jobSummary")} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Requirements (Optional)</label>
            {/* Map through requirements here */}
            <div className="flex items-center space-x-2 mb-2">
              <Input 
                type="text" 
                placeholder="Enter requirement" 
                className="flex-1" 
                value={currentRequirement}
                onChange={(e) => setCurrentRequirement(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addRequirement();
                  }
                }}
              />
              <Button type="button" variant="outline" size="icon" onClick={addRequirement}>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            
            {requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 my-2">
                {requirements.map((req, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-800">
                    {req}
                  </Badge>
                ))}
              </div>
            )}
            
            <Button type="button" variant="secondary" onClick={addRequirement}>
              Add Requirement
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Salon Photos</h3>
          <p className="text-sm text-gray-500">
            Showcase your salon's vibe. First photo will be featured.
          </p>
          
          {/* Replace PhotoUpload component with a placeholder or comment */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-500">Photo upload functionality temporarily unavailable</p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Post Job"}
        </Button>
      </form>
    </Form>
  );
};
