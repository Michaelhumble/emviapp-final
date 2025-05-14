
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { jobFormSchema, type JobFormValues } from './jobFormSchema';
import { JOB_TEMPLATES, JOB_TYPES, YES_LADDER_OPTIONS } from './jobFormConstants';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Upload, X } from 'lucide-react';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';

// Simplified mock version of usePolishedDescriptions for now
const usePolishedDescriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generatePolishedDescriptions = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    return [
      { 
        style: "Professional", 
        text: "We are seeking a skilled nail technician with at least 2 years of experience. The ideal candidate will excel in nail art, acrylics, and gel applications. Join our growing salon team in a collaborative environment with opportunities for advancement." 
      },
      { 
        style: "Warm & Friendly", 
        text: "Join our salon family! We're looking for a passionate nail tech who loves creating beautiful nail designs. If you enjoy working with clients and have strong technical skills, we'd love to meet you. Weekly pay and flexible hours available." 
      }
    ];
  };

  return { generatePolishedDescriptions, isLoading, error };
};

// This would typically be a separate component file
const JobPostPhotoUpload = ({ 
  photoUploads, 
  setPhotoUploads, 
  maxPhotos = 5 
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPhotoUploads(prev => [...prev, ...files].slice(0, maxPhotos));
    }
  };

  const removePhoto = (index) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {photoUploads.map((file, index) => (
          <div key={index} className="relative w-20 h-20">
            <img
              src={URL.createObjectURL(file)}
              alt={`Upload ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {photoUploads.length < maxPhotos && (
        <div className="flex items-center">
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
          >
            <Upload className="w-4 h-4" />
            Add photos (optional)
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <span className="text-xs text-gray-400 ml-2">
            {photoUploads.length}/{maxPhotos}
          </span>
        </div>
      )}
    </div>
  );
};

const JobForm = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues
}) => {
  const [isDescModalOpen, setIsDescModalOpen] = useState(false);
  const { generatePolishedDescriptions, isLoading, error } = usePolishedDescriptions();
  const [polishedVersions, setPolishedVersions] = useState([]);

  // Setup form with validation
  const form = useForm({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues || {
      template: '',
      title: '',
      type: '',
      location: '',
      compensation: '',
      isUrgent: false,
      summary: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleTime: false,
      growthOpportunity: false,
      reviewBonuses: false,
    }
  });

  // Handle template selection
  const handleTemplateChange = (templateId) => {
    const selectedTemplate = JOB_TEMPLATES.find(tpl => tpl.id === templateId);
    if (selectedTemplate) {
      form.setValue('title', selectedTemplate.title);
      form.setValue('type', selectedTemplate.type);
      form.setValue('description', selectedTemplate.description);
    }
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setPhotoUploads(prev => [...prev, ...files].slice(0, 5));
    }
  };

  const removePhoto = (index) => {
    setPhotoUploads(prev => prev.filter((_, i) => i !== index));
  };

  // Handle AI description generation
  const handleGenerateDescriptions = async () => {
    try {
      const versions = await generatePolishedDescriptions();
      setPolishedVersions(versions);
      setIsDescModalOpen(true);
    } catch (err) {
      console.error("Error generating descriptions:", err);
    }
  };

  const selectPolishedVersion = (text) => {
    form.setValue('description', text);
    setIsDescModalOpen(false);
  };

  // Submit handler
  const handleSubmit = (values) => {
    onSubmit({ ...values, images: photoUploads.map(file => URL.createObjectURL(file)) });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start with a template (optional)</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTemplateChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Experienced Nail Technician" {...field} />
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Los Angeles, CA" {...field} />
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
                <FormLabel>Compensation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $25-30/hr plus tips" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Summary (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Quick highlight about this position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Job Description *</FormLabel>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Describe responsibilities, requirements and benefits
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateDescriptions}
                      disabled={isLoading}
                    >
                      <Sparkles className="w-4 h-4 mr-2" /> 
                      Polish with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea rows={6} placeholder="Enter job description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Yes ladder section */}
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Highlight Special Benefits</h3>
              <p className="text-sm text-gray-500">
                Select benefits that make your job opportunity stand out
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {YES_LADDER_OPTIONS.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name={option.id}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
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
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email *</FormLabel>
                <FormControl>
                  <Input placeholder="someone@example.com" {...field} />
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
                <FormLabel>Contact Phone *</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
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
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Mark as Urgent</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Highlight this as an urgent hiring need
                </div>
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

        {/* Photo upload section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Add Photos (Optional)</h3>
          <JobPostPhotoUpload 
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            maxPhotos={5}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Next: Choose Pricing Plan"}
          </Button>
        </div>
      </form>

      <PolishedDescriptionsModal
        isOpen={isDescModalOpen}
        onClose={() => setIsDescModalOpen(false)}
        isLoading={isLoading}
        descriptions={polishedVersions}
        onSelectVersion={selectPolishedVersion}
        error={error}
      />
    </Form>
  );
};

export { JobFormValues };
export default JobForm;
