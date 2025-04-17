
import React from 'react';
import { BarChart3, Eye, Users, Percent } from 'lucide-react';
import SalonStatCard from './SalonStatCard';
import { useSalonInsights } from '@/hooks/useSalonInsights';

const SalonStatsGrid: React.FC = () => {
  const { insights, loading } = useSalonInsights();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <SalonStatCard
        title="Weekly Bookings"
        value={loading ? '—' : insights?.total_bookings || 0}
        icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
        loading={loading}
      />
      
      <SalonStatCard
        title="Profile Views"
        value={loading ? '—' : insights?.profile_views_week || 0}
        change="+12% this week"
        icon={<Eye className="h-5 w-5 text-blue-500" />}
        loading={loading}
      />
      
      <SalonStatCard
        title="Repeat Client Rate"
        value={loading ? '—' : `${insights?.repeat_client_rate || 0}%`}
        icon={<Users className="h-5 w-5 text-amber-500" />}
        loading={loading}
      />
      
      <SalonStatCard
        title="Service Conversion"
        value={loading ? '—' : '68%'}
        change="+5% from last month"
        icon={<Percent className="h-5 w-5 text-emerald-500" />}
        loading={loading}
      />
    </div>
  );
};

export default SalonStatsGrid;
