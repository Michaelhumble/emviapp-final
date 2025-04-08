
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface JobDetailsSectionProps {
  details: Partial<Job>;
  onChange: (details: Partial<Job>) => void;
}

const JobDetailsSection = ({ details, onChange }: JobDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Job Details</h2>
      <p className="text-muted-foreground">Basic information about the job position</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Job Title</Label>
          <Input 
            id="title"
            value={details.title || ''}
            onChange={(e) => onChange({ ...details, title: e.target.value })}
            placeholder="e.g. Nail Technician, Hair Stylist"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location"
            value={details.location || ''}
            onChange={(e) => onChange({ ...details, location: e.target.value })}
            placeholder="e.g. Los Angeles, CA"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="employment-type">Employment Type</Label>
          <Select 
            value={details.employment_type || 'full-time'}
            onValueChange={(value) => onChange({ ...details, employment_type: value })}
          >
            <SelectTrigger id="employment-type">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Job Description</Label>
          <textarea
            id="description"
            className="min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={details.description || ''}
            onChange={(e) => onChange({ ...details, description: e.target.value })}
            placeholder="Describe the job position, responsibilities, and benefits"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
