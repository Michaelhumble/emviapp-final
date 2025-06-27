
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EditFreeJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [jobData, setJobData] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    salary_range: '',
    compensation_type: 'hourly',
    requirements: '',
    contact_info: {
      phone: '',
      email: ''
    }
  });

  useEffect(() => {
    fetchJobData();
  }, [jobId]);

  const fetchJobData = async () => {
    if (!jobId) return;

    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) throw error;

      if (!data) {
        toast.error('Job not found');
        navigate('/jobs');
        return;
      }

      // Check if user can edit this job
      if (data.user_id !== user?.id && user?.role !== 'admin') {
        toast.error('You do not have permission to edit this job');
        navigate('/jobs');
        return;
      }

      setJobData(data);
      setFormData({
        title: data.title || '',
        company: data.company || '',
        location: data.location || '',
        description: data.description || '',
        salary_range: data.compensation_details || '', // Use compensation_details instead of salary_range
        compensation_type: data.compensation_type || 'hourly',
        requirements: data.requirements || '',
        contact_info: {
          phone: data.contact_info?.phone || '',
          email: data.contact_info?.email || ''
        }
      });
    } catch (error) {
      console.error('Error fetching job:', error);
      toast.error('Failed to load job data');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          compensation_details: formData.salary_range, // Map to compensation_details
          compensation_type: formData.compensation_type,
          requirements: formData.requirements,
          contact_info: formData.contact_info,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user!.id);

      if (error) throw error;

      toast.success('Job updated successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-8">
        <div className="flex items-center justify-center min-h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Container>
    );
  }

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
          <CardTitle>Edit Job Posting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="salary">Salary/Compensation</Label>
              <Input
                id="salary"
                value={formData.salary_range}
                onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
                placeholder="e.g., $15-20/hour, $40,000-50,000/year"
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                rows={4}
                placeholder="List any specific requirements or qualifications"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={formData.contact_info.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact_info: { ...formData.contact_info, phone: e.target.value }
                  })}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.contact_info.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contact_info: { ...formData.contact_info, email: e.target.value }
                  })}
                  placeholder="contact@example.com"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  'Update Job'
                )}
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

export default EditFreeJobForm;
