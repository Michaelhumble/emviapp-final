import { Card, CardContent } from '@/components/ui/card';
import { BookingWithDetails, DashboardStats } from '../types/ArtistDashboardTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import StatCard from './StatCard';
import { useArtistData } from '../context/ArtistDataContext';
import ReferralWidget from './ReferralWidget';

interface MainGridProps {
  bookings: any[];
  isLoadingBookings: boolean;
  stats: DashboardStats;
}

const MainGrid = ({ bookings, isLoadingBookings, stats }: MainGridProps) => {
  const { artistProfile } = useArtistData();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
      <StatCard
        title="Total Bookings"
        value={stats?.booking_count || 0}
        loading={!stats}
        icon={<CalendarDays className="h-4 w-4 text-gray-500" />}
      />
      <StatCard
        title="Completed Services"
        value={stats?.completed_services || 0}
        loading={!stats}
        icon={<Clock className="h-4 w-4 text-gray-500" />}
      />
      <StatCard
        title="Total Earnings"
        value={stats?.total_earnings || 0}
        prefix="$"
        loading={!stats}
        icon={<DollarSign className="h-4 w-4 text-gray-500" />}
      />
      <StatCard
        title="Average Rating"
        value={stats?.average_rating || 0}
        precision={1}
        loading={!stats}
      />
      
      {/* Add ReferralWidget to the grid */}
      <ReferralWidget />
    </div>
  );
};

export default MainGrid;
