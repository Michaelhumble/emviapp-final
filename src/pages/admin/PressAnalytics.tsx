import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Users, MousePointer, Share2, AlertTriangle } from 'lucide-react';

interface AnalyticsData {
  pressPageViews: number;
  pressPageViewsChange: number;
  ctr: number;
  ctrChange: number;
  assistedSignups: number;
  assistedSignupsChange: number;
  socialShares: number;
  socialSharesChange: number;
  topReferrers: Array<{
    outlet: string;
    visits: number;
    conversions: number;
  }>;
  dailyMetrics: Array<{
    date: string;
    views: number;
    shares: number;
    signups: number;
  }>;
  anomalies: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
  }>;
}

const PressAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      // Mock data - in production, integrate with actual analytics
      const mockData: AnalyticsData = {
        pressPageViews: 15420 + Math.floor(Math.random() * 1000),
        pressPageViewsChange: 12.3,
        ctr: 0.0347,
        ctrChange: -2.1,
        assistedSignups: 89,
        assistedSignupsChange: 18.5,
        socialShares: 342,
        socialSharesChange: 25.7,
        topReferrers: [
          { outlet: 'AP News', visits: 4200, conversions: 45 },
          { outlet: 'Yahoo News', visits: 3100, conversions: 32 },
          { outlet: 'KRON4', visits: 2800, conversions: 28 },
          { outlet: 'WGN 9', visits: 2400, conversions: 24 },
          { outlet: 'Google News', visits: 2100, conversions: 19 }
        ],
        dailyMetrics: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          views: Math.floor(Math.random() * 800) + 200,
          shares: Math.floor(Math.random() * 20) + 5,
          signups: Math.floor(Math.random() * 8) + 1
        })),
        anomalies: [
          {
            type: 'traffic_spike',
            message: 'Press page views increased 45% above baseline',
            severity: 'medium',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            type: 'low_ctr',
            message: 'CTR dropped below 3% threshold on mobile',
            severity: 'high',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const csvData = [
      ['Metric', 'Value', 'Change'],
      ['Press Page Views', analyticsData.pressPageViews.toString(), `${analyticsData.pressPageViewsChange}%`],
      ['Click-through Rate', `${(analyticsData.ctr * 100).toFixed(2)}%`, `${analyticsData.ctrChange}%`],
      ['Assisted Signups', analyticsData.assistedSignups.toString(), `${analyticsData.assistedSignupsChange}%`],
      ['Social Shares', analyticsData.socialShares.toString(), `${analyticsData.socialSharesChange}%`]
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `press-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const recordManualEvent = () => {
    // Track manual events for testing
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'press_manual_test', {
        event_category: 'Press Analytics',
        event_label: 'Manual Test Event'
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load analytics data</p>
          <Button onClick={fetchAnalyticsData} className="mt-4">Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Press Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track press coverage performance and conversions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={recordManualEvent}>
            Test Event
          </Button>
          <Button onClick={exportData}>
            Export Data
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as '7d' | '30d' | '90d')}>
        <TabsList>
          <TabsTrigger value="7d">Last 7 days</TabsTrigger>
          <TabsTrigger value="30d">Last 30 days</TabsTrigger>
          <TabsTrigger value="90d">Last 90 days</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Press Page Views</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.pressPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className={analyticsData.pressPageViewsChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.pressPageViewsChange > 0 ? '+' : ''}{analyticsData.pressPageViewsChange}%
              </span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-through Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(analyticsData.ctr * 100).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className={analyticsData.ctrChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.ctrChange > 0 ? '+' : ''}{analyticsData.ctrChange}%
              </span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assisted Signups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.assistedSignups}</div>
            <p className="text-xs text-muted-foreground">
              <span className={analyticsData.assistedSignupsChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.assistedSignupsChange > 0 ? '+' : ''}{analyticsData.assistedSignupsChange}%
              </span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.socialShares}</div>
            <p className="text-xs text-muted-foreground">
              <span className={analyticsData.socialSharesChange > 0 ? 'text-green-600' : 'text-red-600'}>
                {analyticsData.socialSharesChange > 0 ? '+' : ''}{analyticsData.socialSharesChange}%
              </span> from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Anomalies Alert */}
      {analyticsData.anomalies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Analytics Anomalies
            </CardTitle>
            <CardDescription>
              Unusual patterns detected in your press analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.anomalies.map((anomaly, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      anomaly.severity === 'high' ? 'destructive' : 
                      anomaly.severity === 'medium' ? 'default' : 'secondary'
                    }>
                      {anomaly.severity}
                    </Badge>
                    <span className="text-sm">{anomaly.message}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(anomaly.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Metrics Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Performance</CardTitle>
            <CardDescription>Views, shares, and signups over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.dailyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis />
                <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="shares" stroke="hsl(var(--secondary))" strokeWidth={2} />
                <Line type="monotone" dataKey="signups" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Press Referrers</CardTitle>
            <CardDescription>Traffic and conversions by outlet</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topReferrers} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="outlet" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="visits" fill="hsl(var(--primary))" />
                <Bar dataKey="conversions" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Press Metrics</CardTitle>
          <CardDescription>Complete breakdown of press performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Outlet</th>
                  <th className="text-left p-2">Visits</th>
                  <th className="text-left p-2">CTR</th>
                  <th className="text-left p-2">Conversions</th>
                  <th className="text-left p-2">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topReferrers.map((referrer, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{referrer.outlet}</td>
                    <td className="p-2">{referrer.visits.toLocaleString()}</td>
                    <td className="p-2">{((referrer.conversions / referrer.visits) * 100).toFixed(2)}%</td>
                    <td className="p-2">{referrer.conversions}</td>
                    <td className="p-2">
                      <Badge variant={referrer.conversions / referrer.visits > 0.01 ? 'default' : 'secondary'}>
                        {((referrer.conversions / referrer.visits) * 100).toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressAnalytics;