import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';

interface RevenueMetrics {
  monthly_revenue: number;
  weekly_average: number;
  avg_per_client: number;
  growth_rate: number;
  total_bookings: number;
  completion_rate: number;
}

export const AdvancedAnalyticsDashboard: React.FC = () => {
  const { bookings } = useArtistBookings();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | '3months' | '6months'>('month');
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    monthly_revenue: 0,
    weekly_average: 0,
    avg_per_client: 0,
    growth_rate: 0,
    total_bookings: 0,
    completion_rate: 0
  });

  useEffect(() => {
    calculateMetrics();
  }, [bookings, timeRange]);

  const calculateMetrics = () => {
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const currentMonth = new Date();
    const lastMonth = subMonths(currentMonth, 1);
    
    // Mock revenue calculation (would be real data in production)
    const avgServicePrice = 85; // Average service price
    const currentMonthBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= startOfMonth(currentMonth) && bookingDate <= endOfMonth(currentMonth);
    });
    
    const lastMonthBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= startOfMonth(lastMonth) && bookingDate <= endOfMonth(lastMonth);
    });

    const monthlyRevenue = currentMonthBookings.length * avgServicePrice;
    const lastMonthRevenue = lastMonthBookings.length * avgServicePrice;
    const growthRate = lastMonthRevenue > 0 
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0;

    setMetrics({
      monthly_revenue: monthlyRevenue,
      weekly_average: monthlyRevenue / 4,
      avg_per_client: avgServicePrice,
      growth_rate: Math.round(growthRate),
      total_bookings: completedBookings.length,
      completion_rate: Math.round((completedBookings.length / bookings.length) * 100)
    });
  };

  const generateRevenueData = () => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date()
    });

    return months.map(month => {
      const monthBookings = bookings.filter(b => {
        const bookingDate = new Date(b.created_at);
        return bookingDate >= startOfMonth(month) && bookingDate <= endOfMonth(month);
      });
      
      return {
        month: format(month, 'MMM'),
        revenue: monthBookings.length * 85, // Mock calculation
        bookings: monthBookings.length
      };
    });
  };

  const generateServiceData = () => {
    const serviceMap = new Map();
    bookings.forEach(booking => {
      if (booking.service_name) {
        const current = serviceMap.get(booking.service_name) || 0;
        serviceMap.set(booking.service_name, current + 1);
      }
    });

    return Array.from(serviceMap.entries())
      .map(([service, count]) => ({ service, count, revenue: count * 85 }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const revenueData = generateRevenueData();
  const serviceData = generateServiceData();

  const MetricCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    format = 'number' 
  }: {
    title: string;
    value: number;
    change?: number;
    icon: any;
    format?: 'currency' | 'number' | 'percentage';
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'currency': return `$${val.toLocaleString()}`;
        case 'percentage': return `${val}%`;
        default: return val.toLocaleString();
      }
    };

    return (
      <Card className="relative overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          {change !== undefined && (
            <div className="flex items-center text-xs mt-1">
              {change >= 0 ? (
                <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={change >= 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(change)}% from last month
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const AIInsight = ({ insight }: { insight: string }) => (
    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
      <div>
        <p className="font-medium text-blue-900 mb-1">AI Recommendation</p>
        <p className="text-sm text-blue-800">{insight}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Monthly Revenue"
          value={metrics.monthly_revenue}
          change={metrics.growth_rate}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="Weekly Average"
          value={metrics.weekly_average}
          icon={Calendar}
          format="currency"
        />
        <MetricCard
          title="Avg Per Client"
          value={metrics.avg_per_client}
          icon={Users}
          format="currency"
        />
        <MetricCard
          title="Completion Rate"
          value={metrics.completion_rate}
          icon={Target}
          format="percentage"
        />
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Performance Analytics</h3>
        <div className="flex gap-2">
          {(['week', 'month', '3months', '6months'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range === '3months' ? '3M' : range === '6months' ? '6M' : range}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="services">Service Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Top Performing Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="service" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4">
            <AIInsight insight="Your Friday 2-4pm slots have the highest completion rate (94%). Consider adding more slots during this time." />
            <AIInsight insight="Clients who book 'Manicure + Gel' are 3x more likely to rebook within 3 weeks. Target them with follow-up campaigns." />
            <AIInsight insight="Your average booking value increased 15% when you offered package deals. Consider creating more bundles." />
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Peak Performance Times</h4>
                    <div className="space-y-1 text-sm">
                      <div>🔥 Best: Friday 2-4pm (94% completion)</div>
                      <div>⚡ Good: Wednesday 10am-12pm (87% completion)</div>
                      <div>⚠️ Slow: Monday 9-11am (64% completion)</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Client Behavior Patterns</h4>
                    <div className="space-y-1 text-sm">
                      <div>📈 Repeat clients: 68% of revenue</div>
                      <div>⏰ Avg rebooking: 3.2 weeks</div>
                      <div>💰 Highest LTV: Package clients</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Revenue Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Next Month Projection</h4>
                  <p className="text-2xl font-bold text-green-600">$3,680</p>
                  <p className="text-sm text-muted-foreground">+13.5% growth expected</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Quarter Target</h4>
                  <p className="text-2xl font-bold text-blue-600">$10,200</p>
                  <p className="text-sm text-muted-foreground">78% to goal</p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Optimal Capacity</h4>
                  <p className="text-2xl font-bold text-purple-600">87%</p>
                  <p className="text-sm text-muted-foreground">Current utilization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};