
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    employment_type: '',
    compensation_details: '',
    contact_phone: '',
    contact_email: '',
    contact_name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to post a job');
      navigate('/sign-in');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          user_id: user.id,
          title: formData.title,
          location: formData.location,
          description: formData.description,
          employment_type: formData.employment_type,
          compensation_details: formData.compensation_details,
          contact_info: {
            phone: formData.contact_phone,
            email: formData.contact_email,
            owner_name: formData.contact_name
          },
          pricing_tier: 'free',
          status: 'active',
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Job posted successfully!');
      
      // Redirect to the actual job detail page using the real job ID
      navigate(`/jobs/${data.id}`);
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
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Post a Job for Free</CardTitle>
          <p className="text-gray-600">
            Reach qualified candidates in the beauty industry. Your job will be live for 7 days.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Nail Technician, Hair Stylist"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, State"
                required
              />
            </div>

            <div>
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select onValueChange={(value) => handleChange('employment_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
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
              <Label htmlFor="compensation">Compensation</Label>
              <Input
                id="compensation"
                value={formData.compensation_details}
                onChange={(e) => handleChange('compensation_details', e.target.value)}
                placeholder="e.g., $15-20/hour, $40,000/year, Commission based"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe the position, requirements, and what you're looking for..."
                rows={6}
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div>
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => handleChange('contact_name', e.target.value)}
                  placeholder="Your name or hiring manager name"
                />
              </div>

              <div>
                <Label htmlFor="contact_phone">Phone Number</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  placeholder="(555) 123-4567"
                  type="tel"
                />
              </div>

              <div>
                <Label htmlFor="contact_email">Email Address</Label>
                <Input
                  id="contact_email"
                  value={formData.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  placeholder="hiring@company.com"
                  type="email"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Free Listing Details:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Your job will be live for 7 days</li>
                <li>• Appears in the "Free Listings" section</li>
                <li>• Basic contact information display</li>
                <li>• No payment required</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
  );
};

export default FreeJobPostingForm;
