import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, TrendingUp, Users, Eye, MessageSquare, Share2,
  Target, Award, Zap, Heart, Gift, Calendar, Star,
  AlertTriangle, CheckCircle, Clock, ArrowUp, ArrowDown,
  RefreshCw, Download, Filter, Search
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  previous_value: number;
  change_percentage: number;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
  target: number;
  description: string;
}

interface UserEngagement {
  user_id: string;
  user_name: string;
  avatar_url: string;
  bookings_count: number;
  shares_count: number;
  referrals_count: number;
  total_score: number;
  last_active: string;
  engagement_trend: 'increasing' | 'decreasing' | 'stable';
}

interface ABTestResult {
  test_id: string;
  test_name: string;
  variant: string;
  metric: string;
  improvement: number;
  confidence: number;
  status: 'running' | 'completed' | 'paused';
  participants: number;
  conversion_rate: number;
}

interface DashboardAnalyticsProps {
  onOptimizationAction?: (action: string, data: any) => void;
}

const DashboardAnalytics: React.FC<DashboardAnalyticsProps> = ({ 
  onOptimizationAction 
}) => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [topUsers, setTopUsers] = useState<UserEngagement[]>([]);
  const [abTests, setAbTests] = useState<ABTestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [activeTab, setActiveTab] = useState<'overview' | 'engagement' | 'viral' | 'tests'>('overview');

  useEffect(() => {
    loadAnalytics();
    if (autoRefresh) {
      const interval = setInterval(loadAnalytics, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, selectedTimeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadMetrics(),
        loadTopUsers(),
        loadABTests()
      ]);
    } catch (error) {
      console.error('Error loading analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const loadMetrics = async () => {
    // Mock analytics data
    const mockMetrics: AnalyticsMetric[] = [
      {
        id: 'total_bookings',
        name: 'Total Bookings',
        value: 1247,
        previous_value: 1156,
        change_percentage: 7.9,
        trend: 'up',
        status: 'healthy',
        target: 1500,
        description: 'Total bookings made through the platform'
      },
      {
        id: 'viral_shares',
        name: 'Viral Shares',
        value: 2891,
        previous_value: 2234,
        change_percentage: 29.4,
        trend: 'up',
        status: 'healthy',
        target: 3000,
        description: 'Total social media shares with rewards'
      },
      {
        id: 'map_discoveries',
        name: 'Map Discoveries',
        value: 5432,
        previous_value: 4987,
        change_percentage: 8.9,
        trend: 'up',
        status: 'healthy',
        target: 6000,
        description: 'Provider discoveries via map view'
      },
      {
        id: 'story_engagement',
        name: 'Story Engagement',
        value: 78.5,
        previous_value: 72.3,
        change_percentage: 8.6,
        trend: 'up',
        status: 'healthy',
        target: 85,
        description: 'Customer story engagement rate (%)'
      },
      {
        id: 'reminder_conversions',
        name: 'Reminder Conversions',
        value: 34.2,
        previous_value: 28.7,
        change_percentage: 19.2,
        trend: 'up',
        status: 'warning',
        target: 40,
        description: 'Smart reminder to booking conversion rate (%)'
      },
      {
        id: 'referral_signups',
        name: 'Referral Signups',
        value: 156,
        previous_value: 142,
        change_percentage: 9.9,
        trend: 'up',
        status: 'healthy',
        target: 200,
        description: 'New signups from referral links'
      }
    ];
    
    setMetrics(mockMetrics);
  };

  const loadTopUsers = async () => {
    // Mock top engaged users
    const mockUsers: UserEngagement[] = [
      {
        user_id: '1',
        user_name: 'Sarah Chen',
        avatar_url: '',
        bookings_count: 23,
        shares_count: 45,
        referrals_count: 12,
        total_score: 920,
        last_active: '2024-01-15T10:30:00Z',
        engagement_trend: 'increasing'
      },
      {
        user_id: '2',
        user_name: 'Jessica Rodriguez',
        avatar_url: '',
        bookings_count: 18,
        shares_count: 38,
        referrals_count: 8,
        total_score: 756,
        last_active: '2024-01-15T09:15:00Z',
        engagement_trend: 'stable'
      },
      {
        user_id: '3',
        user_name: 'Amanda Kim',
        avatar_url: '',
        bookings_count: 15,
        shares_count: 52,
        referrals_count: 15,
        total_score: 845,
        last_active: '2024-01-14T16:45:00Z',
        engagement_trend: 'increasing'
      }
    ];
    
    setTopUsers(mockUsers);
  };

  const loadABTests = async () => {
    // Mock A/B test results
    const mockTests: ABTestResult[] = [
      {
        test_id: '1',
        test_name: 'Booking CTA Optimization',
        variant: 'gradient_button',
        metric: 'booking_conversion',
        improvement: 15.3,
        confidence: 97.2,
        status: 'completed',
        participants: 2847,
        conversion_rate: 8.7
      },
      {
        test_id: '2',
        test_name: 'Social Share Rewards',
        variant: 'double_points',
        metric: 'share_rate',
        improvement: 23.1,
        confidence: 94.8,
        status: 'running',
        participants: 1956,
        conversion_rate: 12.4
      },
      {
        test_id: '3',
        test_name: 'Map View Discovery',
        variant: 'instant_book_badges',
        metric: 'discovery_to_booking',
        improvement: 8.9,
        confidence: 89.3,
        status: 'running',
        participants: 3421,
        conversion_rate: 5.8
      }
    ];
    
    setAbTests(mockTests);
  };

  const handleOptimization = async (action: string, data: any) => {
    try {
      switch (action) {
        case 'boost_viral_campaign':
          await supabaseBypass
            .from('viral_campaigns')
            .insert({
              campaign_type: 'social_share_boost',
              target_metric: 'shares',
              boost_multiplier: 2.0,
              duration_hours: 24,
              created_by: user?.id
            });
          toast.success('Viral campaign boosted! 🚀');
          break;
          
        case 'optimize_reminders':
          await supabaseBypass
            .from('reminder_optimizations')
            .insert({
              optimization_type: 'ai_timing',
              target_conversion: data.target,
              enabled: true,
              created_by: user?.id
            });
          toast.success('Smart reminders optimized! 🧠');
          break;
          
        case 'seed_network':
          toast.success('Network seeding initiated! 🌱');
          break;
          
        default:
          console.log('Unknown optimization action:', action);
      }
      
      onOptimizationAction?.(action, data);
      loadAnalytics(); // Refresh data
    } catch (error) {
      console.error('Optimization failed:', error);
      toast.error('Optimization failed. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-400" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-400" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-200/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="h-5 w-5 mr-2" />
                Phase 3+ Analytics & Optimization
              </CardTitle>
              <p className="text-blue-200 text-sm mt-1">
                Monitor, optimize, and scale viral growth mechanics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
                <span className="text-sm text-white">Auto-refresh</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={loadAnalytics}
                disabled={loading}
                className="border-white/20 text-white hover:bg-white/10"
              >
                {loading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Time Range & Tab Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {[
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'engagement', label: 'Engagement', icon: Users },
            { key: 'viral', label: 'Viral Growth', icon: Share2 },
            { key: 'tests', label: 'A/B Tests', icon: Target }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={activeTab === key ? 'default' : 'ghost'}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex items-center space-x-2 ${
                activeTab === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-white/10 hover:bg-white/20 border-white/20'
              } text-white`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Button>
          ))}
        </div>
        
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeRange(range as typeof selectedTimeRange)}
              className={`${
                selectedTimeRange === range
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                  : 'bg-white/10 hover:bg-white/20'
              } text-white`}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <Card key={metric.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-white">{metric.name}</h3>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className={getStatusColor(metric.status)}>
                          <div className="w-2 h-2 rounded-full bg-current" />
                        </span>
                      </div>
                    </div>
                    <div className="flex items-baseline space-x-2 mb-1">
                      <span className="text-2xl font-bold text-white">
                        {typeof metric.value === 'number' && metric.value > 100 
                          ? metric.value.toLocaleString() 
                          : metric.value}
                        {metric.name.includes('rate') || metric.name.includes('Engagement') ? '%' : ''}
                      </span>
                      <span className={`text-sm ${
                        metric.change_percentage > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change_percentage > 0 ? '+' : ''}{metric.change_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{metric.description}</span>
                      <span>Target: {metric.target}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Quick Optimizations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleOptimization('boost_viral_campaign', { multiplier: 2 })}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Boost Viral Campaign
                  </Button>
                  <Button
                    onClick={() => handleOptimization('optimize_reminders', { target: 45 })}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Optimize Reminders
                  </Button>
                  <Button
                    onClick={() => handleOptimization('seed_network', { target_users: 100 })}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Seed Network
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'engagement' && (
          <motion.div
            key="engagement"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Top Engaged Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.map((user, index) => (
                    <div key={user.user_id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{user.user_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span>{user.bookings_count} bookings</span>
                            <span>{user.shares_count} shares</span>
                            <span>{user.referrals_count} referrals</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{user.total_score}</div>
                        <div className={`text-xs ${
                          user.engagement_trend === 'increasing' ? 'text-green-400' :
                          user.engagement_trend === 'decreasing' ? 'text-red-400' : 'text-gray-400'
                        }`}>
                          {user.engagement_trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === 'tests' && (
          <motion.div
            key="tests"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">A/B Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {abTests.map((test) => (
                    <div key={test.test_id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-white">{test.test_name}</h3>
                          <p className="text-sm text-gray-300">Variant: {test.variant}</p>
                        </div>
                        <Badge className={`${
                          test.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          test.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {test.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-white">{test.improvement}%</div>
                          <div className="text-xs text-gray-400">Improvement</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{test.confidence}%</div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{test.participants}</div>
                          <div className="text-xs text-gray-400">Participants</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-white">{test.conversion_rate}%</div>
                          <div className="text-xs text-gray-400">Conversion</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardAnalytics;