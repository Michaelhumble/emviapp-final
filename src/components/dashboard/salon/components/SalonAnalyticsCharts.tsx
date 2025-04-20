
import React from 'react';
import { motion } from 'framer-motion';
import BookingsChart from './BookingsChart';
import ProfileViewsChart from './ProfileViewsChart';

interface SalonAnalyticsChartsProps {
  loading?: boolean;
}

const SalonAnalyticsCharts: React.FC<SalonAnalyticsChartsProps> = ({ loading = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 w-full"
    >
      <BookingsChart loading={loading} />
      <ProfileViewsChart loading={loading} />
    </motion.div>
  );
};

export default SalonAnalyticsCharts;
