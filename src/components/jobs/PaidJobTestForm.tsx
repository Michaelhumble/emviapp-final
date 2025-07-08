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
import { Loader2, CheckCircle, AlertCircle, TestTube } from 'lucide-react';

interface PaidJobTestFormProps {
  initialData?: any;
  onSuccess?: (data: any) => Promise<void>;
  isEditMode?: boolean;
}

const PaidJobTestForm: React.FC<PaidJobTestFormProps> = ({
  initialData,
  onSuccess,
  isEditMode = false
}) => {
  console.log('🧪 MOUNTED - PaidJobTestForm component is rendering', { isEditMode, initialData });
  
  const navigate = useNavigate();
  const { user, isSignedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    compensation_type: initialData?.compensation_type || '',
    compensation_details: initialData?.compensation_details || '',
    requirements: initialData?.requirements || '',
    contact_info: {
      owner_name: initialData?.contact_info?.owner_name || '',
      phone: initialData?.contact_info?.phone || '',
      email: initialData?.contact_info?.email || '',
      notes: initialData?.contact_info?.notes || ''
    }
  });

  console.log('🔍 [PAID-JOB-TEST] Component rendered, user state:', {
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
    console.log('🔍 [PAID-TEST-VALIDATION] Starting form validation');
    
    if (!formData.title.trim()) {
      console.log('❌ [PAID-TEST-VALIDATION] Title is required');
      return 'Job title is required';
    }
    
    if (!formData.category.trim()) {
      console.log('❌ [PAID-TEST-VALIDATION] Category is required');
      return 'Category is required';
    }
    
    if (!formData.description.trim()) {
      console.log('❌ [PAID-TEST-VALIDATION] Description is required');
      return 'Job description is required';
    }

    console.log('✅ [PAID-TEST-VALIDATION] Form validation passed');
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('🧪 [PAID-TEST] Form submission started');
    e.preventDefault();
    
    // Clear previous states
    setSubmitError(null);
    setSubmitSuccess(false);
    
    // Auth check
    if (!isSignedIn || !user) {
      console.log('🔐 [PAID-TEST-AUTH-ERROR] User not authenticated');
      setSubmitError('You must be logged in to post a paid job test');
      return;
    }

    console.log('🔐 [PAID-TEST-AUTH-CHECK] User authenticated:', {
      userId: user.id,
      email: user.email
    });

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      console.log('❌ [PAID-TEST-VALIDATION-ERROR]', validationError);
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // If edit mode and onSuccess is provided, use the edit flow
      if (isEditMode && onSuccess) {
        console.log('🟡 [PAID-TEST-EDIT-MODE] Calling onSuccess handler for edit');
        await onSuccess(formData);
        setSubmitSuccess(true);
        return;
      }

      // Otherwise, create a new paid test job
      console.log('🧪 [PAID-TEST-CREATE-MODE] Creating new paid test job');
      
      // Prepare payload with paid pricing tier
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
        status: 'active', // Active immediately for testing
        pricing_tier: 'paid' // This is the key difference from free jobs
      };

      console.log('📋 [PAID-TEST-PAYLOAD] Prepared payload for Supabase:', payload);

      console.log('🚀 [PAID-TEST-SUPABASE-CALL] Calling supabase.from(\"jobs\").insert()');
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select();

      console.log('📨 [PAID-TEST-SUPABASE-RESPONSE] Response received:', {
        data,
        error,
        hasData: !!data,
        dataLength: data?.length || 0
      });

      if (error) {
        console.log('💥 [PAID-TEST-SUPABASE-ERROR] Insert failed:', error);
        setSubmitError(`Failed to create paid test job: ${error.message}`);
        return;
      }

      if (!data || data.length === 0) {
        console.log('💥 [PAID-TEST-SUPABASE-ERROR] No data returned from insert');
        setSubmitError('Failed to create paid test job: No data returned');
        return;
      }

      console.log('✅ [PAID-TEST-SUPABASE-SUCCESS] Paid test job created successfully:', data[0]);
      console.log('🧪 [PAID-TEST-SUCCESS] Job saved with pricing_tier: "paid" and status: "active"');
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
        console.log('🔄 [PAID-TEST-NAVIGATION] Redirecting to /jobs');
        navigate('/jobs');
      }, 3000);

    } catch (error) {
      console.log('💥 [PAID-TEST-CATCH-ERROR] Unexpected error:', error);
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
                You must be logged in to test paid job posting. Please sign in first.
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
                🧪 Paid test job created successfully! The job has been saved to Supabase with pricing_tier: "paid" and status: "active". Redirecting to jobs page...
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Testing Warning Banner */}
      <div className="bg-amber-500 text-amber-900 py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TestTube className="h-6 w-6" />
              <span className="font-bold text-lg">🧪 PAID JOB TEST MODE</span>
            </div>
            <div className="text-sm font-medium">
              No payment required • Saves directly to database
            </div>
          </div>
          <div className="mt-2 text-sm">
            ⚠️ This creates a real job in Supabase with pricing_tier: "paid" for testing purposes
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5 text-amber-600" />
              {isEditMode ? 'Edit Your Paid Test Job' : 'Post a Paid Test Job'}
            </CardTitle>
            <p className="text-sm text-gray-600">
              This form will save a job directly to Supabase with pricing_tier: "paid" and status: "active" - no payment required for testing.
            </p>
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
                  placeholder="e.g., Senior Nail Technician"
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
                  placeholder="e.g., $20-30/hour + tips"
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
                className="w-full bg-amber-600 hover:bg-amber-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? 'Updating Test Job...' : 'Creating Paid Test Job...'}
                  </>
                ) : (
                  <>
                    <TestTube className="mr-2 h-4 w-4" />
                    {isEditMode ? 'Update Paid Test Job' : 'Create Paid Test Job'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaidJobTestForm;
