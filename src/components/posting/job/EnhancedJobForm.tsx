
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { jobFormSchema, JobFormValues, JOB_TYPES, JOB_TEMPLATES } from "./jobFormSchema";
import JobPostPhotoUpload from "./JobFormPhotoUpload";
import { useImageUpload } from "@/hooks/useImageUpload";
import usePolishedDescriptions from "@/hooks/usePolishedDescriptions";
import PolishedDescriptionsModal from "./PolishedDescriptionsModal";

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting
}) => {
  const { uploadMultipleImages } = useImageUpload();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form setup with zod validation
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      type: "",
      location: "",
      compensation: "",
      description: "",
      summary: "",
      contactEmail: "",
      contactPhone: "",
      isUrgent: false,
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleTime: false,
      growthOpportunity: false,
      reviewBonuses: false,
      employment_type: "",
      compensation_type: "",
      compensation_details: "",
      images: [],
    },
  });
  
  const watchedDescription = form.watch("description");
  const { 
    generatePolishedDescriptions, 
    polishedVersions, 
    isLoading, 
    error 
  } = usePolishedDescriptions(watchedDescription || "");

  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(t => t.id === templateId);
    
    if (selectedTemplate) {
      form.setValue("title", selectedTemplate.defaultTitle);
      form.setValue("description", selectedTemplate.defaultDescription);
      form.setValue("summary", selectedTemplate.defaultSummary || "");
      form.setValue("type", selectedTemplate.defaultType || "");
    }
  };

  const handlePolishDescription = async () => {
    const currentDescription = form.getValues("description");
    
    if (!currentDescription || currentDescription.length < 10) {
      form.setError("description", { 
        type: "manual", 
        message: "Please enter at least 10 characters before polishing" 
      });
      return;
    }
    
    await generatePolishedDescriptions();
    setIsModalOpen(true);
  };

  const handleSelectVersion = (text: string) => {
    form.setValue("description", text);
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    try {
      // Upload photos if any
      if (photoUploads.length > 0) {
        const photoUrls = await uploadMultipleImages(photoUploads);
        data.images = photoUrls;
      }

      onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-4">Job Details</h2>
          
          {/* Job Template Selection */}
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Choose a Template (Optional)</FormLabel>
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
                    {JOB_TEMPLATES.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Job Title*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Nail Technician, Hair Stylist..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Type */}
          <FormField
            control={form.control}
            name="employment_type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Employment Type*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Location*</FormLabel>
                <FormControl>
                  <Input placeholder="City, State or Full Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Compensation Type */}
          <FormField
            control={form.control}
            name="compensation_type"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Compensation Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select compensation type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="booth_rent">Booth Rent</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Compensation Details */}
          <FormField
            control={form.control}
            name="compensation_details"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Compensation Details</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., $25-30/hr, 60% commission, etc." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Summary */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Job Summary (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Brief one-line summary of the position" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Description */}
          <div className="mb-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Job Description*</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handlePolishDescription}
                      className="ml-auto"
                      disabled={!watchedDescription || watchedDescription.length < 10}
                    >
                      <Wand2 className="h-4 w-4 mr-1" /> Polish with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job responsibilities, requirements, and what makes your salon special..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-4">Benefits & Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="payWeekly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Weekly Pay</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provideLunch"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Lunch Provided</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualityProducts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Quality Products</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="flexibleTime"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Flexible Hours</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="growthOpportunity"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Growth Opportunity</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reviewBonuses"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Review Bonuses</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isUrgent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-4">Contact Information</h2>
          
          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Email for applications" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Phone*</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Phone number for applications" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photo Upload Section */}
        <JobPostPhotoUpload 
          photoUploads={photoUploads} 
          setPhotoUploads={setPhotoUploads}
          maxPhotos={5}
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue to Pricing"}
          </Button>
        </div>
      </form>

      {/* Polished Descriptions Modal */}
      <PolishedDescriptionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isLoading}
        descriptions={polishedVersions}
        onSelectVersion={handleSelectVersion}
        error={error}
      />
    </Form>
  );
};

export default EnhancedJobForm;
