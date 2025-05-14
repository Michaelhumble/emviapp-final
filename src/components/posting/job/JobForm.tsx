
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Sparkles, Upload, X } from 'lucide-react';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { JOB_TEMPLATES, JOB_TYPES, YES_LADDER_OPTIONS } from './jobFormConstants';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const { toast } = useToast();
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const { generatePolishedDescriptions, descriptions, isLoading, error } = usePolishedDescriptions();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      template: '',
      title: '',
      type: '',
      location: '',
      description: '',
      isUrgent: false,
      contactEmail: '',
      contactPhone: '',
      flexibleTime: false,
      provideLunch: false,
      reviewBonuses: false,
      qualityProducts: false,
      growthOpportunity: false,
      payWeekly: false,
      ...defaultValues
    }
  });

  const watchedDescription = form.watch('description');
  
  // Update photo previews when uploads change
  useEffect(() => {
    // Clean up previous preview URLs
    photoPreviewUrls.forEach(url => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });

    // Generate new preview URLs
    const newPreviewUrls = photoUploads.map(file => URL.createObjectURL(file));
    setPhotoPreviewUrls(newPreviewUrls);

    // Cleanup on unmount
    return () => {
      newPreviewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [photoUploads]);

  const handleFormSubmit = (values: JobFormValues) => {
    onSubmit(values);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const newFiles: File[] = [];
    const errors: string[] = [];
    
    // Check if adding these files would exceed the limit
    if (photoUploads.length + files.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${MAX_FILES} photos.`,
        variant: "destructive"
      });
      return;
    }
    
    // Validate each file
    Array.from(files).forEach(file => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, WEBP, and HEIC images are allowed.`);
      } else if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File size exceeds 5MB limit.`);
      } else {
        newFiles.push(file);
      }
    });
    
    // Show errors if any
    if (errors.length > 0) {
      toast({
        title: "Error uploading files",
        description: errors.join('\n'),
        variant: "destructive"
      });
    }
    
    // Add valid files to state
    if (newFiles.length > 0) {
      setPhotoUploads(prev => [...prev, ...newFiles]);
    }
    
    // Clear the input value so the same file can be selected again if needed
    e.target.value = '';
  };

  const removePhoto = (indexToRemove: number) => {
    setPhotoUploads(prevUploads => prevUploads.filter((_, index) => index !== indexToRemove));
  };

  const uploadPhotosToSupabase = async () => {
    const uploadPromises = photoUploads.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `job-posts/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('public')
        .upload(filePath, file);
      
      if (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
      
      return filePath;
    });
    
    try {
      const uploadedPaths = await Promise.all(uploadPromises);
      return uploadedPaths;
    } catch (error) {
      console.error('Error uploading files to Supabase:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images. Please try again.",
        variant: "destructive"
      });
      return [];
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(template => template.id === templateId);
    
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title);
      form.setValue('type', selectedTemplate.type);
      form.setValue('description', selectedTemplate.description);
    }
  };

  const handlePolishDescription = async () => {
    const description = form.getValues('description');
    
    if (!description || description.length < 10) {
      toast({
        title: "Description too short",
        description: "Please enter a longer description to polish with AI.",
        variant: "destructive"
      });
      return;
    }
    
    await generatePolishedDescriptions(description);
    setIsPolishModalOpen(true);
  };

  const handleApplyPolishedDescription = (polishedText: string) => {
    form.setValue('description', polishedText);
    setIsPolishModalOpen(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Templates Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Choose a template or start from scratch</h3>
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSelectTemplate(value);
                    }}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {JOB_TEMPLATES.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* Basic Details Section */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Basic Details</h3>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    <Input {...field} placeholder="City, State" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compensation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., $20-25/hr + tips" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Mark as Urgent</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Description Section */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Job Description</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handlePolishDescription}
                disabled={!watchedDescription || watchedDescription.length < 10}
              >
                <Sparkles className="h-4 w-4" />
                Polish with AI
              </Button>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[200px]"
                      placeholder="Describe the job, requirements, and what makes your salon special..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photo Upload Section */}
            <div className="space-y-2">
              <FormLabel>Add Photos (Optional)</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Photo previews */}
                {photoPreviewUrls.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                    <img
                      src={url}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 rounded-full p-1"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3 text-white" />
                    </button>
                  </div>
                ))}
                
                {/* Upload button (only show if under limit) */}
                {photoUploads.length < MAX_FILES && (
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="mt-2 text-xs text-gray-500">Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Max 5 photos, 5MB each. JPG, PNG, WEBP, HEIC formats.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
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
                  <FormLabel>Phone*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Features/Benefits Section */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium">Position Benefits</h3>
            <p className="text-sm text-gray-500">
              Select all that apply to make your job stand out
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {YES_LADDER_OPTIONS.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name={option.id as keyof JobFormValues}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value as boolean}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Continue to Pricing"}
          </Button>
        </form>
      </Form>

      {/* AI Polished Description Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        originalDescription={watchedDescription}
        descriptions={descriptions}
        isLoading={isLoading}
        onApply={handleApplyPolishedDescription}
      />
    </>
  );
};

export default JobForm;
