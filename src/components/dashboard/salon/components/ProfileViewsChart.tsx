
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileViewsChartProps {
  loading?: boolean;
}

const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ loading = false }) => {
  // Sample data for the chart - this would be fetched from your API in a real implementation
  const data = [
    { day: 'Mon', views: 10 },
    { day: 'Tue', views: 15 },
    { day: 'Wed', views: 12 },
    { day: 'Thu', views: 20 },
    { day: 'Fri', views: 25 },
    { day: 'Sat', views: 30 },
    { day: 'Sun', views: 22 },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="text-xs font-medium">{label}</p>
          <p className="text-xs text-primary">
            {`Views: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Profile Views</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        {loading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <div className="animate-pulse w-full h-32 bg-gray-100 rounded-md" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide={true} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#9b87f5"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#9b87f5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileViewsChart;
