import React, { useEffect } from 'react';
import Layout from "@/components/layout/Layout";
import SalonDashboard from "@/components/dashboard/salon/SalonDashboard";
import { SalonProvider } from "@/context/salon";

const OwnerDashboard = () => {
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
  }, []);

  return (
    <SalonProvider>
      <Layout>
        <SalonDashboard />
      </Layout>
    </SalonProvider>
  );
};

export default OwnerDashboard;
