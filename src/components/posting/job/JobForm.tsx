import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Upload, X, Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import MultiSelect, { Option } from '@/components/ui/multi-select';
import { JobFormValues } from './jobFormSchema';
import { SalonPostPhotoUpload } from '../salon/SalonPostPhotoUpload';
import { Badge } from '@/components/ui/badge';

// Define the allowed job types and experience levels
const allowedJobTypes = ["full-time", "part-time", "contract", "temporary", "commission"] as const;
const allowedExperienceLevels = ["entry", "intermediate", "experienced", "senior"] as const;

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  onBack?: () => void;
  initialValues?: JobFormValues;
  isSubmitting?: boolean;
  photoUploads?: File[];
  setPhotoUploads?: React.Dispatch<React.SetStateAction<File[]>>;
  showVietnameseByDefault?: boolean;
}

const specializationOptions: Option[] = [
  { value: 'manicure', label: 'Manicure' },
  { value: 'pedicure', label: 'Pedicure' },
  { value: 'gel', label: 'Gel' },
  { value: 'acrylic', label: 'Acrylic' },
  { value: 'dip-powder', label: 'Dip Powder' },
  { value: 'nail-art', label: 'Nail Art' },
  { value: 'extensions', label: 'Extensions' },
  { value: 'waxing', label: 'Waxing' },
  { value: 'facial', label: 'Facial' },
  { value: 'massage', label: 'Massage' },
  { value: 'lash-extensions', label: 'Lash Extensions' },
  { value: 'lash-lift', label: 'Lash Lift' },
  { value: 'brow-lamination', label: 'Brow Lamination' },
  { value: 'microblading', label: 'Microblading' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'hair-styling', label: 'Hair Styling' },
  { value: 'hair-color', label: 'Hair Color' },
  { value: 'haircut', label: 'Haircut' },
  { value: 'barber', label: 'Barber' },
];

const requirementOptions: Option[] = [
  { value: 'license', label: 'License Required' },
  { value: 'experience', label: 'Experience Required' },
  { value: 'english', label: 'English Speaking' },
  { value: 'vietnamese', label: 'Vietnamese Speaking' },
  { value: 'own-tools', label: 'Own Tools Required' },
  { value: 'driver-license', label: 'Driver License' },
  { value: 'reliable-transportation', label: 'Reliable Transportation' },
  { value: 'portfolio', label: 'Portfolio Required' },
  { value: 'background-check', label: 'Background Check' },
  { value: 'reference', label: 'References Required' },
];

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  onBack,
  initialValues,
  isSubmitting = false,
  photoUploads = [],
  setPhotoUploads,
  showVietnameseByDefault = false
}) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useFormContext<JobFormValues>();
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [specialties, setSpecialties] = useState<string[]>(initialValues?.specialties || []);
  const [requirements, setRequirements] = useState<string[]>(initialValues?.requirements || []);

  useEffect(() => {
    // Initialize form values if initialValues prop is provided
    if (initialValues) {
      Object.keys(initialValues).forEach(key => {
        setValue(key as keyof JobFormValues, initialValues[key as keyof JobFormValues]);
      });
      setSpecialties(initialValues.specialties || []);
      setRequirements(initialValues.requirements || []);
    }
  }, [initialValues, setValue]);

  const handleSpecialtiesChange = (selected: string[]) => {
    // Convert strings to Option objects if needed
    const selectedOptions = selected.map(value => {
      const option = specializationOptions.find(opt => opt.value === value);
      return option || { value, label: value };
    });
    
    setSpecialties(selected);
  };

  const handleRequirementsChange = (selected: string[]) => {
    // Convert strings to Option objects if needed
    const selectedOptions = selected.map(value => {
      const option = requirementOptions.find(opt => opt.value === value);
      return option || { value, label: value };
    });
    
    setRequirements(selected);
  };

  const handleFormSubmit = (data: JobFormValues) => {
    // Set the selected specialties and requirements to the form data
    data.specialties = specialties;
    data.requirements = requirements;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-playfair font-medium">Job Details</h2>
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>

      {/* Title and Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="e.g., Nail Technician"
            {...register("title", { required: "Job title is required" })}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Houston, TX"
            {...register("location", { required: "Location is required" })}
            className={errors.location ? "border-red-500" : ""}
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
      </div>

      {/* Job Type and Experience Level Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="jobType">Job Type</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select job type" {...register("jobType")} />
            </SelectTrigger>
            <SelectContent>
              {allowedJobTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience_level">Experience Level</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select experience level" {...register("experience_level")} />
            </SelectTrigger>
            <SelectContent>
              {allowedExperienceLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Compensation Details and Salary Range Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="compensation_details">Compensation Details</Label>
          <Input
            id="compensation_details"
            placeholder="e.g., $500 - $800 weekly + tips"
            {...register("compensation_details")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary_range">Salary Range</Label>
          <Input
            id="salary_range"
            placeholder="e.g., $30k - $50k annually"
            {...register("salary_range")}
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-playfair">Description</h3>
          <Badge onClick={() => setShowVietnamese(!showVietnamese)} className="cursor-pointer">
            {showVietnamese ? "English" : "Tiếng Việt"}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">Describe the job position and responsibilities</p>

        <Textarea
          placeholder="Enter job description"
          {...register(showVietnamese ? "vietnameseDescription" : "description", {
            required: "Description is required",
          })}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Specialties Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-playfair">Specialties</h3>
        </div>
        <p className="text-sm text-gray-600">Select relevant specialties for this position</p>
        
        <MultiSelect
          options={specializationOptions}
          selected={specialties}
          onChange={handleSpecialtiesChange}
          placeholder="Select specialties"
          className="w-full"
        />
      </div>
      
      {/* Requirements Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-playfair">Requirements</h3>
        </div>
        <p className="text-sm text-gray-600">Select requirements for applicants</p>
        
        <MultiSelect
          options={requirementOptions}
          selected={requirements}
          onChange={handleRequirementsChange}
          placeholder="Select requirements"
          className="w-full"
        />
      </div>

      {/* Contact Information Section */}
      <Separator />
      <h3 className="text-lg font-playfair">Contact Information</h3>
      <p className="text-sm text-gray-600">Enter contact details for applicants to reach you</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            placeholder="e.g., John Doe"
            {...register("contactName", { required: "Contact name is required" })}
            className={errors.contactName ? "border-red-500" : ""}
          />
          {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            placeholder="e.g., john.doe@example.com"
            type="email"
            {...register("contactEmail", {
              required: "Contact email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={errors.contactEmail ? "border-red-500" : ""}
          />
          {errors.contactEmail && <p className="text-red-500 text-sm">{errors.contactEmail.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            placeholder="e.g., 123-456-7890"
            {...register("contactPhone")}
          />
        </div>
      </div>

      {/* Photo Upload Section */}
      {setPhotoUploads && (
        <SalonPostPhotoUpload
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default JobForm;
