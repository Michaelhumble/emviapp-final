
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

interface ContactInfo {
  owner_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  zalo?: string;
}

interface JobFormData {
  title: string;
  location: string;
  description: string;
  compensation_details: string;
  compensation_type: string;
  contact_info: ContactInfo;
}

const PostFreeJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    compensation_details: '',
    compensation_type: 'hourly',
    contact_info: {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error('You must be logged in to post a job');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          title: job.title,
          location: job.location,
          description: job.description,
          compensation_details: job.compensation_details,
          compensation_type: job.compensation_type,
          contact_info: job.contact_info,
          user_id: user.id,
          pricing_tier: 'free',
          status: 'active',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        });

      if (error) {
        console.error('Error creating job:', error);
        toast.error('Failed to post job');
        return;
      }

      toast.success('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setJob(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: keyof ContactInfo, value: string) => {
    setJob(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  return (
    <Container className="py-8 max-w-2xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post a Free Job</CardTitle>
          <p className="text-gray-600">
            Create a job posting at no cost. Your listing will be active for 30 days.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={job.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Nail Technician Needed"
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={job.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Houston, TX"
                required
              />
            </div>

            <div>
              <Label htmlFor="compensation_details">Salary/Pay</Label>
              <Input
                id="compensation_details"
                value={job.compensation_details}
                onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                placeholder="e.g., $15-20/hour or $30,000-40,000/year"
              />
            </div>

            <div>
              <Label htmlFor="compensation_type">Pay Type</Label>
              <select
                id="compensation_type"
                value={job.compensation_type}
                onChange={(e) => handleInputChange('compensation_type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
                <option value="commission">Commission</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={job.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the position, requirements, and what you're looking for..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_phone">Phone</Label>
                <Input
                  id="contact_phone"
                  value={job.contact_info.phone || ''}
                  onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={job.contact_info.email || ''}
                  onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  placeholder="contact@salon.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                value={job.contact_info.owner_name || ''}
                onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                placeholder="Manager or Owner name"
              />
            </div>

            <div>
              <Label htmlFor="contact_notes">Additional Notes</Label>
              <Textarea
                id="contact_notes"
                value={job.contact_info.notes || ''}
                onChange={(e) => handleContactInfoChange('notes', e.target.value)}
                placeholder="Any additional contact information or notes..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                {loading ? 'Posting...' : 'Post Job'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/jobs')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostFreeJob;
