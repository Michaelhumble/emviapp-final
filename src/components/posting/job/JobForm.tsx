
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Upload, X } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { requirementOptions, specialtyOptions } from '@/utils/posting/options';

interface JobFormProps {
  onSubmit: (data: JobFormValues, photoUploads: File[]) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  isSubmitting = false,
  initialValues,
  onBack,
  showVietnameseByDefault = false,
}) => {
  const [formData, setFormData] = useState<JobFormValues>({
    title: '',
    description: '',
    vietnameseDescription: '',
    location: '',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    requirements: [],
    specialties: [],
    salary_range: '',
    compensation_details: '',
  });
  
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [requirementsText, setRequirementsText] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');

  // Initialize form with initial values if provided
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
      
      // Convert arrays to text for the textareas
      if (Array.isArray(initialValues.requirements)) {
        setRequirementsText(initialValues.requirements.join('\n'));
      }
      
      if (Array.isArray(initialValues.specialties)) {
        setSpecialtiesText(initialValues.specialties.join('\n'));
      }
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploads([e.target.files[0]]);
    }
  };

  const removeUploadedFile = () => {
    setPhotoUploads([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process requirements and specialties from text inputs to arrays
    const requirements = requirementsText
      .split(/[\n,]/) // Split by newline or comma
      .map(item => item.trim())
      .filter(item => item !== '');
      
    const specialties = specialtiesText
      .split(/[\n,]/) // Split by newline or comma
      .map(item => item.trim())
      .filter(item => item !== '');
    
    onSubmit({
      ...formData,
      requirements,
      specialties,
    }, photoUploads);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {onBack && (
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 pl-0 hover:bg-transparent"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Templates
        </Button>
      )}
      
      {/* Job Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Job Details</h3>
        
        <div>
          <Label htmlFor="title">Job Title*</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Nail Technician, Hair Stylist"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Job Description*</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the job role, responsibilities, schedule, etc."
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1"
            rows={5}
          />
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showVietnamese"
            checked={showVietnamese}
            onChange={() => setShowVietnamese(!showVietnamese)}
            className="mr-2"
          />
          <Label htmlFor="showVietnamese" className="cursor-pointer">
            Add Vietnamese Description
          </Label>
        </div>
        
        {showVietnamese && (
          <div>
            <Label htmlFor="vietnameseDescription">Vietnamese Description</Label>
            <Textarea
              id="vietnameseDescription"
              name="vietnameseDescription"
              placeholder="Mô tả công việc bằng tiếng Việt"
              value={formData.vietnameseDescription}
              onChange={handleChange}
              className="mt-1"
              rows={5}
            />
          </div>
        )}
        
        <div>
          <Label htmlFor="location">Location*</Label>
          <Input
            id="location"
            name="location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="jobType">Employment Type</Label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
              <option value="commission">Commission</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="experience_level">Experience Level</Label>
            <select
              id="experience_level"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="entry">Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value="experienced">Experienced</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="requirements">Requirements (one per line or comma-separated)</Label>
          <Textarea
            id="requirements"
            value={requirementsText}
            onChange={(e) => setRequirementsText(e.target.value)}
            placeholder="License required&#10;English speaking&#10;Experience required&#10;Own transportation"
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div>
          <Label htmlFor="specialties">Specialties (one per line or comma-separated)</Label>
          <Textarea
            id="specialties"
            value={specialtiesText}
            onChange={(e) => setSpecialtiesText(e.target.value)}
            placeholder="Acrylic&#10;Gel&#10;Dip Powder&#10;Nail Art"
            className="mt-1"
            rows={4}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="salary_range">Salary Range</Label>
            <Input
              id="salary_range"
              name="salary_range"
              placeholder="e.g. $50,000 - $70,000"
              value={formData.salary_range}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              name="compensation_details"
              placeholder="e.g. Commission + Tips, Hourly + Tips"
              value={formData.compensation_details}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>
      
      {/* Photo Upload */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Job Photo (Optional)</h3>
        
        {photoUploads.length > 0 ? (
          <div className="relative w-full h-48 rounded-md overflow-hidden">
            <img 
              src={URL.createObjectURL(photoUploads[0])} 
              alt="Job post" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removeUploadedFile}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label htmlFor="photo" className="cursor-pointer">
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-500 mt-2">Click to upload an image</p>
            </Label>
          </div>
        )}
      </div>
      
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div>
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            name="contactName"
            placeholder="Your name"
            value={formData.contactName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="contactEmail">Contact Email*</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="Your email"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            placeholder="Your phone number"
            value={formData.contactPhone}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
        >
          {isSubmitting ? 'Submitting...' : 'Continue to Review & Payment'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
