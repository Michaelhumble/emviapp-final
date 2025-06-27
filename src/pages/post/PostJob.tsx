
import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PostJob = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    compensation_type: '',
    compensation_details: '',
    requirements: '',
    category: 'Other' // Default category
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    setLoading(true);

    try {
      const jobData = {
        ...formData,
        user_id: user.id,
        category: formData.category || 'Other', // Ensure category is set
        status: 'active'
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) throw error;

      toast.success('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        compensation_type: '',
        compensation_details: '',
        requirements: '',
        category: 'Other'
      });
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Post a Job</h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              All beauty industry jobs are shown together for now. More filtering coming soon!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Nail Technician Needed"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Los Angeles, CA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the position, requirements, and benefits..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compensation Type</label>
              <Input
                value={formData.compensation_type}
                onChange={(e) => setFormData({ ...formData, compensation_type: e.target.value })}
                placeholder="e.g. Hourly, Weekly, Commission"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compensation Details</label>
              <Input
                value={formData.compensation_details}
                onChange={(e) => setFormData({ ...formData, compensation_details: e.target.value })}
                placeholder="e.g. $15-20/hour, $800-1200/week"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Requirements</label>
              <Textarea
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                placeholder="List any specific requirements or qualifications..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Posting...' : 'Post Job (Free)'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;
