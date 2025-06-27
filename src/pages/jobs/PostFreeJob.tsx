
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useJobMutations } from '@/hooks/jobs/useJobMutations';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { JobFormData } from '@/types/job';

const PostFreeJob = () => {
  const { createJob, loading } = useJobMutations();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    compensation_type: 'hourly',
    compensation_details: '',
    employment_type: 'full-time',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔥 PostFreeJob: Form submission started');
    console.log('🔥 PostFreeJob: Current user:', user?.id);
    console.log('🔥 PostFreeJob: Form data before validation:', JSON.stringify(formData, null, 2));

    // Validate required fields
    if (!formData.title?.trim()) {
      console.error('❌ PostFreeJob: Title is required but missing');
      toast.error('Job title is required');
      return;
    }

    if (!formData.location?.trim()) {
      console.error('❌ PostFreeJob: Location is required but missing');
      toast.error('Job location is required');
      return;
    }

    if (!user?.id) {
      console.error('❌ PostFreeJob: User not authenticated');
      toast.error('You must be logged in to post a job');
      return;
    }

    // Ensure all required fields are properly set
    const jobPayload: JobFormData = {
      title: formData.title.trim(),
      location: formData.location.trim(),
      description: formData.description?.trim() || '',
      compensation_type: formData.compensation_type || 'hourly',
      compensation_details: formData.compensation_details?.trim() || '',
      employment_type: formData.employment_type || 'full-time',
      contact_info: {
        owner_name: formData.contact_info?.owner_name?.trim() || '',
        phone: formData.contact_info?.phone?.trim() || '',
        email: formData.contact_info?.email?.trim() || '',
        notes: formData.contact_info?.notes?.trim() || '',
        zalo: formData.contact_info?.zalo?.trim() || '',
      },
    };

    console.log('📤 PostFreeJob: Final payload being sent to createJob:', JSON.stringify(jobPayload, null, 2));

    try {
      const success = await createJob(jobPayload, 'free');
      
      console.log('📊 PostFreeJob: createJob result:', success);

      if (success) {
        console.log('✅ PostFreeJob: Job created successfully, redirecting to /jobs');
        toast.success('Free job posted successfully!');
        navigate('/jobs');
      } else {
        console.error('❌ PostFreeJob: createJob returned false');
        toast.error('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('❌ PostFreeJob: Exception during createJob:', error);
      toast.error('An error occurred while posting the job');
    }
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    console.log(`🔄 PostFreeJob: Updating field ${field} with value:`, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    console.log(`🔄 PostFreeJob: Updating contact_info.${field} with value:`, value);
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Post a Free Job</CardTitle>
          <p className="text-center text-gray-600">
            Share your job opportunity with our community at no cost
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Senior Nail Technician"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Los Angeles, CA"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the position, requirements, and what you're looking for..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="compensation_type">Compensation Type</Label>
                <Select
                  value={formData.compensation_type}
                  onValueChange={(value) => handleInputChange('compensation_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select compensation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="salary">Salary</SelectItem>
                    <SelectItem value="commission">Commission</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_type">Employment Type</Label>
                <Select
                  value={formData.employment_type}
                  onValueChange={(value) => handleInputChange('employment_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensation_details">Compensation Details</Label>
              <Input
                id="compensation_details"
                type="text"
                placeholder="e.g., $20-25/hour + tips"
                value={formData.compensation_details}
                onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="owner_name">Contact Name</Label>
                  <Input
                    id="owner_name"
                    type="text"
                    placeholder="Your name"
                    value={formData.contact_info?.owner_name || ''}
                    onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.contact_info?.phone || ''}
                    onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contact_info?.email || ''}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zalo">Zalo (Optional)</Label>
                  <Input
                    id="zalo"
                    type="text"
                    placeholder="Zalo contact"
                    value={formData.contact_info?.zalo || ''}
                    onChange={(e) => handleContactInfoChange('zalo', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information or special instructions..."
                  value={formData.contact_info?.notes || ''}
                  onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !formData.title?.trim() || !formData.location?.trim()}
            >
              {loading ? 'Posting Job...' : 'Post Free Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostFreeJob;
