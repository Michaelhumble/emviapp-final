
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJobMutations } from '@/hooks/jobs/useJobMutations';
import { useJobValidation } from '@/hooks/jobs/useJobValidation';
import JobFormFields from '@/components/jobs/JobFormFields';
import { JobFormData } from '@/types/job';
import { toast } from 'sonner';

const PostFreeJob = () => {
  const navigate = useNavigate();
  const { createJob, loading } = useJobMutations();
  const { validateJobForm } = useJobValidation();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    location: '',
    description: '',
    compensation_type: 'hourly',
    compensation_details: '',
    employment_type: 'full-time',
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: '',
    }
  });

  const handleFieldChange = (field: keyof JobFormData, value: any) => {
    console.log('📝 Form field changed:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    console.log('📞 Contact info changed:', field, value);
    setFormData(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 Free job form submitted with data:', formData);
    
    try {
      // Validate form data
      validateJobForm(formData);
      
      console.log('✅ Form validation passed');
      
      // Create job with free pricing tier
      const success = await createJob(formData, 'free');
      
      if (success) {
        console.log('✅ Free job created successfully, redirecting...');
        // Simple redirect to jobs page - no confetti or effects
        navigate('/jobs', { 
          state: { message: 'Your free job has been posted successfully!' }
        });
      } else {
        console.error('❌ Failed to create free job');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Please check all required fields');
      }
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Free Job | EmviApp</title>
        <meta name="description" content="Post your job listing for free and find qualified candidates" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back to Jobs
            </Button>
          </div>

          {/* Free Job Form */}
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Post a Free Job</CardTitle>
              <p className="text-green-50">
                Reach thousands of qualified beauty professionals at no cost
              </p>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <JobFormFields
                  formData={formData}
                  onChange={handleFieldChange}
                  onContactInfoChange={handleContactInfoChange}
                />

                {/* Submit Button */}
                <div className="pt-6 border-t flex gap-4">
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
                    disabled={loading || !formData.title || !formData.location}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Posting Job...' : 'Post Free Job'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostFreeJob;
