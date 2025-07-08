import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, MapPin, DollarSign, Building, ArrowLeft, TestTube } from 'lucide-react';
import JobPricingTable from './JobPricingTable';

interface JobPostingTestFlowProps {
  jobFormData: any;
  onBack: () => void;
}

type FlowStep = 'pricing' | 'preview' | 'processing' | 'success';

const JobPostingTestFlow: React.FC<JobPostingTestFlowProps> = ({ jobFormData, onBack }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('pricing');
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePricingSelect = (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('🧪 [TEST] Pricing selected:', { tier, finalPrice, durationMonths });
    
    // For Diamond tier, force 12-month duration and $999.99 pricing
    if (tier === 'diamond') {
      setSelectedPricing({ tier, finalPrice: 999.99, durationMonths: 12 });
    } else {
      setSelectedPricing({ tier, finalPrice, durationMonths });
    }
    
    setCurrentStep('preview');
  };

  const handleConfirmPreview = () => {
    setCurrentStep('processing');
    simulatePaymentProcess();
  };

  const simulatePaymentProcess = async () => {
    if (!selectedPricing) return;
    
    console.log('🧪 [TEST] Simulating payment process...');
    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      if (simulateFailure) {
        console.log('🧪 [TEST] Simulating payment failure');
        toast.error('Payment simulation failed! (This is intentional for testing)');
        setCurrentStep('preview');
        setIsProcessing(false);
        setSimulateFailure(false);
        return;
      }

      console.log('🧪 [TEST] Payment simulation successful');
      toast.success('Payment simulation successful! (No real payment made)');
      
      // Simulate database save (but DON'T save to live database)
      console.log('🧪 [TEST] SIMULATING job post save - NOT SAVING TO LIVE DATABASE');
      console.log('🧪 [TEST] Job data would be:', JSON.stringify(jobFormData, null, 2));
      console.log('🧪 [TEST] Pricing would be:', JSON.stringify(selectedPricing, null, 2));
      
      // Log verification messages for testing
      console.log('✅ [TEST] PAID JOB POST SIMULATION COMPLETE');
      console.log('✅ [TEST] NO DATA SAVED TO LIVE DATABASE');
      console.log('✅ [TEST] TEST POST WILL NOT APPEAR ON JOBS PAGE');
      
      toast.success('✅ Test completed successfully! Check console for details.');
      
      setCurrentStep('success');
      setIsProcessing(false);
      
    } catch (error) {
      console.error('🧪 [TEST] Payment simulation error:', error);
      toast.error('Payment simulation error');
      setCurrentStep('preview');
      setIsProcessing(false);
    }
  };

  // Job Preview Component
  const JobPreview = () => {
    if (!selectedPricing) return null;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <TestTube className="h-6 w-6 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Review Your Test Job Post</h1>
          </div>
          <p className="text-gray-600">Review job details and test the payment simulation</p>
        </div>

        {/* Job Details Preview */}
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900">{jobFormData.title}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {jobFormData.category}
                </Badge>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-300">
                  TEST MODE
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobFormData.salonName && (
                <div className="flex items-center text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{jobFormData.salonName}</span>
                </div>
              )}
              {jobFormData.location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{jobFormData.location}</span>
                </div>
              )}
              {jobFormData.compensationDetails && (
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span>{jobFormData.compensationDetails}</span>
                </div>
              )}
            </div>
            
            {jobFormData.description && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700 leading-relaxed">{jobFormData.description}</p>
              </div>
            )}
            
            {jobFormData.requirements && jobFormData.requirements.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {jobFormData.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card className="border-2 border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="text-xl text-gray-900">Pricing Summary (Test)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan Type:</span>
                <span className="font-semibold capitalize">{selectedPricing.tier} Listing</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">{selectedPricing.durationMonths} months</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                <span className="text-gray-900">Total (Simulated):</span>
                <span className="text-green-600">${selectedPricing.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Controls */}
        <Alert className="border-yellow-200 bg-yellow-50">
          <TestTube className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <div className="space-y-3">
              <p><strong>Payment Simulation Testing:</strong></p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setSimulateFailure(false);
                    handleConfirmPreview();
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  ✅ Simulate Payment Success
                </Button>
                <Button
                  onClick={() => {
                    setSimulateFailure(true);
                    handleConfirmPreview();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  ❌ Simulate Payment Failure
                </Button>
              </div>
              <p className="text-sm">
                Test both success and failure scenarios. No real payments will be processed and 
                no jobs will be saved to the live database.
              </p>
            </div>
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6">
          <Button
            onClick={() => setCurrentStep('pricing')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pricing
          </Button>
        </div>
      </div>
    );
  };

  // Success Page
  const SuccessPage = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Test Payment Successful!</h1>
        <p className="text-gray-600">
          Payment simulation completed successfully. In a real scenario, your job post would now be live.
        </p>
      </div>

      <Alert className="border-green-200 bg-green-50 text-left">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="space-y-2">
            <p><strong>Test Results:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>✅ Form validation passed</li>
              <li>✅ Pricing selection worked</li>
              <li>✅ Job preview displayed correctly</li>
              <li>✅ Payment simulation successful</li>
              <li>✅ No real payment processed</li>
              <li>✅ No job saved to live database</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <Button
          onClick={() => navigate('/post-job-paid-test')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Test Another Job Post
        </Button>
        <div>
          <Button
            onClick={() => navigate('/jobs')}
            variant="outline"
          >
            View Live Jobs Page
          </Button>
        </div>
      </div>
    </div>
  );

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TestTube className="h-6 w-6 text-yellow-600" />
            <span className="text-lg font-semibold text-gray-900">Testing Mode</span>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Simulating payment processing...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {simulateFailure ? 'Testing payment failure scenario' : 'Testing payment success scenario'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto py-8">
        
        {currentStep === 'pricing' && (
          <>
            <div className="mb-6">
              <button
                onClick={onBack}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                ← Back to Job Details
              </button>
            </div>
            
            <div className="text-center mb-6">
              <Alert className="border-yellow-200 bg-yellow-50 inline-flex items-center">
                <TestTube className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800 ml-2">
                  <strong>Test Mode:</strong> All payments will be simulated
                </AlertDescription>
              </Alert>
            </div>
            
            <JobPricingTable
              onPricingSelect={handlePricingSelect}
              jobData={jobFormData}
            />
          </>
        )}

        {currentStep === 'preview' && <JobPreview />}
        {currentStep === 'success' && <SuccessPage />}
      </div>
    </div>
  );
};

export default JobPostingTestFlow;