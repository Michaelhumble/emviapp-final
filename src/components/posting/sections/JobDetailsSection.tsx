
import React, { useState } from 'react';
import { Job } from '@/types/job';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import AIPolishButton from '@/components/posting/job/AIPolishButton';
import { IndustryType } from '@/components/posting/job/jobFormSchema';

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  industryType?: IndustryType;
}

const JobDetailsSection = ({ 
  details, 
  onChange, 
  photoUploads, 
  setPhotoUploads,
  industryType 
}: JobDetailsSectionProps) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.jobDetails;
  
  const handleAIPolishSuggestion = (suggestion: string) => {
    // Append the suggestion to the current description
    const currentDesc = details.description || '';
    const enhancedDesc = currentDesc + (currentDesc ? '\n\n' : '') + suggestion + ':';
    onChange({ ...details, description: enhancedDesc });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t(translations.sectionTitle)}
      </h2>
      <p className="text-muted-foreground">
        {t(translations.sectionDescription)}
      </p>
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="title" className="flex items-center gap-2">
              {t(translations.jobTitle)}
              <span className="text-xs text-rose-500">*</span>
            </Label>
          </div>
          <Input 
            id="title"
            value={details.title || ''}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            placeholder={t(translations.jobTitlePlaceholder)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
            required
          />
          <p className="text-xs text-muted-foreground">
            {t("E.g. 'Experienced Nail Technician' is better than 'Hiring Nail Tech'")}
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type" className="flex items-center gap-2">
            {t(translations.employmentType)}
            <span className="text-xs text-rose-500">*</span>
          </Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type" className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow">
              <SelectValue placeholder={t(translations.selectEmploymentType)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">{t(translations.employmentTypes.fullTime)}</SelectItem>
              <SelectItem value="part-time">{t(translations.employmentTypes.partTime)}</SelectItem>
              <SelectItem value="contract">{t(translations.employmentTypes.contract)}</SelectItem>
              <SelectItem value="temporary">{t(translations.employmentTypes.temporary)}</SelectItem>
              <SelectItem value="commission">{t(translations.employmentTypes.commission)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description" className="flex items-center gap-2">
              {t(translations.jobDescription)}
              <span className="text-xs text-rose-500">*</span>
            </Label>
            <AIPolishButton 
              industryType={industryType} 
              onSelectSuggestion={handleAIPolishSuggestion}
            />
          </div>
          <Textarea 
            id="description"
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder={t(translations.jobDescriptionPlaceholder)}
            rows={8}
            className="bg-white resize-y min-h-[200px] border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
            <p className="text-xs text-blue-700">
              {t("Tip: Detailed descriptions attract 3x more qualified candidates. Include job duties, benefits, and required skills.")}
            </p>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            {t(translations.location)}
            <span className="text-xs text-rose-500">*</span>
          </Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder={t(translations.locationPlaceholder)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <p className="text-xs text-muted-foreground">
            {t("Include both city and state for better visibility in search results")}
          </p>
        </div>
          
        <div className="grid gap-2">
          <Label htmlFor="salary-range" className="flex items-center gap-2">
            {t(translations.salaryRange)}
          </Label>
          <Input 
            id="salary-range"
            value={details.salary_range || ''}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t(translations.salaryRangePlaceholder)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{t("Posts with salary information get 2x more applicants")}</span>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="experience-level" className="flex items-center gap-2">
            {t(translations.experienceLevel)}
          </Label>
          <Select 
            value={details.experience_level || ''}
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
          >
            <SelectTrigger id="experience-level" className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow">
              <SelectValue placeholder={t(translations.selectExperienceLevel)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">{t(translations.experienceLevels.entry)}</SelectItem>
              <SelectItem value="intermediate">{t(translations.experienceLevels.intermediate)}</SelectItem>
              <SelectItem value="experienced">{t(translations.experienceLevels.experienced)}</SelectItem>
              <SelectItem value="senior">{t(translations.experienceLevels.senior)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
