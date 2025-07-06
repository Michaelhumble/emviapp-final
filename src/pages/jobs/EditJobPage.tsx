
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSubmitting } = useJobPosting();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    description: '',
    compensation_type: '',
    compensation_details: '',
    requirements: ''
  });

  useEffect(() => {
    if (!user || !id) return;
    
    const fetchJob = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setJob(data);
        setFormData({
          title: data.title || '',
          category: data.category || '',
          location: data.location || '',
          description: data.description || '',
          compensation_type: data.compensation_type || '',
          compensation_details: data.compensation_details || '',
          requirements: data.requirements || ''
        });
      } catch (error) {
        console.error('Error fetching job:', error);
        toast.error('Failed to load job');
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !id) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: formData.title,
          category: formData.category,
          location: formData.location,
          description: formData.description,
          compensation_type: formData.compensation_type,
          compensation_details: formData.compensation_details,
          requirements: formData.requirements,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Job updated successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!job) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Job not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Edit Job</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Nail Technician">Nail Technician</SelectItem>
                <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                <SelectItem value="Esthetician">Esthetician</SelectItem>
                <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                <SelectItem value="Barber">Barber</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the job role and responsibilities"
              className="min-h-32"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compensation Type</label>
            <Select value={formData.compensation_type} onValueChange={(value) => handleInputChange('compensation_type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select compensation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hourly">Hourly</SelectItem>
                <SelectItem value="Commission">Commission</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Per Service">Per Service</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compensation Details</label>
            <Input
              value={formData.compensation_details}
              onChange={(e) => handleInputChange('compensation_details', e.target.value)}
              placeholder="e.g., $15-20/hour, 50% commission"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="List job requirements and qualifications"
              className="min-h-24"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Updating...' : 'Update Job'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/jobs')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditJobPage;
