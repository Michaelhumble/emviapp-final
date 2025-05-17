
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import { IndustryType } from '../job/jobFormSchema';
import AIPolishButton from '../AIPolishButton';

interface JobDetailsProps {
  details: {
    title: string;
    description: string;
    vietnameseDescription?: string;
    location: string;
    requirements: string[];
    specialties?: string[];
  };
  onChange: (details: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  industryType?: IndustryType;
}

const JobDetailsSection: React.FC<JobDetailsProps> = ({ 
  details, 
  onChange, 
  photoUploads, 
  setPhotoUploads,
  industryType
}) => {
  const { t } = useTranslation();
  const jobDetailTranslations = jobPostingTranslations.jobDetails;
  const validationTranslations = jobPostingTranslations.validation;
  
  const [newRequirement, setNewRequirement] = useState('');
  
  const handleAddRequirement = () => {
    if (newRequirement.trim() === '') return;
    onChange({
      ...details,
      requirements: [...details.requirements, newRequirement.trim()]
    });
    setNewRequirement('');
  };
  
  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...details.requirements];
    updatedRequirements.splice(index, 1);
    onChange({
      ...details,
      requirements: updatedRequirements
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: value
    });
  };

  const handlePolishDescription = (polishedText: string) => {
    onChange({
      ...details,
      description: polishedText
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t(jobDetailTranslations.title)}</h2>
      
      {/* Job Title */}
      <div>
        <Label htmlFor="title" className="text-base">
          {t(jobDetailTranslations.jobTitle)} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder={t(jobDetailTranslations.jobTitlePlaceholder)}
          value={details.title}
          onChange={handleInputChange}
          className="mt-1.5"
          required
        />
      </div>
      
      {/* Job Description */}
      <div>
        <div className="flex justify-between items-center">
          <Label htmlFor="description" className="text-base">
            {t(jobDetailTranslations.description)} <span className="text-red-500">*</span>
          </Label>
          <AIPolishButton 
            text={details.description}
            onPolish={handlePolishDescription}
            context="job description"
          />
        </div>
        <Textarea
          id="description"
          name="description"
          placeholder={t(jobDetailTranslations.descriptionPlaceholder)}
          value={details.description}
          onChange={handleInputChange}
          className="mt-1.5 min-h-[150px]"
          required
        />
      </div>

      {/* Vietnamese Description */}
      <div>
        <Label htmlFor="vietnameseDescription" className="text-base">
          {t(jobDetailTranslations.vietnameseDescription)}
        </Label>
        <Textarea
          id="vietnameseDescription"
          name="vietnameseDescription"
          placeholder={t(jobDetailTranslations.vietnameseDescriptionPlaceholder)}
          value={details.vietnameseDescription || ''}
          onChange={handleInputChange}
          className="mt-1.5 min-h-[150px]"
        />
      </div>
      
      {/* Location */}
      <div>
        <Label htmlFor="location" className="text-base">
          {t(jobDetailTranslations.location)} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          name="location"
          placeholder={t(jobDetailTranslations.locationPlaceholder)}
          value={details.location}
          onChange={handleInputChange}
          className="mt-1.5"
          required
        />
      </div>
      
      {/* Requirements */}
      <div>
        <Label className="text-base">
          {t(jobDetailTranslations.requirementTitle)}
        </Label>
        
        <div className="flex mt-1.5">
          <Input
            placeholder={t(jobDetailTranslations.requirementPlaceholder)}
            value={newRequirement}
            onChange={(e) => setNewRequirement(e.target.value)}
            className="flex-1 rounded-r-none"
          />
          <Button 
            type="button" 
            onClick={handleAddRequirement}
            className="rounded-l-none bg-gray-800"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t(jobDetailTranslations.addRequirement)}
          </Button>
        </div>
        
        {details.requirements.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {details.requirements.map((requirement, index) => (
              <Badge key={index} variant="secondary" className="pl-3 pr-2 py-1.5 text-sm bg-gray-100">
                {requirement}
                <X 
                  className="h-4 w-4 ml-1 cursor-pointer hover:text-red-500" 
                  onClick={() => handleRemoveRequirement(index)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailsSection;
