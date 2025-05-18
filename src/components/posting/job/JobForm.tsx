
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus, ChevronLeft } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { toast } from 'sonner';
import MultiSelect, { Option } from '@/components/ui/multi-select';
import { beautySpecialties, commonRequirements } from '@/data/specialties';

interface JobFormProps {
  onSubmit: (data: JobFormValues) => void;
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
  // Base form state
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [vietnameseDescription, setVietnameseDescription] = useState(initialValues?.vietnameseDescription || '');
  const [showVietnamese, setShowVietnamese] = useState(showVietnameseByDefault);
  const [location, setLocation] = useState(initialValues?.location || '');
  const [jobType, setJobType] = useState(initialValues?.jobType || 'full-time');
  const [experienceLevel, setExperienceLevel] = useState(initialValues?.experience_level || 'experienced');
  const [compensationDetails, setCompensationDetails] = useState(initialValues?.compensation_details || '');
  const [salaryRange, setSalaryRange] = useState(initialValues?.salary_range || '');
  
  // Contact info
  const [contactName, setContactName] = useState(initialValues?.contactName || '');
  const [contactEmail, setContactEmail] = useState(initialValues?.contactEmail || '');
  const [contactPhone, setContactPhone] = useState(initialValues?.contactPhone || '');
  
  // Requirements and specialties
  const [showRequirements, setShowRequirements] = useState(true);

  // Convert string arrays to Option arrays
  const mapStringsToOptions = (strings: string[]): Option[] => {
    return strings.map(s => ({ label: s, value: s }));
  };
  
  // Map all specialty options to the required Option format
  const getAllSpecialtyOptions = (): Option[] => {
    const allSpecialties: string[] = [];
    Object.values(beautySpecialties).forEach(categorySpecialties => {
      allSpecialties.push(...categorySpecialties);
    });
    return mapStringsToOptions(allSpecialties);
  };
  
  // Map requirement options to the required Option format
  const getRequirementOptions = (): Option[] => {
    return mapStringsToOptions(commonRequirements);
  };

  // Convert the initial string arrays to Option arrays
  const initialRequirementsOptions = initialValues?.requirements 
    ? mapStringsToOptions(initialValues.requirements) 
    : [];
    
  const initialSpecialtiesOptions = initialValues?.specialties 
    ? mapStringsToOptions(initialValues.specialties) 
    : [];

  const [selectedRequirements, setSelectedRequirements] = useState<Option[]>(initialRequirementsOptions);
  const [selectedSpecialties, setSelectedSpecialties] = useState<Option[]>(initialSpecialtiesOptions);
  
  // These functions now expect and handle Option[] not string[]
  const handleRequirementsChange = (selected: string[]) => {
    setSelectedRequirements(mapStringsToOptions(selected));
  };
  
  const handleSpecialtiesChange = (selected: string[]) => {
    setSelectedSpecialties(mapStringsToOptions(selected));
  };

  const [error, setError] = useState<string | null>(null);

  // Form validation
  const validateForm = () => {
    if (!title.trim()) {
      setError('Job title is required');
      return false;
    }
    if (!description.trim()) {
      setError('Job description is required');
      return false;
    }
    if (!location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!contactEmail.trim()) {
      setError('Contact email is required');
      return false;
    }
    return true;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error(error || 'Please complete all required fields');
      return;
    }

    // Convert Option[] arrays back to string[] for submission
    const requirementsValues = selectedRequirements.map(option => option.value);
    const specialtiesValues = selectedSpecialties.map(option => option.value);
    
    const formData: JobFormValues = {
      title,
      description,
      vietnameseDescription,
      location,
      jobType,
      compensation_details: compensationDetails,
      salary_range: salaryRange,
      experience_level: experienceLevel,
      contactName,
      contactEmail,
      contactPhone,
      requirements: requirementsValues,
      specialties: specialtiesValues,
    };
    
    onSubmit(formData);
  };

  // File upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setPhotoUploads(prev => [...prev, ...newFiles]);
    }
  };

  // Reset validation error when user edits any field
  useEffect(() => {
    if (error) setError(null);
  }, [title, description, location, contactEmail]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back button */}
      {onBack && (
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onBack} 
          className="mb-4 px-2 flex items-center text-muted-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to templates
        </Button>
      )}

      <div className="space-y-4">
        {/* Job Information */}
        <h2 className="text-xl font-semibold">Job Information</h2>
        
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Nail Technician, Hair Stylist, etc."
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the role, responsibilities, and qualifications..."
            rows={5}
            required
          />
        </div>
        
        {/* Vietnamese Description Toggle */}
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="showVietnamese" 
            checked={showVietnamese} 
            onChange={() => setShowVietnamese(!showVietnamese)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="showVietnamese">Add Vietnamese description (recommended for nail salons)</Label>
        </div>
        
        {showVietnamese && (
          <div className="space-y-2">
            <Label htmlFor="vietnameseDescription">Mô tả công việc (Vietnamese Description)</Label>
            <Textarea
              id="vietnameseDescription"
              value={vietnameseDescription}
              onChange={(e) => setVietnameseDescription(e.target.value)}
              placeholder="Mô tả công việc bằng tiếng Việt..."
              rows={5}
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State or Full Address"
            required
          />
        </div>
        
        {/* Job Details */}
        <h2 className="text-xl font-semibold pt-4">Job Details</h2>
        
        <div className="space-y-2">
          <Label htmlFor="jobType">Employment Type</Label>
          <Select value={jobType} onValueChange={setJobType}>
            <SelectTrigger id="jobType">
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="commission">Commission-based</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="compensationDetails">Compensation Details</Label>
          <Input
            id="compensationDetails"
            value={compensationDetails}
            onChange={(e) => setCompensationDetails(e.target.value)}
            placeholder="e.g., Commission structure, benefits, etc."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="salaryRange">Salary/Pay Range</Label>
          <Input
            id="salaryRange"
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="e.g., $15-20/hr, $40k-60k/year"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <RadioGroup 
            value={experienceLevel} 
            onValueChange={setExperienceLevel}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="entry" id="entry" />
              <Label htmlFor="entry">Entry Level</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="experienced" id="experienced" />
              <Label htmlFor="experienced">Experienced</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="senior" id="senior" />
              <Label htmlFor="senior">Senior</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Specialties Section */}
        <div className="space-y-2">
          <Label htmlFor="specialties">Specialties Needed</Label>
          <MultiSelect
            options={getAllSpecialtyOptions()}
            selected={selectedSpecialties.map(option => option.value)}
            onChange={handleSpecialtiesChange}
            placeholder="Select specialties..."
          />
        </div>
        
        {/* Requirements Toggle */}
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="showRequirements" 
            checked={showRequirements} 
            onChange={() => setShowRequirements(!showRequirements)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="showRequirements">Specify Job Requirements</Label>
        </div>
        
        {/* Requirements Section */}
        {showRequirements && (
          <div className="space-y-2">
            <Label htmlFor="requirements">Job Requirements</Label>
            <MultiSelect
              options={getRequirementOptions()}
              selected={selectedRequirements.map(option => option.value)}
              onChange={handleRequirementsChange}
              placeholder="Select requirements..."
            />
          </div>
        )}
        
        {/* Contact Info */}
        <h2 className="text-xl font-semibold pt-4">Contact Information</h2>
        
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your name or salon manager's name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Email address for applications"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Phone number (optional)"
          />
        </div>
        
        {/* Image Upload */}
        <h2 className="text-xl font-semibold pt-4">Media (Optional)</h2>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="photoUpload">Upload Photos</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Add photos of your salon or workplace to attract more applicants
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {photoUploads.map((file, index) => (
                  <div key={index} className="relative w-24 h-24 rounded overflow-hidden border">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Upload ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                <label className="flex items-center justify-center w-24 h-24 border border-dashed rounded cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    multiple
                  />
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Error Display */}
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 border border-red-100 rounded">
            {error}
          </div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
            {isSubmitting ? 'Submitting...' : 'Review & Publish'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
