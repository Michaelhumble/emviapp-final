
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from '@/hooks/useTranslation';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import EmploymentDetailsSection from '../sections/EmploymentDetailsSection';
import { JobFormValues, IndustryType } from './jobFormSchema';
import JobTemplateSelector from './JobTemplateSelector';

const formSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }).optional(),
  vietnameseDescription: z.string().optional(),
  location: z.string().min(3, { message: "Location is required" }),
  compensation_details: z.string().optional(),
  employment_type: z.string(),
  experience_level: z.string(),
  salary_range: z.string().optional(),
  contact_info: z.object({
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().optional(),
    website: z.string().optional()
  }),
  requirements: z.array(z.string()).optional(),
  specialties: z.array(z.string()).optional(),
  weekly_pay: z.boolean().optional(),
  has_housing: z.boolean().optional(),
  has_wax_room: z.boolean().optional(),
  no_supply_deduction: z.boolean().optional(),
  owner_will_train: z.boolean().optional(),
});

export type JobFormSchemaType = z.infer<typeof formSchema>;

interface JobFormProps {
  onSubmit: (data: JobFormSchemaType) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
  industryType?: IndustryType;
}

export const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting,
  initialValues,
  industryType
}) => {
  const { t } = useTranslation();
  const [showTemplateSelector, setShowTemplateSelector] = useState(!initialValues);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType | undefined>(industryType);
  
  const form = useForm<JobFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ? {
      title: initialValues.title || '',
      description: initialValues.description || '',
      vietnameseDescription: initialValues.vietnameseDescription || '',
      location: initialValues.location || '',
      compensation_details: initialValues.compensation_details || '',
      employment_type: initialValues.jobType || 'full-time',
      experience_level: initialValues.experience_level || 'experienced',
      salary_range: initialValues.salary_range || '',
      contact_info: {
        email: initialValues.contactEmail || '',
        phone: '',
        website: ''
      },
      requirements: initialValues.requirements || [],
      specialties: initialValues.specialties || [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
    } : {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      compensation_details: '',
      employment_type: 'full-time',
      experience_level: 'experienced',
      salary_range: '',
      contact_info: {
        email: '',
        phone: '',
        website: ''
      },
      requirements: [],
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
    }
  });

  const handleTemplateSelect = (template: JobFormValues) => {
    // Update form with template values
    if (template.title) form.setValue('title', template.title);
    if (template.description) form.setValue('description', template.description);
    if (template.vietnameseDescription) form.setValue('vietnameseDescription', template.vietnameseDescription);
    if (template.location) form.setValue('location', template.location);
    if (template.compensation_details) form.setValue('compensation_details', template.compensation_details);
    if (template.jobType) form.setValue('employment_type', template.jobType);
    if (template.experience_level) form.setValue('experience_level', template.experience_level);
    if (template.salary_range) form.setValue('salary_range', template.salary_range);
    if (template.contactEmail) form.setValue('contact_info.email', template.contactEmail);
    if (template.requirements) form.setValue('requirements', template.requirements);
    if (template.specialties) form.setValue('specialties', template.specialties);

    // Hide template selector after selection
    setShowTemplateSelector(false);
    
    // Set the industry type if it exists
    if (template.id) {
      setSelectedIndustry(template.id as IndustryType);
    }
  };

  const handleSubmit = (data: JobFormSchemaType) => {
    onSubmit(data);
  };

  if (showTemplateSelector) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
            {t({
              english: "Tell us about your job opportunity",
              vietnamese: "Hãy cho chúng tôi biết về cơ hội việc làm của bạn"
            })}
          </h2>
          <p className="text-gray-600 mt-1">
            {t({
              english: "You're one click away from your dream team.",
              vietnamese: "Bạn chỉ cách một cú nhấp chuột để có đội ngũ mơ ước của mình."
            })}
          </p>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowTemplateSelector(true)}
          className="hidden sm:flex items-center gap-1"
        >
          <Sparkles className="h-4 w-4" />
          {t({
            english: "Try Other Templates",
            vietnamese: "Thử Các Mẫu Khác"
          })}
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Job Details Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <JobDetailsSection
              details={{
                title: form.getValues("title"),
                description: form.getValues("description") || '',
                vietnameseDescription: form.getValues("vietnameseDescription"),
                location: form.getValues("location"),
                requirements: form.getValues("requirements") || [],
                specialties: form.getValues("specialties") || [],
              }}
              onChange={(details) => {
                if (details.title !== undefined) form.setValue("title", details.title);
                if (details.description !== undefined) form.setValue("description", details.description);
                if (details.vietnameseDescription !== undefined) form.setValue("vietnameseDescription", details.vietnameseDescription);
                if (details.location !== undefined) form.setValue("location", details.location);
                if (details.requirements !== undefined) form.setValue("requirements", details.requirements);
                if (details.specialties !== undefined) form.setValue("specialties", details.specialties);
              }}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              industryType={selectedIndustry}
            />
          </div>

          {/* Employment Details Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <EmploymentDetailsSection
              details={{
                employment_type: form.getValues("employment_type"),
                experience_level: form.getValues("experience_level"),
                salary_range: form.getValues("salary_range") || '',
                compensation_details: form.getValues("compensation_details") || '',
                weekly_pay: form.getValues("weekly_pay") || false,
                has_housing: form.getValues("has_housing") || false,
                has_wax_room: form.getValues("has_wax_room") || false,
                no_supply_deduction: form.getValues("no_supply_deduction") || false,
                owner_will_train: form.getValues("owner_will_train") || false,
              }}
              onChange={(details) => {
                if (details.employment_type !== undefined) form.setValue("employment_type", details.employment_type);
                if (details.experience_level !== undefined) form.setValue("experience_level", details.experience_level);
                if (details.salary_range !== undefined) form.setValue("salary_range", details.salary_range);
                if (details.compensation_details !== undefined) form.setValue("compensation_details", details.compensation_details);
                if (details.weekly_pay !== undefined) form.setValue("weekly_pay", details.weekly_pay);
                if (details.has_housing !== undefined) form.setValue("has_housing", details.has_housing);
                if (details.has_wax_room !== undefined) form.setValue("has_wax_room", details.has_wax_room);
                if (details.no_supply_deduction !== undefined) form.setValue("no_supply_deduction", details.no_supply_deduction);
                if (details.owner_will_train !== undefined) form.setValue("owner_will_train", details.owner_will_train);
              }}
            />
          </div>

          {/* Contact Info Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <ContactInfoSection
              contactInfo={{
                email: form.getValues("contact_info.email"),
                phone: form.getValues("contact_info.phone") || '',
                website: form.getValues("contact_info.website") || '',
              }}
              onChange={(info) => {
                if (info.email !== undefined) form.setValue("contact_info.email", info.email);
                if (info.phone !== undefined) form.setValue("contact_info.phone", info.phone);
                if (info.website !== undefined) form.setValue("contact_info.website", info.website);
              }}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse mr-2">●</span>
                  {t({
                    english: "Processing...",
                    vietnamese: "Đang xử lý..."
                  })}
                </>
              ) : (
                t({
                  english: "Continue to Pricing",
                  vietnamese: "Tiếp tục đến Giá"
                })
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Mobile template button */}
      <div className="flex sm:hidden justify-center mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowTemplateSelector(true)}
          className="w-full"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {t({
            english: "Try Other Templates",
            vietnamese: "Thử Các Mẫu Khác"
          })}
        </Button>
      </div>
    </motion.div>
  );
};
