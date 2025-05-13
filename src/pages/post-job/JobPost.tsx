
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/context/auth';
import JobForm, { JobFormValues } from '@/components/posting/job/JobForm';
import { Container } from '@/components/ui/container';
import { Layout } from '@/components/layout';
import AuthPostGuard from '@/components/posting/AuthPostGuard';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values: JobFormValues) => {
    setIsSubmitting(true);
    
    // Store the form data in session storage for the pricing page
    sessionStorage.setItem('jobFormData', JSON.stringify(values));
    
    // Simulate API call timing
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/post-job/pricing');
    }, 500);
  };

  return (
    <Layout>
      <Helmet>
        <title>Post a Job | EmviApp</title>
      </Helmet>
      <Container className="py-8">
        <h1 className="text-3xl font-playfair mb-8">Post a Job</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <AuthPostGuard>
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              <div className="lg:col-span-2">
                <JobForm
                  onSubmit={handleSubmit}
                  photoUploads={photoUploads}
                  setPhotoUploads={setPhotoUploads}
                  isSubmitting={isSubmitting}
                  userProfile={userProfile}
                />
              </div>
              
              {/* AI Smart Suggestions Panel - Desktop */}
              <div className="hidden lg:block p-6 bg-gray-50 rounded-r-xl">
                <div className="sticky top-6">
                  <h3 className="font-semibold text-lg mb-4">Smart Tips</h3>
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm">💡 Adding a salary range increases applications by 30%</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm">📸 Adding photos boosts trust and visibility</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm">📝 Keep your description warm and specific—artists want real humans</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Smart Suggestions Panel - Mobile */}
            <div className="lg:hidden p-6 bg-gray-50 border-t border-gray-100">
              <h3 className="font-semibold text-lg mb-4">Smart Tips</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm">💡 Adding a salary range increases applications by 30%</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm">📸 Adding photos boosts trust and visibility</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <p className="text-sm">📝 Keep your description warm and specific—artists want real humans</p>
                </div>
              </div>
            </div>
          </AuthPostGuard>
        </div>
      </Container>
    </Layout>
  );
};

export default JobPost;
