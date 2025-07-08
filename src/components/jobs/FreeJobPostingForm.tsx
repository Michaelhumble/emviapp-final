
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface JobFormData {
  title: string;
  category: string;
  location: string;
  description: string;
  compensation_type: string;
  compensation_details: string;
  requirements: string;
  contact_info: {
    owner_name: string;
    phone: string;
    email: string;
    notes: string;
  };
}

const FreeJobPostingForm = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    category: 'Nail Technician',
    location: '',
    description: '',
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  console.log('🔍 [JOB-FORM] Component mounted - Auth state:', { 
    isSignedIn, 
    userId: user?.id,
    userEmail: user?.email 
  });

  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">
                You need to be signed in to post a job. Please sign in to continue.
              </p>
              <Button 
                onClick={() => navigate('/auth/signin?redirect=/post-job-free')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Sign In to Post Job
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Job title is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.description.trim()) return 'Job description is required';
    if (!formData.compensation_details.trim()) return 'Compensation details are required';
    if (!formData.contact_info.owner_name.trim()) return 'Contact name is required';
    if (!formData.contact_info.phone.trim() && !formData.contact_info.email.trim()) {
      return 'Either phone or email is required for contact';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 [JOB-FORM] Starting job submission...');
    
    // Validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      console.log('❌ [JOB-FORM] Validation failed:', validationError);
      return;
    }

    // Auth check
    if (!user?.id) {
      setError('You must be signed in to post a job');
      console.log('❌ [JOB-FORM] No user ID found');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare payload
      const jobPayload = {
        title: formData.title.trim(),
        category: formData.category,
        location: formData.location.trim(),
        description: formData.description.trim(),
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details.trim(),
        requirements: formData.requirements.trim() || '',
        contact_info: formData.contact_info,
        user_id: user.id, // Critical: set authenticated user ID
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('📤 [JOB-FORM] Submitting payload:', {
        ...jobPayload,
        contact_info: '***HIDDEN***'
      });

      // Insert to Supabase
      const { data, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      console.log('📊 [JOB-FORM] Supabase response:', {
        data: data ? { id: data.id, title: data.title } : null,
        error: insertError
      });

      if (insertError) {
        console.error('❌ [JOB-FORM] Insert failed:', insertError);
        setError(`Failed to post job: ${insertError.message}`);
        return;
      }

      if (data) {
        console.log('✅ [JOB-FORM] Job posted successfully:', data.id);
        setSuccess(true);
        
        // Redirect after 2 seconds to show success
        setTimeout(() => {
          navigate('/jobs');
        }, 2000);
      }

    } catch (err) {
      console.error('💥 [JOB-FORM] Unexpected error:', err);
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Please try again'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof JobFormData['contact_info'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: { ...prev.contact_info, [field]: value }
    }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-4">Job Posted Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Your job has been posted and is now visible to job seekers. 
                Redirecting you to the jobs page...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Post a Free Job</CardTitle>
            <p className="text-gray-600">
              Reach thousands of qualified beauty professionals in your area
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
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
                  placeholder="e.g., Experienced Nail Technician Needed"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="Nail Technician">Nail Technician</option>
                  <option value="Hair Stylist">Hair Stylist</option>
                  <option value="Esthetician">Esthetician</option>
                  <option value="Massage Therapist">Massage Therapist</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Barber">Barber</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Los Angeles, CA"
                  required
                />
              </div>

              <div>
                <Label htmlFor="compensation_type">Compensation Type *</Label>
                <select
                  id="compensation_type"
                  value={formData.compensation_type}
                  onChange={(e) => handleInputChange('compensation_type', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="hourly">Hourly</option>
                  <option value="commission">Commission</option>
                  <option value="salary">Salary</option>
                  <option value="booth_rental">Booth Rental</option>
                </select>
              </div>

              <div>
                <Label htmlFor="compensation_details">Compensation Details *</Label>
                <Input
                  id="compensation_details"
                  value={formData.compensation_details}
                  onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                  placeholder="e.g., $15-20/hour + tips, 50% commission"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the position, responsibilities, and what makes your salon great..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="e.g., Valid license, 2+ years experience, own tools..."
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                
                <div>
                  <Label htmlFor="owner_name">Contact Name *</Label>
                  <Input
                    id="owner_name"
                    value={formData.contact_info.owner_name}
                    onChange={(e) => handleContactChange('owner_name', e.target.value)}
                    placeholder="Your name or salon manager"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.contact_info.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="contact@yoursalon.com"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.contact_info.notes}
                    onChange={(e) => handleContactChange('notes', e.target.value)}
                    placeholder="Best time to contact, special instructions..."
                    rows={2}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  'Post Job for Free'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobPostingForm;
