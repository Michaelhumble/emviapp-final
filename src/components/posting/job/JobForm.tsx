import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormSchema, JobFormValues } from "./jobFormSchema";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useJobPost } from "@/hooks/useJobPost";
import { useToast } from "@/hooks/useToast";
import { jobTemplates } from "@/utils/jobTemplates";
import JobGeneralInfo from "./JobGeneralInfo";
import JobCompensationInfo from "./JobCompensationInfo";
import JobRequirements from "./JobRequirements";
import JobDescription from "./JobDescription";
import JobContactInfo from "./JobContactInfo";
import JobFormSubmitButtons from "./JobFormSubmitButtons";
import { useAuth } from "@/context/auth";
import JobPreview from "./JobPreview";
import { PolishedDescriptionsModal } from "./PolishedDescriptionsModal";

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isJobPreviewOpen, setIsJobPreviewOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { createJobPost, updateJobPost, isSubmitting, setIsSubmitting, activeJob } = useJobPost();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: {
      title: activeJob?.title || "",
      type: activeJob?.type || "",
      salary: activeJob?.salary || "",
      salaryTypeId: activeJob?.salaryTypeId || "hour",
      experience: activeJob?.experience || "",
      description: activeJob?.description || "",
      requirements: activeJob?.requirements || "",
      contactName: activeJob?.contactName || "",
      contactEmail: activeJob?.contactEmail || "",
      contactPhone: activeJob?.contactPhone || "",
      template: activeJob?.template || null,
      location: activeJob?.location || "",
      city: activeJob?.city || "",
      state: activeJob?.state || "",
      zip: activeJob?.zip || "",
      country: activeJob?.country || "US",
      company: user?.userProfile?.company_name || user?.userProfile?.salonName || "",
      jobBoard: activeJob?.jobBoard || false,
      boost: activeJob?.boost || false,
      remote: activeJob?.remote || false,
      active: activeJob?.active || false,
    },
    mode: "onChange",
  });

  const { handleSubmit, reset, watch } = form;
  const currentJobType = watch("type");

  const onSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    try {
      if (activeJob) {
        // Update existing job post
        await updateJobPost({ ...values, id: activeJob.id });
        toast({
          title: "Job post updated successfully!",
          description: "Your job post has been updated.",
        });
      } else {
        // Create new job post
        await createJobPost(values);
        toast({
          title: "Job post created successfully!",
          description: "Your job post has been created.",
        });
      }
      navigate("/dashboard/jobs");
    } catch (error: any) {
      console.error("Error submitting job form:", error);
      toast({
        variant: "destructive",
        title: "Error submitting job form",
        description: error.message || "Failed to submit job form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = jobTemplates.find((t) => t.template === templateId);
    if (template) {
      form.setValue("title", template.title || "");
      form.setValue("type", template.type || "");
      form.setValue("description", template.description || "");
      setSelectedTemplate(templateId);
      toast({
        title: "Template applied",
        description: `The ${template.title} template has been applied to your form.`,
      });
    }
  };

  const handleClearForm = () => {
    reset({
      title: "",
      type: "",
      salary: "",
      salaryTypeId: "hour",
      experience: "",
      description: "",
      requirements: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      template: null,
      location: "",
      city: "",
      state: "",
      zip: "",
      country: "US",
      company: user?.userProfile?.company_name || user?.userProfile?.salonName || "",
      jobBoard: false,
      boost: false,
      remote: false,
      active: false,
    });
    setSelectedTemplate(null);
    toast({
      title: "Form cleared",
      description: "The job form has been cleared.",
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <JobGeneralInfo onTemplateSelect={handleTemplateSelect} selectedTemplate={selectedTemplate} />
        <JobCompensationInfo />
        <JobRequirements />
        <JobDescription />
        <JobContactInfo />
        <JobFormSubmitButtons
          isSubmitting={isSubmitting}
          onClearForm={handleClearForm}
          onOpenPreview={() => setIsJobPreviewOpen(true)}
        />
      </form>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <p>Are you sure you want to clear the form?</p>
          <Button onClick={handleClearForm}>Confirm Clear</Button>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
        </AlertDialogContent>
      </AlertDialog>

      <JobPreview isOpen={isJobPreviewOpen} onClose={() => setIsJobPreviewOpen(false)} />

      <PolishedDescriptionsModal
        isOpen={false}
        onClose={() => {}}
        onSelect={(description: string) => {
          form.setValue("description", description);
        }}
        currentJobType={currentJobType}
      />
    </FormProvider>
  );
};

export default JobForm;
