
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
      toast.error('You must be logged in to post a job');
      return;
    }

    // Validate required fields
    if (!formData.title.trim() || !formData.category.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 [FREE-JOB-FORM] Submitting job to Supabase...');
      console.log('📊 [FREE-JOB-FORM] Job data:', formData);
      console.log('👤 [FREE-JOB-FORM] User ID:', user.id);

      // Prepare job data for Supabase insert
      const jobData = {
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        location: formData.location.trim() || null,
        category: formData.category.trim(),
        compensation_type: formData.compensation_type.trim() || null,
        compensation_details: formData.compensation_details.trim() || null,
        requirements: formData.requirements.trim() || null,
        contact_info: formData.contact_info,
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('💾 [FREE-JOB-FORM] Final job data for insert:', jobData);

      // Insert job into Supabase
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [FREE-JOB-FORM] Supabase insert error:', error);
        toast.error(`Failed to create job: ${error.message}`);
        return;
      }

      console.log('✅ [FREE-JOB-FORM] Job successfully inserted:', data);
      toast.success('Job posted successfully!');
      
      // Redirect to jobs page to see the new job
      navigate('/jobs');
      
    } catch (error) {
      console.error('💥 [FREE-JOB-FORM] Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Post a Free Job</h1>
        <p className="text-gray-600">Share your job opportunity with talented professionals</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g., Nail Technician, Hair Stylist, Esthetician"
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nail-technician">Nail Technician</SelectItem>
              <SelectItem value="hair-stylist">Hair Stylist</SelectItem>
              <SelectItem value="esthetician">Esthetician</SelectItem>
              <SelectItem value="massage-therapist">Massage Therapist</SelectItem>
              <SelectItem value="barber">Barber</SelectItem>
              <SelectItem value="makeup-artist">Makeup Artist</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State or Address"
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the job role, responsibilities, and work environment..."
            rows={4}
          />
        </div>

        {/* Compensation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select compensation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="booth-rental">Booth Rental</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g., $15-20/hr, 50% commission"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
            placeholder="List any required qualifications, experience, or certifications..."
            rows={3}
          />
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner_name">Contact Name</Label>
              <Input
                id="owner_name"
                value={formData.contact_info.owner_name}
                onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                placeholder="Your name or salon name"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.contact_info.phone}
                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Input
                id="notes"
                value={formData.contact_info.notes}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Best time to contact, etc."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-32"
          >
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FreeJobPostingForm;
