import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  DollarSign,
  Users,
  BarChart3
} from 'lucide-react';
import { useArtistBookings } from '../hooks/useArtistBookings';

export const BookingAnalytics: React.FC = () => {
  const { bookings, counts } = useArtistBookings();

  // Calculate analytics data
  const thisWeekBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.created_at);
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    return bookingDate >= weekStart;
  }).length;

  const acceptanceRate = counts.total > 0 
    ? Math.round((counts.accepted / counts.total) * 100) 
    : 0;

  const avgResponseTime = '2.3 hours'; // Mock for now, could be calculated from real data

  const peakHours = bookings.reduce((acc, booking) => {
    if (booking.time_requested) {
      const hour = parseInt(booking.time_requested.split(':')[0]);
      acc[hour] = (acc[hour] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

  const mostPopularHour = Object.entries(peakHours)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || '14';

  const analytics = [
    {
      title: 'This Week',
      value: thisWeekBookings,
      icon: Calendar,
      trend: '+12%',
      description: 'New bookings'
    },
    {
      title: 'Acceptance Rate',
      value: `${acceptanceRate}%`,
      icon: TrendingUp,
      trend: acceptanceRate > 80 ? '+5%' : '-2%',
      description: 'Booking approval rate'
    },
    {
      title: 'Avg Response',
      value: avgResponseTime,
      icon: Clock,
      trend: '-15min',
      description: 'Response time to bookings'
    },
    {
      title: 'Peak Hour',
      value: `${mostPopularHour}:00`,
      icon: BarChart3,
      trend: 'Most popular',
      description: 'Busiest booking time'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {analytics.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Badge 
                  variant={stat.trend.startsWith('+') ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};