
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Upload, X, ImageIcon } from 'lucide-react';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { specialtyOptions, requirementOptions } from '@/utils/posting/options';

interface BillionDollarJobFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const BillionDollarJobForm: React.FC<BillionDollarJobFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting = false
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    // Job Details
    title: initialData?.title || '',
    salonName: initialData?.salonName || initialData?.company || '',
    location: initialData?.location || '',
    employmentType: initialData?.employmentType || 'full-time',
    description: initialData?.description || '',
    requirements: initialData?.requirements || [],
    specialties: initialData?.specialties || [],
    
    // Compensation
    compensationType: 'hourly',
    hourlyRate: '',
    salaryMin: '',
    salaryMax: '',
    commissionRate: '',
    benefits: [],
    
    // Contact
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    preferredContact: 'phone',
    
    // Photos will be handled separately
    photos: []
  });

  const totalSteps = 5; // Added photo upload step

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 4 && photoUploads.length === 0) {
      alert('Please upload at least one photo before proceeding.');
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleSubmit = () => {
    // Combine form data with photos
    const finalData = {
      ...formData,
      photos: photoUploads
    };
    onSubmit(finalData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Details</h2>
              <p className="text-sm text-muted-foreground mt-1">Tell us about the position</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData('title', e.target.value)}
                  placeholder="e.g., Nail Technician"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salonName">Salon/Business Name *</Label>
                <Input
                  id="salonName"
                  value={formData.salonName}
                  onChange={(e) => updateFormData('salonName', e.target.value)}
                  placeholder="e.g., Beautiful Nails Spa"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type</Label>
                <Select value={formData.employmentType} onValueChange={(value) => updateFormData('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="booth-rental">Booth Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Describe the role, responsibilities, and what makes your salon special..."
                rows={6}
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Specialties</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {specialtyOptions.map((specialty) => (
                    <div key={specialty.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialty.value}
                        checked={formData.specialties.includes(specialty.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('specialties', [...formData.specialties, specialty.value]);
                          } else {
                            updateFormData('specialties', formData.specialties.filter((s: string) => s !== specialty.value));
                          }
                        }}
                      />
                      <Label htmlFor={specialty.value} className="text-sm">{specialty.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Compensation & Benefits</h2>
              <p className="text-sm text-muted-foreground mt-1">Set competitive compensation</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Compensation Type</Label>
                <Select value={formData.compensationType} onValueChange={(value) => updateFormData('compensationType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                    <SelectItem value="salary">Annual Salary</SelectItem>
                    <SelectItem value="commission">Commission Based</SelectItem>
                    <SelectItem value="booth-rental">Booth Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.compensationType === 'hourly' && (
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                    placeholder="25.00"
                  />
                </div>
              )}

              {formData.compensationType === 'salary' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                    <Input
                      id="salaryMin"
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => updateFormData('salaryMin', e.target.value)}
                      placeholder="40000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                    <Input
                      id="salaryMax"
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => updateFormData('salaryMax', e.target.value)}
                      placeholder="60000"
                    />
                  </div>
                </div>
              )}

              {formData.compensationType === 'commission' && (
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    value={formData.commissionRate}
                    onChange={(e) => updateFormData('commissionRate', e.target.value)}
                    placeholder="50"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Benefits & Perks</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {requirementOptions.filter(req => ['benefits', 'tips', 'housing'].includes(req.value)).map((benefit) => (
                  <div key={benefit.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={benefit.value}
                      checked={formData.benefits.includes(benefit.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('benefits', [...formData.benefits, benefit.value]);
                        } else {
                          updateFormData('benefits', formData.benefits.filter((b: string) => b !== benefit.value));
                        }
                      }}
                    />
                    <Label htmlFor={benefit.value} className="text-sm">{benefit.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Contact Information</h2>
              <p className="text-sm text-muted-foreground mt-1">How candidates can reach you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  placeholder="Your name or hiring manager"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData('contactPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email Address</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  placeholder="hiring@yourSalon.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                <Select value={formData.preferredContact} onValueChange={(value) => updateFormData('preferredContact', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="text">Text Message</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Job Requirements</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {requirementOptions.filter(req => !['benefits', 'tips', 'housing'].includes(req.value)).map((requirement) => (
                  <div key={requirement.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={requirement.value}
                      checked={formData.requirements.includes(requirement.value)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('requirements', [...formData.requirements, requirement.value]);
                        } else {
                          updateFormData('requirements', formData.requirements.filter((r: string) => r !== requirement.value));
                        }
                      }}
                    />
                    <Label htmlFor={requirement.value} className="text-sm">{requirement.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Upload Salon/Job Photos</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add photos to showcase your salon and attract top talent (1-5 photos required)
              </p>
            </div>
            
            <PhotoUploader
              files={photoUploads}
              onChange={setPhotoUploads}
              maxFiles={5}
              accept="image/*"
            />

            {photoUploads.length === 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <ImageIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Why add photos?</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Job posts with photos get 3x more applications. Show off your salon's atmosphere, 
                      equipment, and workspace to attract the best candidates.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-playfair text-2xl font-semibold text-gray-900">Review & Confirm</h2>
              <p className="text-sm text-muted-foreground mt-1">Review your job posting before publishing</p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{formData.title}</CardTitle>
                <p className="text-gray-600">{formData.salonName} • {formData.location}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Employment Type</h4>
                  <p className="text-gray-600 capitalize">{formData.employmentType.replace('-', ' ')}</p>
                </div>

                {formData.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-600">{formData.description}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2">Compensation</h4>
                  <p className="text-gray-600 capitalize">
                    {formData.compensationType === 'hourly' && formData.hourlyRate && `$${formData.hourlyRate}/hour`}
                    {formData.compensationType === 'salary' && formData.salaryMin && formData.salaryMax && 
                      `$${formData.salaryMin} - $${formData.salaryMax}/year`}
                    {formData.compensationType === 'commission' && formData.commissionRate && 
                      `${formData.commissionRate}% commission`}
                    {formData.compensationType === 'booth-rental' && 'Booth Rental'}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <p className="text-gray-600">{formData.contactName} • {formData.contactPhone}</p>
                </div>

                {photoUploads.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Photos ({photoUploads.length})</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {photoUploads.slice(0, 4).map((file, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                      ))}
                      {photoUploads.length > 4 && (
                        <div className="w-full h-20 bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-sm text-gray-500">+{photoUploads.length - 4} more</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Create Premium Job Post</h1>
          <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form content */}
      <Card className="mb-8">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <div className="flex space-x-4">
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || photoUploads.length === 0}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <span>{isSubmitting ? 'Publishing...' : 'Create Premium Job Post'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillionDollarJobForm;
