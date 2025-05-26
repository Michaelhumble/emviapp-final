
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SalonFormValues } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { SalonDescriptionSection } from './SalonDescriptionSection';
import { SalonPhotosSection } from './SalonPhotosSection';
import SalonPricingSection from './SalonPricingSection';
import { usePostPayment } from '@/hooks/usePostPayment';

const STEPS = [
  { id: 1, title: 'Identity', description: 'Salon details' },
  { id: 2, title: 'Location', description: 'Where is your salon?' },
  { id: 3, title: 'Description', description: 'Tell your story' },
  { id: 4, title: 'Photos', description: 'Show your space' },
  { id: 5, title: 'Review & Payment', description: 'Complete your listing' }
];

const SalonListingWizard = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SalonFormValues>>({});
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [selectedPlan, setSelectedPlan] = useState('1-month');
  const [planPrice, setPlanPrice] = useState(24.99);
  const [featuredBoost, setFeaturedBoost] = useState(false);

  const progress = (currentStep / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handlePricingSelect = (plan: string, price: number, featured: boolean) => {
    setSelectedPlan(plan);
    setPlanPrice(price);
    setFeaturedBoost(featured);
  };

  const handleSubmit = async () => {
    try {
      const totalPrice = planPrice + (featuredBoost ? 25 : 0);
      
      const salonDetails = {
        ...formData,
        post_type: 'salon',
        pricing_plan: selectedPlan,
        featured_boost: featuredBoost,
        total_price: totalPrice
      };

      const pricingOptions = {
        selectedPricingTier: featuredBoost ? 'premium' : 'standard',
        durationMonths: selectedPlan === '12-months' ? 12 : selectedPlan === '6-months' ? 6 : 1,
        autoRenew: true,
        isFirstPost: true
      };

      const result = await initiatePayment('salon', salonDetails, pricingOptions);
      
      if (result.success) {
        navigate('/salon-listing-success');
      } else {
        toast.error('Error processing your salon listing. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting salon listing:', error);
      toast.error('Error creating salon listing');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <SalonIdentitySection 
            formData={formData}
            onUpdate={setFormData}
          />
        );
      case 2:
        return (
          <SalonLocationSection
            formData={formData}
            onUpdate={setFormData}
          />
        );
      case 3:
        return (
          <SalonDescriptionSection
            formData={formData}
            onUpdate={setFormData}
          />
        );
      case 4:
        return (
          <SalonPhotosSection
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
          />
        );
      case 5:
        return (
          <div className="space-y-8">
            {/* Review Section */}
            <Card>
              <CardHeader>
                <CardTitle>Review Your Listing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Salon Name:</strong> {formData.salonName}
                  </div>
                  <div>
                    <strong>Business Type:</strong> {formData.businessType}
                  </div>
                  <div>
                    <strong>Location:</strong> {formData.city}, {formData.state}
                  </div>
                  <div>
                    <strong>Asking Price:</strong> {formData.askingPrice}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(1)}>
                    Edit Identity
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(2)}>
                    Edit Location
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(3)}>
                    Edit Description
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentStep(4)}>
                    Edit Photos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Section */}
            <SalonPricingSection
              onPricingSelect={handlePricingSelect}
              selectedPlan={selectedPlan}
              featuredBoost={featuredBoost}
              onFeaturedChange={setFeaturedBoost}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container max-w-4xl mx-auto py-4 px-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {STEPS.length}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{STEPS[currentStep - 1].title}</h1>
          <p className="text-gray-600">{STEPS[currentStep - 1].description}</p>
        </div>

        {renderStepContent()}

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-end mt-8">
            <Button onClick={handleNext}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {currentStep === 5 && (
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              {isLoading ? 'Processing...' : 
               featuredBoost ? 'Feature My Listing & Sell Faster' : 'Get Started & List My Salon'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalonListingWizard;
