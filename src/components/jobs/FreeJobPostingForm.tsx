
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
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
      email: '',
      notes: ''
    }
  });

  console.log('🔍 [FREE-JOB-FORM] Component rendered, user state:', {
    isSignedIn,
    userId: user?.id,
    userEmail: user?.email
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

  const validateForm = () => {
    console.log('🔍 [VALIDATION] Starting form validation');
    
    if (!formData.title.trim()) {
      console.log('❌ [VALIDATION] Title is required');
      return 'Job title is required';
    }
    
    if (!formData.category.trim()) {
      console.log('❌ [VALIDATION] Category is required');
      return 'Category is required';
    }
    
    if (!formData.description.trim()) {
      console.log('❌ [VALIDATION] Description is required');
      return 'Job description is required';
    }

    console.log('✅ [VALIDATION] Form validation passed');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🎯 [SUBMIT-START] Form submission started');
    
    // Clear previous states
    setSubmitError(null);
    setSubmitSuccess(false);
    
    // Auth check
    if (!isSignedIn || !user) {
      console.log('🔐 [AUTH-ERROR] User not authenticated');
      setSubmitError('You must be logged in to post a job');
      return;
    }

    console.log('🔐 [AUTH-CHECK] User authenticated:', {
      userId: user.id,
      email: user.email
    });

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      console.log('❌ [VALIDATION-ERROR]', validationError);
      setSubmitError(validationError);
      return;
    }

    // Prepare payload
    const payload = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      location: formData.location.trim() || null,
      description: formData.description.trim(),
      compensation_type: formData.compensation_type.trim() || null,
      compensation_details: formData.compensation_details.trim() || null,
      requirements: formData.requirements.trim() || null,
      contact_info: formData.contact_info,
      user_id: user.id,
      status: 'active',
      pricing_tier: 'free'
    };

    console.log('📋 [PAYLOAD] Prepared payload for Supabase:', payload);

    setIsSubmitting(true);

    try {
      console.log('🚀 [SUPABASE-CALL] Calling supabase.from("jobs").insert()');
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select();

      console.log('📨 [SUPABASE-RESPONSE] Response received:', {
        data,
        error,
        hasData: !!data,
        dataLength: data?.length || 0
      });

      if (error) {
        console.log('💥 [SUPABASE-ERROR] Insert failed:', error);
        setSubmitError(`Failed to create job: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.log('💥 [SUPABASE-ERROR] No data returned from insert');
        setSubmitError('Failed to create job: No data returned');
        return;
      }

      console.log('✅ [SUPABASE-SUCCESS] Job created successfully:', data[0]);
      setSubmitSuccess(true);

      // Reset form
      setFormData({
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
          email: '',
          notes: ''
        }
      });

      // Navigate to jobs page after a short delay
      setTimeout(() => {
        console.log('🔄 [NAVIGATION] Redirecting to /jobs');
        navigate('/jobs');
      }, 2000);

    } catch (error) {
      console.log('💥 [CATCH-ERROR] Unexpected error:', error);
      setSubmitError(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You must be logged in to post a job. Please sign in first.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Job posted successfully! Redirecting to jobs page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Post a Free Job</CardTitle>
        </CardHeader>
        <CardContent>
          {submitError && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {submitError}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                placeholder="e.g., Nail Services"
                required
              />
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
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the job requirements, duties, and benefits..."
                rows={4}
                required
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
                placeholder="e.g., $15-25/hour + tips"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                placeholder="List any specific requirements or qualifications..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div>
                <Label htmlFor="owner_name">Contact Name</Label>
                <Input
                  id="owner_name"
                  value={formData.contact_info.owner_name}
                  onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="Your email address"
                />
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.contact_info.notes}
                  onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                  placeholder="Any additional information..."
                  rows={2}
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
    </div>
  );
};

export default FreeJobPostingForm;
