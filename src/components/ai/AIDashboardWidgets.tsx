
import React from 'react';
import { useAuth } from '@/context/auth';
import AIRecommendations from './AIRecommendations';
import AIWelcomeAssistant from './AIWelcomeAssistant';
import AISmartReminder from './AISmartReminder';

const AIDashboardWidgets = () => {
  const { userRole } = useAuth();

  // Show different AI widgets based on user role
  const isArtist = userRole === 'artist' || userRole === 'nail technician/artist';
  const isSalon = userRole === 'salon' || userRole === 'owner';
  const isSupplier = userRole === 'supplier' || userRole === 'beauty supplier';
  const isCustomer = userRole === 'customer';

  return (
    <div className="space-y-6">
      <AIWelcomeAssistant />
      <AIRecommendations />
      <AISmartReminder />
    </div>
  );
};

export default AIDashboardWidgets;
