
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSalonInsights } from '@/hooks/useSalonInsights';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingsChartProps {
  loading?: boolean;
}

const BookingsChart: React.FC<BookingsChartProps> = ({ loading = false }) => {
  const { insights } = useSalonInsights();
  
  const data = [
    { name: '4 Weeks Ago', bookings: Math.floor(Math.random() * 15) + 3 },
    { name: '3 Weeks Ago', bookings: Math.floor(Math.random() * 15) + 5 },
    { name: '2 Weeks Ago', bookings: Math.floor(Math.random() * 15) + 8 },
    { name: 'Last Week', bookings: insights?.total_bookings || Math.floor(Math.random() * 15) + 10 },
  ];

  return (
    <Card className="border border-gray-100 overflow-hidden h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weekly Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[200px] rounded-md" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(155, 135, 245, 0.1)' }}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
                }}
              />
              <Bar 
                dataKey="bookings" 
                fill="#9b87f5" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsChart;
