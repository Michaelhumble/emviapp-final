
import React from 'react';
import BookingsChart from './BookingsChart';
import ProfileViewsChart from './ProfileViewsChart';

interface SalonAnalyticsChartsProps {
  loading?: boolean;
}

const SalonAnalyticsCharts: React.FC<SalonAnalyticsChartsProps> = ({ loading = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <BookingsChart loading={loading} />
      <ProfileViewsChart loading={loading} />
    </div>
  );
};

export default SalonAnalyticsCharts;
