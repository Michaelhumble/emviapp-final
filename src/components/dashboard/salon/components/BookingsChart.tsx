
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BookingsChartProps {
  loading?: boolean;
}

const BookingsChart: React.FC<BookingsChartProps> = ({ loading = false }) => {
  // Sample data for the chart - this would be fetched from your API in a real implementation
  const data = [
    { name: '3 Weeks Ago', bookings: 5 },
    { name: '2 Weeks Ago', bookings: 8 },
    { name: 'Last Week', bookings: 12 },
    { name: 'This Week', bookings: 10 },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="text-xs font-medium">{label}</p>
          <p className="text-xs text-primary">
            {`Bookings: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Weekly Bookings</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        {loading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <div className="animate-pulse w-full h-32 bg-gray-100 rounded-md" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="bookings"
                fill="#9b87f5"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingsChart;
