
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { DashboardStats } from '../types/ArtistDashboardTypes';
import StatCard from './StatCard';

interface AnalyticsWidgetProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

const AnalyticsWidget = ({ stats, isLoading = false }: AnalyticsWidgetProps) => {
  // Sample data for the chart
  const performanceData = [
    { name: 'Mon', bookings: 4 },
    { name: 'Tue', bookings: 3 },
    { name: 'Wed', bookings: 6 },
    { name: 'Thu', bookings: 4 },
    { name: 'Fri', bookings: 8 },
    { name: 'Sat', bookings: 9 },
    { name: 'Sun', bookings: 5 },
  ];

  return (
    <Card className="shadow-sm border-blue-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif">Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
          <StatCard
            title="Total Bookings"
            value={stats.booking_count}
            loading={isLoading}
            icon={<div className="rounded-full bg-blue-100 p-2"><svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>}
          />
          <StatCard
            title="Average Rating"
            value={stats.average_rating}
            precision={1}
            loading={isLoading}
            icon={<div className="rounded-full bg-yellow-100 p-2"><svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div>}
          />
          <StatCard
            title="Profile Views"
            value={42}
            loading={isLoading}
            icon={<div className="rounded-full bg-purple-100 p-2"><svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></div>}
          />
        </div>
        
        <div className="border rounded-lg p-4 bg-white">
          <h4 className="text-sm font-medium mb-4">Weekly Bookings</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;
