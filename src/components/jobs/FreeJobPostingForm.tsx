
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const JOB_CATEGORIES = [
  'Nail Technician',
  'Hair Stylist', 
  'Makeup Artist',
  'Esthetician',
  'Barber',
  'Lash Technician',
  'Massage Therapist',
  'Receptionist',
  'Manager',
  'Other'
];

const FreeJobPostingForm = () => {
  console.log('🎯 [JOB-FORM] Component mounted');
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
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

  // Debug panel for showing errors
  const DebugPanel = ({ info }: { info: any }) => {
    if (!info) return null;
    
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-red-800 mb-2">🔍 Debug Information</h3>
        <pre className="text-xs overflow-auto max-h-96 bg-red-100 p-2 rounded text-red-900">
          {JSON.stringify(info, null, 2)}
        </pre>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 [JOB-FORM] Form submitted');
    
    // STEP 1: Verify user authentication
    console.log('🔐 [STEP 1] Checking authentication:', {
      user: user ? { id: user.id, email: user.email } : null,
      authenticated: !!user
    });

    if (!user) {
      const error = 'User not authenticated';
      console.error('❌ [STEP 1] FAILED:', error);
      toast.error(error);
      setDebugInfo({ step: 1, error, user: null });
      return;
    }

    console.log('✅ [STEP 1] PASSED: User authenticated');

    // STEP 2: Validate required fields
    console.log('📝 [STEP 2] Validating form data:', formData);
    
    if (!formData.title || !formData.category) {
      const error = 'Title and category are required';
      console.error('❌ [STEP 2] FAILED:', error);
      toast.error(error);
      setDebugInfo({ step: 2, error, formData });
      return;
    }

    console.log('✅ [STEP 2] PASSED: Form validation');

    setIsSubmitting(true);
    
    try {
      // STEP 3: Prepare payload for Supabase
      const payload = {
        title: formData.title,
        category: formData.category,
        location: formData.location || '',
        description: formData.description || '',
        user_id: user.id, // CRITICAL: Include user_id
        status: 'active',
        pricing_tier: 'free',
        compensation_type: formData.compensation_type || '',
        compensation_details: formData.compensation_details || '',
        requirements: formData.requirements || '',
        contact_info: formData.contact_info || {}
      };

      console.log('📦 [STEP 3] Prepared payload:', payload);
      console.log('✅ [STEP 3] PASSED: Payload prepared');

      // STEP 4: Insert into Supabase
      console.log('💾 [STEP 4] Inserting into Supabase...');
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error('❌ [STEP 4] FAILED - Supabase error:', error);
        toast.error(`Database error: ${error.message}`);
        setDebugInfo({ 
          step: 4, 
          error: error.message, 
          fullError: error,
          payload,
          userID: user.id 
        });
        return;
      }

      console.log('✅ [STEP 4] PASSED: Job inserted successfully:', data);

      // STEP 5: Verify job exists in database
      console.log('🔍 [STEP 5] Verifying job exists in database...');
      
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', data.id)
        .single();

      if (verifyError || !verifyData) {
        console.error('❌ [STEP 5] FAILED - Job not found in database:', verifyError);
        toast.error('Job creation could not be verified');
        setDebugInfo({ 
          step: 5, 
          error: 'Job not found after insert',
          verifyError,
          insertedData: data 
        });
        return;
      }

      console.log('✅ [STEP 5] PASSED: Job verified in database:', verifyData);

      // SUCCESS - All steps passed
      console.log('🎉 [SUCCESS] Job posting completed successfully!');
      toast.success('Job posted successfully!');
      
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

      // Navigate to jobs page to see the new job
      setTimeout(() => {
        navigate('/jobs');
      }, 1000);

    } catch (error) {
      console.error('💥 [FATAL ERROR] Unexpected error:', error);
      toast.error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setDebugInfo({ 
        step: 'fatal', 
        error: error instanceof Error ? error.message : 'Unknown error',
        fullError: error,
        userID: user.id,
        payload: formData
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Post a Free Job</CardTitle>
          <p className="text-sm text-gray-600">
            Current User: {user?.email || 'Not signed in'} | ID: {user?.id || 'None'}
          </p>
        </CardHeader>
        <CardContent>
          <DebugPanel info={debugInfo} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Senior Nail Technician"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Los Angeles, CA"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the position, responsibilities, and benefits..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="compensation_type">Compensation Type</Label>
                <Input
                  id="compensation_type"
                  value={formData.compensation_type}
                  onChange={(e) => setFormData({ ...formData, compensation_type: e.target.value })}
                  placeholder="e.g. Hourly, Weekly, Commission"
                />
              </div>

              <div>
                <Label htmlFor="compensation_details">Compensation Details</Label>
                <Input
                  id="compensation_details"
                  value={formData.compensation_details}
                  onChange={(e) => setFormData({ ...formData, compensation_details: e.target.value })}
                  placeholder="e.g. $15-20/hour, $800-1200/week"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List any specific requirements, licenses, or qualifications..."
                rows={3}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h3 className="font-medium">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner_name">Contact Name</Label>
                  <Input
                    id="owner_name"
                    value={formData.contact_info.owner_name}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact_info: { ...formData.contact_info, owner_name: e.target.value }
                    })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contact_info.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      contact_info: { ...formData.contact_info, phone: e.target.value }
                    })}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact_info: { ...formData.contact_info, email: e.target.value }
                  })}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting || !user}
              className="w-full"
            >
              {isSubmitting ? 'Posting Job...' : 'Post Job (Free)'}
            </Button>

            {!user && (
              <p className="text-sm text-red-600 text-center">
                Please sign in to post a job
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeJobPostingForm;
