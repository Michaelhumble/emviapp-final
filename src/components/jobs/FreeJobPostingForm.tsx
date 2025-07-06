
import React, { useState } from 'react';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const { submitFreeJob, isSubmitting } = useJobPosting();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: ''
    }
  });

  console.log('🆓 [FREE-FORM] Component rendered with user:', user?.id);
  console.log('🆓 [FREE-FORM] Current form data:', formData);

  const handleInputChange = (field: string, value: string) => {
    console.log('🆓 [FREE-FORM] Input change:', { field, value });
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    console.log('🆓 [FREE-FORM] Contact info change:', { field, value });
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
    
    console.log('🆓 [FREE-FORM] ===================');
    console.log('🆓 [FREE-FORM] Form submission started');
    console.log('🆓 [FREE-FORM] Form data being submitted:', formData);

    if (!user) {
      console.error('❌ [FREE-FORM] No authenticated user');
      toast.error('Please sign in to post a job');
      return;
    }

    if (!formData.title.trim()) {
      console.error('❌ [FREE-FORM] Missing job title');
      toast.error('Job title is required');
      return;
    }

    if (!formData.location.trim()) {
      console.error('❌ [FREE-FORM] Missing location');
      toast.error('Location is required');
      return;
    }

    console.log('✅ [FREE-FORM] Validation passed, calling submitFreeJob...');
    const result = await submitFreeJob(formData);
    
    console.log('🆓 [FREE-FORM] Submit result:', result);
    
    if (result.success) {
      console.log('✅ [FREE-FORM] Job posted successfully');
      // Form will be reset and user redirected by the hook
    } else {
      console.error('❌ [FREE-FORM] Job posting failed:', result.error);
    }
    console.log('🆓 [FREE-FORM] =================== END');
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Please sign in to post a job.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <CardDescription>
          Reach beauty professionals in your area with a free job posting.
        </CardDescription>
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
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Nails">Nails</option>
              <option value="Hair">Hair</option>
              <option value="Skincare">Skincare</option>
              <option value="Massage">Massage</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g. Los Angeles, CA"
              required
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="Email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Zalo</label>
                <Input
                  value={formData.contact_info.zalo}
                  onChange={(e) => handleContactInfoChange('zalo', e.target.value)}
                  placeholder="Zalo ID"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
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
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? 'Posting Job...' : 'Post Free Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
