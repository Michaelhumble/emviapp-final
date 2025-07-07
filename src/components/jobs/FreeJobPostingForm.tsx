
import React, { useState } from 'react';
import { useJobPosting, type JobFormData } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const FreeJobPostingForm = () => {
  const { submitJob, isSubmitting } = useJobPosting();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    category: '',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      email: '',
      phone: '',
      website: ''
    }
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<JobFormData> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 [FORM] Form submission started');
    
    if (!validateForm()) {
      console.log('❌ [FORM] Validation failed:', errors);
      return;
    }

    console.log('✅ [FORM] Validation passed, submitting job:', formData);
    await submitJob(formData, 'free');
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContactInfoChange = (field: keyof JobFormData['contact_info'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: { ...prev.contact_info, [field]: value }
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Nail Technician Needed"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category *</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                <SelectItem value="Esthetician">Esthetician</SelectItem>
                <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                <SelectItem value="Barber">Barber</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Los Angeles, CA"
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the position, requirements, and benefits..."
              rows={4}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Compensation Type</label>
            <Input
              value={formData.compensation_type}
              onChange={(e) => handleInputChange('compensation_type', e.target.value)}
              placeholder="e.g. Hourly, Weekly, Commission"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Compensation Details</label>
            <Input
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g. $15-20/hour, $800-1200/week"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements</label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List any specific requirements or qualifications..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.contact_info.email || ''}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="contact@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={formData.contact_info.phone || ''}
                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                type="url"
                value={formData.contact_info.website || ''}
                onChange={(e) => handleContactInfoChange('website', e.target.value)}
                placeholder="https://www.example.com"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </>
            ) : (
              'Post Free Job'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
