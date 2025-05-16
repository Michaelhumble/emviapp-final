
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { JobFormValues } from './jobFormSchema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { InfoCircle } from './icons/InfoCircle';

interface JobDetailsSectionProps {
  formValues: Partial<JobFormValues>;
  onChange: (values: Partial<JobFormValues>) => void;
}

export const JobDetailsSection = ({ formValues, onChange }: JobDetailsSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t("Job Details")}
      </h2>
      <p className="text-gray-600">
        {t("Provide clear information to attract qualified candidates")}
      </p>
      
      <div className="grid gap-6">
        {/* Job Title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-base font-medium">
              {t("Job Title")} <span className="text-red-500">*</span>
            </Label>
            <span className="text-xs text-gray-500">
              {formValues.title?.length || 0}/100
            </span>
          </div>
          <Input
            id="title"
            value={formValues.title || ''}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder={t("e.g. Experienced Nail Technician - High Tips")}
            className="h-12 text-base"
            maxLength={100}
            required
          />
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Be specific. Include key details like experience level, specialties, or unique perks")}
          </p>
        </div>
        
        {/* Job Type */}
        <div className="space-y-2">
          <Label htmlFor="jobType" className="text-base font-medium">
            {t("Job Type")} <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formValues.jobType || 'full-time'}
            onValueChange={(value) => onChange({ jobType: value as JobFormValues['jobType'] })}
          >
            <SelectTrigger id="jobType" className="h-12 text-base">
              <SelectValue placeholder={t("Select job type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">{t("Full-time")}</SelectItem>
              <SelectItem value="part-time">{t("Part-time")}</SelectItem>
              <SelectItem value="contract">{t("Contract")}</SelectItem>
              <SelectItem value="temporary">{t("Temporary")}</SelectItem>
              <SelectItem value="commission">{t("Commission")}</SelectItem>
              <SelectItem value="booth-rental">{t("Booth Rental")}</SelectItem>
              <SelectItem value="freelance">{t("Freelance")}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Different job types attract different candidates. Be clear about your expectations")}
          </p>
        </div>
        
        {/* Experience Level */}
        <div className="space-y-2">
          <Label htmlFor="experience" className="text-base font-medium">
            {t("Experience Level")} <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formValues.experience_level || 'intermediate'}
            onValueChange={(value) => onChange({ experience_level: value as JobFormValues['experience_level'] })}
          >
            <SelectTrigger id="experience" className="h-12 text-base">
              <SelectValue placeholder={t("Select experience level")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">{t("Entry Level")}</SelectItem>
              <SelectItem value="intermediate">{t("Intermediate")}</SelectItem>
              <SelectItem value="experienced">{t("Experienced")}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Setting the right experience level helps reach the right candidates")}
          </p>
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-base font-medium">
              {t("Job Description")} <span className="text-red-500">*</span>
            </Label>
            <span className="text-xs text-gray-500">
              {formValues.description?.length || 0}/2000
            </span>
          </div>
          <Textarea 
            id="description"
            value={formValues.description || ''}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder={t("Describe the responsibilities and qualifications for this position...")}
            rows={6}
            className="text-base resize-none"
            maxLength={2000}
            required
          />
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Be honest and specific about day-to-day responsibilities, salon culture, and growth opportunities")}
          </p>
        </div>
        
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-base font-medium">
            {t("Location")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="location"
            value={formValues.location || ''}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder={t("City, State or Neighborhood")}
            className="h-12 text-base"
            required
          />
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Be specific. Include the neighborhood for better visibility in local searches")}
          </p>
        </div>
        
        {/* Salary Range */}
        <div className="space-y-2">
          <Label htmlFor="salary" className="text-base font-medium">
            {t("Salary Range")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="salary"
            value={formValues.salary_range || ''}
            onChange={(e) => onChange({ salary_range: e.target.value })}
            placeholder={t("e.g. $50-70K/year or $20-30/hour or 60/40 split + tips")}
            className="h-12 text-base"
            required
          />
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Posts with salary details get 2.5x more applicants. Be transparent for best results")}
          </p>
        </div>
        
        {/* Contact Email */}
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="text-base font-medium">
            {t("Contact Email")} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="contactEmail"
            type="email"
            value={formValues.contactEmail || ''}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            placeholder={t("contact@yoursalon.com")}
            className="h-12 text-base"
            required
          />
          <p className="text-xs text-gray-500 flex items-start mt-1">
            <InfoCircle className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
            {t("Applications and inquiries will be sent to this email")}
          </p>
        </div>
      </div>
    </div>
  );
};
