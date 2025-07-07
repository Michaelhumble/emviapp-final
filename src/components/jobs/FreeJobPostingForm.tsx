
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  // Debug Panel Component
  const DebugPanel = ({ payload, error, userId }: { payload?: any, error?: any, userId?: string }) => {
    if (!payload && !error) return null;
    
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-bold text-red-800 mb-2">🔍 DEBUG AUDIT RESULTS</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Authenticated User ID:</strong> 
            <span className={userId ? 'text-green-600' : 'text-red-600'}>
              {userId || 'NOT AUTHENTICATED'}
            </span>
          </div>
          <div>
            <strong>Payload Sent to Supabase:</strong>
            <pre className="bg-white p-2 rounded border text-xs overflow-auto max-h-32">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>
          {error && (
            <div>
              <strong>Supabase Error:</strong>
              <pre className="bg-red-100 p-2 rounded border text-xs overflow-auto max-h-32 text-red-800">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    );
  };

  const [debugData, setDebugData] = useState<{
    payload?: any;
    error?: any;
    userId?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 [AUDIT] Starting job submission flow...');
    
    // STEP 1: Check Authentication
    console.log('🔍 [AUDIT] STEP 1 - Authentication Check');
    console.log('🔍 [AUDIT] User object:', user);
    console.log('🔍 [AUDIT] User ID:', user?.id);
    console.log('🔍 [AUDIT] User email:', user?.email);
    
    if (!user?.id) {
      const errorMsg = 'User not authenticated - missing user.id';
      console.error('❌ [AUDIT] Authentication failed:', errorMsg);
      toast.error('Authentication Error: You must be signed in to post a job');
      setDebugData({ userId: 'NOT_AUTHENTICATED', error: { message: errorMsg } });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // STEP 2: Build Payload
      console.log('🔍 [AUDIT] STEP 2 - Building payload...');
      
      const payload = {
        title: formData.title.trim(),
        category: formData.category,  
        location: formData.location?.trim() || '',
        description: formData.description?.trim() || '',
        compensation_type: formData.compensation_type || '',
        compensation_details: formData.compensation_details?.trim() || '',
        requirements: formData.requirements?.trim() || '',
        contact_info: formData.contact_info,
        user_id: user.id, // ✅ CRITICAL: Set authenticated user ID
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('🔍 [AUDIT] Final payload to be sent:', payload);
      console.log('🔍 [AUDIT] Payload user_id:', payload.user_id);
      console.log('🔍 [AUDIT] Auth user ID:', user.id);
      console.log('🔍 [AUDIT] IDs match:', payload.user_id === user.id);
      
      setDebugData({ payload, userId: user.id });

      // STEP 3: Supabase Insert
      console.log('🔍 [AUDIT] STEP 3 - Sending to Supabase...');
      console.log('🔍 [AUDIT] About to call supabase.from("jobs").insert()');
      
      const { data, error } = await supabase
        .from('jobs')
        .insert([payload])
        .select()
        .single();

      console.log('🔍 [AUDIT] STEP 4 - Supabase Response');
      console.log('🔍 [AUDIT] Insert data:', data);
      console.log('🔍 [AUDIT] Insert error:', error);

      if (error) {
        console.error('❌ [AUDIT] Supabase insert failed:', error);
        console.error('❌ [AUDIT] Error code:', error.code);
        console.error('❌ [AUDIT] Error message:', error.message);
        console.error('❌ [AUDIT] Error details:', error.details);
        console.error('❌ [AUDIT] Error hint:', error.hint);
        
        setDebugData({ payload, userId: user.id, error });
        
        // Show full error to user
        toast.error(`Supabase Error: ${error.message}`, {
          description: error.details || error.hint || 'Check console for full error details',
          duration: 10000
        });
        
        return;
      }

      if (!data) {
        const noDataError = 'No data returned from Supabase insert';
        console.error('❌ [AUDIT] No data returned:', noDataError);
        setDebugData({ payload, userId: user.id, error: { message: noDataError } });
        toast.error('Insert failed: No data returned from Supabase');
        return;
      }

      // STEP 5: Success Verification
      console.log('✅ [AUDIT] STEP 5 - Success!');
      console.log('✅ [AUDIT] Job created with ID:', data.id);
      console.log('✅ [AUDIT] Full job data:', data);
      
      // Verify job actually exists in table
      console.log('🔍 [AUDIT] STEP 6 - Verifying job exists in table...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', data.id)
        .single();
        
      if (verifyError || !verifyData) {
        console.error('❌ [AUDIT] Job verification failed:', verifyError);
        toast.error('Job may not have been saved properly');
      } else {
        console.log('✅ [AUDIT] Job verified in database:', verifyData);
        toast.success('Job posted successfully!');
        
        // Clear debug data on success
        setDebugData({});
        
        // Navigate to jobs page
        navigate('/jobs');
      }

    } catch (err) {
      console.error('💥 [AUDIT] Unexpected error during submission:', err);
      setDebugData({ 
        payload: debugData.payload, 
        userId: user.id, 
        error: { message: `Unexpected error: ${err}` } 
      });
      toast.error(`Unexpected error: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const categories = [
    'Nail Technician',
    'Hair Stylist', 
    'Esthetician',
    'Massage Therapist',
    'Barber',
    'Makeup Artist',
    'Lash Artist',
    'Brow Artist',
    'Management',
    'Reception',
    'Other'
  ];

  const compensationTypes = [
    'hourly',
    'commission',
    'salary',
    'booth_rental'
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
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
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} required>
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
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select compensation type" />
              </SelectTrigger>
              <SelectContent>
                {compensationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g., $18-25/hour plus tips"
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
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List the required qualifications, experience, licenses..."
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
                  placeholder="contact@salon.com"
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

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Posting Job...' : 'Post Job'}
          </Button>

          {/* Debug Panel - shows detailed audit info */}
          <DebugPanel {...debugData} />
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
