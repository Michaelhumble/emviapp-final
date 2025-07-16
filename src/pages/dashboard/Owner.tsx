import React, { useEffect } from 'react';
import SalonDashboardNew from "@/components/dashboard/salon/SalonDashboardNew";

const OwnerDashboard = () => {
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
  }, []);

  // SalonProvider is already provided at App level - no need to duplicate
  return <SalonDashboardNew />;
};

export default OwnerDashboard;
