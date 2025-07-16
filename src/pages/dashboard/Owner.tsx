import React, { useEffect } from 'react';
import SalonDashboardNew from "@/components/dashboard/salon/SalonDashboardNew";
import { SalonProvider } from "@/context/salon";

const OwnerDashboard = () => {
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
  }, []);

  return (
    <SalonProvider>
      <SalonDashboardNew />
    </SalonProvider>
  );
};

export default OwnerDashboard;
