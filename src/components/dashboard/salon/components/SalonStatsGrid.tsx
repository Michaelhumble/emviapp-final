
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Eye, Users, Percent } from 'lucide-react';
import SalonStatCard from './SalonStatCard';
import { useSalonInsights } from '@/hooks/useSalonInsights';

const SalonStatsGrid: React.FC = () => {
  const { insights, loading } = useSalonInsights();
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <SalonStatCard
          title="Weekly Bookings"
          value={loading ? '—' : insights?.total_bookings || 0}
          icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
          loading={loading}
        />
      </motion.div>
      
      <motion.div variants={item}>
        <SalonStatCard
          title="Profile Views"
          value={loading ? '—' : insights?.profile_views_week || 0}
          change="+12% this week"
          icon={<Eye className="h-5 w-5 text-blue-500" />}
          loading={loading}
        />
      </motion.div>
      
      <motion.div variants={item}>
        <SalonStatCard
          title="Repeat Client Rate"
          value={loading ? '—' : `${insights?.repeat_client_rate || 0}%`}
          icon={<Users className="h-5 w-5 text-amber-500" />}
          loading={loading}
        />
      </motion.div>
      
      <motion.div variants={item}>
        <SalonStatCard
          title="Service Conversion"
          value={loading ? '—' : '68%'}
          change="+5% from last month"
          icon={<Percent className="h-5 w-5 text-emerald-500" />}
          loading={loading}
        />
      </motion.div>
    </motion.div>
  );
};

export default SalonStatsGrid;
