
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AIPolishButton } from '@/components/posting/job/AIPolishButton';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import { IndustryType } from '@/components/posting/job/jobFormSchema';

interface JobDetailsSectionProps {
  details: any;
  onChange: (details: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  industryType?: IndustryType;
}

const JobDetailsSection: React.FC<JobDetailsSectionProps> = ({
  details,
  onChange,
  photoUploads,
  setPhotoUploads,
  industryType
}) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.jobDetails;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...details, [name]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        {t(translations.sectionTitle)}
      </h2>
      
      <p className="text-gray-600">
        {t(translations.sectionDescription)}
      </p>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            {t(translations.jobTitle)}
          </Label>
          <Input
            id="title"
            name="title"
            value={details.title}
            onChange={handleChange}
            placeholder={t(translations.jobTitlePlaceholder)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          {t(translations.industryLabel)}
          
          <div className="space-y-2">
            <Label htmlFor="industry">
              {t(translations.industryTitle)}
            </Label>
            <Select 
              name="industry" 
              value={details.industry || ''} 
              onValueChange={(value) => onChange({ ...details, industry: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t(translations.selectIndustry)} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nails">{t(translations.nailIndustry)}</SelectItem>
                <SelectItem value="hair">{t(translations.hairIndustry)}</SelectItem>
                <SelectItem value="lashes">{t(translations.lashIndustry)}</SelectItem>
                <SelectItem value="massage">{t(translations.massageIndustry)}</SelectItem>
                <SelectItem value="brows">{t(translations.browsIndustry)}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">
            {t(translations.descriptionLabel)}
          </Label>
          <div className="flex justify-end">
            <AIPolishButton />
          </div>
          
          <Textarea
            id="description"
            name="description"
            value={details.description}
            onChange={handleChange}
            placeholder={t(translations.descriptionPlaceholder)}
            rows={6}
            className="w-full"
          />
          
          <p className="text-xs text-gray-500">
            {t(translations.descriptionHelp)}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">
            {t(translations.locationLabel)}
          </Label>
          <Input
            id="location"
            name="location"
            value={details.location}
            onChange={handleChange}
            placeholder={t(translations.locationPlaceholder)}
            className="w-full"
          />
          
          <p className="text-xs text-gray-500">
            {t(translations.locationHelp)}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="requirements">
            {t(translations.requirementsLabel)}
          </Label>
          <Input
            id="requirements"
            name="requirements"
            value={details.requirements}
            onChange={handleChange}
            placeholder={t(translations.requirementsPlaceholder)}
            className="w-full"
          />
          
          <p className="text-xs text-gray-500">
            {t(translations.requirementsHelp)}
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experience_level">
            {t(translations.experienceLabel)}
          </Label>
          <Select 
            name="experience_level" 
            value={details.experience_level || 'experienced'} 
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t(translations.selectExperience)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">{t(translations.entryLevel)}</SelectItem>
              <SelectItem value="intermediate">{t(translations.intermediateLevel)}</SelectItem>
              <SelectItem value="experienced">{t(translations.experiencedLevel)}</SelectItem>
              <SelectItem value="senior">{t(translations.seniorLevel)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
