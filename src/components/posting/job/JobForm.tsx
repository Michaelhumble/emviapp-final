
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Upload } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { convertTextToArray, convertToFormattedText } from '@/utils/jobs/jobTemplates';

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
  showVietnameseByDefault = false
}) => {
  const [formData, setFormData] = useState<JobFormValues>(initialValues || {
    title: '',
    description: '',
    vietnameseDescription: '',
    location: '',
    jobType: 'full-time',
    experience_level: 'intermediate',
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    requirements: [],
    specialties: []
  });

  // Convert array fields to formatted text for editing
  const [requirementsText, setRequirementsText] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');
  
  const [showVietnameseDescription, setShowVietnameseDescription] = useState(showVietnameseByDefault);
  
  // Set the text areas when initial values change
  useEffect(() => {
    if (initialValues) {
      setRequirementsText(convertToFormattedText(initialValues.requirements));
      setSpecialtiesText(convertToFormattedText(initialValues.specialties));
    }
  }, [initialValues]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPhotoUploads(newFiles);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert the text inputs to arrays
    const submissionData = {
      ...formData,
      requirements: convertTextToArray(requirementsText),
      specialties: convertTextToArray(specialtiesText)
    };
    
    onSubmit(submissionData, photoUploads);
  };
  
  // Preview image
  const imagePreview = photoUploads.length > 0 
    ? URL.createObjectURL(photoUploads[0]) 
    : null;
    
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {onBack && (
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onBack}
          className="mb-2"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Templates
        </Button>
      )}
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        
        <div className="space-y-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="e.g., Experienced Nail Technician"
              required
            />
          </div>
          
          {/* Job Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
            <Input
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              placeholder="e.g., Los Angeles, CA"
              required
            />
          </div>
          
          {/* Job Type & Experience Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select 
                name="jobType" 
                value={formData.jobType} 
                onValueChange={(value) => handleSelectChange('jobType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="temporary">Temporary</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience_level">Experience Level</Label>
              <Select 
                name="experience_level" 
                value={formData.experience_level} 
                onValueChange={(value) => handleSelectChange('experience_level', value)}
              >
                <SelectTrigger>
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
          
          {/* Job Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Job Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Describe the job responsibilities, work environment, and what you're looking for in candidates..."
              rows={5}
              required
            />
          </div>
          
          {/* Vietnamese Description Toggle */}
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setShowVietnameseDescription(!showVietnameseDescription)}
            >
              {showVietnameseDescription ? "Hide Vietnamese Description" : "Add Vietnamese Description"}
            </Button>
          </div>
          
          {/* Vietnamese Description */}
          {showVietnameseDescription && (
            <div className="space-y-2">
              <Label htmlFor="vietnameseDescription">Vietnamese Description</Label>
              <Textarea
                id="vietnameseDescription"
                name="vietnameseDescription"
                value={formData.vietnameseDescription || ''}
                onChange={handleChange}
                placeholder="Mô tả công việc bằng tiếng Việt..."
                rows={5}
              />
            </div>
          )}

          {/* Requirements - Now a text area */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements (one per line)</Label>
            <Textarea
              id="requirements"
              name="requirementsText"
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder="Valid license required&#10;2+ years experience&#10;Excellent customer service skills"
              rows={4}
            />
            <p className="text-xs text-gray-500">Enter each requirement on a new line or separated by commas</p>
          </div>
          
          {/* Specialties - Now a text area */}
          <div className="space-y-2">
            <Label htmlFor="specialties">Specialties (one per line)</Label>
            <Textarea
              id="specialties"
              name="specialtiesText"
              value={specialtiesText}
              onChange={(e) => setSpecialtiesText(e.target.value)}
              placeholder="Acrylic Nails&#10;Gel Manicures&#10;Nail Art"
              rows={4}
            />
            <p className="text-xs text-gray-500">Enter each specialty on a new line or separated by commas</p>
          </div>
          
          {/* Compensation Details */}
          <div className="space-y-2">
            <Label htmlFor="salary_range">Compensation Range</Label>
            <Input
              id="salary_range"
              name="salary_range"
              value={formData.salary_range || ''}
              onChange={handleChange}
              placeholder="e.g., $800-1200/week or Competitive Commission"
            />
          </div>
          
          {/* Upload Photo */}
          <div className="space-y-2">
            <Label>Upload Photo (optional)</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label 
                  htmlFor="photo-upload" 
                  className="flex items-center gap-2 p-2 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  <span className="text-sm text-gray-600">
                    {photoUploads.length > 0 ? photoUploads[0].name : "Choose an image"}
                  </span>
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
              
              {imagePreview && (
                <div className="w-16 h-16 overflow-hidden rounded-md border border-gray-300">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Adding a photo can increase applications by up to 35%
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        
        <div className="space-y-4">
          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email <span className="text-red-500">*</span></Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail || ''}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          
          {/* Contact Name */}
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName || ''}
              onChange={handleChange}
              placeholder="Contact person name"
            />
          </div>
          
          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone || ''}
              onChange={handleChange}
              placeholder="Contact phone number"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="px-8"
        >
          {isSubmitting ? "Submitting..." : "Continue"}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
