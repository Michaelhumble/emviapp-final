
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { JobDetailsSubmission } from '@/types/job';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitFreeJob, isSubmitting } = useJobPosting();
  
  const [formData, setFormData] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    category: 'Other',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: user?.email || '',
      notes: ''
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
    
    if (!user) {
      toast.error('Please sign in to post a job');
      navigate('/auth');
      return;
    }

    // Validate required fields
    if (!formData.title.trim()) {
      toast.error('Job title is required');
      return;
    }

    if (!formData.category) {
      toast.error('Job category is required');
      return;
    }

    console.log('🚀 [FREE-JOB-FORM] Submitting free job with data:', {
      title: formData.title,
      category: formData.category,
      location: formData.location,
      hasContactInfo: !!formData.contact_info,
      userId: user.id
    });

    try {
      const result = await submitFreeJob(formData);
      
      if (result.success) {
        console.log('✅ [FREE-JOB-FORM] Job posted successfully, redirecting...');
        toast.success('Free job posted successfully!');
        navigate(`/jobs/success-${Date.now()}`);
      }
    } catch (error) {
      console.error('❌ [FREE-JOB-FORM] Form submission failed:', error);
      // Error toast is handled in the hook
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Sign In Required</CardTitle>
          <CardDescription>Please sign in to post a job</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <CardDescription>
          Post your job listing for free and reach talented beauty professionals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Nail Technician, Hair Stylist"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                <SelectItem value="Esthetician">Esthetician</SelectItem>
                <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                <SelectItem value="Barber">Barber</SelectItem>
                <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                <SelectItem value="Lash Technician">Lash Technician</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Los Angeles, CA"
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the position, responsibilities, and work environment..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <Input
              id="compensation_type"
              value={formData.compensation_type}
              onChange={(e) => handleInputChange('compensation_type', e.target.value)}
              placeholder="e.g., Hourly, Commission, Salary"
            />
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g., $20-30/hour, 60% commission"
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List any specific requirements, certifications, or experience needed..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            
            <div>
              <Label htmlFor="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                value={formData.contact_info?.owner_name || ''}
                onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                placeholder="Your name or business contact"
              />
            </div>

            <div>
              <Label htmlFor="contact_phone">Phone Number</Label>
              <Input
                id="contact_phone"
                value={formData.contact_info?.phone || ''}
                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_info?.email || ''}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="Contact email address"
              />
            </div>

            <div>
              <Label htmlFor="contact_notes">Additional Notes</Label>
              <Textarea
                id="contact_notes"
                value={formData.contact_info?.notes || ''}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional contact information or notes..."
                rows={2}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
