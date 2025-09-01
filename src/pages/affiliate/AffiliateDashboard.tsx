import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Activity, Copy, ExternalLink, Download } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface AffiliateData {
  id: string;
  slug: string;
  status: string;
  commission_rate: number;
  total_clicks: number;
  total_conversions: number;
  total_commissions: number;
  stripe_connect_account_id: string | null;
}

interface EarningsData {
  date: string;
  earnings: number;
}

const AffiliateDashboard = () => {
  const { user } = useAuth();
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      fetchAffiliateData();
    }
  }, [user]);

  const fetchAffiliateData = async () => {
    try {
      setLoading(true);
      
      // Fetch affiliate profile
      const { data: affiliate, error } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No affiliate record found - redirect to application
          window.location.href = '/affiliate/apply';
          return;
        }
        throw error;
      }

      setAffiliateData(affiliate);

      // Fetch earnings data for chart (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: conversions } = await supabase
        .from('affiliate_conversions')
        .select('created_at, commission_amount')
        .eq('affiliate_id', affiliate.id)
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true });

      // Group by date
      const earningsByDate = (conversions || []).reduce((acc: Record<string, number>, conversion) => {
        const date = new Date(conversion.created_at).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + (conversion.commission_amount || 0);
        return acc;
      }, {});

      const chartData = Object.entries(earningsByDate).map(([date, earnings]) => ({
        date: new Date(date).toLocaleDateString(),
        earnings: earnings as number
      }));

      setEarningsData(chartData);

    } catch (error) {
      console.error('Error fetching affiliate data:', error);
      toast.error('Failed to load affiliate data');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (affiliateData) {
      const link = `https://emvi.app/l/${affiliateData.slug}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending Review</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!affiliateData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Affiliate Application Required</h1>
          <p className="text-muted-foreground mb-6">You need to apply for the affiliate program first.</p>
          <Button asChild>
            <Link to="/affiliate/apply">Apply for Affiliate Program</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Affiliate Dashboard - EmviApp</title>
        <meta name="description" content="Track your affiliate earnings, manage links, and view performance metrics." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Affiliate Dashboard</h1>
              <div className="flex items-center gap-4">
                <p className="text-muted-foreground">Welcome back! Here's your affiliate overview.</p>
                {getStatusBadge(affiliateData.status)}
              </div>
            </div>
            
            {affiliateData.status === 'approved' && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyReferralLink}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied!' : 'Copy Link'}
                </Button>
                <Button size="sm" asChild>
                  <Link to="/affiliate/links">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Manage Links
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {affiliateData.status === 'pending' && (
            <Card className="mb-8 border-yellow-200 bg-yellow-50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-yellow-800">Application Under Review</h3>
                <p className="text-yellow-700">
                  Your affiliate application is currently being reviewed. We'll notify you via email once it's approved. 
                  This typically takes 1-2 business days.
                </p>
              </CardContent>
            </Card>
          )}

          {affiliateData.status === 'approved' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${affiliateData.total_commissions.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {affiliateData.commission_rate * 100}% commission rate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{affiliateData.total_clicks}</div>
                    <p className="text-xs text-muted-foreground">
                      All-time link clicks
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{affiliateData.total_conversions}</div>
                    <p className="text-xs text-muted-foreground">
                      {affiliateData.total_clicks > 0 
                        ? `${((affiliateData.total_conversions / affiliateData.total_clicks) * 100).toFixed(1)}% conversion rate`
                        : 'No clicks yet'
                      }
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">This Month</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${earningsData.reduce((sum, day) => sum + day.earnings, 0).toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last 30 days earnings
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts and Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Earnings Chart */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Earnings Trend</CardTitle>
                    <CardDescription>Your commission earnings over the last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {earningsData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={earningsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                          <Line 
                            type="monotone" 
                            dataKey="earnings" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            dot={{ fill: 'hsl(var(--primary))' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                     ) : (
                       <div className="flex flex-col items-center justify-center h-[300px] text-center">
                         <div className="text-muted-foreground mb-4">No earnings data yet. Start promoting to see your progress!</div>
                         <Button asChild>
                           <Link to="/affiliate/links">Create Your First Link</Link>
                         </Button>
                       </div>
                     )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manage your affiliate account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/affiliate/links">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Manage Links
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/affiliate/payouts">
                        <DollarSign className="h-4 w-4 mr-2" />
                        View Payouts
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/affiliate/assets">
                        <Download className="h-4 w-4 mr-2" />
                        Download Assets
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link to="/affiliate/settings">
                        <Users className="h-4 w-4 mr-2" />
                        Account Settings
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Tips</CardTitle>
                  <CardDescription>Maximize your affiliate earnings with these strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">🎯 Target the Right Audience</h4>
                      <p className="text-sm text-muted-foreground">
                        Focus on beauty professionals actively looking for jobs - salon owners, independent artists, and recent graduates.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">📱 Use Multiple Channels</h4>
                      <p className="text-sm text-muted-foreground">
                        Promote across social media, email newsletters, blogs, and industry forums for maximum reach.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">💰 Highlight Benefits</h4>
                      <p className="text-sm text-muted-foreground">
                        Emphasize how EmviApp helps beauty professionals find better jobs, higher pay, and flexible schedules.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">📊 Track Your Results</h4>
                      <p className="text-sm text-muted-foreground">
                        Use different links for different channels to see which marketing methods work best for you.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AffiliateDashboard;