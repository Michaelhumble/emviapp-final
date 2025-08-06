import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Target,
  Crown,
  Zap,
  BarChart3,
  PieChart,
  Users,
  Calendar,
  Star,
  Lightbulb,
  Award,
  Sparkles
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth } from 'date-fns';

interface SalonMetrics {
  monthly_revenue: number;
  profit_margin: number;
  staff_efficiency: number;
  client_satisfaction: number;
  market_position: number;
  growth_rate: number;
}

export const BillionaireAnalyticsSuite: React.FC<{ salonId?: string }> = ({ salonId }) => {
  const { stats } = useSalonDashboard(salonId);
  const [timeRange, setTimeRange] = useState<'month' | '3months' | '6months' | 'year'>('6months');
  const [metrics, setMetrics] = useState<SalonMetrics>({
    monthly_revenue: 45680,
    profit_margin: 68,
    staff_efficiency: 94,
    client_satisfaction: 97,
    market_position: 5,
    growth_rate: 23
  });

  const generateRevenueData = () => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 11),
      end: new Date()
    });

    return months.map((month, index) => ({
      month: format(month, 'MMM'),
      revenue: 35000 + (index * 2000) + Math.random() * 5000,
      profit: 20000 + (index * 1200) + Math.random() * 3000,
      expenses: 15000 + (index * 800) + Math.random() * 2000
    }));
  };

  const generateStaffPerformance = () => [
    { name: 'Maya', revenue: 8500, efficiency: 96, clients: 45 },
    { name: 'Sofia', revenue: 7200, efficiency: 92, clients: 38 },
    { name: 'Luna', revenue: 6800, efficiency: 89, clients: 35 },
    { name: 'Alex', revenue: 7800, efficiency: 94, clients: 42 },
    { name: 'Emma', revenue: 7500, efficiency: 91, clients: 40 }
  ];

  const revenueData = generateRevenueData();
  const staffData = generateStaffPerformance();

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  const PremiumMetricCard = ({ 
    title, 
    value, 
    suffix = '', 
    trend, 
    icon: Icon, 
    gradient,
    insight 
  }: {
    title: string;
    value: number | string;
    suffix?: string;
    trend?: number;
    icon: any;
    gradient: string;
    insight?: string;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`border-0 shadow-xl bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Icon className="h-6 w-6" />
            {trend && (
              <Badge className="bg-white/20 text-white text-xs">
                {trend > 0 ? '+' : ''}{trend}%
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="text-3xl font-bold mb-1">{value}{suffix}</div>
          <div className="text-white/80 text-sm">{title}</div>
          {insight && (
            <div className="text-xs text-white/60 mt-2">{insight}</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const AIInsightCard = ({ title, insight, recommendation }: {
    title: string;
    insight: string;
    recommendation: string;
  }) => (
    <Card className="bg-gradient-to-r from-purple-900 to-blue-900 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-6 w-6 text-yellow-400 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-purple-100 mb-3">{insight}</p>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-xs font-medium text-yellow-200">💡 AI Recommendation:</p>
              <p className="text-sm text-white mt-1">{recommendation}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Crown className="h-8 w-8 text-yellow-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Billionaire Analytics Suite
          </h1>
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        </div>
        <p className="text-muted-foreground">AI-powered insights for elite salon owners</p>
      </div>

      {/* Premium Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PremiumMetricCard
          title="Monthly Revenue"
          value={`$${metrics.monthly_revenue.toLocaleString()}`}
          trend={metrics.growth_rate}
          icon={DollarSign}
          gradient="from-emerald-500 to-green-600"
          insight="Best month this year!"
        />
        
        <PremiumMetricCard
          title="Profit Margin"
          value={metrics.profit_margin}
          suffix="%"
          trend={5}
          icon={TrendingUp}
          gradient="from-blue-500 to-indigo-600"
          insight="Industry leading"
        />
        
        <PremiumMetricCard
          title="Staff Efficiency"
          value={metrics.staff_efficiency}
          suffix="%"
          trend={3}
          icon={Users}
          gradient="from-purple-500 to-pink-600"
          insight="Top 1% performance"
        />
        
        <PremiumMetricCard
          title="Client Satisfaction"
          value={metrics.client_satisfaction}
          suffix="%"
          trend={2}
          icon={Star}
          gradient="from-yellow-500 to-orange-600"
          insight="Elite rating"
        />
        
        <PremiumMetricCard
          title="Market Position"
          value={`#${metrics.market_position}`}
          trend={1}
          icon={Award}
          gradient="from-rose-500 to-pink-600"
          insight="Local leader"
        />
        
        <PremiumMetricCard
          title="Growth Rate"
          value={metrics.growth_rate}
          suffix="% YoY"
          icon={Target}
          gradient="from-cyan-500 to-blue-600"
          insight="Accelerating"
        />
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center gap-2">
        {(['month', '3months', '6months', 'year'] as const).map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
            className={timeRange === range ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {range === '3months' ? '3M' : range === '6months' ? '6M' : range}
          </Button>
        ))}
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Revenue & Profit Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Staff Performance */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Staff Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={staffData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8b5cf6" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AIInsightCard
          title="Revenue Optimization"
          insight="Your Tuesday-Thursday bookings are 23% below capacity."
          recommendation="Offer 15% discounts for mid-week appointments to increase utilization and boost revenue by an estimated $4,200/month."
        />
        
        <AIInsightCard
          title="Staff Development"
          insight="Maya's efficiency is 6% above team average and driving 18% more repeat bookings."
          recommendation="Implement Maya's client communication techniques salon-wide to increase overall client retention by 12%."
        />
        
        <AIInsightCard
          title="Market Opportunity"
          insight="Competitor analysis shows 31% higher pricing for premium services in your area."
          recommendation="Increase premium service prices by 20% and add VIP packages to capture $8,500 additional monthly revenue."
        />
        
        <AIInsightCard
          title="Client Lifetime Value"
          insight="Clients booking multiple services have 3.2x higher lifetime value."
          recommendation="Create service bundles and offer 'add-on incentives' to increase average booking value by 28%."
        />
      </div>

      {/* Premium CTA */}
      <Card className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white border-0">
        <CardContent className="text-center p-8">
          <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Unlock Full Billionaire Suite</h3>
          <p className="text-purple-100 mb-6">
            Get access to advanced forecasting, competitor analysis, and automated optimization recommendations
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold"
          >
            <Zap className="h-5 w-5 mr-2" />
            Upgrade to Billionaire Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};