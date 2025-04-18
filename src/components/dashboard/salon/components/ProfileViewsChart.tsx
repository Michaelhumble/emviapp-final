
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useSalonInsights } from '@/hooks/useSalonInsights';
import { Skeleton } from '@/components/ui/skeleton';

interface ProfileViewsChartProps {
  loading?: boolean;
}

const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ loading = false }) => {
  const { insights } = useSalonInsights();
  
  const weeklyViews = insights?.profile_views_week || Math.floor(Math.random() * 20) + 15;
  
  const data = [
    { name: 'Mon', views: Math.floor(Math.random() * 10) + 1 },
    { name: 'Tue', views: Math.floor(Math.random() * 10) + 3 },
    { name: 'Wed', views: Math.floor(Math.random() * 10) + 5 },
    { name: 'Thu', views: Math.floor(Math.random() * 10) + 4 },
    { name: 'Fri', views: Math.floor(Math.random() * 10) + 7 },
    { name: 'Sat', views: Math.floor(Math.random() * 10) + 8 },
    { name: 'Sun', views: Math.floor(Math.random() * 10) + 2 },
  ];

  return (
    <Card className="border border-gray-100 overflow-hidden h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Profile Views</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[200px] rounded-md" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
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
                cursor={{ stroke: '#9b87f5', strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)' 
                }}
                formatter={(value) => [`${value} views`, 'Views']}
              />
              <Line 
                type="monotone" 
                dataKey="views" 
                stroke="#9b87f5" 
                strokeWidth={3} 
                dot={{ fill: '#9b87f5', r: 4 }}
                activeDot={{ r: 6, fill: '#9b87f5', stroke: '#fff', strokeWidth: 2 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        <div className="text-sm text-center mt-2 text-muted-foreground">
          This week: {weeklyViews} total views
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileViewsChart;
