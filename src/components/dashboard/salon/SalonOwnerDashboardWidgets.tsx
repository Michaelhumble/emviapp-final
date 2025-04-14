
import React from 'react';
import { SalonQuickStats } from './SalonQuickStats';
import { SalonAnalyticsCards } from './SalonAnalyticsCards';
import { SalonBoostStatus } from './SalonBoostStatus';
import { SalonCreditStatus } from './SalonCreditStatus';
import { WeeklyDigestCard } from '../artist/WeeklyDigestCard';

const SalonOwnerDashboardWidgets = () => {
  return (
    <div className="space-y-4">
      <SalonQuickStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SalonBoostStatus />
        <WeeklyDigestCard />
      </div>
      <SalonCreditStatus />
      <SalonAnalyticsCards />
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
