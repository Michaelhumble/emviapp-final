
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

// Job categories - locked choices
const JOB_CATEGORIES = [
  'Nail Tech',
  'Hair Stylist', 
  'Lash Tech',
  'Barber',
  'Spa',
  'Tattoo',
  'Esthetician',
  'Makeup',
  'Other'
] as const;

const FreeJobPostingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    otherCategoryDescription: '',
    title: '',
    description: '',
    location: '',
    compensation_type: '',
    compensation_details: '',
    requirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to post a job');
      return;
    }

    if (!formData.category) {
      toast.error('Please select a job category');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          compensation_type: formData.compensation_type,
          compensation_details: formData.compensation_details,
          requirements: formData.requirements,
          category: formData.category,
          user_id: user.id,
          status: 'active',
          pricing_tier: 'free',
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Post a Free Job</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="category">Job Category *</Label>
          <Select onValueChange={(value) => handleInputChange('category', value)} value={formData.category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a beauty industry category" />
            </SelectTrigger>
            <SelectContent>
              {JOB_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.category === 'Other' && (
          <div>
            <Label htmlFor="otherCategoryDescription">Please specify the job category</Label>
            <Input
              id="otherCategoryDescription"
              value={formData.otherCategoryDescription}
              onChange={(e) => handleInputChange('otherCategoryDescription', e.target.value)}
              placeholder="e.g., Massage Therapist, Receptionist, etc."
            />
          </div>
        )}

        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
            placeholder="e.g. Nail Technician, Hair Stylist"
          />
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            required
            placeholder="e.g. Los Angeles, CA"
          />
        </div>

        <div>
          <Label htmlFor="compensation_type">Employment Type</Label>
          <Input
            id="compensation_type"
            value={formData.compensation_type}
            onChange={(e) => handleInputChange('compensation_type', e.target.value)}
            placeholder="e.g. Full-time, Part-time, Contract"
          />
        </div>

        <div>
          <Label htmlFor="compensation_details">Compensation</Label>
          <Input
            id="compensation_details"
            value={formData.compensation_details}
            onChange={(e) => handleInputChange('compensation_details', e.target.value)}
            placeholder="e.g. $15-20/hour, Commission based"
          />
        </div>

        <div>
          <Label htmlFor="description">Job Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            required
            rows={6}
            placeholder="Describe the job responsibilities, requirements, and what you're looking for..."
          />
        </div>

        <div>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements}
            onChange={(e) => handleInputChange('requirements', e.target.value)}
            rows={4}
            placeholder="List any specific requirements, experience, or qualifications needed..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/jobs')}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? 'Posting...' : 'Post Free Job'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FreeJobPostingForm;
