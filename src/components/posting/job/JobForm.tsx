
import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronLeft, Upload } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { MultiSelect } from '@/components/ui/multi-select';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';
import { Label } from '@/components/ui/label';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  initialValues?: JobFormValues;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  showVietnameseByDefault?: boolean;
  onBack?: () => void;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  initialValues,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  showVietnameseByDefault = false,
  onBack,
}) => {
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const methods = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      compensation_details: '',
      salary_range: '',
      jobType: 'full-time',
      experience_level: 'experienced',
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      specialties: [],
      requirements: [],
    },
  });
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = methods;
  
  // Initialize form with initial values if provided
  useEffect(() => {
    if (initialValues) {
      Object.entries(initialValues).forEach(([key, value]) => {
        if (value !== undefined) {
          // @ts-ignore - Dynamic setting of values
          setValue(key, value);
        }
      });
    }
  }, [initialValues, setValue]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Limit to 5 images
    if (photoUploads.length + files.length > 5) {
      toast.error("You can only upload a maximum of 5 images");
      return;
    }
    
    const newFiles = Array.from(files);
    setPhotoUploads(prev => [...prev, ...newFiles]);
  };
  
  const handleRemovePhoto = (index: number) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };
  
  // Fix: Proper form submission handler with correct types
  const onFormSubmit = handleSubmit((data: JobFormValues) => {
    onSubmit(data);
  });
  
  return (
    <FormProvider {...methods}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-playfair font-medium">Post a New Job</h2>
          {onBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isSubmitting}
              className="flex items-center gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Templates
            </Button>
          )}
        </div>
        
        <Form {...methods}>
          <form onSubmit={onFormSubmit} className="space-y-8">
            {/* Basic Job Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Job Details</h3>
              
              <FormField
                control={control}
                name="title"
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Nail Technician" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
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
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
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
                  control={control}
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
              </div>
            </div>
            
            {/* Job Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Job Description</h3>
              
              <FormField
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (English)*</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the job responsibilities, benefits, and any other details..." 
                        className="min-h-[150px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showVietnamese" 
                  checked={showVietnamese} 
                  onChange={() => setShowVietnamese(!showVietnamese)}
                  className="mr-2" 
                />
                <label htmlFor="showVietnamese" className="text-sm">Add Vietnamese Description (Recommended)</label>
              </div>
              
              {showVietnamese && (
                <FormField
                  control={control}
                  name="vietnameseDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Vietnamese)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Mô tả công việc bằng tiếng Việt..." 
                          className="min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            {/* Compensation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Compensation</h3>
              
              <FormField
                control={control}
                name="salary_range"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. $50,000 - $60,000 per year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="compensation_details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Compensation Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Commission structure, tips, benefits, etc." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Requirements & Specialties */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Requirements & Specialties</h3>
              
              <Controller
                control={control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={requirementOptions}
                        selected={field.value || []}
                        onChange={field.onChange}
                        placeholder="Select job requirements"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Controller
                control={control}
                name="specialties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialties</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={specialtyOptions}
                        selected={field.value || []}
                        onChange={field.onChange}
                        placeholder="Select specialties"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              
              <FormField
                control={control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="contactEmail"
                rules={{ 
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email"
                  } 
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Photos (Optional)</h3>
              
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Upload className="h-10 w-10 text-gray-400" />
                  <div className="text-center">
                    <Label 
                      htmlFor="photo-upload" 
                      className="cursor-pointer inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                    >
                      Select Images
                    </Label>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="mt-2 text-sm text-gray-500">Upload up to 5 photos of your salon, team, or workspace</p>
                  </div>
                </div>
              </div>
              
              {/* Photo previews */}
              {photoUploads.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="h-24 w-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
              >
                {isSubmitting ? "Processing..." : "Continue to Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </FormProvider>
  );
};

export default JobForm;

