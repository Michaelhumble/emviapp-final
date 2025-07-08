import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TestTube } from 'lucide-react';
import CleanJobForm from '@/components/posting/job/CleanJobForm';
import JobPostingTestFlow from '@/components/posting/job/JobPostingTestFlow';

const PostJobPaidTest: React.FC = () => {
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<'form' | 'pricing'>('form');

  const handleFormSubmit = (formData: any) => {
    console.log('🧪 [TEST] Job form submitted:', formData);
    setJobFormData(formData);
    setCurrentStep('pricing');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <>
      <Helmet>
        <title>Paid Job Post Testing - EmviApp</title>
        <meta name="description" content="Test paid job posting functionality with simulated payments" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Testing Warning Banner */}
        <div className="bg-yellow-500 text-yellow-900 py-3 px-4">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <TestTube className="h-5 w-5" />
            <span className="font-semibold">TESTING ENVIRONMENT</span>
            <span>•</span>
            <span>No real payments will be processed</span>
            <span>•</span>
            <span>Test posts will not appear on live site</span>
          </div>
        </div>

        <div className="container mx-auto py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TestTube className="h-8 w-8 text-yellow-600" />
              <h1 className="text-4xl font-bold text-gray-900">Paid Job Post Testing</h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Test the complete paid job posting flow including form validation, pricing selection, 
              and simulated payment processing.
            </p>
          </div>

          {/* Test Environment Alert */}
          <Alert className="mb-8 border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <div className="space-y-2">
                <p><strong>Important Testing Notes:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All payments are simulated - no real charges will occur</li>
                  <li>Test job posts will not appear on the live jobs page</li>
                  <li>Form validation and error handling are fully functional</li>
                  <li>Test all job categories: nails, barber, hair, tattoo, massage, etc.</li>
                  <li>Test both success and failure payment scenarios</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'form' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="font-medium">Job Details</span>
              </div>
              <div className="w-16 h-px bg-gray-300"></div>
              <div className={`flex items-center space-x-2 ${currentStep === 'pricing' ? 'text-purple-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'pricing' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="font-medium">Pricing & Payment</span>
              </div>
            </div>
          </div>

          {/* Form Step */}
          {currentStep === 'form' && (
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Create Test Job Post</CardTitle>
                <p className="text-gray-600">
                  Fill out the job details below. All form validation and category options are fully functional.
                </p>
              </CardHeader>
              <CardContent>
                <CleanJobForm 
                  onSubmit={handleFormSubmit} 
                  isTestMode={true}
                />
              </CardContent>
            </Card>
          )}

          {/* Pricing & Payment Step */}
          {currentStep === 'pricing' && jobFormData && (
            <JobPostingTestFlow
              jobFormData={jobFormData}
              onBack={handleBackToForm}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PostJobPaidTest;