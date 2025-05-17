
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';

interface CompensationDetailsProps {
  details: {
    employment_type: string;
    compensation_type: string;
    compensation_details?: string;
    salary_range?: string;
    tip_range?: string;
    experience_level: string;
  };
  onChange: (details: any) => void;
}

const CompensationSection: React.FC<CompensationDetailsProps> = ({ details, onChange }) => {
  const { t } = useTranslation();
  const compensationTranslations = jobPostingTranslations.compensation;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: value
    });
  };
  
  const handleEmploymentTypeChange = (value: string) => {
    onChange({
      ...details,
      employment_type: value
    });
  };
  
  const handleCompensationTypeChange = (value: string) => {
    onChange({
      ...details,
      compensation_type: value
    });
  };
  
  const handleExperienceLevelChange = (value: string) => {
    onChange({
      ...details,
      experience_level: value
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t(compensationTranslations.title)}</h2>
      
      {/* Employment Type */}
      <div className="space-y-3">
        <Label className="text-base">{t(compensationTranslations.employmentType)}</Label>
        <RadioGroup 
          value={details.employment_type} 
          onValueChange={handleEmploymentTypeChange}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full-time" id="full-time" />
            <Label htmlFor="full-time" className="cursor-pointer">
              {t(compensationTranslations.fullTime)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="part-time" id="part-time" />
            <Label htmlFor="part-time" className="cursor-pointer">
              {t(compensationTranslations.partTime)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="contract" id="contract" />
            <Label htmlFor="contract" className="cursor-pointer">
              {t(compensationTranslations.contract)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="temporary" id="temporary" />
            <Label htmlFor="temporary" className="cursor-pointer">
              {t(compensationTranslations.temporary)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commission" id="commission" />
            <Label htmlFor="commission" className="cursor-pointer">
              {t(compensationTranslations.commission)}
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Compensation Type */}
      <div className="space-y-3">
        <Label className="text-base">{t(compensationTranslations.compensationType)}</Label>
        <RadioGroup 
          value={details.compensation_type} 
          onValueChange={handleCompensationTypeChange}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hourly" id="hourly" />
            <Label htmlFor="hourly" className="cursor-pointer">
              {t(compensationTranslations.hourly)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="salary" id="salary" />
            <Label htmlFor="salary" className="cursor-pointer">
              {t(compensationTranslations.salary)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="commission_only" id="commission_only" />
            <Label htmlFor="commission_only" className="cursor-pointer">
              {t(compensationTranslations.commissionOnly)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hybrid" id="hybrid" />
            <Label htmlFor="hybrid" className="cursor-pointer">
              {t(compensationTranslations.hybrid)}
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      {/* Salary Range */}
      <div>
        <Label htmlFor="salary_range" className="text-base">
          {t(compensationTranslations.salaryRange)} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="salary_range"
          name="salary_range"
          placeholder={t(compensationTranslations.salaryRangePlaceholder)}
          value={details.salary_range || ''}
          onChange={handleInputChange}
          className="mt-1.5"
          required
        />
      </div>
      
      {/* Tip Range */}
      <div>
        <Label htmlFor="tip_range" className="text-base">
          {t(compensationTranslations.tipRange)}
        </Label>
        <Input
          id="tip_range"
          name="tip_range"
          placeholder={t(compensationTranslations.tipRangePlaceholder)}
          value={details.tip_range || ''}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      
      {/* Experience Level */}
      <div className="space-y-3">
        <Label className="text-base">{t(compensationTranslations.experienceLevel)}</Label>
        <RadioGroup 
          value={details.experience_level} 
          onValueChange={handleExperienceLevelChange}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="entry" id="entry" />
            <Label htmlFor="entry" className="cursor-pointer">
              {t(compensationTranslations.entry)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="intermediate" id="intermediate" />
            <Label htmlFor="intermediate" className="cursor-pointer">
              {t(compensationTranslations.intermediate)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experienced" id="experienced" />
            <Label htmlFor="experienced" className="cursor-pointer">
              {t(compensationTranslations.experienced)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="senior" id="senior" />
            <Label htmlFor="senior" className="cursor-pointer">
              {t(compensationTranslations.senior)}
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default CompensationSection;
