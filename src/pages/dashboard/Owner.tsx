import React, { useEffect } from 'react';
import BillionaireClubDashboard from "@/components/dashboard/salon/BillionaireClubDashboard";

const OwnerDashboard = () => {
  useEffect(() => {
    document.title = "Billionaire Club Salon Dashboard | EmviApp";
  }, []);

  return <BillionaireClubDashboard />;
};

export default OwnerDashboard;
