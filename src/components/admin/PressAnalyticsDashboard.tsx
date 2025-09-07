import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  MousePointer,
  Calendar,
  Award,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PressMetric {
  outlet: string;
  mentions: number;
  clicks: number;
  ctr: number;
  assistedSignups: number;
  lastClick: string;
}

interface PressAnalyticsData {
  totalMentions: number;
  totalClicks: number;
  averageCTR: number;
  assistedSignups: number;
  topOutlets: PressMetric[];
  recentActivity: Array<{
    outlet: string;
    timestamp: string;
    type: 'click' | 'signup';
  }>;
}

const PressAnalyticsDashboard = () => {
  const [data, setData] = useState<PressAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would query actual analytics data
      // For now, we'll simulate the data structure
      
      const mockData: PressAnalyticsData = {
        totalMentions: 12,
        totalClicks: 847,
        averageCTR: 3.2,
        assistedSignups: 23,
        topOutlets: [
          {
            outlet: 'Associated Press',
            mentions: 1,
            clicks: 342,
            ctr: 4.1,
            assistedSignups: 8,
            lastClick: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            outlet: 'Yahoo Finance',
            mentions: 1,
            clicks: 156,
            ctr: 2.9,
            assistedSignups: 4,
            lastClick: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
          },
          {
            outlet: 'MarketWatch', 
            mentions: 1,
            clicks: 104,
            ctr: 2.1,
            assistedSignups: 5,
            lastClick: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
          }
        ],
        recentActivity: [
          {
            outlet: 'Associated Press',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            type: 'click'
          },
          {
            outlet: 'Yahoo Finance',
            timestamp: new Date(Date.now() - 47 * 60 * 1000).toISOString(),
            type: 'click'
          }
        ]
      };

      setData(mockData);
    } catch (error) {
      console.error('Error loading press analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">No press analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Award className="h-6 w-6 text-purple-600" />
          Press Analytics
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Mentions</p>
                <p className="text-2xl font-bold">{data.totalMentions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MousePointer className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Total Clicks</p>
                <p className="text-2xl font-bold">{data.totalClicks.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">Average CTR</p>
                <p className="text-2xl font-bold">{data.averageCTR}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Assisted Signups</p>
                <p className="text-2xl font-bold">{data.assistedSignups}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Outlets Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Outlets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topOutlets.map((outlet, index) => (
              <div key={outlet.outlet} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                  <div>
                    <h4 className="font-medium">{outlet.outlet}</h4>
                    <p className="text-sm text-gray-600">
                      {outlet.mentions} mention{outlet.mentions !== 1 ? 's' : ''} • 
                      Last activity: {formatDate(outlet.lastClick)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Clicks</p>
                      <p className="font-semibold">{outlet.clicks}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">CTR</p>
                      <p className="font-semibold">{outlet.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Signups</p>
                      <p className="font-semibold">{outlet.assistedSignups}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'signup' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.outlet}</span> - 
                    {activity.type === 'signup' ? ' User signup' : ' Outbound click'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
                <Badge 
                  variant={activity.type === 'signup' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics Notes */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-gray-600 space-y-2">
            <p>📊 <strong>CTR Calculation:</strong> (Total Clicks / Total Press Page Views) × 100</p>
            <p>🎯 <strong>Assisted Signups:</strong> Users who signed up after visiting from press mentions</p>
            <p>⏱️ <strong>Attribution Window:</strong> 7 days from first press referral visit</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PressAnalyticsDashboard;