
import React, { useState } from 'react';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { submitFreeJob, isSubmitting } = useJobPosting();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Other',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🆓 [FREE-FORM] Form submission started:', {
      title: formData.title,
      category: formData.category,
      location: formData.location
    });

    const result = await submitFreeJob(formData);
    
    console.log('🆓 [FREE-FORM] Submission result:', result);

    if (result.success) {
      console.log('✅ [FREE-FORM] Success! Navigating to jobs page');
      // Navigate to jobs page to see the new listing
      navigate('/jobs');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
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
              <option value="Other">Other</option>
              <option value="Nail Technician">Nail Technician</option>
              <option value="Hair Stylist">Hair Stylist</option>
              <option value="Esthetician">Esthetician</option>
              <option value="Massage Therapist">Massage Therapist</option>
              <option value="Management">Management</option>
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
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the position, requirements, and benefits..."
              rows={4}
              required
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

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name</label>
                <Input
                  value={formData.contact_info.owner_name}
                  onChange={(e) => handleContactChange('owner_name', e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  value={formData.contact_info.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Notes</label>
                <Input
                  value={formData.contact_info.notes}
                  onChange={(e) => handleContactChange('notes', e.target.value)}
                  placeholder="Any additional contact info"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting} 
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
