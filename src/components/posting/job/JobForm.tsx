
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobFormValues, jobFormSchema } from "./jobFormSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { jobFormEn } from "@/constants/jobForm.en";
import { jobFormVi } from "@/constants/jobForm.vi";
import JobPostPhotoUpload from "./JobPostPhotoUpload";
import { JOB_FORM_TEMPLATES, JOB_FORM_TEMPLATES_VI } from "./jobFormConstants";
import PolishedDescriptionsModal from "./PolishedDescriptionsModal";

interface JobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  defaultValues = {}
}) => {
  const { isVietnamese, t } = useTranslation();
  const formText = isVietnamese ? jobFormVi : jobFormEn;
  const templates = isVietnamese ? JOB_FORM_TEMPLATES_VI : JOB_FORM_TEMPLATES;
  
  const [isAIPolishModalOpen, setIsAIPolishModalOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<string>(defaultValues.template || "nail-technician");
  const [currentDescription, setCurrentDescription] = useState<string>(defaultValues.description || "");

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      compensation: "",
      contactEmail: "",
      contactPhone: "",
      isUrgent: false,
      ...defaultValues
    }
  });

  // Update form when template changes
  const handleTemplateChange = (templateId: string) => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      form.setValue("title", selectedTemplate.title);
      form.setValue("description", selectedTemplate.description);
      form.setValue("type", selectedTemplate.type);
      setSelectedJobType(templateId);
      setCurrentDescription(selectedTemplate.description);
    }
  };

  // Update current description when form changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'description') {
        setCurrentDescription(value.description || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const handleAIPolishSelect = (enhancedText: string) => {
    form.setValue("description", enhancedText);
    setCurrentDescription(enhancedText);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Template Selection */}
        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.templateLabel}
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleTemplateChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.templatePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.title}
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
            <FormItem>
              <FormLabel>
                {formText.titleLabel} {formText.requiredLabel}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.titlePlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.descriptionLabel} {formText.requiredLabel}
              </FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder={formText.descriptionPlaceholder}
                    className="min-h-[150px] resize-y"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-2 right-2 text-xs flex items-center gap-1 opacity-70 hover:opacity-100"
                  onClick={() => setIsAIPolishModalOpen(true)}
                >
                  <Sparkles className="h-3 w-3" />
                  {formText.aiPolishButton}
                </Button>
              </div>
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
              <FormLabel>
                {formText.locationLabel} {formText.requiredLabel}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.locationPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.jobTypeLabel}</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={formText.jobTypePlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(formText.jobTypeOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Compensation */}
        <FormField
          control={form.control}
          name="compensation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {formText.compensationLabel} {formText.optionalLabel}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={formText.compensationPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Email */}
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.contactInfoEmail} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.contactInfoEmailPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Phone */}
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formText.contactInfoPhone} {formText.requiredLabel}</FormLabel>
              <FormControl>
                <Input placeholder={formText.contactInfoPhonePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Urgent */}
        <FormField
          control={form.control}
          name="isUrgent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">{formText.urgentLabel}</FormLabel>
                <p className="text-sm text-muted-foreground">{formText.urgentHelpText}</p>
              </div>
            </FormItem>
          )}
        />

        {/* Photo Upload */}
        <div className="space-y-2">
          <FormLabel>{formText.photosLabel}</FormLabel>
          <JobPostPhotoUpload
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            translations={{
              dragDropText: formText.dragDropText,
              photoCount: (count, max) => 
                formText.photoCountText
                  .replace('{count}', String(count))
                  .replace('{max}', String(max))
            }}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formText.submitting}
            </>
          ) : formText.submit}
        </Button>
      </form>

      {/* AI Polish Modal */}
      <PolishedDescriptionsModal
        isOpen={isAIPolishModalOpen}
        onClose={() => setIsAIPolishModalOpen(false)}
        onSelect={handleAIPolishSelect}
        jobType={selectedJobType}
        currentText={currentDescription}
      />
    </Form>
  );
};

export default JobForm;
