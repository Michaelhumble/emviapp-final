
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
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

const EditFreeJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
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

  useEffect(() => {
    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to fetch job details');
        return;
      }

      if (data) {
        // Safely handle contact_info as it might be stored as JSON
        let contactInfo: ContactInfo = {};
        if (data.contact_info) {
          if (typeof data.contact_info === 'string') {
            try {
              contactInfo = JSON.parse(data.contact_info);
            } catch {
              contactInfo = {};
            }
          } else if (typeof data.contact_info === 'object') {
            contactInfo = data.contact_info as ContactInfo;
          }
        }

        setJob({
          title: data.title || '',
          location: data.location || '',
          description: data.description || '',
          compensation_details: data.compensation_details || '',
          compensation_type: data.compensation_type || 'hourly',
          contact_info: contactInfo
        });
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to fetch job details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      toast.error('You must be logged in to edit a job');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: job.title,
          location: job.location,
          description: job.description,
          compensation_details: job.compensation_details,
          compensation_type: job.compensation_type,
          contact_info: job.contact_info,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) {
        console.error('Error updating job:', error);
        toast.error('Failed to update job');
        return;
      }

      toast.success('Job updated successfully');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
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
          <CardTitle>Edit Free Job Posting</CardTitle>
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
                <Save size={16} />
                {loading ? 'Updating...' : 'Update Job'}
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

export default EditFreeJob;
