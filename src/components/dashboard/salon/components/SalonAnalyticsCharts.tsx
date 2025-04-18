
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSalonBookingsStats } from '../analytics/hooks/useSalonBookingsStats';
import { Loader2 } from 'lucide-react';

interface SalonAnalyticsChartsProps {
  loading?: boolean;
}

const SalonAnalyticsCharts = ({ loading = false }: SalonAnalyticsChartsProps) => {
  const { stats, isLoading: statsLoading } = useSalonBookingsStats();
  
  const isLoading = loading || statsLoading;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Booking Activity</CardTitle>
          <CardDescription>Weekly booking activity over the last 3 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-purple-300 animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <XAxis dataKey="weekLabel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Booking Status Distribution</CardTitle>
          <CardDescription>Status breakdown of all bookings</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-purple-300 animate-spin" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[
                  { name: 'Pending', value: stats.pending },
                  { name: 'Accepted', value: stats.accepted },
                  { name: 'Completed', value: stats.completed },
                  { name: 'Cancelled', value: stats.cancelled }
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonAnalyticsCharts;
