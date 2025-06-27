
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    compensation_details: '',
    compensation_type: 'hourly',
    employment_type: 'full-time',
    requirements: '',
    contact_info: {
      phone: '',
      email: '',
      notes: ''
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to post a job');
      navigate('/sign-in');
      return;
    }

    if (!formData.title || !formData.location || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          {
            user_id: user.id,
            title: formData.title,
            location: formData.location,
            description: formData.description,
            compensation_details: formData.compensation_details,
            compensation_type: formData.compensation_type,
            employment_type: formData.employment_type,
            requirements: formData.requirements,
            contact_info: formData.contact_info,
            status: 'active',
            pricing_tier: 'free',
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast.success('Job posted successfully!');
      
      // Reset form
      setFormData({
        title: '',
        location: '',
        description: '',
        compensation_details: '',
        compensation_type: 'hourly',
        employment_type: 'full-time',
        requirements: '',
        contact_info: {
          phone: '',
          email: '',
          notes: ''
        }
      });

      // Redirect to the actual job detail page using the real job ID
      if (data?.id) {
        navigate(`/jobs/${data.id}`);
      } else {
        // Fallback to the free jobs listing page
        navigate('/free-jobs');
      }

    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in Required</h3>
          <p className="text-gray-600 mb-4">Please sign in to post a job opportunity.</p>
          <Button onClick={() => navigate('/sign-in')}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <p className="text-gray-600">Your job will be live for 7 days at no cost</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Nail Technician, Hair Stylist"
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="City, State"
              required
            />
          </div>

          <div>
            <Label htmlFor="employment_type">Employment Type</Label>
            <Select
              value={formData.employment_type}
              onValueChange={(value) => handleInputChange('employment_type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="compensation_type">Compensation Type</Label>
            <Select
              value={formData.compensation_type}
              onValueChange={(value) => handleInputChange('compensation_type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="negotiable">Negotiable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="compensation_details">Compensation Details</Label>
            <Input
              id="compensation_details"
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g., $20-25/hour, $40,000-50,000/year"
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the position, responsibilities, and what you're looking for..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="Required skills, experience, certifications..."
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
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
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.contact_info.notes}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional information for applicants..."
                className="min-h-[60px]"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting Job...' : 'Post Job for Free'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
