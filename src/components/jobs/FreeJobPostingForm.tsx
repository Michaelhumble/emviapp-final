
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
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  console.log('🎯 [FORM-INIT] FreeJobPostingForm component initialized');
  
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  
  console.log('🔐 [AUTH-STATE] User authentication state:', {
    isSignedIn,
    userId: user?.id,
    userEmail: user?.email,
    userObject: user
  });

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    console.log('📝 [FORM-CHANGE] Field updated:', { field, value });
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleContactInfoChange = (field: string, value: string) => {
    console.log('📞 [CONTACT-CHANGE] Contact field updated:', { field, value });
    setFormData(prev => ({
      ...prev,
      contact_info: { ...prev.contact_info, [field]: value }
    }));
  };

  const validateForm = () => {
    console.log('✅ [VALIDATION] Starting form validation...');
    
    const requiredFields = ['title', 'category', 'location', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    console.log('✅ [VALIDATION] Required fields check:', {
      requiredFields,
      missingFields,
      formData: formData
    });

    if (missingFields.length > 0) {
      const errorMsg = `Missing required fields: ${missingFields.join(', ')}`;
      console.log('❌ [VALIDATION-FAIL] Validation failed:', errorMsg);
      return errorMsg;
    }

    console.log('✅ [VALIDATION-SUCCESS] All validations passed');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 [SUBMIT-START] Form submission initiated');
    console.log('🚀 [SUBMIT-START] Complete form data:', formData);

    // Pre-submit checks
    if (!isSignedIn || !user) {
      const authError = 'User must be authenticated to post a job';
      console.log('🔒 [AUTH-ERROR] Authentication check failed:', {
        isSignedIn,
        user,
        userId: user?.id
      });
      setError(authError);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    console.log('⏳ [SUBMIT-PROCESSING] Starting Supabase insert...');

    try {
      // Prepare payload
      const jobPayload = {
        title: formData.title.trim(),
        category: formData.category.trim(),
        location: formData.location.trim(),
        description: formData.description.trim(),
        compensation_type: formData.compensation_type.trim() || null,
        compensation_details: formData.compensation_details.trim() || null,
        requirements: formData.requirements.trim() || null,
        contact_info: formData.contact_info,
        user_id: user.id,
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('📦 [PAYLOAD] Full Supabase insert payload:', jobPayload);
      console.log('🔍 [PAYLOAD-DETAILS] Payload field analysis:', {
        titleLength: jobPayload.title.length,
        categoryLength: jobPayload.category.length,
        locationLength: jobPayload.location.length,
        descriptionLength: jobPayload.description.length,
        userId: jobPayload.user_id,
        contactInfo: jobPayload.contact_info
      });

      // Attempt Supabase insert
      console.log('📤 [SUPABASE-CALL] Calling supabase.from("jobs").insert()...');
      
      const { data, error: insertError } = await supabase
        .from('jobs')
        .insert(jobPayload)
        .select()
        .single();

      console.log('📥 [SUPABASE-RESPONSE] Raw Supabase response:', {
        data,
        error: insertError,
        hasData: !!data,
        hasError: !!insertError
      });

      if (insertError) {
        console.log('💥 [SUPABASE-ERROR] Insert failed with error:', {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
          fullError: insertError
        });
        
        throw new Error(insertError.message || 'Failed to create job posting');
      }

      if (!data) {
        console.log('💥 [DATA-ERROR] No data returned from insert');
        throw new Error('No data returned from job creation');
      }

      console.log('🎉 [SUCCESS] Job created successfully:', {
        jobId: data.id,
        jobTitle: data.title,
        fullData: data
      });

      // Success handling
      setSuccess(true);
      toast.success('Job posted successfully!', {
        description: 'Your job posting is now live.'
      });

      console.log('🧭 [NAVIGATION] Redirecting to /jobs page...');
      
      // Navigate after short delay to show success message
      setTimeout(() => {
        navigate('/jobs');
      }, 1500);

    } catch (err) {
      console.log('💥 [CATCH-ERROR] Caught error during submission:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
      
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error('Failed to post job', {
        description: errorMessage
      });
    } finally {
      setIsSubmitting(false);
      console.log('✅ [SUBMIT-END] Form submission process completed');
    }
  };

  // Auth check for rendering
  if (!isSignedIn) {
    console.log('🔒 [RENDER-AUTH] User not signed in, showing auth message');
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Alert>
          <AlertDescription>
            Please sign in to post a job.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  console.log('🎨 [RENDER] Rendering job posting form for authenticated user');

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a Free Job</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                Job posted successfully! Redirecting to jobs page...
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
                placeholder="e.g., Nail Technician"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., San Jose, CA"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the job requirements and responsibilities..."
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
                placeholder="e.g., $15-20/hour + tips"
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
              <Label className="text-base font-semibold">Contact Information</Label>
              
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="Contact phone number"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="Contact email address"
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
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting Job...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
