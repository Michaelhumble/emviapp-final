import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, TrendingUp, Users, Calendar, Star, Target, 
  Eye, Download, Filter, Award, Crown, Zap, DollarSign,
  ArrowUp, ArrowDown, Sparkles
} from 'lucide-react';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { supabase } from '@/integrations/supabase/client';

interface SalonAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  salonId?: string;
}

interface AnalyticsData {
  bookings: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
    byDay: Array<{date: string, count: number}>;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
  customers: {
    total: number;
    returning: number;
    new: number;
    retentionRate: number;
  };
  performance: {
    rating: number;
    reviewCount: number;
    responseRate: number;
    avgResponseTime: string;
  };
  team: Array<{
    id: string;
    name: string;
    bookings: number;
    rating: number;
    revenue: number;
  }>;
  insights: Array<{
    type: 'success' | 'warning' | 'info';
    title: string;
    description: string;
    action?: string;
  }>;
}

const SalonAnalyticsModal: React.FC<SalonAnalyticsModalProps> = ({ 
  isOpen, 
  onClose, 
  salonId 
}) => {
  const { stats } = useSalonDashboard(salonId);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  useEffect(() => {
    if (isOpen && salonId) {
      fetchAnalytics();
    }
  }, [isOpen, salonId, timeframe]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      // Simulate analytics data fetching
      // In a real app, this would fetch from your analytics tables
      const mockAnalytics: AnalyticsData = {
        bookings: {
          total: stats.totalBookings,
          thisMonth: 45,
          lastMonth: 38,
          growth: 18.4,
          byDay: Array.from({length: 30}, (_, i) => ({
            date: new Date(Date.now() - (29-i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            count: Math.floor(Math.random() * 8) + 1
          }))
        },
        revenue: {
          total: 12450,
          thisMonth: 3250,
          lastMonth: 2890,
          growth: 12.5
        },
        customers: {
          total: 156,
          returning: 89,
          new: 67,
          retentionRate: 74.2
        },
        performance: {
          rating: stats.averageRating,
          reviewCount: stats.totalReviews,
          responseRate: 95.2,
          avgResponseTime: '2.3 hours'
        },
        team: [
          { id: '1', name: 'Sarah Johnson', bookings: 28, rating: 4.9, revenue: 1450 },
          { id: '2', name: 'Mike Chen', bookings: 22, rating: 4.8, revenue: 1180 },
          { id: '3', name: 'Emily Davis', bookings: 19, rating: 4.7, revenue: 980 }
        ],
        insights: [
          {
            type: 'success',
            title: 'Peak Performance!',
            description: 'Your bookings increased 18% this month. Great job!',
            action: 'Share success story'
          },
          {
            type: 'warning',
            title: 'Weekend Availability',
            description: 'Consider adding more weekend slots - high demand detected.',
            action: 'Update schedule'
          },
          {
            type: 'info',
            title: 'Social Media Boost',
            description: 'Posts with before/after photos get 3x more engagement.',
            action: 'Upload photos'
          }
        ]
      };

      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    // Implement CSV export functionality
    const csvData = analytics ? [
      ['Metric', 'Value'],
      ['Total Bookings', analytics.bookings.total],
      ['Monthly Revenue', analytics.revenue.thisMonth],
      ['Customer Retention', analytics.customers.retentionRate + '%'],
      ['Average Rating', analytics.performance.rating]
    ] : [];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salon-analytics.csv';
    a.click();
  };

  if (loading || !analytics) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3">Loading analytics...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              Salon Analytics & Insights
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {timeframe.toUpperCase()}
              </Badge>
            </DialogTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportData}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="team">Team Stats</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{analytics.bookings.thisMonth}</p>
                      <p className="text-sm text-blue-700">Monthly Bookings</p>
                    </div>
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{analytics.bookings.growth}% from last month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-900">${analytics.revenue.thisMonth.toLocaleString()}</p>
                      <p className="text-sm text-green-700">Monthly Revenue</p>
                    </div>
                    <div className="p-3 bg-green-500 rounded-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      +{analytics.revenue.growth}% growth
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-purple-900">{analytics.customers.retentionRate}%</p>
                      <p className="text-sm text-purple-700">Retention Rate</p>
                    </div>
                    <div className="p-3 bg-purple-500 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <span className="text-sm text-gray-600">
                      {analytics.customers.returning} returning customers
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-orange-900">{analytics.performance.rating}</p>
                      <p className="text-sm text-orange-700">Avg Rating</p>
                    </div>
                    <div className="p-3 bg-orange-500 rounded-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <span className="text-sm text-gray-600">
                      {analytics.performance.reviewCount} reviews
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Trends Chart Placeholder */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Booking Trends (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-purple-600">Interactive chart would display here</p>
                    <p className="text-sm text-gray-500">Showing daily booking patterns and trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Review Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Response Rate</span>
                    <span className="font-bold text-green-600">{analytics.performance.responseRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Avg Response Time</span>
                    <span className="font-bold">{analytics.performance.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Reviews</span>
                    <span className="font-bold">{analytics.performance.reviewCount}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Goals & Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Monthly Booking Goal</span>
                      <span className="font-bold">45/50</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full w-[90%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span>Revenue Target</span>
                      <span className="font-bold">$3.2K/$4K</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.team.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.bookings} bookings this month</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="font-bold">{member.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">${member.revenue.toLocaleString()} revenue</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-4">
              {analytics.insights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`border-0 shadow-lg ${
                    insight.type === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50' :
                    insight.type === 'warning' ? 'bg-gradient-to-r from-yellow-50 to-orange-50' :
                    'bg-gradient-to-r from-blue-50 to-cyan-50'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${
                            insight.type === 'success' ? 'bg-green-500' :
                            insight.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}>
                            {insight.type === 'success' ? <Award className="h-6 w-6 text-white" /> :
                             insight.type === 'warning' ? <Zap className="h-6 w-6 text-white" /> :
                             <Sparkles className="h-6 w-6 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{insight.title}</h3>
                            <p className="text-gray-600">{insight.description}</p>
                          </div>
                        </div>
                        {insight.action && (
                          <Button size="sm" variant="outline">
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SalonAnalyticsModal;