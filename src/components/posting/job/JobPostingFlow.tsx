
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, MapPin, Clock, DollarSign, Building, Eye, ArrowLeft } from 'lucide-react';
import JobPricingTable from './JobPricingTable';
import PricingConfirmationModal from './PricingConfirmationModal';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

type FlowStep = 'pricing' | 'preview' | 'confirmation' | 'processing';

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ jobFormData, onBack }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('pricing');
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [simulatePayment, setSimulatePayment] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePricingSelect = (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('💰 [DEBUG] Pricing selected:', { tier, finalPrice, durationMonths });
    console.log('💰 [DEBUG] Job form data for pricing:', JSON.stringify(jobFormData, null, 2));
    
    // For Diamond tier, force 12-month duration and $999.99 pricing - NO OTHER OPTIONS
    if (tier === 'diamond') {
      setSelectedPricing({ tier, finalPrice: 999.99, durationMonths: 12 });
    } else {
      setSelectedPricing({ tier, finalPrice, durationMonths });
    }
    
    // Show preview step before payment
    console.log('💰 [DEBUG] Moving to preview step');
    setCurrentStep('preview');
  };

  const handleConfirmPreview = () => {
    if (!selectedPricing) return;
    
    console.log('👁️ [DEBUG] Preview confirmed, showing payment confirmation');
    setShowConfirmation(true);
  };

  const proceedToPayment = async (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('💳 [DEBUG] proceedToPayment called with:', { tier, finalPrice, durationMonths });
    console.log('💳 [DEBUG] Job data being processed:', JSON.stringify(jobFormData, null, 2));
    
    setShowConfirmation(false);
    setIsProcessing(true);

    try {
      if (!user) {
        console.error('💳 [DEBUG] No user found, redirecting to login');
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      console.log('💳 [DEBUG] User authenticated:', user.id);

      // For Diamond tier, enforce fixed pricing and duration - NO EXCEPTIONS
      if (tier === 'diamond') {
        finalPrice = 999.99;
        durationMonths = 12;
        console.log('💎 [DEBUG] Diamond tier - enforcing fixed pricing');
      }

      // For free tier, create job posting directly without payment
      if (finalPrice === 0) {
        console.log('🆓 [DEBUG] Free job - navigating directly to success page');
        toast.success('Free job posting created successfully!');
        navigate('/post-success');
        return;
      }

      // SIMULATE PAYMENT FOR TESTING - DO NOT HIT STRIPE YET
      if (simulatePayment) {
        console.log('🧪 [DEBUG] SIMULATING PAYMENT - NOT HITTING STRIPE');
        toast.success('Payment simulation successful! (No real payment made)');
        
        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For now, redirect to success page without creating job in database
        navigate('/post-success');
        return;
      }

      // Create Stripe checkout session for paid plans (ONLY when not simulating)
      console.log('💰 [DEBUG] Creating Stripe checkout session for paid plan');
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier,
          finalPrice,
          durationMonths,
          jobData: jobFormData
        }
      });

      console.log('💰 [DEBUG] Stripe checkout response:', { data, error });

      if (error) {
        console.error('💰 [DEBUG] Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        console.log('💰 [DEBUG] Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        console.error('💰 [DEBUG] No checkout URL received in response');
        toast.error('No checkout URL received');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('💥 [DEBUG] Payment error:', error);
      console.error('💥 [DEBUG] Error stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      toast.error('Payment processing failed');
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    console.log('✅ [DEBUG] Payment confirmed, proceeding...');
    if (selectedPricing) {
      proceedToPayment(
        selectedPricing.tier,
        selectedPricing.finalPrice,
        selectedPricing.durationMonths
      );
    }
  };

  // Job Preview Component
  const JobPreview = () => {
    if (!selectedPricing) return null;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Review Your Job Post</h1>
          <p className="text-gray-600">Please review your job details and pricing before proceeding to payment</p>
        </div>

        {/* Job Details Preview */}
        <Card className="border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-gray-900">{jobFormData.title}</CardTitle>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {jobFormData.category}
              </Badge>
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
            <CardTitle className="text-xl text-gray-900">Pricing Summary</CardTitle>
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
                <span className="text-gray-900">Total:</span>
                <span className="text-green-600">${selectedPricing.finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testing Banner */}
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Testing Mode:</strong> This is a preview. Your job will NOT be saved until payment is confirmed. 
            Payment processing is currently simulated for testing purposes.
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
          
          <div className="space-x-4">
            <Button
              onClick={() => {
                setSimulatePayment(true);
                handleConfirmPreview();
              }}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              🧪 Simulate Payment (Test)
            </Button>
            <Button
              onClick={() => {
                setSimulatePayment(false);
                handleConfirmPreview();
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (isProcessing) {
    console.log('⏳ [DEBUG] Showing processing screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            {simulatePayment ? 'Simulating payment...' : 'Redirecting to secure payment...'}
          </p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
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
            
            <JobPricingTable
              onPricingSelect={handlePricingSelect}
              jobData={jobFormData}
            />
          </>
        )}

        {currentStep === 'preview' && <JobPreview />}

        {/* Pricing Confirmation Modal */}
        <PricingConfirmationModal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          selectedTier={selectedPricing?.tier || ''}
          finalPrice={selectedPricing?.finalPrice || 0}
          durationMonths={selectedPricing?.durationMonths || 1}
          onConfirmPayment={handleConfirmPayment}
        />
      </div>
    </div>
  );
};

export default JobPostingFlow;

