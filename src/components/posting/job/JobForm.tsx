
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import JobPostPhotoUpload from './JobPostPhotoUpload';
import PolishedDescriptionsModal from './PolishedDescriptionsModal';
import { useTranslation } from '@/hooks/useTranslation';
import { jobFormEn } from '@/constants/jobForm.en';
import { jobFormVi } from '@/constants/jobForm.vi';
import { usePolishedDescriptions } from '@/hooks/usePolishedDescriptions';

const JOB_TEMPLATES = [
  { value: "nail-technician", label: "Nail Technician" },
  { value: "hair-stylist", label: "Hair Stylist" },
  { value: "esthetician", label: "Esthetician" },
  { value: "salon-receptionist", label: "Salon Receptionist" },
  { value: "salon-manager", label: "Salon Manager" },
  { value: "massage-therapist", label: "Massage Therapist" },
  { value: "lash-tech", label: "Lash Tech" },
  { value: "barber", label: "Barber" },
  { value: "tattoo-artist", label: "Tattoo Artist" },
  { value: "makeup-artist", label: "Makeup Artist" },
  { value: "waxing-specialist", label: "Waxing Specialist" },
  { value: "microblading-artist", label: "Microblading Artist" },
  { value: "threading-expert", label: "Threading Expert" },
  { value: "facialist", label: "Facialist" },
  { value: "skincare-consultant", label: "Skincare Consultant" },
  { value: "brow-technician", label: "Brow Technician" },
  { value: "piercing-specialist", label: "Piercing Specialist" },
  { value: "permanent-makeup-artist", label: "Permanent Makeup Artist" },
  { value: "booth-renter", label: "Booth Renter" },
  { value: "freelance-beauty-pro", label: "Freelance Beauty Pro" },
  { value: "other", label: "Other" }
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "other", label: "Other" }
];

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
  const { isVietnamese } = useTranslation();
  const t = isVietnamese ? jobFormVi : jobFormEn;
  
  // State for Polish with AI modal
  const [isPollishModalOpen, setIsPolishModalOpen] = useState(false);
  
  // Get job templates based on language
  const getJobTemplates = () => {
    if (isVietnamese) {
      return JOB_TEMPLATES.map((template, index) => ({
        value: template.value,
        label: index < t.templates.length ? t.templates[index] : template.label
      }));
    }
    return JOB_TEMPLATES;
  };
  
  // Get job types based on language
  const getJobTypes = () => {
    if (isVietnamese) {
      return JOB_TYPES.map(type => {
        const key = type.value.replace('-', '') as keyof typeof t.jobTypeOptions;
        return {
          value: type.value,
          label: t.jobTypeOptions[key] || type.label
        };
      });
    }
    return JOB_TYPES;
  };

  // Form setup
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
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
      images: [],
      ...defaultValues
    }
  });

  // Polish with AI functionality
  const { fetchPolishedDescriptions, polishedDescriptions, isLoading } = usePolishedDescriptions();
  
  const handlePolishClick = async () => {
    const description = form.getValues('description');
    if (!description || description.length < 5) return;
    
    await fetchPolishedDescriptions(description);
    setIsPolishModalOpen(true);
  };
  
  const handleSelectPolishedDescription = (text: string) => {
    form.setValue('description', text);
    setIsPolishModalOpen(false);
  };

  return (
    <>
      <Card className="w-full shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-playfair">{t.title}</CardTitle>
        </CardHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Job Template Selector */}
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.templatePlaceholder}</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {getJobTemplates().map((template) => (
                            <SelectItem key={template.value} value={template.value}>
                              {template.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
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
                      {t.summaryLabel}
                      <span className="text-muted-foreground text-sm ml-1">{t.optionalLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t.summaryPlaceholder} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Type and Location */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.jobTypeLabel}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getJobTypes().map((jobType) => (
                            <SelectItem key={jobType.value} value={jobType.value}>
                              {jobType.label}
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
                      <FormLabel>{t.locationLabel}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Compensation */}
              <FormField
                control={form.control}
                name="compensation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t.compensationLabel}
                      <span className="text-muted-foreground text-sm ml-1">{t.optionalLabel}</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder={t.compensationPlaceholder}
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
                    <div className="flex items-center justify-between">
                      <FormLabel>{t.descriptionLabel}</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        disabled={!field.value || field.value.length < 5 || isLoading}
                        onClick={handlePolishClick}
                      >
                        {isLoading ? t.loadingPolish : t.polishWithAI}
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder={t.descriptionPlaceholder}
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salon Perks "Yes Ladder" checkboxes */}
              <div className="space-y-3">
                <FormLabel>{t.perksLabel}</FormLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="flexibleTime"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.flexibleHours}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="payWeekly"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.weeklyPay}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="provideLunch"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.provideLunch}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="qualityProducts"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.qualityProducts}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reviewBonuses"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.reviewBonuses}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="growthOpportunity"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer mt-0.5">
                          {t.perks.growthOpportunities}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Urgent Hiring */}
              <FormField
                control={form.control}
                name="isUrgent"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 space-y-0 bg-amber-50 p-3 rounded-md border border-amber-100">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div>
                      <FormLabel className="font-medium cursor-pointer">
                        {t.urgentLabel}
                      </FormLabel>
                      <p className="text-muted-foreground text-xs">{t.urgentHint}</p>
                    </div>
                  </FormItem>
                )}
              />

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.emailLabel}</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                      <FormLabel>{t.phoneLabel}</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder={t.phonePlaceholder}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Photo Upload */}
              <FormItem>
                <FormLabel>{t.uploadLabel}</FormLabel>
                <JobPostPhotoUpload
                  photoUploads={photoUploads}
                  setPhotoUploads={setPhotoUploads}
                  maxPhotos={5}
                />
              </FormItem>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : t.continue}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Polish with AI Modal */}
      <PolishedDescriptionsModal
        isOpen={isPollishModalOpen}
        onClose={() => setIsPolishModalOpen(false)}
        descriptions={polishedDescriptions}
        onSelect={handleSelectPolishedDescription}
        isLoading={isLoading}
      />
    </>
  );
};

export default JobForm;
