
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: ''
    }
  });

  const jobCategories = [
    'Nail Technician',
    'Hair Stylist',
    'Esthetician',
    'Massage Therapist',
    'Barber',
    'Makeup Artist',
    'Lash Technician',
    'Brow Technician',
    'Salon Manager',
    'Receptionist',
    'Other'
  ];

  const compensationTypes = [
    'hourly',
    'salary',
    'commission',
    'per_service',
    'negotiable'
  ];

  const handleInputChange = (field: string, value: string) => {
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
      toast.error('You must be signed in to post a job');
      return;
    }

    console.log('🚀 [JOB-FORM] Starting job submission...');
    console.log('🚀 [JOB-FORM] User ID:', user.id);
    console.log('🚀 [JOB-FORM] Form data:', formData);

    setIsSubmitting(true);

    try {
      // Prepare job data for insertion
      const jobData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        category: formData.category,
        compensation_type: formData.compensation_type || null,
        compensation_details: formData.compensation_details.trim() || null,
        requirements: formData.requirements.trim() || null,
        contact_info: formData.contact_info,
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('📤 [JOB-FORM] Inserting job data:', jobData);

      // Insert job into Supabase
      const { data: insertedJob, error: insertError } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ [JOB-FORM] Insert error:', insertError);
        toast.error(`Failed to post job: ${insertError.message}`);
        return;
      }

      console.log('✅ [JOB-FORM] Job inserted successfully:', insertedJob);

      // Verify the job was actually inserted by fetching it
      const { data: verifiedJob, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', insertedJob.id)
        .single();

      if (verifyError || !verifiedJob) {
        console.error('❌ [JOB-FORM] Job verification failed:', verifyError);
        toast.error('Job posting failed - could not verify insertion');
        return;
      }

      console.log('✅ [JOB-FORM] Job verified in database:', verifiedJob);
      
      toast.success('Job posted successfully!');
      
      // Navigate to success page with the job ID
      navigate(`/post-success?jobId=${insertedJob.id}&type=job`);

    } catch (error) {
      console.error('💥 [JOB-FORM] Unexpected error:', error);
      toast.error('An unexpected error occurred while posting the job');
    } finally {
      setIsSubmitting(false);
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
              placeholder="e.g., Nail Technician - Full Time"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                {jobCategories.map((category) => (
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
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Los Angeles, CA"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="compensation_type">Compensation Type</Label>
              <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compensation type" />
                </SelectTrigger>
                <SelectContent>
                  {compensationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compensation_details">Compensation Details</Label>
              <Input
                id="compensation_details"
                value={formData.compensation_details}
                onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                placeholder="e.g., $18-25/hour plus tips"
              />
            </div>
          </div>

          <div className="space-y-2">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner_name">Contact Name</Label>
                <Input
                  id="owner_name"
                  value={formData.contact_info.owner_name}
                  onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.contact_info.notes}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional information for applicants..."
                rows={2}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !formData.title || !formData.description || !formData.category}
          >
            {isSubmitting ? 'Posting Job...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
