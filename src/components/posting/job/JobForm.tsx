
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { jobFormSchema, jobTemplates, JOB_TYPES, YES_LADDER_OPTIONS } from './jobFormSchema';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<JobFormValues>;
  industry?: string;
  userProfile?: any;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  defaultValues = {},
  industry = "nails",
  userProfile
}) => {
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Use our simplified hook for now
  const { isLoading: isPolishing, polishedVersions, generateVersions } = usePolishedDescriptions();

  // Initialize the form with default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues.title || '',
      description: defaultValues.description || '',
      location: userProfile?.location || defaultValues.location || '',
      jobType: defaultValues.jobType || 'full-time',
      salary: defaultValues.salary || '',
      contactEmail: userProfile?.email || defaultValues.contactEmail || '',
      phoneNumber: userProfile?.phone || defaultValues.phoneNumber || '',
      jobSummary: defaultValues.jobSummary || '',
      heartfeltMessage: defaultValues.heartfeltMessage || '',
      isUrgent: defaultValues.isUrgent || false,
      yesLadderOptions: defaultValues.yesLadderOptions || [],
    }
  });

  const handleSelectTemplate = (templateId: string) => {
    if (!templateId || templateId === 'custom') {
      setSelectedTemplate(undefined);
      return;
    }
    
    setSelectedTemplate(templateId);
    const template = jobTemplates.find(t => t.id === templateId);
    
    if (template) {
      form.setValue('title', template.title);
      form.setValue('description', template.description);
      form.setValue('jobSummary', template.summary || '');
      // Don't override user's location or contact info
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) return;
    
    const newFiles = Array.from(files);
    setPhotoUploads((prev) => [...prev, ...newFiles]);
    
    // Upload to Supabase
    for (const file of newFiles) {
      setUploadingImage(true);
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `job-photos/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('nails')
          .upload(filePath, file);
          
        if (uploadError) {
          toast.error('Error uploading image');
          console.error('Upload error:', uploadError);
          continue;
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('nails')
          .getPublicUrl(filePath);
          
        setImageUrls(prev => [...prev, publicUrl]);
      } catch (error) {
        toast.error('Error uploading image');
        console.error('Upload error:', error);
      }
    }
    setUploadingImage(false);
    
    // Reset the input
    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setPhotoUploads((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePolishDescription = async () => {
    const currentDescription = form.getValues('description');
    if (!currentDescription) {
      toast.error('Please add a job description first');
      return;
    }
    
    await generateVersions(currentDescription);
    setIsPolishModalOpen(true);
  };

  const handleSelectPolishedVersion = (description: string) => {
    form.setValue('description', description);
    setIsPolishModalOpen(false);
  };

  const handleFormSubmit = (values: JobFormValues) => {
    const finalValues = {
      ...values,
      imageUrls
    };
    onSubmit(finalValues);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* 1. Start with a Template */}
          <div className="bg-muted/30 p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Start with a Template</h2>
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose a starting template</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleSelectTemplate(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {jobTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.label}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom (Start from scratch)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          
          {/* 2. Basic Job Information */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">Basic Job Information</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nail Technician" {...field} />
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
                    <FormLabel>Job Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Los Angeles, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary/Compensation (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $25-30/hr + tips" {...field} />
                    </FormControl>
                    <FormDescription>Posts with salary info get 30% more applications</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>🔥 Mark as Urgent</FormLabel>
                      <FormDescription>
                        Adds an urgency badge to your listing
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* 3. Job Details */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">Job Details</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="jobSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Summary (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Quick summary of the position" {...field} />
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
                    <div className="flex justify-between items-center">
                      <FormLabel>Job Description *</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handlePolishDescription}
                        disabled={isPolishing || !field.value}
                        className="flex items-center gap-1"
                      >
                        {isPolishing ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                        )}
                        Polish with AI
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the position, responsibilities, and requirements..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* 4. Photos */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">📸 Photos (Optional)</h2>
            <p className="text-sm text-gray-500">
              Adding photos can increase applications by up to 35%.
            </p>
            
            <div className="grid gap-5">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
              </div>
              
              {/* Image preview */}
              {(photoUploads.length > 0 || imageUrls.length > 0) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {photoUploads.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  {imageUrls.map((url, index) => (
                    <div key={`url-${index}`} className="relative group">
                      <img
                        src={url}
                        alt={`Upload ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index + photoUploads.length)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {uploadingImage && (
                <div className="flex items-center justify-center my-2">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  <span className="text-sm">Uploading...</span>
                </div>
              )}
            </div>
          </div>
          
          {/* 5. Yes Ladder */}
          <div className="bg-muted/20 p-6 rounded-lg border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">☀️ Trust Building (Optional)</h2>
            <p className="text-sm text-gray-500">
              These checkboxes signal you're a great employer without making promises.
            </p>
            
            <FormField
              control={form.control}
              name="yesLadderOptions"
              render={() => (
                <FormItem>
                  <div className="grid gap-3">
                    {YES_LADDER_OPTIONS.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="yesLadderOptions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          {/* 6. Contact Info */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold">Contact Info</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@yoursalon.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* 7. Boost Your Listing */}
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 p-6 rounded-lg border border-amber-200 space-y-4">
            <h2 className="text-xl font-semibold">💎 Boost Your Listing</h2>
            <p className="text-sm">
              Select a plan on the next page to highlight your job post and reach more qualified artists.
            </p>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-between">
            <Button type="submit" className="w-full" disabled={isSubmitting} size="lg">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>Preview Post</>
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        originalDescription={form.getValues('description')}
        polishedVersions={polishedVersions}
        onSelectVersion={handleSelectPolishedVersion}
      />
    </>
  );
};

export default JobForm;
