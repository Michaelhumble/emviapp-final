
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const FreeJobForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    compensation_details: '',
    requirements: '',
    contact_phone: '',
    contact_email: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to post a job');
      navigate('/auth');
      return;
    }

    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        compensation_details: formData.compensation_details || null,
        requirements: formData.requirements || null,
        contact_info: {
          phone: formData.contact_phone || null,
          email: formData.contact_email || user.email
        },
        pricing_tier: 'free',
        status: 'active',
        user_id: user.id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) {
        console.error('Error creating free job:', error);
        toast.error('Failed to post job. Please try again.');
        return;
      }

      toast.success('Free job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Post a Free Job
            </CardTitle>
            <p className="text-gray-600 text-center">
              Post your job listing for free and reach talented professionals
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title *
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Nail Technician, Hair Stylist"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location *
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
                  rows={6}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Compensation Details
                </label>
                <Input
                  type="text"
                  value={formData.compensation_details}
                  onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                  placeholder="e.g., $20-25/hour, Commission-based, $40,000-50,000/year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Requirements
                </label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  placeholder="List any specific requirements, certifications, or experience needed..."
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Phone
                </label>
                <Input
                  type="tel"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Email
                </label>
                <Input
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="Your email address"
                  defaultValue={user?.email || ''}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/jobs')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Posting...' : 'Post Free Job'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeJobForm;
