
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JobFormData } from '@/types/job';

interface JobFormFieldsProps {
  formData: JobFormData;
  onChange: (field: keyof JobFormData, value: any) => void;
  onContactInfoChange: (field: string, value: string) => void;
}

const JobFormFields: React.FC<JobFormFieldsProps> = ({ 
  formData, 
  onChange, 
  onContactInfoChange 
}) => {
  return (
    <div className="space-y-6">
      {/* Job Title */}
      <div>
        <Label htmlFor="title" className="text-base font-medium">
          Job Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Enter job title"
          className="mt-1.5"
          required
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location" className="text-base font-medium">
          Location <span className="text-red-500">*</span>
        </Label>
        <Input
          id="location"
          value={formData.location || ''}
          onChange={(e) => onChange('location', e.target.value)}
          placeholder="City, State"
          className="mt-1.5"
          required
        />
      </div>

      {/* Employment Type */}
      <div>
        <Label htmlFor="employment_type" className="text-base font-medium">
          Employment Type
        </Label>
        <Select 
          value={formData.employment_type || ''} 
          onValueChange={(value) => onChange('employment_type', value)}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="temporary">Temporary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Compensation Type */}
      <div>
        <Label htmlFor="compensation_type" className="text-base font-medium">
          Compensation Type
        </Label>
        <Select 
          value={formData.compensation_type || ''} 
          onValueChange={(value) => onChange('compensation_type', value)}
        >
          <SelectTrigger className="mt-1.5">
            <SelectValue placeholder="Select compensation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
            <SelectItem value="commission">Commission</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Compensation Details */}
      <div>
        <Label htmlFor="compensation_details" className="text-base font-medium">
          Compensation Details
        </Label>
        <Input
          id="compensation_details"
          value={formData.compensation_details || ''}
          onChange={(e) => onChange('compensation_details', e.target.value)}
          placeholder="e.g., $15-20/hour, $40,000-50,000/year"
          className="mt-1.5"
        />
      </div>

      {/* Job Description */}
      <div>
        <Label htmlFor="description" className="text-base font-medium">
          Job Description
        </Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Describe the job responsibilities and requirements..."
          className="mt-1.5 min-h-[120px]"
        />
      </div>

      {/* Contact Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="owner_name" className="text-base">
              Contact Name
            </Label>
            <Input
              id="owner_name"
              value={formData.contact_info?.owner_name || ''}
              onChange={(e) => onContactInfoChange('owner_name', e.target.value)}
              placeholder="Your name"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-base">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.contact_info?.phone || ''}
              onChange={(e) => onContactInfoChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-base">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.contact_info?.email || ''}
              onChange={(e) => onContactInfoChange('email', e.target.value)}
              placeholder="your@email.com"
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="zalo" className="text-base">
              Zalo ID (Optional)
            </Label>
            <Input
              id="zalo"
              value={formData.contact_info?.zalo || ''}
              onChange={(e) => onContactInfoChange('zalo', e.target.value)}
              placeholder="Zalo username"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="notes" className="text-base">
            Additional Notes
          </Label>
          <Textarea
            id="notes"
            value={formData.contact_info?.notes || ''}
            onChange={(e) => onContactInfoChange('notes', e.target.value)}
            placeholder="Any additional information..."
            className="mt-1.5"
          />
        </div>
      </div>
    </div>
  );
};

export default JobFormFields;
