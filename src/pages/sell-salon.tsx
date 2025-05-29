
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SalonListingWizard from '@/components/posting/salon/SalonListingWizard';
import SalonOwnerGuard from '@/components/posting/salon/SalonOwnerGuard';
import { SalonFormValues } from '@/components/posting/salon/salonFormSchema';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';

const SellSalonPage = () => {
  const handleComplete = (formData: SalonFormValues, photos: File[], pricing: SalonPricingOptions) => {
    console.log('Salon listing completed:', { formData, photos, pricing });
    // Handle form submission - could redirect to payment, save to database, etc.
  };

  return (
    <Layout>
      <Helmet>
        <title>Sell Your Salon | EmviApp</title>
        <meta 
          name="description" 
          content="List your salon for sale on EmviApp. Reach thousands of qualified buyers looking for salon businesses. Only verified salon owners can post listings."
        />
      </Helmet>
      <SalonOwnerGuard>
        <SalonListingWizard onComplete={handleComplete} />
      </SalonOwnerGuard>
    </Layout>
  );
};

export default SellSalonPage;
