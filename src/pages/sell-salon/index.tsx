
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import SalonListingWizard from '@/components/posting/salon/SalonListingWizard';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

const SellSalonPage = () => {
  const navigate = useNavigate();

  const handleWizardComplete = (formData: SalonFormValues, options: SalonPricingOptions) => {
    // Handle payment processing here
    console.log('Processing payment with options:', options);
    console.log('Form data:', formData);
    navigate('/salon-listing-success');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp. Reach thousands of qualified buyers looking for salon businesses."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sell Your Salon
          </h1>
          <p className="text-xl text-gray-600">
            Connect with qualified buyers and sell your salon business
          </p>
        </div>

        <SalonListingWizard onComplete={handleWizardComplete} />
      </div>
    </div>
  );
};

export default SellSalonPage;
