
import React, { useState } from 'react';
import { useJobPosting, JobFormData } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const JOB_CATEGORIES = [
  'Nail Technician',
  'Hair Stylist', 
  'Esthetician',
  'Massage Therapist',
  'Barber',
  'Makeup Artist',
  'Lash Technician',
  'Eyebrow Specialist',
  'Tattoo Artist',
  'Receptionist',
  'Manager',
  'Other'
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 [FREE-JOB-FORM] Form submitted with data:', formData);
    
    // Basic validation
    if (!formData.title.trim()) {
      console.error('❌ [FREE-JOB-FORM] Title is required');
      return;
    }
    
    if (!formData.category) {
      console.error('❌ [FREE-JOB-FORM] Category is required');
      return;
    }

    console.log('🔄 [FREE-JOB-FORM] Calling submitJob...');
    const result = await submitJob(formData, 'free');
    console.log('📊 [FREE-JOB-FORM] Submit result:', result);
  };

  const updateFormData = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateContactInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <CardDescription>
          Reach qualified beauty professionals with your job posting
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Experienced Nail Technician Needed"
              value={formData.title}
              onChange={(e) => updateFormData('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                {JOB_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Los Angeles, CA"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the position, responsibilities, and work environment..."
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compensation_type">Compensation Type</Label>
              <Input
                id="compensation_type"
                placeholder="e.g., Hourly, Commission, Salary"
                value={formData.compensation_type}
                onChange={(e) => updateFormData('compensation_type', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compensation_details">Compensation Details</Label>
              <Input
                id="compensation_details"
                placeholder="e.g., $15-20/hour, 60% commission"
                value={formData.compensation_details}
                onChange={(e) => updateFormData('compensation_details', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="List any specific requirements, certifications, or experience needed..."
              value={formData.requirements}
              onChange={(e) => updateFormData('requirements', e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Contact Information</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.contact_info.email || ''}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.contact_info.phone || ''}
                  onChange={(e) => updateContactInfo('phone', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_website">Website (Optional)</Label>
              <Input
                id="contact_website"
                type="url"
                placeholder="https://yourwebsite.com"
                value={formData.contact_info.website || ''}
                onChange={(e) => updateContactInfo('website', e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
