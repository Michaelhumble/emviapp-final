
import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SalonDashboardNew from "@/components/dashboard/salon/SalonDashboardNew";
import { SalonProvider } from "@/context/salon";

const OwnerDashboard = () => {
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
  }, []);

  return (
    <Layout hideFooter={true}>
      <SalonProvider>
        <SalonDashboardNew />
      </SalonProvider>
    </Layout>
  );
};

export default OwnerDashboard;
