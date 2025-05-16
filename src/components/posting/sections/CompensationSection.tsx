
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
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t("Compensation")}</h2>
      <p className="text-muted-foreground">{t("Specify the compensation details for this position")}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type">{t("Compensation Type")}</Label>
          <Select 
            value={details.compensation_type}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type">
              <SelectValue placeholder={t("Select compensation type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">{t("Hourly")}</SelectItem>
              <SelectItem value="salary">{t("Salary")}</SelectItem>
              <SelectItem value="commission">{t("Commission Only")}</SelectItem>
              <SelectItem value="commission_plus">{t("Commission + Base")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="salary-range">{t("Salary Range")}</Label>
          <Input 
            id="salary-range"
            value={details.salary_range}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder={t("e.g. $15-20/hour or $40K-50K/year")}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">{t("Expected Tips")}</Label>
          <Input 
            id="tip-range"
            value={details.tip_range}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder={t("e.g. $100-200/day")}
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
