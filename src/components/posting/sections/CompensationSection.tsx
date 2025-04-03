
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CompensationSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const CompensationSection = ({ details, onChange }: CompensationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compensation</h2>
      <p className="text-muted-foreground">Details about payment and benefits</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Compensation Type</Label>
          <RadioGroup 
            value={details.compensation_type || 'hourly'} 
            onValueChange={(value) => onChange({ 
              ...details, 
              compensation_type: value
            })}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hourly" id="hourly" />
              <Label htmlFor="hourly" className="cursor-pointer">Hourly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="commission" id="commission" />
              <Label htmlFor="commission" className="cursor-pointer">Commission</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="salary" id="salary" />
              <Label htmlFor="salary" className="cursor-pointer">Salary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mixed" id="mixed" />
              <Label htmlFor="mixed" className="cursor-pointer">Mixed (base + commission)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="compensation-details">Compensation Details</Label>
          <Input
            id="compensation-details"
            value={details.compensation_details || ''}
            onChange={(e) => onChange({ ...details, compensation_details: e.target.value })}
            placeholder="e.g. $20-25/hr or 60% commission"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="salary-range">Salary Range</Label>
          <Input
            id="salary-range"
            value={details.salary_range || ''}
            onChange={(e) => onChange({ ...details, salary_range: e.target.value })}
            placeholder="e.g. $800-$1,200/week"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">Expected Tips (optional)</Label>
          <Input
            id="tip-range"
            value={details.tip_range || ''}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder="e.g. $100-$200/day"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="weekly-pay" className="cursor-pointer">
            Weekly Pay
            <p className="text-sm text-muted-foreground">Payouts are made weekly</p>
          </Label>
          <Switch
            id="weekly-pay"
            checked={details.weekly_pay || false}
            onCheckedChange={(checked) => onChange({ ...details, weekly_pay: checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
