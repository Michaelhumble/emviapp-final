
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { JobDetailsSubmission } from '@/types/job';

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
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: ''
    }
  });

  const handleInputChange = (field: keyof JobDetailsSubmission, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📝 [FORM] Form submitted with data:', formData);

    if (!formData.title.trim()) {
      alert('Please enter a job title');
      return;
    }

    if (!formData.category) {
      alert('Please select a category');
      return;
    }

    try {
      const result = await submitFreeJob(formData);
      
      if (result.success && result.jobId) {
        console.log('✅ [FORM] Job posted successfully, navigating to success page');
        navigate(`/post-success?jobId=${result.jobId}&type=free`);
      } else {
        console.error('❌ [FORM] Job posting failed:', result.error);
        alert(`Failed to post job: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('💥 [FORM] Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Nail Technician, Hair Stylist, Massage Therapist"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                <SelectItem value="Esthetician">Esthetician</SelectItem>
                <SelectItem value="Barber">Barber</SelectItem>
                <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                <SelectItem value="Receptionist">Receptionist</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Los Angeles, CA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the job responsibilities, work environment, and what you're looking for..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compensation_type">Compensation Type</Label>
              <Select onValueChange={(value) => handleInputChange('compensation_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="booth_rental">Booth Rental</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensation_details">Compensation Details</Label>
              <Input
                id="compensation_details"
                value={formData.compensation_details}
                onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                placeholder="e.g. $15-20/hour, $800-1200/week"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List any required qualifications, licenses, or experience..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner_name">Contact Name</Label>
                <Input
                  id="owner_name"
                  value={formData.contact_info?.owner_name || ''}
                  onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  placeholder="Your name or business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.contact_info?.phone || ''}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.contact_info?.email || ''}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="contact@yourbusiness.com"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
