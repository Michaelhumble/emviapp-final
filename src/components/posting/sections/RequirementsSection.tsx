
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RequirementsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const RequirementsSection = ({ details, onChange }: RequirementsSectionProps) => {
  // Handle adding a requirement
  const addRequirement = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const requirements = Array.isArray(details.requirements) 
        ? [...details.requirements, e.currentTarget.value] 
        : [e.currentTarget.value];
      onChange({ ...details, requirements });
      e.currentTarget.value = '';
    }
  };

  // Handle removing a requirement
  const removeRequirement = (index: number) => {
    if (Array.isArray(details.requirements)) {
      const requirements = [...details.requirements];
      requirements.splice(index, 1);
      onChange({ ...details, requirements });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Requirements</h2>
      <p className="text-muted-foreground">Specify what you're looking for in candidates</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="experience-level">Experience Level</Label>
          <RadioGroup 
            value={details.experience_level || 'any'} 
            onValueChange={(value) => onChange({ ...details, experience_level: value })}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="any" id="any" />
              <Label htmlFor="any">Any Experience</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entry" id="entry" />
              <Label htmlFor="entry">Entry Level</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experienced" id="experienced" />
              <Label htmlFor="experienced">Experienced</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid gap-2">
          <Label>Requirements</Label>
          <div className="space-y-3">
            <Input
              placeholder="Add requirement and press Enter"
              onKeyDown={addRequirement}
            />
            
            {Array.isArray(details.requirements) && details.requirements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {details.requirements.map((req, index) => (
                  <Card key={index} className="bg-gray-100">
                    <CardContent className="p-2 flex items-center">
                      <span className="mr-2">{req}</span>
                      <button 
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="grid gap-2 mt-4">
          <Label>Additional Benefits</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="has-housing"
                checked={details.has_housing || false}
                onChange={(e) => onChange({ ...details, has_housing: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="has-housing">Housing Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="has-wax-room"
                checked={details.has_wax_room || false}
                onChange={(e) => onChange({ ...details, has_wax_room: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="has-wax-room">Wax Room Available</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="no-supply-deduction"
                checked={details.no_supply_deduction || false}
                onChange={(e) => onChange({ ...details, no_supply_deduction: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="no-supply-deduction">No Supply Deduction</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="owner-will-train"
                checked={details.owner_will_train || false}
                onChange={(e) => onChange({ ...details, owner_will_train: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="owner-will-train">Owner Will Train</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsSection;
