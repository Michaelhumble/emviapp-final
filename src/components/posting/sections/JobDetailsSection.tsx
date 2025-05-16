
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

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
}

const JobDetailsSection = ({ details, onChange, photoUploads, setPhotoUploads }: JobDetailsSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t("Job Details")}
      </h2>
      <p className="text-muted-foreground">
        {t("Provide information about the position to attract qualified candidates")}
      </p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">
            {t("Job Title")}
          </Label>
          <Input 
            id="title"
            value={details.title || ''}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            placeholder={t("e.g. Nail Technician")}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type">
            {t("Employment Type")}
          </Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type">
              <SelectValue placeholder={t("Select employment type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">{t("Full-time")}</SelectItem>
              <SelectItem value="part-time">{t("Part-time")}</SelectItem>
              <SelectItem value="contract">{t("Contract")}</SelectItem>
              <SelectItem value="temporary">{t("Temporary")}</SelectItem>
              <SelectItem value="commission">{t("Commission")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">
            {t("Job Description")}
          </Label>
          <Textarea 
            id="description"
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder={t("Describe the responsibilities and qualifications...")}
            rows={6}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">
            {t("Location")}
          </Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder={t("City, State")}
          />
        </div>
          
        <div className="grid gap-2">
          <Label htmlFor="salary-range">
            {t("Salary Range")}
          </Label>
          <Input 
            id="salary-range"
            value={details.salary_range || ''}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t("e.g. $15-20/hour")}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="experience-level">
            {t("Experience Level")}
          </Label>
          <Select 
            value={details.experience_level || ''}
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
          >
            <SelectTrigger id="experience-level">
              <SelectValue placeholder={t("Select experience level")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">{t("Entry Level")}</SelectItem>
              <SelectItem value="intermediate">{t("Intermediate")}</SelectItem>
              <SelectItem value="experienced">{t("Experienced")}</SelectItem>
              <SelectItem value="senior">{t("Senior")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
