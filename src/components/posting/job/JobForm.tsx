
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfile } from '@/context/auth/types';
import { 
  jobFormSchema, 
  JobFormValues, 
  JOB_TEMPLATES, 
  JOB_TYPES,
  getTemplateContent
} from './jobFormSchema';
import { useImageUpload } from '@/hooks/useImageUpload';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

// UI Components
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import SectionHeader from '@/components/posting/SectionHeader';

// Icons
import { 
  Sparkles, 
  ImagePlus, 
  X, 
  Loader2, 
  AlertCircle, 
  ArrowRight, 
  Flame 
} from 'lucide-react';

export interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
  userProfile?: UserProfile | null;
  industry?: string;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  userProfile,
  industry = "nails",
  defaultValues
}) => {
  // Setup form with validation schema
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      title: '',
      description: '',
      location: userProfile?.location || '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phone || '',
      jobType: 'full-time',
      jobSummary: '',
      heartfeltMessage: '',
      isUrgent: false,
      weeklyPay: false,
      providesLunch: false,
      latestProducts: false,
      flexibleSchedule: false,
      growthOpportunities: false,
      customerReviewBonuses: false
    }
  });
  
  // Setup hooks for image upload and AI description polishing
  const { uploadMultipleImages, isUploading, uploadError } = useImageUpload();
  const { polishedVersions, generateVersions, isLoading: isGeneratingDescriptions } = usePolishedDescriptions();
  
  // State management
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [isPolishModalOpen, setIsPolishModalOpen] = useState(false);
  const [uploadedPhotoUrls, setUploadedPhotoUrls] = useState<string[]>([]);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll management for template selection
  const titleFieldRef = useRef<HTMLDivElement>(null);

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    const template = getTemplateContent(templateId);
    
    // Update form fields with template values
    form.setValue('title', template.title);
    form.setValue('jobSummary', template.jobSummary);
    form.setValue('description', template.description);
    if (template.salary) form.setValue('salary', template.salary);
    
    // Scroll to title field for user to start editing
    setTimeout(() => {
      titleFieldRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handle photo uploads
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    const totalFiles = [...photoUploads, ...newFiles];
    
    // Limit to 5 photos
    if (totalFiles.length > 5) {
      alert('You can upload a maximum of 5 photos');
      return;
    }
    
    setPhotoUploads(totalFiles);
    
    // Generate preview URLs
    const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
    setPhotoPreviewUrls([...photoPreviewUrls, ...newPreviewUrls]);
  };

  // Remove a photo from the list
  const handleRemovePhoto = (index: number) => {
    const updatedUploads = [...photoUploads];
    updatedUploads.splice(index, 1);
    setPhotoUploads(updatedUploads);
    
    const updatedPreviews = [...photoPreviewUrls];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPhotoPreviewUrls(updatedPreviews);
  };

  // Handle AI polish for job description
  const handlePolishDescription = () => {
    const description = form.getValues('description');
    if (!description || description.trim().length < 20) {
      form.setError('description', { 
        type: 'manual', 
        message: 'Please enter at least 20 characters to polish description' 
      });
      return;
    }
    
    // Generate AI polished versions
    generateVersions(description);
    setIsPolishModalOpen(true);
  };

  // Select a polished description version
  const handleSelectPolishedVersion = (description: string) => {
    form.setValue('description', description);
    form.clearErrors('description');
    setIsPolishModalOpen(false);
  };

  // Form submission handler
  const handleSubmit = async (values: JobFormValues) => {
    if (photoUploads.length > 0) {
      // Upload photos first if there are any
      const urls = await uploadMultipleImages(photoUploads);
      setUploadedPhotoUrls(urls);
      // Add photo URLs to form data and submit
      onSubmit({ ...values, photoUrls: urls });
    } else {
      // Submit form without photos
      onSubmit(values);
    }
  };

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      photoPreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [photoPreviewUrls]);

  return (
    <div className="py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Section 1: Start with a Template */}
          <div className="space-y-4">
            <SectionHeader 
              title="Start with a Template" 
              emoji="✨" 
              description="Choose a starting point and customize it to fit your needs"
            />
            
            <div className="grid grid-cols-1">
              <Select onValueChange={handleTemplateChange} defaultValue="">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Choose a starting template..." />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 2: Basic Job Information */}
          <div className="space-y-4">
            <SectionHeader 
              title="Basic Job Information" 
              emoji="📝" 
              description="Let talented artists know what position you're offering"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem ref={titleFieldRef}>
                    <FormLabel>Job Title <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Nail Technician, Hair Stylist, Spa Manager" />
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
                    <FormLabel>Job Type <span className="text-red-500">*</span></FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JOB_TYPES.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City, State" />
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
                    <FormLabel className="flex items-center gap-2">
                      Salary/Compensation
                      <Badge variant="outline" className="font-normal text-xs">
                        30% more applications
                      </Badge>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., $25-30/hr, $800-1200/week, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="flex items-center gap-2">
                      Mark as Urgent
                      <Flame className="h-4 w-4 text-orange-500" />
                    </FormLabel>
                    <FormDescription>
                      Adds an urgency badge to attract immediate attention
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

          {/* Section 3: Job Details */}
          <div className="space-y-4">
            <SectionHeader 
              title="Job Details" 
              emoji="📋" 
              description="Provide more information about the position"
            />
            
            <FormField
              control={form.control}
              name="jobSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Summary (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="A brief one-line summary of the position" />
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
                    <FormLabel>Job Description <span className="text-red-500">*</span></FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePolishDescription}
                      disabled={isGeneratingDescriptions || !field.value || field.value.length < 20}
                      className="text-xs gap-1"
                    >
                      {isGeneratingDescriptions ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                      )}
                      Polish with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe the position, responsibilities, and ideal candidate. Include experience required, working hours, and what makes your workplace special."
                      className="min-h-[180px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 4: Photos */}
          <div className="space-y-4">
            <SectionHeader 
              title="Photos (Optional)" 
              emoji="📸" 
              description="Show off your salon space or work environment"
            />
            
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/40 transition-colors">
              <div className="space-y-4">
                <div>
                  <ImagePlus className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag photos here or click to upload (max 5)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Adding photos can increase applications by up to 35%
                  </p>
                </div>
                
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>Select Photos</>
                  )}
                </Button>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>
            
            {uploadError && (
              <div className="text-sm text-red-500 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {uploadError}
              </div>
            )}
            
            {photoPreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {photoPreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={url} 
                      alt={`Preview ${index}`} 
                      className="h-24 w-full object-cover rounded-md border" 
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Yes Ladder (Trust Building) */}
          <div className="space-y-4">
            <SectionHeader 
              title="Your Workplace Benefits (Optional)" 
              emoji="☀️" 
              description="Let artists know what makes your workplace special"
            />
            
            <div className="grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="weeklyPay"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="weeklyPay"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="weeklyPay">
                      We pay weekly — artists appreciate fast pay
                    </Label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="providesLunch"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="providesLunch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="providesLunch">
                      We provide lunch on busy days
                    </Label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="latestProducts"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="latestProducts"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="latestProducts">
                      We use the latest Dip/Gel/Acrylic products
                    </Label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="flexibleSchedule"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flexibleSchedule"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="flexibleSchedule">
                      We're flexible with days off or vacation
                    </Label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="growthOpportunities"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="growthOpportunities"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="growthOpportunities">
                      We give everyone a chance to grow and be seen
                    </Label>
                  </div>
                )}
              />
              
              <FormField
                control={form.control}
                name="customerReviewBonuses"
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customerReviewBonuses"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="customerReviewBonuses">
                      We offer bonuses for great customer reviews
                    </Label>
                  </div>
                )}
              />
            </div>
          </div>

          {/* Section 6: Contact Info */}
          <div className="space-y-4">
            <SectionHeader 
              title="Contact Info" 
              emoji="📞" 
              description="How applicants can reach you"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="your@email.com" />
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
                    <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="(555) 123-4567" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 7: Boost Your Listing */}
          <div className="space-y-4">
            <SectionHeader 
              title="Boost Your Listing" 
              emoji="💎" 
              description="Optional upgrades to increase visibility"
            />
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
              <h4 className="font-medium text-amber-800 mb-2">Looking to attract more applicants?</h4>
              <p className="text-sm text-amber-700 mb-4">You'll be able to select premium visibility options in the next step.</p>
              <div className="space-y-2 text-sm text-amber-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <p>Highlight your listing</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <p>Extended visibility</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <p>Smart Matching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Submission Button */}
          <div className="pt-4 flex justify-end">
            <Button 
              type="submit"
              disabled={isSubmitting || isUploading} 
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Preview
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal
        isOpen={isPolishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        originalDescription={form.getValues('description') || ''}
        polishedVersions={polishedVersions}
        onSelectVersion={handleSelectPolishedVersion}
      />
    </div>
  );
};

export default JobForm;
export type { JobFormValues };
