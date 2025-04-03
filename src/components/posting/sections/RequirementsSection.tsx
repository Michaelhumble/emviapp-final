
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface RequirementsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const RequirementsSection = ({ details, onChange }: RequirementsSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Requirements</h2>
      <p className="text-muted-foreground">Specify the qualifications needed for this position</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="requirements">Qualifications & Requirements</Label>
          <textarea
            id="requirements"
            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={details.requirements || ''}
            onChange={(e) => onChange({ ...details, requirements: e.target.value })}
            placeholder="Experience required, certifications needed, language skills, etc."
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Additional Options</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="owner-will-train" className="cursor-pointer">
              Owner Will Train
              <p className="text-sm text-muted-foreground">Indicate if training will be provided</p>
            </Label>
            <Switch
              id="owner-will-train"
              checked={details.owner_will_train || false}
              onCheckedChange={(checked) => onChange({ ...details, owner_will_train: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="has-housing" className="cursor-pointer">
              Housing Available
              <p className="text-sm text-muted-foreground">Indicate if housing is available</p>
            </Label>
            <Switch
              id="has-housing"
              checked={details.has_housing || false}
              onCheckedChange={(checked) => onChange({ ...details, has_housing: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="no-supply-deduction" className="cursor-pointer">
              No Supply Deduction
              <p className="text-sm text-muted-foreground">Indicate if supplies are provided without cost</p>
            </Label>
            <Switch
              id="no-supply-deduction"
              checked={details.no_supply_deduction || false}
              onCheckedChange={(checked) => onChange({ ...details, no_supply_deduction: checked })}
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="specialties">Specialties (comma separated)</Label>
          <Input
            id="specialties"
            placeholder="e.g. Acrylic, Gel, Dipping Powder, Pedicure, Massage"
            value={details.specialties ? details.specialties.join(', ') : ''}
            onChange={(e) => {
              const specialtiesArr = e.target.value
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== '');
              onChange({ ...details, specialties: specialtiesArr });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;
