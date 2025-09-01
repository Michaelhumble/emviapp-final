import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, ExternalLink, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { affiliateApi } from '@/lib/api/affiliate';
import { Payout } from '@/types/affiliate';
import { toast } from 'sonner';

const AffiliatePayouts = () => {
  const { user } = useAuth();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    available: 234.50,
    pending: 1240.30,
    lifetime: 4567.80
  });

  useEffect(() => {
    if (user) {
      fetchPayouts();
    }
  }, [user]);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const data = await affiliateApi.getPayouts();
      setPayouts(data);
    } catch (error) {
      console.error('Error fetching payouts:', error);
      toast.error('Failed to load payouts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Paid</Badge>;
      case 'processing':
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Processing</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Payouts - Affiliate Portal - EmviApp</title>
        <meta name="description" content="View your affiliate payouts and earnings history." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payouts & Earnings</h1>
            <p className="text-muted-foreground">Track your commission earnings and payout history</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.available)}</div>
                <p className="text-xs text-muted-foreground">Ready for next payout</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pending)}</div>
                <p className="text-xs text-muted-foreground">Processing this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lifetime Earnings</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.lifetime)}</div>
                <p className="text-xs text-muted-foreground">Total commissions earned</p>
              </CardContent>
            </Card>
          </div>

          {/* Payout Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Payout Schedule</CardTitle>
              <CardDescription>
                Commission payouts are processed monthly on the 15th. Minimum payout threshold is $50.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">💰 Payout Details</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Monthly payouts on the 15th</li>
                    <li>• $50 minimum threshold</li>
                    <li>• 30-day attribution window</li>
                    <li>• Stripe Connect required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📊 Commission Structure</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• 30% commission on all sales</li>
                    <li>• Tracked via unique affiliate links</li>
                    <li>• Real-time conversion tracking</li>
                    <li>• Detailed earnings reports</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>
                Your complete earnings and payout history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : payouts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">💳</div>
                  <h3 className="text-lg font-medium mb-2">No Payouts Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start promoting EmviApp to earn your first commission!
                  </p>
                  <Button variant="outline" onClick={() => window.location.href = '/affiliate/links'}>
                    Create Affiliate Links
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Paid Date</TableHead>
                        <TableHead className="text-center">Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">
                            {formatDate(payout.period_start)} - {formatDate(payout.period_end)}
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {formatCurrency(payout.commission_amount)}
                          </TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(payout.status)}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {payout.paid_at ? formatDate(payout.paid_at) : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            {payout.stripe_payout_id && (
                              <Button size="sm" variant="ghost">
                                <Download className="h-3 w-3 mr-1" />
                                Receipt
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tax Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">📄 1099 Forms</h4>
                  <p className="text-muted-foreground mb-2">
                    If you earn $600 or more in a calendar year, we'll send you a 1099-NEC form by January 31st.
                  </p>
                  <Button variant="outline" size="sm" disabled>
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Download 2024 Tax Forms (Available Jan 2025)
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <p>
                    <strong>Important:</strong> You are responsible for reporting all affiliate earnings to the IRS. 
                    Please consult with a tax professional for specific guidance about your tax obligations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliatePayouts;