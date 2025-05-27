
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import SalonListingWizard from '@/components/posting/salon/SalonListingWizard';
import SalonOwnerGuard from '@/components/posting/salon/SalonOwnerGuard';

const SellSalonPage = () => {
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
        <SalonListingWizard />
      </SalonOwnerGuard>
    </Layout>
  );
};

export default SellSalonPage;
