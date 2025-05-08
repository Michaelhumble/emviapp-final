
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

interface CompensationSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const CompensationSection = ({ details, onChange }: CompensationSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compensation Details</h2>
      <p className="text-muted-foreground">Provide compensation information to attract qualified candidates</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="compensation-type">Compensation Type</Label>
          <Select 
            value={details.compensation_type || 'hourly'}
            onValueChange={(value) => onChange({ ...details, compensation_type: value })}
          >
            <SelectTrigger id="compensation-type">
              <SelectValue placeholder="Select compensation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="commission">Commission</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="mixed">Mixed (Salary + Commission)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="compensation-details">Compensation Details</Label>
          <Input 
            id="compensation-details"
            value={details.compensation_details || ''}
            onChange={(e) => onChange({ ...details, compensation_details: e.target.value })}
            placeholder="e.g. $25-35/hr or 60% commission"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="weekly-pay">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="weekly-pay"
                checked={details.weekly_pay || false}
                onChange={(e) => onChange({ ...details, weekly_pay: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span>Weekly Pay Available</span>
            </div>
          </Label>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="tip-range">Expected Tip Range (Optional)</Label>
          <Input 
            id="tip-range"
            value={details.tip_range || ''}
            onChange={(e) => onChange({ ...details, tip_range: e.target.value })}
            placeholder="e.g. $100-200/day"
          />
        </div>
      </div>
    </div>
  );
};

export default CompensationSection;
