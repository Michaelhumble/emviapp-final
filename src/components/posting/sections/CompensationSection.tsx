
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
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type">{t(translations.compensationTypeLabel)}</Label>
          <Select 
            value={details.compensation_type}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type" className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow">
              <SelectValue placeholder={t(translations.selectCompensationTypeLabel)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">{t(translations.compensationTypesOptions.hourly)}</SelectItem>
              <SelectItem value="salary">{t(translations.compensationTypesOptions.salary)}</SelectItem>
              <SelectItem value="commission">{t(translations.compensationTypesOptions.commission)}</SelectItem>
              <SelectItem value="commission_plus">{t(translations.compensationTypesOptions.commissionPlus)}</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            {t("Select the primary way the position is compensated")}
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="salary-range">{t(translations.salaryRangeLabel)}</Label>
          <Input 
            id="salary-range"
            value={details.salary_range}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t(translations.salaryRangeLabel)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <div className="flex items-start gap-2 mt-1">
            <div className="bg-amber-50 p-3 rounded-md border border-amber-100 text-xs text-amber-800">
              {t("Tip: Jobs with clear salary details get 2.5x more applicants and higher quality candidates")}
            </div>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">{t(translations.tipRangeLabel)}</Label>
          <Input 
            id="tip-range"
            value={details.tip_range}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder={t(translations.tipRangePlaceholder)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <p className="text-xs text-muted-foreground">
            {t("Provides a complete picture of earning potential, especially important for commission positions")}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-800">{t("Why share compensation details?")}</h3>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("Attracts qualified candidates who match your compensation range")}</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("Reduces time spent interviewing candidates with mismatched expectations")}</span>
            </li>
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("93% of applicants say compensation is the #1 factor when considering jobs")}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
