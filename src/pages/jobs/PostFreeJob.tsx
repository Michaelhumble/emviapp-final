
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useJobMutations } from '@/hooks/jobs/useJobMutations';
import { useJobValidation } from '@/hooks/jobs/useJobValidation';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const PostFreeJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createJob, loading } = useJobMutations();
  const { validateJobForm } = useJobValidation();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    compensation_type: 'hourly' as const,
    compensation_details: '',
    employment_type: 'full-time' as const,
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: ''
    }
  });

  const handleInputChange = (field: string, value: string) => {
    console.log('📝 PostFreeJob: Input change:', { field, value });
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    console.log('📝 PostFreeJob: Contact info change:', { field, value });
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
    
    console.log('🚀 PostFreeJob: Form submission started');
    console.log('👤 PostFreeJob: Current user:', { 
      id: user?.id, 
      email: user?.email,
      authenticated: !!user 
    });
    console.log('📋 PostFreeJob: Form data being submitted:', JSON.stringify(formData, null, 2));

    if (!user?.id) {
      console.error('❌ PostFreeJob: No authenticated user found');
      toast.error('You must be logged in to post a job');
      return;
    }

    try {
      // Validate form data
      console.log('🔍 PostFreeJob: Validating form data...');
      const validatedData = validateJobForm(formData);
      console.log('✅ PostFreeJob: Form validation passed:', validatedData);

      // Create the job with pricing tier 'free'
      console.log('💾 PostFreeJob: Calling createJob with data:', {
        formData: validatedData,
        pricingTier: 'free',
        userId: user.id
      });

      const success = await createJob(validatedData, 'free');
      
      console.log('📤 PostFreeJob: createJob result:', { success });

      if (success) {
        console.log('✅ PostFreeJob: Job created successfully, navigating to jobs page');
        toast.success('Free job posted successfully!');
        navigate('/jobs');
      } else {
        console.error('❌ PostFreeJob: Job creation failed (returned false)');
        toast.error('Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('❌ PostFreeJob: Error during job submission:', error);
      console.error('❌ PostFreeJob: Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        error: error
      });
      toast.error('Failed to post job. Please try again.');
    }
  };

  if (!user) {
    console.log('🔒 PostFreeJob: User not authenticated, showing login message');
    return (
      <Container className="py-8 max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">You must be logged in to post a job.</p>
          <Button onClick={() => navigate('/auth')}>
            Sign In
          </Button>
        </div>
      </Container>
    );
  }

  console.log('🎨 PostFreeJob: Rendering form for user:', user.id);

  return (
    <Container className="py-8 max-w-2xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Post a Free Job</h1>
        <p className="text-gray-600">
          Post your job listing for free and connect with talented professionals.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="e.g. Nail Technician, Hair Stylist, etc."
            required
          />
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g. New York, NY"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe the job responsibilities, requirements, and benefits..."
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <select
              id="compensation_type"
              value={formData.compensation_type}
              onChange={(e) => handleInputChange('compensation_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="salary">Salary</option>
              <option value="commission">Commission</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <Label htmlFor="employment_type">Employment Type</Label>
            <select
              id="employment_type"
              value={formData.employment_type}
              onChange={(e) => handleInputChange('employment_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="compensation_details">Compensation Details</Label>
          <Input
            id="compensation_details"
            type="text"
            value={formData.compensation_details}
            onChange={(e) => handleInputChange('compensation_details', e.target.value)}
            placeholder="e.g. $15-20/hour, $40,000-50,000/year"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="owner_name">Contact Name</Label>
              <Input
                id="owner_name"
                type="text"
                value={formData.contact_info.owner_name}
                onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                placeholder="Your name or salon name"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.contact_info.phone}
                onChange={(e) => handleContactInfoChange('phone', e.target.value)}
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
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <Label htmlFor="zalo">Zalo (Optional)</Label>
            <Input
              id="zalo"
              type="text"
              value={formData.contact_info.zalo}
              onChange={(e) => handleContactInfoChange('zalo', e.target.value)}
              placeholder="Zalo username or phone"
            />
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.contact_info.notes}
              onChange={(e) => handleContactInfoChange('notes', e.target.value)}
              placeholder="Any additional information for applicants..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/jobs')}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={loading || !formData.title || !formData.location}
            className="flex-1"
          >
            {loading ? 'Posting...' : 'Post Free Job'}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PostFreeJob;
