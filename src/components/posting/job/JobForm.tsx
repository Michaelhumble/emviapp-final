
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { JobFormValues } from './jobFormSchema';
import { ArrowLeft, Upload } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import PhotoUploader from '@/components/posting/PhotoUploader';
import templateGradients from './luxuryGradients';

// Utility functions for array-text conversion
const convertTextToArray = (text?: string): string[] => {
  if (!text) return [];
  return text
    .split(/[,\n]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
};

const convertToFormattedText = (arr?: string[]): string => {
  if (!arr || !Array.isArray(arr)) return '';
  return arr.join('\n');
};

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  initialValues?: JobFormValues;
  isSubmitting?: boolean;
  onBack?: () => void;
  showVietnameseByDefault?: boolean;
  isCustomTemplate?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  photoUploads,
  setPhotoUploads,
  initialValues,
  isSubmitting = false,
  onBack,
  showVietnameseByDefault = false,
  isCustomTemplate = false,
}) => {
  const [formValues, setFormValues] = useState<JobFormValues>({
    title: '',
    description: '',
    vietnameseDescription: '',
    location: '',
    jobType: 'full-time' as const,
    experience_level: 'entry' as const,
    contactEmail: '',
    requirements: [],
    specialties: [],
    templateType: isCustomTemplate ? 'custom' : undefined,
  });
  
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  // Convert between form state (array) and textarea display (string)
  const [requirementsText, setRequirementsText] = useState('');
  const [specialtiesText, setSpecialtiesText] = useState('');

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        ...initialValues,
        // Ensure these are arrays
        requirements: Array.isArray(initialValues.requirements) ? initialValues.requirements : convertTextToArray(initialValues.requirements as unknown as string),
        specialties: Array.isArray(initialValues.specialties) ? initialValues.specialties : convertTextToArray(initialValues.specialties as unknown as string),
      });
      
      // Convert arrays to text for display in textareas
      setRequirementsText(convertToFormattedText(initialValues.requirements));
      setSpecialtiesText(convertToFormattedText(initialValues.specialties));
      
      if (initialValues.vietnameseDescription) {
        setShowVietnamese(true);
      }
    }
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert textarea strings to arrays before submission
    const formData: JobFormValues = {
      ...formValues,
      requirements: convertTextToArray(requirementsText),
      specialties: convertTextToArray(specialtiesText),
    };
    
    onSubmit(formData);
  };

  // Handle requirements and specialties textarea changes
  const handleRequirementsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequirementsText(e.target.value);
  };

  const handleSpecialtiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecialtiesText(e.target.value);
  };

  // Get the background gradient based on template type
  const templateType = formValues.templateType || 'custom';
  const backgroundGradient = templateGradients[templateType] || 'bg-gradient-to-br from-stone-50 to-neutral-100';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Create Job Posting</h2>
        {onBack && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className={`rounded-lg ${backgroundGradient}`}>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Job Details Section */}
              <div>
                <h3 className="text-lg font-medium mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title">Job Title *</Label>
                      <Input 
                        id="title" 
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                        placeholder="e.g., Nail Technician, Hair Stylist"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        placeholder="Describe the job responsibilities, expectations, and what makes your salon special"
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        type="button" 
                        variant={showVietnamese ? "default" : "outline"}
                        onClick={() => setShowVietnamese(!showVietnamese)}
                        className="text-xs"
                        size="sm"
                      >
                        {showVietnamese ? "Hide Vietnamese" : "Add Vietnamese Description"}
                      </Button>
                    </div>
                    
                    {showVietnamese && (
                      <div>
                        <Label htmlFor="vietnameseDescription">Mô tả công việc (Vietnamese)</Label>
                        <Textarea 
                          id="vietnameseDescription" 
                          name="vietnameseDescription"
                          value={formValues.vietnameseDescription}
                          onChange={handleChange}
                          placeholder="Mô tả trách nhiệm công việc, mong đợi và điều gì làm cho salon của bạn đặc biệt"
                          className="min-h-[100px]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Location and Job Type */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formValues.location}
                    onChange={handleChange}
                    placeholder="e.g., Miami, FL"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobType">Job Type *</Label>
                    <Select 
                      name="jobType"
                      value={formValues.jobType}
                      onValueChange={(value) => setFormValues(prev => ({ ...prev, jobType: value as JobFormValues['jobType'] }))}
                      required
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
                    <Label htmlFor="experience_level">Experience Level *</Label>
                    <Select 
                      name="experience_level"
                      value={formValues.experience_level}
                      onValueChange={(value) => setFormValues(prev => ({ ...prev, experience_level: value as JobFormValues['experience_level'] }))}
                      required
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
              </div>
              
              <Separator />
              
              {/* Compensation */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Compensation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="salary_range">Salary Range</Label>
                    <Input 
                      id="salary_range" 
                      name="salary_range"
                      value={formValues.salary_range || ''}
                      onChange={handleChange}
                      placeholder="e.g., $60,000 - $80,000/year"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="compensation_details">Compensation Details</Label>
                    <Input 
                      id="compensation_details" 
                      name="compensation_details"
                      value={formValues.compensation_details || ''}
                      onChange={handleChange}
                      placeholder="e.g., Commission structure, benefits"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Requirements and Qualifications */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Requirements and Qualifications</h3>
                
                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea 
                    id="requirements" 
                    name="requirements"
                    value={requirementsText}
                    onChange={handleRequirementsChange}
                    placeholder="Enter each requirement on a new line or separated by commas"
                    className="min-h-[120px] py-3 leading-relaxed"
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialties">Specialties/Skills (one per line)</Label>
                  <Textarea 
                    id="specialties" 
                    name="specialties"
                    value={specialtiesText}
                    onChange={handleSpecialtiesChange}
                    placeholder="Enter each specialty or skill on a new line or separated by commas"
                    className="min-h-[120px] py-3 leading-relaxed"
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail"
                    type="email"
                    value={formValues.contactEmail}
                    onChange={handleChange}
                    placeholder="Email for job applicants to contact you"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input 
                      id="contactName" 
                      name="contactName"
                      value={formValues.contactName || ''}
                      onChange={handleChange}
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone"
                      value={formValues.contactPhone || ''}
                      onChange={handleChange}
                      placeholder="e.g., (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Photo Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add Photos (Optional)</h3>
                <PhotoUploader 
                  files={photoUploads}
                  onChange={setPhotoUploads}
                  maxFiles={3}
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          {onBack && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
          )}
          
          <Button 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Continue to Review & Payment'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
