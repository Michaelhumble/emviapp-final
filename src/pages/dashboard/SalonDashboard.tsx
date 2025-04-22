
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { SalonDashboardContent } from '@/components/dashboard/salon/SalonDashboardContent';

const SalonDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SalonDashboardContent />
      </div>
    </Layout>
  );
};

export default SalonDashboard;
