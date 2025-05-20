import React, { useState, useCallback, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

// Fixed import from uploadthing.ts (now defined in the file)
import { UploadButton, uploadFiles } from "@/utils/uploadthing";

// Fix PricingContext import by using PricingProvider
import { usePricing } from "@/context/pricing/PricingProvider";
// Fix PricingSummary import by using PaymentSummary
import { PaymentSummary } from "@/components/posting/PaymentSummary";
import { jobFormSchema, JobFormValues } from "@/components/posting/job/jobFormSchema";
import { PricingOptions } from "@/utils/posting/types";
import { JobSummary } from "@/components/posting/JobSummary";

// Define props interface for this component
interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
  onBack?: () => void;
  isCustomTemplate?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialTemplate,
  maxPhotos = 5,
  onStepChange,
  onBack,
  isCustomTemplate = false,
}) => {
  const { pricingOptions, setPricingOptions, priceData } = usePricing();
  const [step, setStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Setup form with zodResolver and default values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      // Initialize with template or empty values
      title: initialTemplate?.title || "",
      description: initialTemplate?.description || "",
      vietnameseDescription: initialTemplate?.vietnameseDescription || "",
      location: initialTemplate?.location || "",
      jobType: initialTemplate?.jobType || "",
      compensation_type: initialTemplate?.compensation_type || "",
      compensation_details: initialTemplate?.compensation_details || "",
      contactName: initialTemplate?.contactName || "",
      contactPhone: initialTemplate?.contactPhone || "",
      contactEmail: initialTemplate?.contactEmail || "",
      contactZalo: initialTemplate?.contactZalo || "",
      weekly_pay: initialTemplate?.weekly_pay || false,
      has_housing: initialTemplate?.has_housing || false,
      has_wax_room: initialTemplate?.has_wax_room || false,
      owner_will_train: initialTemplate?.owner_will_train || false,
      no_supply_deduction: initialTemplate?.no_supply_deduction || false,
      experience_level: initialTemplate?.experience_level || "",
      salary_range: initialTemplate?.salary_range || "",
      specialties: initialTemplate?.specialties || [],
      requirements: initialTemplate?.requirements || [],
      salonName: initialTemplate?.salonName || "",
      // Default value for templateType
      templateType: initialTemplate?.templateType || "custom",
      // Removed 'image' property as it's not in the JobFormValues type
    },
  });

  const handlePhotoUpload = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > maxPhotos) {
      alert(`You can only upload up to ${maxPhotos} photos.`);
      return;
    }
    setPhotoUploads(acceptedFiles);
  }, [maxPhotos, setPhotoUploads]);

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotoUploads(photos => photos.filter((_, index) => index !== indexToRemove));
  };

  const handleFormSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(values, photoUploads, pricingOptions);
      if (success) {
        // Reset form or navigate on success
        form.reset();
        setPhotoUploads([]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        {step === 1 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Nail Technician" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter salon name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco, CA" {...field} />
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
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Full-time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job and requirements"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vietnameseDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vietnamese Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the job and requirements in Vietnamese"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compensation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Hourly, Salary, Commission" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compensation_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compensation Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $15/hour + tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact name" {...field} />
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
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="contactZalo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Zalo</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact Zalo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="weekly_pay"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-nowrap">Weekly Pay</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="has_housing"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-nowrap">Has Housing</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="has_wax_room"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-nowrap">Has Wax Room</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner_will_train"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-nowrap">Owner Will Train</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="no_supply_deduction"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-nowrap">No Supply Deduction</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <JobSummary
              title={form.getValues("title")}
              description={form.getValues("description")}
              location={form.getValues("location")}
              contactEmail={form.getValues("contactEmail")}
              contactPhone={form.getValues("contactPhone")}
              pricingPlan={{
                id: pricingOptions.selectedPricingTier,
                name: pricingOptions.selectedPricingTier,
                price: 99,
                features: ["Feature 1", "Feature 2"],
              }}
              jobType={form.getValues("jobType")}
              salonName={form.getValues("salonName")}
            />
            <PaymentSummary priceData={priceData} />
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          ) : (
            <Button variant="secondary" onClick={onBack}>
              Back to Templates
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
