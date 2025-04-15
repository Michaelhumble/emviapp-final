import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { DashboardStats } from '../types/ArtistDashboardTypes';
import { BarChart3, Calendar, Star, TrendingUp, Users, HelpCircle } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface AnalyticsWidgetProps {
  stats: DashboardStats;
  isLoading?: boolean;
}

const AnalyticsWidget = ({ stats, isLoading = false }: AnalyticsWidgetProps) => {
  // Weekly performance data
  const performanceData = [
    { name: 'Mon', bookings: 4, color: '#e0f2fe' },
    { name: 'Tue', bookings: 3, color: '#e0f2fe' },
    { name: 'Wed', bookings: 6, color: '#e0f2fe' },
    { name: 'Thu', bookings: 4, color: '#e0f2fe' },
    { name: 'Fri', bookings: 8, color: '#e0f2fe' },
    { name: 'Sat', bookings: 9, color: '#bfdbfe' },
    { name: 'Sun', bookings: 5, color: '#e0f2fe' },
  ];
  
  // Find max day for highlighting
  const maxBookingDay = [...performanceData].sort((a, b) => b.bookings - a.bookings)[0];
  
  // Update colors to highlight the max day
  const chartData = performanceData.map(day => ({
    ...day,
    color: day.name === maxBookingDay.name ? '#3b82f6' : '#e0f2fe'
  }));
  
  // Stats with percent changes
  const statsWithChanges = [
    {
      title: "Bookings",
      value: stats.booking_count,
      change: 12,
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
      positive: true,
      bgColor: "bg-blue-100",
      tooltipText: "Total number of bookings in the last 30 days"
    },
    {
      title: "Rating",
      value: stats.average_rating?.toFixed(1) || "N/A",
      change: 5,
      icon: <Star className="h-4 w-4 text-yellow-600" />,
      positive: true,
      bgColor: "bg-yellow-100",
      tooltipText: "Average customer rating from all reviews"
    },
    {
      title: "Profile Views",
      value: stats.profile_views || 42,
      change: 24,
      icon: <Users className="h-4 w-4 text-purple-600" />,
      positive: true,
      bgColor: "bg-purple-100",
      tooltipText: "Number of times your profile was viewed in the last 30 days"
    }
  ];

  return (
    <Card className="shadow-sm border-blue-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-serif flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
            Performance Analytics
          </CardTitle>
          
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>View your booking performance and client engagement metrics</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
          {statsWithChanges.map((stat, index) => (
            <div 
              key={index} 
              className={`rounded-lg ${stat.bgColor} bg-opacity-20 p-4 relative overflow-hidden shadow-sm border border-opacity-30`}
              style={{ borderColor: stat.bgColor }}
            >
              <div className="absolute top-0 right-0 p-2">
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground/50 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{stat.tooltipText}</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                    <span className="rounded-full p-1.5 mr-2" style={{ background: stat.bgColor }}>
                      {stat.icon}
                    </span>
                    {stat.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <Badge className={`${stat.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {stat.change}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium">Weekly Bookings</h4>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-blue-600 font-medium flex items-center cursor-help">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    16% from last week
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>16% increase in bookings compared to previous week</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                padding={{ left: 10, right: 10 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                hide 
                domain={[0, 'dataMax + 2']}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 shadow-md rounded-md border text-xs">
                        <p className="font-medium text-gray-900">{`${payload[0].payload.name}: ${payload[0].value} bookings`}</p>
                        {payload[0].payload.name === maxBookingDay.name && (
                          <p className="text-blue-600 text-[10px]">Best performing day</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="bookings" 
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;
