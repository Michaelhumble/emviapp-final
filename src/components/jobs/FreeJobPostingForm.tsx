
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const FreeJobPostingForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    compensation_details: '',
    contact_phone: '',
    contact_email: '',
    employment_type: 'Full-time'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          user_id: user.id,
          title: formData.title,
          company: formData.company,
          location: formData.location,
          description: formData.description,
          compensation_details: formData.compensation_details,
          employment_type: formData.employment_type,
          contact_info: {
            phone: formData.contact_phone,
            email: formData.contact_email || user.email
          },
          pricing_tier: 'free',
          status: 'active'
        });

      if (error) throw error;

      toast.success('Job posted successfully! It will be live for 7 days.');
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        compensation_details: '',
        contact_phone: '',
        contact_email: '',
        employment_type: 'Full-time'
      });
      
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Free Job</CardTitle>
        <p className="text-gray-600">Your job will be live for 7 days at no cost</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Nail Technician, Hair Stylist"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company/Salon Name *</label>
            <Input
              value={formData.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="Your salon or company name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="City, State"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Employment Type</label>
            <select 
              value={formData.employment_type}
              onChange={(e) => handleChange('employment_type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compensation</label>
            <Input
              value={formData.compensation_details}
              onChange={(e) => handleChange('compensation_details', e.target.value)}
              placeholder="e.g. $15-20/hour, $40k-50k/year, Commission based"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the position, requirements, and what you're looking for..."
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Phone</label>
            <Input
              value={formData.contact_phone}
              onChange={(e) => handleChange('contact_phone', e.target.value)}
              placeholder="Your contact phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Contact Email</label>
            <Input
              type="email"
              value={formData.contact_email}
              onChange={(e) => handleChange('contact_email', e.target.value)}
              placeholder={user?.email || "Your contact email"}
            />
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {loading ? 'Posting...' : 'Post Job for Free'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FreeJobPostingForm;
