
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
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';

interface CompensationSectionProps {
  details: {
    employment_type: string;
    compensation_type: string;
    compensation_details: string;
    salary_range: string;
    tip_range: string;
    experience_level: string;
  };
  onChange: (compensation: any) => void;
}

const CompensationSection = ({ details, onChange }: CompensationSectionProps) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.compensation;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t(translations.sectionTitle)}</h2>
      <p className="text-muted-foreground">{t(translations.sectionDescription)}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type">{t(translations.compensationType)}</Label>
          <Select 
            value={details.compensation_type}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type">
              <SelectValue placeholder={t(translations.selectCompensationType)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">{t(translations.compensationTypes.hourly)}</SelectItem>
              <SelectItem value="salary">{t(translations.compensationTypes.salary)}</SelectItem>
              <SelectItem value="commission">{t(translations.compensationTypes.commission)}</SelectItem>
              <SelectItem value="commission_plus">{t(translations.compensationTypes.commissionPlus)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="salary-range">{t(translations.salaryRange)}</Label>
          <Input 
            id="salary-range"
            value={details.salary_range}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t(translations.salaryRangePlaceholder)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">{t(translations.expectedTips)}</Label>
          <Input 
            id="tip-range"
            value={details.tip_range}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder={t(translations.expectedTipsPlaceholder)}
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
