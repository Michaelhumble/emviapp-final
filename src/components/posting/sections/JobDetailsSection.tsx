
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AIPolishButton from '@/components/posting/job/AIPolishButton';
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
  const [showVietnamese, setShowVietnamese] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...details, [name]: value });
  };

  const handlePolishWithAI = (polishedText: string) => {
    onChange({ ...details, description: polishedText });
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
            value={details.title || ''}
            onChange={handleChange}
            placeholder={t(translations.jobTitlePlaceholder)}
            className="w-full"
          />
        </div>
        
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
              <SelectItem value="skincare">{t(translations.skincareIndustry)}</SelectItem>
              <SelectItem value="tattoo">{t(translations.tattooIndustry)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="description">
              {t(translations.descriptionLabel)}
            </Label>
            <AIPolishButton onPolish={handlePolishWithAI} />
          </div>
          
          <Textarea
            id="description"
            name="description"
            value={details.description || ''}
            onChange={handleChange}
            placeholder={t(translations.descriptionPlaceholder)}
            rows={6}
            className="w-full"
          />
          
          <p className="text-xs text-gray-500">
            {t(translations.descriptionHelp)}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowVietnamese(!showVietnamese)}
            className="text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center gap-2"
          >
            {showVietnamese ? "Hide Vietnamese Description" : "Add Vietnamese Description"}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showVietnamese ? <polyline points="18 15 12 9 6 15"></polyline> : <polyline points="6 9 12 15 18 9"></polyline>}
            </svg>
          </button>
        </div>
        
        {showVietnamese && (
          <div className="space-y-2 pt-2 pb-4 border-t border-gray-100">
            <Label htmlFor="vietnameseDescription">
              {t({
                english: "Vietnamese Description",
                vietnamese: "Mô tả bằng tiếng Việt"
              })}
            </Label>
            <Textarea
              id="vietnameseDescription"
              name="vietnameseDescription"
              value={details.vietnameseDescription || ''}
              onChange={handleChange}
              placeholder={t({
                english: "Enter job description in Vietnamese to reach more applicants",
                vietnamese: "Nhập mô tả công việc bằng tiếng Việt để tiếp cận nhiều ứng viên hơn"
              })}
              rows={6}
              className="w-full"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="location">
            {t(translations.locationLabel)}
          </Label>
          <Input
            id="location"
            name="location"
            value={details.location || ''}
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
          <Textarea
            id="requirements"
            name="requirements"
            value={Array.isArray(details.requirements) ? details.requirements.join(', ') : details.requirements || ''}
            onChange={(e) => {
              const value = e.target.value;
              // Convert comma-separated string to array
              const requirementsArray = value.split(',').map(item => item.trim()).filter(item => item);
              onChange({ ...details, requirements: requirementsArray.length > 0 ? requirementsArray : value });
            }}
            placeholder={t(translations.requirementsPlaceholder)}
            className="w-full"
            rows={3}
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
