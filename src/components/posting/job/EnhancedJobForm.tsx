import React, { useState, useCallback } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ImageIcon, Plus, X } from "lucide-react";
import { JobFormValues, jobFormSchema } from "./jobFormSchema";
import { JobSummary } from "@/components/posting/JobSummary";
import { PricingOptions } from "@/utils/posting/types";
import { usePricing } from "@/context/pricing/PricingProvider";
import { JobPricingOption } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/ui/multi-select";
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { useUploadThing } from "@/utils/uploadthing";
import { FileRejection } from 'react-dropzone';
import { UploadDropzone } from "@/utils/uploadthing";

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean | void>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isCustomTemplate,
  maxPhotos = 5,
  onStepChange,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { pricingOptions, setPricingOptions } = usePricing();
  const [selectedPricingOption, setSelectedPricingOption] = useState<JobPricingOption | null>(null);
  const { handleJobPost } = useJobPosting();
  const [uploads, setUploads] = useState<File[]>([]);
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: "",
      description: "",
      vietnameseDescription: "",
      location: "",
      jobType: "",
      compensation_type: "",
      compensation_details: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactZalo: "",
      salonName: "",
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
    },
    mode: "onChange",
  });

  const { getFilesFromResponse } = useUploadThing({
    endpoint: "imageUploader",
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      if (res) {
        const urls = res.map((file) => file.url);
        setUploadUrls(urls);
        toast({
          title: "Upload Complete!",
          description: "Your images have been successfully uploaded.",
        });
      }
      setUploading(false);
    },
    onUploadError: (error: Error) => {
      // Do something with the error.
      toast({
        variant: "destructive",
        title: "Upload Failed!",
        description: error?.message,
      });
      setUploading(false);
    },
  });

  const handleFileChange = useCallback((acceptedFiles: File[]) => {
    setUploads((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const handleRemoveFile = (fileToRemove: File) => {
    setUploads((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const handlePricingSelect = (option: JobPricingOption) => {
    setSelectedPricingOption(option);
    setPricingOptions((prev) => ({
      ...prev,
      selectedPricingTier: option.tier,
    }));
  };

  const watch = form.watch;

  const handleFormSubmit = async (data: JobFormValues) => {
    if (uploads.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPricingOption) {
      toast({
        title: "Error",
        description: "Please select a pricing option.",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to submit this job posting?"
    );
    if (!confirmed) return;

    // Upload images first
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      uploads.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setUploadError(
          errorData.error || "Failed to upload images. Please try again."
        );
        setUploading(false);
        return;
      }

      const responseData = await response.json();
      if (!responseData || !Array.isArray(responseData)) {
        setUploadError("Failed to process upload response.");
        setUploading(false);
        return;
      }

      const uploadedUrls = responseData.map((file: any) => file.url);
      setUploadUrls(uploadedUrls);

      // Now submit the form data
      const success = await onSubmit(data, uploads, pricingOptions);
      if (success) {
        toast({
          title: "Success",
          description: "Job posted successfully!",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error",
          description: "Failed to post job. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadError(
        error.message || "An unexpected error occurred. Please try again."
      );
      toast({
        title: "Error",
        description:
          error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleNextStep = () => {
    if (form.formState.isValid) {
      setStep((prev) => prev + 1);
      onStepChange?.(step + 1);
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    onStepChange?.(step - 1);
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-4">
        <Form {...form}>
          <div className={step === 1 ? "" : "hidden"}>
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <FormField
              control={form.control}
              name="salonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t({
                    english: "Salon Name",
                    vietnamese: "Tên Salon"
                  })}</FormLabel>
                  <FormControl>
                    <Input placeholder={t({
                      english: "e.g., Beauty Nails Spa",
                      vietnamese: "vd., Beauty Nails Spa"
                    })} {...field} />
                  </FormControl>
                  <FormDescription>
                    {t({
                      english: "Enter the name of your salon or business",
                      vietnamese: "Nhập tên salon hoặc doanh nghiệp của bạn"
                    })}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Nail Technician" {...field} />
                  </FormControl>
                  <FormDescription>
                    What is the position you're hiring for?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the job requirements and responsibilities" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Include details about the role, responsibilities, and what makes it a great opportunity.
                  </FormDescription>
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
                    <Textarea placeholder="Mô tả công việc bằng tiếng Việt" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a description in Vietnamese to attract more candidates.
                  </FormDescription>
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
                    <Input placeholder="e.g., Ho Chi Minh City" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where is the job located?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={step === 2 ? "" : "hidden"}>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact name" {...field} />
                  </FormControl>
                  <FormDescription>Who is the contact person for this job?</FormDescription>
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
                  <FormDescription>Enter the contact phone number</FormDescription>
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
                    <Input placeholder="Enter contact email" type="email" {...field} />
                  </FormControl>
                  <FormDescription>Enter a valid email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={step === 3 ? "" : "hidden"}>
            <h2 className="text-xl font-semibold mb-4">Job Details</h2>
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job type" {...field} />
                  </FormControl>
                  <FormDescription>What type of job is this?</FormDescription>
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
                    <Input placeholder="Enter compensation type" {...field} />
                  </FormControl>
                  <FormDescription>What type of compensation is offered?</FormDescription>
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
                    <Input placeholder="Enter compensation details" {...field} />
                  </FormControl>
                  <FormDescription>Enter the details of the compensation</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weekly_pay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Weekly Pay</FormLabel>
                    <FormDescription>Is this a weekly pay job?</FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_housing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Has Housing</FormLabel>
                    <FormDescription>Does this job have housing?</FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_wax_room"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Has Wax Room</FormLabel>
                    <FormDescription>Does this job have a wax room?</FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="owner_will_train"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Owner Will Train</FormLabel>
                    <FormDescription>Will the owner train?</FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="no_supply_deduction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>No Supply Deduction</FormLabel>
                    <FormDescription>Is there no supply deduction?</FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className={step === 4 ? "" : "hidden"}>
            <h2 className="text-xl font-semibold mb-4">Uploads</h2>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                alert("Upload Completed!");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>

          <div className="flex justify-between">
            {step > 1 ? (
              <Button variant="secondary" onClick={handlePrevStep}>
                Previous
              </Button>
            ) : onBack ? (
              <Button variant="secondary" onClick={onBack}>
                Back to Templates
              </Button>
            ) : null}

            {step < 4 ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={() => setShowPreview(true)}>Preview</Button>
            )}
          </div>
        </Form>

        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <Card className="max-w-2xl w-full">
              <CardContent className="space-y-4">
                <JobSummary
                  title={watch("title") || "Job Title"}
                  description={watch("description")}
                  location={watch("location")}
                  contactEmail={watch("contactEmail")}
                  contactPhone={watch("contactPhone")}
                  pricingPlan={selectedPricingOption}
                  jobType={watch("jobType")}
                  salonName={watch("salonName") || "Unknown Salon"}
                />
                <div className="flex justify-end">
                  <Button variant="secondary" onClick={() => setShowPreview(false)}>
                    Close
                  </Button>
                  <Button onClick={form.handleSubmit(handleFormSubmit)}>
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedJobForm;
