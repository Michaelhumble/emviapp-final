
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface JobData {
  title: string;
  company?: string;
  location: string;
  description?: string;
  employment_type?: string;
  compensation_details?: string;
  compensation_type?: string;
  contact_info?: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
    zalo?: string;
  };
  requirements?: string[] | string;
  specialties?: string[];
  benefits?: string[];
  features?: string[];
  preferred_languages?: string[];
  weekly_pay?: boolean;
  has_housing?: boolean;
  has_wax_room?: boolean;
  no_supply_deduction?: boolean;
  owner_will_train?: boolean;
  tip_range?: string;
  salon_type?: string;
  vietnamese_description?: string;
  is_urgent?: boolean;
  post_type?: string;
}

const EditFreeJobForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [jobData, setJobData] = useState<JobData>({
    title: '',
    location: '',
    post_type: 'job'
  });

  useEffect(() => {
    const fetchJob = async () => {
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

        // Check if user owns this job or is admin
        if (data.user_id !== user?.id && user?.role !== 'admin') {
          toast.error('You do not have permission to edit this job');
          navigate('/jobs');
          return;
        }

        // Map the fetched data to JobData interface
        const mappedJobData: JobData = {
          title: data.title || '',
          company: data.company || '',
          location: data.location || '',
          description: data.description || '',
          employment_type: data.employment_type || '',
          compensation_details: data.compensation_details || data.salary_range || '',
          compensation_type: data.compensation_type || '',
          contact_info: typeof data.contact_info === 'object' && data.contact_info !== null 
            ? data.contact_info as JobData['contact_info']
            : {},
          requirements: Array.isArray(data.requirements) ? data.requirements : 
                       typeof data.requirements === 'string' ? [data.requirements] : [],
          specialties: Array.isArray(data.specialties) ? data.specialties : [],
          benefits: Array.isArray(data.benefits) ? data.benefits : [],
          features: Array.isArray(data.features) ? data.features : [],
          preferred_languages: Array.isArray(data.preferred_languages) ? data.preferred_languages : [],
          weekly_pay: data.weekly_pay || false,
          has_housing: data.has_housing || false,
          has_wax_room: data.has_wax_room || false,
          no_supply_deduction: data.no_supply_deduction || false,
          owner_will_train: data.owner_will_train || false,
          tip_range: data.tip_range || '',
          salon_type: data.salon_type || '',
          vietnamese_description: data.vietnamese_description || '',
          is_urgent: data.is_urgent || false,
          post_type: data.post_type || 'job'
        };

        setJobData(mappedJobData);
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
    if (!jobId) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          title: jobData.title,
          company: jobData.company,
          location: jobData.location,
          description: jobData.description,
          employment_type: jobData.employment_type,
          compensation_details: jobData.compensation_details,
          compensation_type: jobData.compensation_type,
          contact_info: jobData.contact_info,
          requirements: jobData.requirements,
          specialties: jobData.specialties,
          benefits: jobData.benefits,
          features: jobData.features,
          preferred_languages: jobData.preferred_languages,
          weekly_pay: jobData.weekly_pay,
          has_housing: jobData.has_housing,
          has_wax_room: jobData.has_wax_room,
          no_supply_deduction: jobData.no_supply_deduction,
          owner_will_train: jobData.owner_will_train,
          tip_range: jobData.tip_range,
          salon_type: jobData.salon_type,
          vietnamese_description: jobData.vietnamese_description,
          is_urgent: jobData.is_urgent,
          post_type: jobData.post_type,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

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

  const handleInputChange = (field: keyof JobData, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: keyof NonNullable<JobData['contact_info']>, value: string) => {
    setJobData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
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
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  value={jobData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={jobData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={jobData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>

            {/* Employment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <Input
                  id="employment_type"
                  value={jobData.employment_type || ''}
                  onChange={(e) => handleInputChange('employment_type', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="compensation_details">Compensation</Label>
                <Input
                  id="compensation_details"
                  value={jobData.compensation_details || ''}
                  onChange={(e) => handleInputChange('compensation_details', e.target.value)}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_name">Contact Name</Label>
                  <Input
                    id="contact_name"
                    value={jobData.contact_info?.owner_name || ''}
                    onChange={(e) => handleContactInfoChange('owner_name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Phone</Label>
                  <Input
                    id="contact_phone"
                    value={jobData.contact_info?.phone || ''}
                    onChange={(e) => handleContactInfoChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={jobData.contact_info?.email || ''}
                    onChange={(e) => handleContactInfoChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contact_zalo">Zalo</Label>
                  <Input
                    id="contact_zalo"
                    value={jobData.contact_info?.zalo || ''}
                    onChange={(e) => handleContactInfoChange('zalo', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
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
