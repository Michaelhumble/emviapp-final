
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SalonListingWizard from '@/components/posting/salon/SalonListingWizard';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

const PostSalon = () => {
  const navigate = useNavigate();

  const handleWizardComplete = (formData: SalonFormValues, options: SalonPricingOptions) => {
    // Handle payment processing here
    console.log('Processing payment with options:', options);
    console.log('Form data:', formData);
    navigate('/salon-listing-success');
  };

  return (
    <Layout>
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp. Reach thousands of qualified buyers looking for salon businesses."
        />
      </Helmet>
      <SalonListingWizard onComplete={handleWizardComplete} />
    </Layout>
  );
};

export default PostSalon;
