
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MultiSelect } from '@/components/ui/multi-select';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';
import { beautySpecialties, commonRequirements } from '@/data/specialties';
import { ChevronLeft } from 'lucide-react';
import { convertTextToArray, convertToFormattedText } from '@/utils/jobs/jobTemplates';

interface JobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[]) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  initialValues,
  onBack,
  showVietnameseByDefault = false,
  isCustomTemplate = false
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<JobFormValues>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      experience_level: 'intermediate',
      specialties: [],
      requirements: []
    }
  });

  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(initialValues?.specialties || []);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>(initialValues?.requirements || []);
  const [requirementsText, setRequirementsText] = useState<string>('');
  const [specialtiesText, setSpecialtiesText] = useState<string>('');

  useEffect(() => {
    if (initialValues) {
      if (Array.isArray(initialValues.requirements)) {
        setSelectedRequirements(initialValues.requirements);
        setRequirementsText(convertToFormattedText(initialValues.requirements));
      }
      if (Array.isArray(initialValues.specialties)) {
        setSelectedSpecialties(initialValues.specialties);
        setSpecialtiesText(convertToFormattedText(initialValues.specialties));
      }
    }
  }, [initialValues]);

  const handleFormSubmit = (data: JobFormValues) => {
    // For custom template, use the text inputs
    if (isCustomTemplate) {
      const formattedData = {
        ...data,
        requirements: convertTextToArray(requirementsText),
        specialties: convertTextToArray(specialtiesText)
      };
      onSubmit(formattedData, photoUploads);
    } else {
      // For industry templates, use the dropdown selections
      const formattedData = {
        ...data,
        requirements: selectedRequirements,
        specialties: selectedSpecialties
      };
      onSubmit(formattedData, photoUploads);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newPhotos = Array.from(files);
      setPhotoUploads([...newPhotos]);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {onBack && (
        <div className="mb-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Templates
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            placeholder="e.g., Experienced Nail Technician"
            {...register('title', { required: true })}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={() => setShowVietnamese(!showVietnamese)}
              className="text-xs h-7 px-2"
            >
              {showVietnamese ? 'Hide Vietnamese' : 'Add Vietnamese'}
            </Button>
          </div>
          <Textarea
            id="description"
            placeholder="Describe the job responsibilities, benefits, and what you're looking for in an ideal candidate..."
            rows={6}
            {...register('description', { required: true })}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
        </div>
        
        {showVietnamese && (
          <div>
            <Label htmlFor="vietnameseDescription">Description in Vietnamese (optional)</Label>
            <Textarea
              id="vietnameseDescription"
              placeholder="Mô tả công việc bằng tiếng Việt..."
              rows={6}
              {...register('vietnameseDescription')}
            />
          </div>
        )}

        <div>
          <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
          <Input
            id="location"
            placeholder="e.g., San Francisco, CA"
            {...register('location', { required: true })}
            className={errors.location ? 'border-red-500' : ''}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">Location is required</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="jobType">Job Type</Label>
            <Select 
              defaultValue={initialValues?.jobType || 'full-time'} 
              onValueChange={(value) => setValue('jobType', value as any)}
            >
              <SelectTrigger id="jobType">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience_level">Experience Level</Label>
            <Select 
              defaultValue={initialValues?.experience_level || 'intermediate'} 
              onValueChange={(value) => setValue('experience_level', value as any)}
            >
              <SelectTrigger id="experience_level">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="experienced">Experienced</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="salary_range">Salary/Compensation Range (optional)</Label>
            <Input
              id="salary_range"
              placeholder="e.g., $800-1200/week or $25-30/hr"
              {...register('salary_range')}
            />
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation Details (optional)</Label>
            <Input
              id="compensation_details"
              placeholder="e.g., Commission structure, tips, etc."
              {...register('compensation_details')}
            />
          </div>
        </div>

        {isCustomTemplate ? (
          <>
            <div>
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                placeholder="List job requirements, one per line or comma-separated..."
                rows={4}
                value={requirementsText}
                onChange={(e) => setRequirementsText(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="specialties">Specialties/Skills (one per line)</Label>
              <Textarea
                id="specialties"
                placeholder="List required specialties or skills, one per line or comma-separated..."
                rows={4}
                value={specialtiesText}
                onChange={(e) => setSpecialtiesText(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <MultiSelect
                options={requirementOptions}
                selected={selectedRequirements}
                onChange={setSelectedRequirements}
                placeholder="Select requirements"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="specialties">Specialties/Skills</Label>
              <MultiSelect
                options={specialtyOptions}
                selected={selectedSpecialties}
                onChange={setSelectedSpecialties}
                placeholder="Select specialties"
                className="w-full"
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactEmail">Contact Email <span className="text-red-500">*</span></Label>
            <Input
              id="contactEmail"
              type="email"
              placeholder="your.email@example.com"
              {...register('contactEmail', { required: true })}
              className={errors.contactEmail ? 'border-red-500' : ''}
            />
            {errors.contactEmail && <p className="text-red-500 text-sm mt-1">Contact email is required</p>}
          </div>
          
          <div>
            <Label htmlFor="contactPhone">Contact Phone (optional)</Label>
            <Input
              id="contactPhone"
              placeholder="e.g., (555) 123-4567"
              {...register('contactPhone')}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="contactName">Contact Name (optional)</Label>
          <Input
            id="contactName"
            placeholder="e.g., Jane Doe"
            {...register('contactName')}
          />
        </div>

        <div>
          <Label htmlFor="photo">Upload Photo (optional)</Label>
          <Input
            id="photo"
            type="file"
            onChange={handlePhotoUpload}
            accept="image/*"
          />
          <p className="text-gray-500 text-sm mt-1">Upload a photo of your salon or team (recommended size: 800x600px)</p>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? 'Submitting...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
