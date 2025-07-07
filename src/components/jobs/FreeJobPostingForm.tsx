
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { JobDetailsSubmission } from '@/types/job';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { submitFreeJob, isSubmitting } = useJobPosting();
  
  const [formData, setFormData] = useState<JobDetailsSubmission>({
    title: '',
    category: '',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '', // Always string
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🆓 [FREE-FORM] Form submitted with data:', formData);
    
    try {
      const result = await submitFreeJob(formData);
      console.log('🆓 [FREE-FORM] Submission successful:', result);
      
      // Navigate to jobs page to see the new listing
      navigate('/jobs');
    } catch (error) {
      console.error('🆓 [FREE-FORM] Submission failed:', error);
    }
  };

  const updateFormData = (field: keyof JobDetailsSubmission, value: any) => {
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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Post a Free Job</CardTitle>
          <p className="text-sm text-gray-600">
            Your first job post is always free! Fill out the details below.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                placeholder="e.g. Nail Technician Needed"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nails">Nail Technician</SelectItem>
                  <SelectItem value="hair">Hair Stylist</SelectItem>
                  <SelectItem value="lashes">Lash Technician</SelectItem>
                  <SelectItem value="massage">Massage Therapist</SelectItem>
                  <SelectItem value="esthetician">Esthetician</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="e.g. Los Angeles, CA"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Describe the position, requirements, and benefits..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="compensation_type">Compensation Type</Label>
                <Input
                  id="compensation_type"
                  value={formData.compensation_type}
                  onChange={(e) => updateFormData('compensation_type', e.target.value)}
                  placeholder="e.g. Hourly, Weekly, Commission"
                />
              </div>
              <div>
                <Label htmlFor="compensation_details">Compensation Details</Label>
                <Input
                  id="compensation_details"
                  value={formData.compensation_details}
                  onChange={(e) => updateFormData('compensation_details', e.target.value)}
                  placeholder="e.g. $15-20/hour, $800-1200/week"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => updateFormData('requirements', e.target.value)}
                placeholder="List any specific requirements or qualifications..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner_name">Contact Name</Label>
                  <Input
                    id="owner_name"
                    value={formData.contact_info?.owner_name || ''}
                    onChange={(e) => updateContactInfo('owner_name', e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contact_info?.phone || ''}
                    onChange={(e) => updateContactInfo('phone', e.target.value)}
                    placeholder="Phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info?.email || ''}
                    onChange={(e) => updateContactInfo('email', e.target.value)}
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <Label htmlFor="zalo">Zalo</Label>
                  <Input
                    id="zalo"
                    value={formData.contact_info?.zalo || ''}
                    onChange={(e) => updateContactInfo('zalo', e.target.value)}
                    placeholder="Zalo ID (optional)"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.contact_info?.notes || ''}
                  onChange={(e) => updateContactInfo('notes', e.target.value)}
                  placeholder="Any additional contact notes..."
                  rows={2}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.title || !formData.category}
              className="w-full"
            >
              {isSubmitting ? 'Posting...' : 'Post Free Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
