
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { Sparkles, Info } from 'lucide-react';
import { jobTemplates, getJobTemplate } from '@/utils/jobTemplates';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  userProfile?: any;
}

export type { JobFormValues };

const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting = false,
  userProfile
}) => {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salary: '',
      contactEmail: userProfile?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      jobType: 'full-time',
      jobSummary: '',
      heartfeltMessage: '',
      isUrgent: false
    }
  });

  const handleTemplateChange = (templateId: string) => {
    if (!templateId) return;
    
    const template = getJobTemplate(templateId, {
      email: userProfile?.email,
      phoneNumber: userProfile?.phoneNumber
    });
    
    // Update form values with template
    if (template.title) form.setValue('title', template.title);
    if (template.jobSummary) form.setValue('jobSummary', template.jobSummary);
    if (template.location) form.setValue('location', template.location);
    if (template.salary) form.setValue('salary', template.salary);
    if (template.jobType) form.setValue('jobType', template.jobType as any);
    
    // Auto-scroll to the title field for immediate editing
    setTimeout(() => {
      document.getElementById('job-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.getElementById('job-title')?.focus();
    }, 100);
  };
  
  const handlePolishWithAI = () => {
    setAiModalOpen(true);
  };
  
  const handleSelectPolishedDescription = (description: string) => {
    form.setValue('description', description);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Step Tracker */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
              1
            </div>
            <span className="text-sm font-medium">Job Info</span>
          </div>
          <div className="h-0.5 bg-gray-200 flex-1 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs">
              2
            </div>
            <span className="text-sm text-gray-500">Add Photos (optional)</span>
          </div>
          <div className="h-0.5 bg-gray-200 flex-1 mx-2"></div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs">
              3
            </div>
            <span className="text-sm text-gray-500">Choose Pricing</span>
          </div>
        </div>

        {/* Template Selector */}
        <div className="mb-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 mb-1">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  Start with a Template
                </FormLabel>
                <Select onValueChange={handleTemplateChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job template..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nails">Nail Technician (Vietnamese-style)</SelectItem>
                    <SelectItem value="hair">Hair Stylist (Salon)</SelectItem>
                    <SelectItem value="eyebrowLash">Lash Tech (Home-Based)</SelectItem>
                    <SelectItem value="barber">Barber (Shop)</SelectItem>
                    <SelectItem value="tattoo">Tattoo Artist (Studio)</SelectItem>
                    <SelectItem value="esthetician">Licensed Esthetician (Spa)</SelectItem>
                    <SelectItem value="massage">Masseuse (On-call)</SelectItem>
                    <SelectItem value="makeup">Makeup Artist (Freelancer)</SelectItem>
                    <SelectItem value="studioRental">Studio Room for Rent (Beauty Space)</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        {/* Job Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input id="job-title" placeholder="e.g., Experienced Nail Technician" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Summary */}
        <FormField
          control={form.control}
          name="jobSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Summary</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="A brief overview of the position..." 
                  className="h-20"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                This short summary will appear in search results
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Urgency Toggle */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="flex items-center gap-1">
                  <span className="text-red-500">🔥</span> Mark this job as Urgent
                </FormLabel>
                <FormDescription>
                  Highlight your job posting to attract immediate applications
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

        {/* Job Description */}
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Job Description</FormLabel>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handlePolishWithAI}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="h-4 w-4 text-purple-500" /> Polish with AI
                  </Button>
                </div>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the job responsibilities, qualifications, and what makes your salon unique..."
                    className="min-h-[200px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Heartfelt Message */}
        <FormField
          control={form.control}
          name="heartfeltMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <span className="text-pink-500">❤️</span> Optional: Say something from the heart
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="We're a family-run salon and care deeply about our team."
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Personal messages help your listing stand out and connect with applicants
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, State (e.g., San Jose, CA)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Salary */}
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Salary/Compensation</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                      <Info className="h-3 w-3" />
                      <span className="sr-only">Why we ask this</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <p className="text-sm">
                      We only show this to verified artists after your job is live. 
                      Including salary information helps reduce back-and-forth and increases quality applications by 30%.
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <Input placeholder="e.g., $25-30/hr or 60% commission" {...field} />
              </FormControl>
              <FormDescription>
                Listings with salary info get 30% more applications
              </FormDescription>
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
                    <SelectValue placeholder="Select a job type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="yourname@example.com" {...field} />
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
                <div className="flex items-center gap-2">
                  <FormLabel>Phone Number</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Why we ask this</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4">
                      <p className="text-sm">
                        We only show this to verified artists after your job is live. 
                        Including a contact number helps ensure serious applicants can reach you easily.
                      </p>
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl>
                  <Input placeholder="(123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between pt-4">
          <Button
            type="button" 
            variant="outline"
            className="flex items-center gap-1"
          >
            👁️ Preview Post
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Continue to Pricing'} →
          </Button>
        </div>
      </form>
      
      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        originalDescription={form.getValues('description')}
        onSelectDescription={handleSelectPolishedDescription}
      />
    </Form>
  );
};

export default JobForm;
