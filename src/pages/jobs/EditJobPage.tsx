
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobsData } from '@/hooks/useJobsData';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const EditJobPage = () => {
  const params = useParams();
  const jobId = Array.isArray(params.jobId) ? params.jobId[0] : params.jobId;
  const navigate = useNavigate();
  const { jobs } = useJobsData();
  const { handleJobPost } = useJobPosting();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employment_type: '',
    compensation_details: '',
    requirements: '',
    contact_info: { email: '', phone: '' },
    pricing_tier: 'free'
  });

  const job = jobs.find(j => j.id === jobId);

  useEffect(() => {
    if (!job) return;
    
    setFormData({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      employment_type: job.employment_type || '',
      compensation_details: job.compensation_details || '',
      requirements: typeof job.requirements === 'string' ? job.requirements : job.requirements?.join('\n') || '',
      contact_info: job.contact_info || { email: '', phone: '' },
      pricing_tier: job.pricing_tier || 'free'
    });
  }, [job]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="font-playfair text-2xl font-semibold text-gray-900 mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">The job you're trying to edit could not be found.</p>
            <Button 
              onClick={() => navigate('/jobs')}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-medium rounded-xl px-6 py-3"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Jobs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await handleJobPost({ ...formData, jobId });
      
      if (result.success) {
        toast.success('Job updated successfully!');
        navigate('/jobs');
      } else {
        toast.error(result.error || 'Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/jobs')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
          
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Edit Job Posting</h1>
          <p className="text-gray-600">Update your job posting details</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-playfair text-2xl font-semibold text-gray-900">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="font-inter font-medium text-gray-700">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  className="mt-1"
                  placeholder="e.g. Nail Technician, Hair Stylist"
                />
              </div>

              <div>
                <Label htmlFor="location" className="font-inter font-medium text-gray-700">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="mt-1"
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label htmlFor="employment_type" className="font-inter font-medium text-gray-700">Job Type</Label>
                <Select 
                  value={formData.employment_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, employment_type: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Time">Full-Time</SelectItem>
                    <SelectItem value="Part-Time">Part-Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Commission">Commission</SelectItem>
                    <SelectItem value="Booth Rental">Booth Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="compensation_details" className="font-inter font-medium text-gray-700">Compensation</Label>
                <Input
                  id="compensation_details"
                  value={formData.compensation_details}
                  onChange={(e) => setFormData(prev => ({ ...prev, compensation_details: e.target.value }))}
                  className="mt-1"
                  placeholder="e.g. $20-25/hour, 60% commission"
                />
              </div>

              <div>
                <Label htmlFor="description" className="font-inter font-medium text-gray-700">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  className="mt-1 min-h-[120px]"
                  placeholder="Describe the position, responsibilities, and what you're looking for..."
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="font-inter font-medium text-gray-700">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                  className="mt-1"
                  placeholder="List any required qualifications, experience, or certifications..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="font-inter font-medium text-gray-700">Contact Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info.email}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contact_info: { ...prev.contact_info, email: e.target.value }
                    }))}
                    required
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-inter font-medium text-gray-700">Contact Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.contact_info.phone}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      contact_info: { ...prev.contact_info, phone: e.target.value }
                    }))}
                    className="mt-1"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-inter font-semibold rounded-xl px-8 py-3 text-lg"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isSubmitting ? 'Updating...' : 'Update Job'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditJobPage;
