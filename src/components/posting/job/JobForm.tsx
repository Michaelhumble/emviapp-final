
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Info, ClipboardList, MapPin, DollarSign, FileText, Image, Phone, Sparkles, Camera, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getJobTemplate } from '@/utils/jobTemplates';

// Define the job form schema
const jobFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a detailed description"),
  location: z.string().min(2, "Location is required"),
  salary: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  jobType: z.enum(["full-time", "part-time", "contract", "temporary"]),
  jobSummary: z.string().optional(),
  heartfeltMessage: z.string().optional(),
  isUrgent: z.boolean().default(false)
});

// Export the type for use in components
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
  defaultValues,
  industry = "nails",
  userProfile
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [polishingText, setPolishingText] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      location: defaultValues?.location || userProfile?.location || "",
      salary: defaultValues?.salary || "",
      contactEmail: defaultValues?.contactEmail || userProfile?.email || "",
      phoneNumber: defaultValues?.phoneNumber || userProfile?.phoneNumber || "",
      jobType: defaultValues?.jobType || "full-time",
      jobSummary: defaultValues?.jobSummary || "",
      heartfeltMessage: defaultValues?.heartfeltMessage || "",
      isUrgent: defaultValues?.isUrgent || false
    }
  });

  // Handle template selection
  const handleTemplateChange = (templateName: string) => {
    setSelectedTemplate(templateName);
    const template = getJobTemplate(templateName, {
      phoneNumber: userProfile?.phoneNumber,
      email: userProfile?.email
    });

    // Update form fields with template values
    if (template) {
      form.setValue('title', template.title || '');
      form.setValue('jobType', template.jobType || 'full-time');
      form.setValue('jobSummary', template.jobSummary || '');
      form.setValue('salary', template.salary || '');
      if (template.location) form.setValue('location', template.location);
    }
  };

  // Simulate AI polish functionality
  const handlePolishText = () => {
    setPolishingText(true);
    const currentText = form.getValues('description');
    
    // Simple simulation of AI polishing
    setTimeout(() => {
      const polishedText = currentText.length > 0 
        ? `${currentText}\n\nWe offer a supportive team environment with great earning potential and a loyal customer base. Our salon values work-life balance and professional growth opportunities. We're looking for talented individuals who are passionate about beauty and customer service.`
        : "We're looking for a dedicated professional to join our friendly team. You'll work in a positive environment with supportive colleagues and loyal customers. We offer competitive pay, flexible scheduling, and opportunities for growth. If you're passionate about your craft and providing excellent service, we'd love to meet you!";
      
      form.setValue('description', polishedText);
      setPolishingText(false);
    }, 1500);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
      {/* Step Tracker */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">1</div>
            <span className="text-sm mt-1 font-medium">Job Info</span>
          </div>
          <div className="h-1 flex-grow bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">2</div>
            <span className="text-sm mt-1">Photos</span>
          </div>
          <div className="h-1 flex-grow bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">3</div>
            <span className="text-sm mt-1">Pricing</span>
          </div>
        </div>
      </div>

      {/* Template Selection */}
      <div className="mb-8">
        <Label className="text-base font-medium mb-2">🧠 Start with a Template</Label>
        <Select
          onValueChange={handleTemplateChange}
          value={selectedTemplate || ''}
        >
          <SelectTrigger className="h-12 w-full">
            <SelectValue placeholder="Choose a template to pre-fill the form" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nails">Nail Technician</SelectItem>
            <SelectItem value="hair">Hair Stylist</SelectItem>
            <SelectItem value="eyebrowLash">Lash Artist</SelectItem>
            <SelectItem value="receptionist">Salon Receptionist</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          Templates provide a starting point, but you can edit all pre-filled content
        </p>
      </div>
      
      {/* Basic Job Info Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Basic Job Info</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Job Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="e.g. Nail Tech – Full Time (Dip/Gel Experience)"
              {...form.register('title')}
              className="h-12 mt-2"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Be specific about the position and required skills
            </p>
          </div>

          <div>
            <Label htmlFor="jobType" className="text-base font-medium">
              Job Type <span className="text-red-500">*</span>
            </Label>
            <Select 
              defaultValue={form.getValues('jobType')}
              onValueChange={(value) => form.setValue('jobType', value as "full-time" | "part-time" | "contract" | "temporary")}
            >
              <SelectTrigger id="jobType" className="h-12 mt-2">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Clear expectations help attract the right candidates
            </p>
          </div>

          <div>
            <Label htmlFor="location" className="text-base font-medium">
              Location <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center">
              <Input
                id="location"
                placeholder="e.g. San Jose, CA"
                {...form.register('location')}
                className="h-12 mt-2"
              />
            </div>
            {form.formState.errors.location && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.location.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Be specific to attract local talent
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="salary" className="text-base font-medium">
                Salary/Compensation
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    We only show this to verified artists after your job is live. Helps reduce back-and-forth.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="salary"
              placeholder="$25–30/hr or $60,000–70,000/year"
              {...form.register('salary')}
              className="h-12 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Posts with salary info get 30% more applications
            </p>
          </div>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="space-y-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Pencil className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Job Details</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="jobSummary" className="text-base font-medium">Job Summary</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Mark as Urgent</span>
                <Switch
                  id="isUrgent"
                  checked={form.getValues('isUrgent')}
                  onCheckedChange={(value) => form.setValue('isUrgent', value)}
                />
                <span className="text-xs text-orange-500 font-medium">🔥</span>
              </div>
            </div>
            <Input
              id="jobSummary"
              placeholder="One-line overview of the job"
              {...form.register('jobSummary')}
              className="h-12 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              A brief summary helps candidates quickly understand the role
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-base font-medium">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handlePolishText}
                disabled={polishingText}
                className="flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" />
                <span>{polishingText ? "Polishing..." : "Polish with AI"}</span>
              </Button>
            </div>
            <Textarea
              id="description"
              placeholder="Describe responsibilities, benefits, and other important details"
              {...form.register('description')}
              className="min-h-[200px] mt-2"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.description.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              Be specific about responsibilities, qualifications, and what makes your salon special
            </p>
          </div>

          {/* Optional Heartfelt Message */}
          <div>
            <Label htmlFor="heartfeltMessage" className="text-base font-medium">
              📣 Optional: Say something from the heart
            </Label>
            <Textarea
              id="heartfeltMessage"
              placeholder="We're a family-run salon and care deeply about our team."
              {...form.register('heartfeltMessage')}
              className="min-h-[100px] mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Personal messages help create an emotional connection with applicants
            </p>
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="space-y-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Photos (Optional)</h2>
        </div>
        
        <div className="border border-dashed border-gray-300 bg-muted/20 py-8 px-4 rounded-lg text-center">
          <div className="flex flex-col items-center justify-center gap-2">
            <Image className="h-10 w-10 text-gray-400" />
            <p className="text-muted-foreground">
              Drag and drop photos here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Adding photos can increase applications by up to 35%
            </p>
            <Button type="button" variant="outline" className="mt-2">
              Upload Photos
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-6 mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Contact Info</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="contactEmail" className="text-base font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactEmail"
              placeholder="hiring@yoursalon.com"
              {...form.register('contactEmail')}
              className="h-12 mt-2"
            />
            {form.formState.errors.contactEmail && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.contactEmail.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="phoneNumber" className="text-base font-medium">
                Phone <span className="text-red-500">*</span>
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    We only show this to verified artists after your job is live. Helps reduce back-and-forth.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="phoneNumber"
              placeholder="(555) 123-4567"
              {...form.register('phoneNumber')}
              className="h-12 mt-2"
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.phoneNumber.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Emotional Yes Ladder */}
      <div className="mt-10 bg-purple-50 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Get Better Results</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="highlight" 
              className="mt-1 h-4 w-4 text-purple-600" 
              defaultChecked 
            />
            <div className="ml-3">
              <label htmlFor="highlight" className="text-base font-medium">
                Highlight your listing
              </label>
              <p className="text-sm text-muted-foreground">
                Make your job stand out with premium placement
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="extended" 
              className="mt-1 h-4 w-4 text-purple-600" 
              defaultChecked 
            />
            <div className="ml-3">
              <label htmlFor="extended" className="text-base font-medium">
                Extended visibility
              </label>
              <p className="text-sm text-muted-foreground">
                Your job will stay active longer
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <input 
              type="checkbox" 
              id="matching" 
              className="mt-1 h-4 w-4 text-purple-600" 
              defaultChecked 
            />
            <div className="ml-3">
              <label htmlFor="matching" className="text-base font-medium">
                Smart matching
              </label>
              <p className="text-sm text-muted-foreground">
                AI will help match with qualified artists in your area
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Button */}
      <Sheet open={showPreview} onOpenChange={setShowPreview}>
        <SheetTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full flex items-center justify-center gap-2"
            onClick={() => setShowPreview(true)}
          >
            <span>👁️ Preview Post</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Job Post Preview</SheetTitle>
          </SheetHeader>
          <div className="mt-6 border rounded-lg p-4 max-w-sm mx-auto shadow-sm">
            <div className="flex items-center space-x-2">
              {form.getValues('isUrgent') && (
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                  🔥 Urgent
                </span>
              )}
              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                {form.getValues('jobType')}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2">{form.getValues('title') || "Job Title"}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {form.getValues('location') || "Location"}
            </p>
            {form.getValues('salary') && (
              <p className="text-sm font-medium text-green-700 mt-1">
                {form.getValues('salary')}
              </p>
            )}
            <p className="text-sm mt-3 line-clamp-3">
              {form.getValues('jobSummary') || form.getValues('description')?.substring(0, 120) || "Job description preview will appear here..."}
            </p>
            <div className="mt-4 pt-3 border-t">
              <p className="text-xs text-gray-500">
                Posted just now • Apply easily with EmviApp
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Final Emotional Push */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ✨ You're almost done — one more step to attract your perfect candidate!
        </p>
      </div>

      {/* Submit button */}
      <Button 
        type="submit" 
        className="mt-6 w-full px-6 py-3 text-base md:text-lg font-semibold bg-purple-600 hover:opacity-90 h-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Continue to Pricing"}
      </Button>
    </form>
  );
};

export default JobForm;
