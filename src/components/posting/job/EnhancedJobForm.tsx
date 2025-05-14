
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { JobFormValues, jobFormSchema } from "./jobFormSchema";
import JobPostPhotoUpload from "./JobFormPhotoUpload";
import { usePolishedDescriptions } from "@/hooks/usePolishedDescriptions";
import { useImageUpload } from "@/hooks/useImageUpload";
import { JOB_TEMPLATES, JOB_TYPES } from "./jobFormConstants";
import { JobTemplateOption } from "./types";

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
}

const EnhancedJobForm = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
}: EnhancedJobFormProps) => {
  const [isPolishing, setIsPolishing] = useState(false);
  const { uploadMultipleImages } = useImageUpload();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      type: "full_time",
      location: "",
      compensation: "",
      description: "",
      isUrgent: false,
      summary: "",
      contactEmail: "",
      contactPhone: "",
      payWeekly: false,
      provideLunch: false,
      qualityProducts: false,
      flexibleTime: false,
      growthOpportunity: false,
      reviewBonuses: false,
    },
  });
  
  // Get the description from the form to use with the polish hook
  const description = form.watch("description");
  
  // Use the simplified version of the polish hook
  const { generatePolishedDescription, isLoading: isPolishLoading } = usePolishedDescriptions(description);
  
  const handleSelectTemplate = (templateId: string) => {
    const selectedTemplate = JOB_TEMPLATES.find(
      (template) => template.id === templateId
    ) as JobTemplateOption;

    if (selectedTemplate) {
      form.setValue("title", selectedTemplate.defaultTitle);
      form.setValue("description", selectedTemplate.defaultDescription);
      form.setValue("summary", selectedTemplate.defaultSummary || "");
      form.setValue("type", selectedTemplate.defaultType || "full_time");
    }
  };

  const handlePolishDescription = async () => {
    setIsPolishing(true);
    try {
      const polishedDesc = await generatePolishedDescription();
      if (polishedDesc) {
        form.setValue("description", polishedDesc.text);
      }
    } catch (error) {
      console.error("Error polishing description:", error);
    } finally {
      setIsPolishing(false);
    }
  };

  const handleSubmitForm = async (values: JobFormValues) => {
    try {
      if (photoUploads.length > 0) {
        // Upload images and get their URLs
        const imageUrls = await uploadMultipleImages(photoUploads);
        // Add the image URLs to the form values
        values.images = imageUrls;
      }
      
      // Submit the form with the image URLs included
      onSubmit(values);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitForm)}
        className="space-y-10 max-w-3xl mx-auto"
      >
        {/* Start with a Template */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">Start with a Template</h2>
          <div className="grid grid-cols-1">
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
          </div>
        </div>

        {/* Basic Job Information */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">Basic Job Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter job title" />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
                  <FormLabel>
                    Salary/Compensation{" "}
                    <span className="text-gray-500 text-xs font-normal ml-1">
                      (Posts with salary info get 30% more applications)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., $25-30/hr or $60k-75k/year"
                    />
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    🔥 Mark as Urgent{" "}
                    <span className="text-gray-500 text-xs font-normal">
                      (Adds urgency badge to your listing)
                    </span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Job Details */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">Job Details</h2>
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Summary (Optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Brief overview of the position"
                  />
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
                <div className="flex items-center justify-between">
                  <FormLabel>Job Description *</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePolishDescription}
                    disabled={isPolishing || isPolishLoading || !description || description.length < 10}
                    className="mb-2"
                  >
                    {isPolishing || isPolishLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Polishing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Polish with AI
                      </>
                    )}
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the job requirements, responsibilities, and benefits"
                    rows={8}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Photos */}
        <JobPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />

        {/* Yes Ladder */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">Trust Building (Optional)</h2>
          <p className="text-gray-600">
            Check the boxes that apply to build trust with potential applicants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
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
                    <FormLabel>
                      ✅ We pay weekly — artists appreciate fast pay
                    </FormLabel>
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
                    <FormLabel>✅ We provide lunch on busy days</FormLabel>
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
                    <FormLabel>
                      ✅ We use the latest Dip/Gel/Acrylic products
                    </FormLabel>
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
                    <FormLabel>
                      ✅ We're flexible with days off or vacation
                    </FormLabel>
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
                    <FormLabel>
                      ✅ We give everyone a chance to grow and be seen
                    </FormLabel>
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
                    <FormLabel>
                      ✅ We offer bonuses for great customer reviews
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">Contact Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="your@email.com"
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
                <FormItem>
                  <FormLabel>Phone *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="(123) 456-7890" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Boost Your Listing Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-playfair font-medium">
            💎 Boost Your Listing
          </h2>
          <p className="text-gray-600">
            Select options on the next screen to maximize your listing's visibility
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4 shadow-sm bg-gradient-to-br from-purple-50 to-white">
              <h3 className="font-medium">Highlight your listing</h3>
              <p className="text-sm text-gray-600 mt-1">
                Stand out with a colored background
              </p>
            </div>
            <div className="border rounded-md p-4 shadow-sm bg-gradient-to-br from-blue-50 to-white">
              <h3 className="font-medium">Extended visibility</h3>
              <p className="text-sm text-gray-600 mt-1">
                Keep your listing active longer
              </p>
            </div>
            <div className="border rounded-md p-4 shadow-sm bg-gradient-to-br from-amber-50 to-white">
              <h3 className="font-medium">Smart Matching</h3>
              <p className="text-sm text-gray-600 mt-1">
                Reach candidates who match your needs
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row justify-end gap-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Continue to Preview
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
