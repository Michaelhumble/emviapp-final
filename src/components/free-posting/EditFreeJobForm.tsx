
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';

const EditFreeJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    description: '',
    requirements: '',
    salary_range: '',
    contact_phone: '',
    contact_email: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId || !user) return;

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .eq('pricing_tier', 'free')
          .single();

        if (error) throw error;

        // Check if user owns this job
        if (data.user_id !== user.id && user.role !== 'admin') {
          toast.error('You do not have permission to edit this job.');
          navigate('/jobs');
          return;
        }

        // Safely extract contact info
        const contactInfo = data.contact_info as any;
        setJobData({
          title: data.title || '',
          location: data.location || '',
          description: data.description || '',
          requirements: data.requirements || '',
          salary_range: data.salary_range || '',
          contact_phone: (contactInfo && typeof contactInfo === 'object' && contactInfo.phone) || '',
          contact_email: (contactInfo && typeof contactInfo === 'object' && contactInfo.email) || ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
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
    if (!jobId || !user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: jobData.title,
          location: jobData.location,
          description: jobData.description,
          requirements: jobData.requirements,
          salary_range: jobData.salary_range,
          contact_info: {
            phone: jobData.contact_phone,
            email: jobData.contact_email
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.id);

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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
          <CardTitle>Edit Job Posting</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={jobData.title}
                onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="e.g., Nail Technician, Hair Stylist"
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={jobData.location}
                onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                required
                placeholder="City, State"
              />
            </div>

            <div>
              <Label htmlFor="salary_range">Salary Range</Label>
              <Input
                id="salary_range"
                value={jobData.salary_range}
                onChange={(e) => setJobData(prev => ({ ...prev, salary_range: e.target.value }))}
                placeholder="e.g., $15-20/hour, $40,000-50,000/year"
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={jobData.description}
                onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={4}
                placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
              />
            </div>

            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={jobData.requirements}
                onChange={(e) => setJobData(prev => ({ ...prev, requirements: e.target.value }))}
                rows={3}
                placeholder="List any specific requirements, certifications, or experience needed..."
              />
            </div>

            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={jobData.contact_phone}
                onChange={(e) => setJobData(prev => ({ ...prev, contact_phone: e.target.value }))}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={jobData.contact_email}
                onChange={(e) => setJobData(prev => ({ ...prev, contact_email: e.target.value }))}
                placeholder="Your email address"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700"
              >
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
    </div>
  );
};

export default EditFreeJobForm;
