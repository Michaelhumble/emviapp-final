
import React from 'react';
import { motion } from 'framer-motion';
import SalonStatCard from './components/SalonStatCard';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

interface SalonOwnerDashboardWidgetsProps {
  loading?: boolean;
}

const SalonOwnerDashboardWidgets: React.FC<SalonOwnerDashboardWidgetsProps> = ({ 
  loading = false 
}) => {
  // Sample data - in real app this would come from props or hooks
  const stats = [
    {
      title: "Today's Bookings",
      value: loading ? "..." : "8",
      change: "+2 from yesterday",
      icon: <Calendar className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Active Staff",
      value: loading ? "..." : "5",
      change: "+1 this month",
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "This Week's Revenue",
      value: loading ? "..." : "$2,450",
      change: "+15% from last week",
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Profile Views",
      value: loading ? "..." : "124",
      change: "+8% this week",
      icon: <TrendingUp className="h-5 w-5 text-orange-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <SalonStatCard
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            loading={loading}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default SalonOwnerDashboardWidgets;
