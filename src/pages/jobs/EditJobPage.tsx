import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EditJobPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    compensation_details: '',
    requirements: '',
    compensation_type: ''
  });

  useEffect(() => {
    fetchJobData();
  }, [jobId, user]);

  const fetchJobData = async () => {
    if (!jobId || !user) {
      setError('Invalid job ID or user not authenticated');
      setLoading(false);
      return;
    }

    try {
      console.log('🔍 Fetching job data for ID:', jobId);
      
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .eq('user_id', user.id) // Ensure user owns this job
        .single();

      if (fetchError) {
        console.error('❌ Error fetching job:', fetchError);
        if (fetchError.code === 'PGRST116') {
          setError('Job not found or you do not have permission to edit it');
        } else {
          setError('Failed to load job data');
        }
        setLoading(false);
        return;
      }

      if (!data) {
        setError('Job not found');
        setLoading(false);
        return;
      }

      console.log('✅ Job data fetched:', data);
      setJobData(data);
      
      // Initialize form with job data
      setFormData({
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        category: data.category || '',
        compensation_details: data.compensation_details || '',
        requirements: data.requirements || '',
        compensation_type: data.compensation_type || ''
      });
      
      setLoading(false);
      
    } catch (error) {
      console.error('💥 Unexpected error fetching job:', error);
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleJobUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId || !user) return;

    try {
      console.log('💾 Updating job with data:', formData);
      
      const { error: updateError } = await supabase
        .from('jobs')
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          category: formData.category,
          compensation_details: formData.compensation_details,
          requirements: formData.requirements,
          compensation_type: formData.compensation_type,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (updateError) {
        console.error('❌ Error updating job:', updateError);
        toast.error('Failed to update job');
        return;
      }

      console.log('✅ Job updated successfully');
      toast.success('Job updated successfully!');
      navigate('/jobs');
      
    } catch (error) {
      console.error('💥 Unexpected error updating job:', error);
      toast.error('An unexpected error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading job data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <>
        <Helmet>
          <title>Job Not Found - EmviApp</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
          <div className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
              
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <div className="space-y-2">
                    <p><strong>Job Not Found</strong></p>
                    <p>{error || 'The job you\'re looking for doesn\'t exist or you don\'t have permission to edit it.'}</p>
                    <div className="mt-4">
                      <Button
                        onClick={() => navigate('/jobs')}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Browse Jobs
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Job: {jobData.title} - EmviApp</title>
        <meta name="description" content={`Edit your job posting: ${jobData.title}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
              
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Edit Job Post</h1>
                <p className="text-gray-600">Update your job posting details</p>
              </div>
            </div>

            {/* Edit Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">
                  Editing: {jobData.title}
                </CardTitle>
                <p className="text-gray-600">
                  Make changes to your job posting below. All fields are editable.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJobUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleFormChange('title', e.target.value)}
                      placeholder="e.g., Nail Technician"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleFormChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nail Tech">Nail Tech</SelectItem>
                        <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                        <SelectItem value="Barber">Barber</SelectItem>
                        <SelectItem value="Massage Therapist">Massage Therapist</SelectItem>
                        <SelectItem value="Esthetician">Esthetician</SelectItem>
                        <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
                        <SelectItem value="Tattoo Artist">Tattoo Artist</SelectItem>
                        <SelectItem value="Lash Tech">Lash Tech</SelectItem>
                        <SelectItem value="Brow Tech">Brow Tech</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleFormChange('location', e.target.value)}
                      placeholder="e.g., Houston, TX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="compensation_type">Employment Type</Label>
                    <Select 
                      value={formData.compensation_type} 
                      onValueChange={(value) => handleFormChange('compensation_type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Commission">Commission</SelectItem>
                        <SelectItem value="Booth Rental">Booth Rental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="compensation_details">Compensation Details</Label>
                    <Input
                      id="compensation_details"
                      value={formData.compensation_details}
                      onChange={(e) => handleFormChange('compensation_details', e.target.value)}
                      placeholder="e.g., $20-25/hour + tips"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      placeholder="Describe the position, responsibilities, and work environment..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleFormChange('requirements', e.target.value)}
                      placeholder="List required qualifications, experience, and skills..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                      Update Job
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJobPage;