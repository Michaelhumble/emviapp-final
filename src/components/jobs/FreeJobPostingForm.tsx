
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    compensation_type: 'hourly',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: ''
    }
  });

  const categories = [
    'Nail Tech',
    'Hair Stylist',
    'Esthetician',
    'Massage Therapist',
    'Barber',
    'Lash Technician',
    'Makeup Artist',
    'Receptionist',
    'Salon Manager',
    'Other'
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
      console.error('❌ [JOB-FORM] User not authenticated');
      toast.error('You must be signed in to post a job');
      return;
    }

    // Validate required fields
    if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
      console.error('❌ [JOB-FORM] Required fields missing');
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('🚀 [JOB-FORM] Starting job submission...');
      console.log('👤 [JOB-FORM] User ID:', user.id);
      console.log('📝 [JOB-FORM] Form data:', formData);

      // Prepare job data for insertion
      const jobData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        location: formData.location.trim() || null,
        category: formData.category,
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details.trim() || null,
        requirements: formData.requirements.trim() || null,
        contact_info: formData.contact_info,
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('💾 [JOB-FORM] Prepared job data for insert:', jobData);

      // Insert job into Supabase
      console.log('🔄 [JOB-FORM] Attempting Supabase insert...');
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select();

      if (error) {
        console.error('❌ [JOB-FORM] Supabase insert error:', error);
        console.error('❌ [JOB-FORM] Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        // Show specific error messages
        if (error.code === '42501') {
          toast.error('Permission denied. Please check your account permissions.');
        } else if (error.code === '23505') {
          toast.error('A job with this information already exists.');
        } else {
          toast.error(`Failed to post job: ${error.message}`);
        }
        return;
      }

      console.log('✅ [JOB-FORM] Supabase insert successful!');
      console.log('📊 [JOB-FORM] Inserted job data:', data);

      if (!data || data.length === 0) {
        console.error('❌ [JOB-FORM] No data returned from insert');
        toast.error('Job posting failed - no data returned');
        return;
      }

      const insertedJob = data[0];
      console.log('🎉 [JOB-FORM] Job successfully created with ID:', insertedJob.id);

      // Verify the job was actually inserted by fetching it
      console.log('🔍 [JOB-FORM] Verifying job exists in database...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', insertedJob.id)
        .single();

      if (verifyError) {
        console.error('❌ [JOB-FORM] Verification failed:', verifyError);
        toast.error('Job may not have been saved properly');
      } else if (verifyData) {
        console.log('✅ [JOB-FORM] Job verified in database:', verifyData);
        toast.success('Job posted successfully!');
        
        // Redirect to jobs page to see the new job
        console.log('🔄 [JOB-FORM] Redirecting to /jobs page...');
        navigate('/jobs');
      } else {
        console.error('❌ [JOB-FORM] Job not found during verification');
        toast.error('Job posting verification failed');
      }

    } catch (error) {
      console.error('💥 [JOB-FORM] Unexpected error during submission:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Nail Technician"
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
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
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
              placeholder="e.g., Houston, TX"
            />
          </div>

          {/* Description */}
          <div>
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

          {/* Compensation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="compensation_type">Compensation Type</Label>
              <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="compensation_details">Compensation Details</Label>
              <Input
                id="compensation_details"
                value={formData.compensation_details}
                onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                placeholder="e.g., $15-25/hour + commission"
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
              placeholder="List any specific requirements, qualifications, or experience needed..."
              rows={3}
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_info.owner_name}
                  onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contact_email">Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => handleContactInfoChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="contact_notes">Additional Notes</Label>
              <Textarea
                id="contact_notes"
                value={formData.contact_info.notes}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional information for applicants..."
                rows={2}
              />
            </div>
          </div>

          {/* Submit Button */}
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
              'Post Job'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
