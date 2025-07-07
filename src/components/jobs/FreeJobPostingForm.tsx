
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { submitFreeJob, isSubmitting } = useJobPosting();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Nail Technician',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: user?.email || '',
      notes: '',
      zalo: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔄 [FREE-JOB-FORM] Starting job submission...');
    console.log('🔄 [FREE-JOB-FORM] Form data:', formData);
    console.log('🔄 [FREE-JOB-FORM] User ID:', user?.id);

    if (!user?.id) {
      console.error('❌ [FREE-JOB-FORM] No authenticated user');
      toast.error('Please sign in to post a job');
      return;
    }

    try {
      const result = await submitFreeJob({
        ...formData,
        user_id: user.id
      });

      console.log('📊 [FREE-JOB-FORM] Submission result:', result);

      if (result.success && result.jobId) {
        console.log('✅ [FREE-JOB-FORM] Job posted successfully, ID:', result.jobId);
        toast.success('Job posted successfully!');
        navigate(`/post-success?jobId=${result.jobId}&type=free`);
      } else {
        console.error('❌ [FREE-JOB-FORM] Job submission failed:', result.error);
        toast.error(result.error || 'Failed to post job. Please try again.');
      }
    } catch (error) {
      console.error('💥 [FREE-JOB-FORM] Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Nail Technician Needed"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="Nail Technician">Nail Technician</option>
              <option value="Hair Stylist">Hair Stylist</option>
              <option value="Esthetician">Esthetician</option>
              <option value="Massage Therapist">Massage Therapist</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Los Angeles, CA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the position, requirements, and benefits..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compensation Type</label>
            <Input
              value={formData.compensation_type}
              onChange={(e) => handleInputChange('compensation_type', e.target.value)}
              placeholder="e.g. Hourly, Weekly, Commission"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compensation Details</label>
            <Input
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g. $15-20/hour, $800-1200/week"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List any specific requirements or qualifications..."
              rows={3}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name</label>
                <Input
                  value={formData.contact_info.owner_name}
                  onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zalo (optional)</label>
                <Input
                  value={formData.contact_info.zalo}
                  onChange={(e) => handleContactInfoChange('zalo', e.target.value)}
                  placeholder="Zalo username"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                value={formData.contact_info.notes}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional information for applicants..."
                rows={3}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.title}
            className="w-full"
          >
            {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
