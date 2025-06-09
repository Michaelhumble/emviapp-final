
import React from 'react';
import SalonDashboardErrorBoundary from '@/components/dashboard/salon/SalonDashboardErrorBoundary';
import SalonOwnerDashboard from '@/components/dashboard/salon/SalonOwnerDashboard';

const SalonProfile = () => {
  // Force log component load
  console.log('🏢 SALON PROFILE COMPONENT LOADED');
  
  return (
    <SalonDashboardErrorBoundary>
      <SalonOwnerDashboard />
    </SalonDashboardErrorBoundary>
  );
};

export default SalonProfile;
