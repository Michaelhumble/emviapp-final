
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface ContactInfo {
  owner_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

interface JobData {
  id: string;
  title: string;
  company?: string;
  location: string;
  description: string;
  compensation_details: string;
  compensation_type: string;
  contact_info: ContactInfo;
  user_id: string;
  created_at: string;
  expires_at: string;
  pricing_tier: string;
  post_type: string;
  status: string;
}

const EditFreeJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [job, setJob] = useState<JobData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary_range: '',
    owner_name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId || !user) return;

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) {
          console.error('Error fetching job:', error);
          toast.error('Failed to load job details');
          navigate('/jobs');
          return;
        }

        // Check if user owns this job or is admin
        if (data.user_id !== user.id && user.role !== 'admin') {
          toast.error('You do not have permission to edit this job');
          navigate('/jobs');
          return;
        }

        const jobData = data as JobData;
        setJob(jobData);
        
        // Parse contact_info safely
        const contactInfo = (jobData.contact_info as ContactInfo) || {};
        
        setFormData({
          title: jobData.title || '',
          company: jobData.company || '',
          location: jobData.location || '',
          description: jobData.description || '',
          salary_range: jobData.compensation_details || '',
          owner_name: contactInfo.owner_name || '',
          phone: contactInfo.phone || '',
          email: contactInfo.email || ''
        });
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load job details');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !user) return;

    setSaving(true);
    try {
      const updatedData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        description: formData.description,
        compensation_details: formData.salary_range,
        contact_info: {
          owner_name: formData.owner_name,
          phone: formData.phone,
          email: formData.email
        }
      };

      const { error } = await supabase
        .from('jobs')
        .update(updatedData)
        .eq('id', job.id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Job updated successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <Button onClick={() => navigate('/jobs')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Jobs
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
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="salary_range">Salary/Pay Range</Label>
              <Input
                id="salary_range"
                value={formData.salary_range}
                onChange={(e) => setFormData(prev => ({ ...prev, salary_range: e.target.value }))}
                placeholder="e.g., $15-20/hour, $40,000-50,000/year"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={6}
                required
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="owner_name">Contact Name</Label>
                  <Input
                    id="owner_name"
                    value={formData.owner_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, owner_name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
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
                disabled={saving}
                className="flex-1"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Job'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditFreeJobForm;
