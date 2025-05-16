
import React from 'react';
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

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
}

const JobDetailsSection = ({ details, onChange, photoUploads, setPhotoUploads }: JobDetailsSectionProps) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.jobDetails;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t(translations.sectionTitle)}
      </h2>
      <p className="text-muted-foreground">
        {t(translations.sectionDescription)}
      </p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">
            {t(translations.jobTitle)}
          </Label>
          <Input 
            id="title"
            value={details.title || ''}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            placeholder={t(translations.jobTitlePlaceholder)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type">
            {t(translations.employmentType)}
          </Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type">
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
          <Label htmlFor="description">
            {t(translations.jobDescription)}
          </Label>
          <Textarea 
            id="description"
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder={t(translations.jobDescriptionPlaceholder)}
            rows={6}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">
            {t(translations.location)}
          </Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder={t(translations.locationPlaceholder)}
          />
        </div>
          
        <div className="grid gap-2">
          <Label htmlFor="salary-range">
            {t(translations.salaryRange)}
          </Label>
          <Input 
            id="salary-range"
            value={details.salary_range || ''}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t(translations.salaryRangePlaceholder)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="experience-level">
            {t(translations.experienceLevel)}
          </Label>
          <Select 
            value={details.experience_level || ''}
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
          >
            <SelectTrigger id="experience-level">
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
