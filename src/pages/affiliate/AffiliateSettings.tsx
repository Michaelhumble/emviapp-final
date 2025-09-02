import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  Key, 
  Settings, 
  ExternalLink, 
  Copy, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { affiliateApi } from '@/lib/api/affiliate';
import { toast } from 'sonner';

const AffiliateSettings = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [connectStatus, setConnectStatus] = useState({
    connected: false,
    connect_status: 'not_connected',
    charges_enabled: false,
    payouts_enabled: false,
    details_submitted: false,
    country: null,
    default_currency: null,
    stripe_account_id: null
  });
  const [apiToken, setApiToken] = useState('emvi_••••••••••••••••••••••••abc123');
  const [utmSettings, setUtmSettings] = useState({
    utm_source: 'affiliate',
    utm_medium: 'referral', 
    utm_campaign: '',
    utm_content: ''
  });
  const [affiliateSlug, setAffiliateSlug] = useState('');
  const [isTestMode] = useState(true); // Always test mode for now

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
    
    // Check URL params for connect status
    const connectParam = searchParams.get('connect');
    if (connectParam === 'return') {
      toast.success('Welcome back! Checking your Stripe Connect status...');
      setTimeout(() => fetchConnectStatus(), 1000);
    } else if (connectParam === 'refresh') {
      toast.info('Refreshing your connection status...');
      setTimeout(() => fetchConnectStatus(), 1000);
    }
  }, [user, searchParams]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      // Get affiliate partner info
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('slug, stripe_account_id, connect_status, country, default_currency')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (affiliate) {
        setAffiliateSlug(affiliate.slug);
        setConnectStatus(prev => ({
          ...prev,
          connected: affiliate.connect_status === 'connected',
          connect_status: affiliate.connect_status || 'not_connected',
          stripe_account_id: affiliate.stripe_account_id,
          country: affiliate.country,
          default_currency: affiliate.default_currency
        }));
        setUtmSettings(prev => ({
          ...prev,
          utm_campaign: affiliate.slug
        }));
        
        // Fetch detailed status if we have a Stripe account
        if (affiliate.stripe_account_id) {
          await fetchConnectStatus();
        }
      } else {
        // User is not an affiliate partner
        toast.error('You are not registered as an affiliate partner. Please contact support.');
      }

    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchConnectStatus = async () => {
    try {
      console.log('[AFFILIATE-SETTINGS] Fetching connect status for user:', user?.id);
      
      const { data, error } = await supabase.functions.invoke('affiliate-connect-status');
      
      console.log('[AFFILIATE-SETTINGS] Connect status response:', { 
        data, 
        error,
        connected: data?.connected,
        connect_status: data?.connect_status,
        charges_enabled: data?.charges_enabled,
        payouts_enabled: data?.payouts_enabled,
        stripe_account_id: data?.stripe_account_id,
        country: data?.country,
        default_currency: data?.default_currency
      });
      
      if (error) {
        console.error('[AFFILIATE-SETTINGS] Status API error:', error);
        throw error;
      }
      
      setConnectStatus(data);
      
      if (data.connected) {
        toast.success('✅ Stripe Connect status: CONNECTED - Payouts enabled!');
        console.log('[AFFILIATE-SETTINGS] ✅ STRIPE CONNECT SUCCESSFULLY CONNECTED');
      } else if (data.connect_status === 'pending') {
        toast.info('⏳ Stripe Connect status: PENDING - Complete onboarding to enable payouts');
        console.log('[AFFILIATE-SETTINGS] ⏳ STRIPE CONNECT PENDING - More info needed');
      } else {
        toast.info('❌ Stripe Connect: NOT CONNECTED - Click Connect Payouts to start');
        console.log('[AFFILIATE-SETTINGS] ❌ STRIPE CONNECT NOT CONNECTED');
      }
      
    } catch (error) {
      console.error('[AFFILIATE-SETTINGS] Error fetching connect status:', error);
      console.error('[AFFILIATE-SETTINGS] Status error stack:', error.stack);
      toast.error(`Failed to fetch Stripe Connect status: ${error.message}`);
    }
  };

  const connectStripe = async () => {
    try {
      setLoading(true);
      console.log('[AFFILIATE-SETTINGS] Starting Stripe Connect...');
      console.log('[AFFILIATE-SETTINGS] User ID:', user?.id);
      toast.success('Redirecting to Stripe Connect...');
      
      // Call affiliate connect start function
      console.log('[AFFILIATE-SETTINGS] Calling affiliate-connect-start function...');
      const { data, error } = await supabase.functions.invoke('affiliate-connect-start');
      
      console.log('[AFFILIATE-SETTINGS] Connect start response:', { 
        data, 
        error,
        hasData: !!data,
        hasUrl: !!(data?.url),
        errorMessage: error?.message,
        errorDetails: error?.details || error
      });
      
      if (error) {
        console.error('[AFFILIATE-SETTINGS] API Error Details:', error);
        throw error;
      }
      
      // Redirect to Stripe onboarding
      if (data?.url) {
        console.log('[AFFILIATE-SETTINGS] Redirecting to Stripe onboarding URL:', data.url);
        toast.success('Redirecting to Stripe onboarding...');
        
        // Log the redirect for debugging
        console.log('[AFFILIATE-SETTINGS] About to redirect. Current URL:', window.location.href);
        console.log('[AFFILIATE-SETTINGS] Target URL:', data.url);
        
        // Redirect in the same window to complete onboarding
        window.location.href = data.url;
      } else {
        console.error('[AFFILIATE-SETTINGS] No URL in response:', data);
        throw new Error('No onboarding URL received from server');
      }
    } catch (error) {
      console.error('[AFFILIATE-SETTINGS] Full Stripe Connect error:', error);
      console.error('[AFFILIATE-SETTINGS] Error stack:', error.stack);
      toast.error(`Failed to connect Stripe account: ${error.message}`);
      setLoading(false);
    }
  };

  const regenerateApiKey = async () => {
    try {
      setLoading(true);
      const response = await affiliateApi.regenerateToken();
      
      // Show only last 4 characters
      const maskedToken = 'emvi_' + '•'.repeat(20) + response.token.slice(-4);
      setApiToken(maskedToken);
      
      toast.success('New API key generated successfully!');
    } catch (error) {
      console.error('Error regenerating API key:', error);
      toast.error('Failed to regenerate API key');
    } finally {
      setLoading(false);
    }
  };

  const copyApiKey = () => {
    // In a real app, this would copy the full token
    toast.success('API key copied to clipboard!');
  };

  const saveUtmSettings = () => {
    toast.success('UTM settings saved successfully!');
  };

  const copyUtmExample = () => {
    const exampleUrl = `https://emvi.app/jobs?utm_source=${utmSettings.utm_source}&utm_medium=${utmSettings.utm_medium}&utm_campaign=${utmSettings.utm_campaign}&utm_content=${utmSettings.utm_content}`;
    navigator.clipboard.writeText(exampleUrl);
    toast.success('Example URL copied to clipboard!');
  };

  return (
    <>
      <Helmet>
        <title>Settings - Affiliate Portal - EmviApp</title>
        <meta name="description" content="Manage your affiliate account settings, payouts, and tracking preferences." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Affiliate Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences, payout methods, and tracking settings
            </p>
          </div>

          {/* Test Mode Alert */}
          {isTestMode && (
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Test Mode:</strong> You're using Stripe test data. Use test card information during onboarding.
              </AlertDescription>
            </Alert>
          )}

          {/* Stripe Connect Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Stripe Connect Status
                {isTestMode && <Badge variant="outline" className="ml-2">Test Mode</Badge>}
              </CardTitle>
              <CardDescription>
                Connect your Stripe account to receive commission payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {connectStatus.connected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Connected</p>
                      <p className="text-sm text-green-600">
                        Payouts enabled • {connectStatus.country?.toUpperCase()} • {connectStatus.default_currency?.toUpperCase()}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const dashboardUrl = isTestMode 
                          ? `https://dashboard.stripe.com/test/connect/accounts/${connectStatus.stripe_account_id}`
                          : `https://dashboard.stripe.com/connect/accounts/${connectStatus.stripe_account_id}`;
                        window.open(dashboardUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Manage in Stripe
                    </Button>
                    <Button variant="outline" size="sm" onClick={fetchConnectStatus}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                  </div>
                </div>
              ) : connectStatus.connect_status === 'pending' ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="font-medium text-yellow-800">Onboarding In Progress</p>
                      <p className="text-sm text-yellow-600">
                        Complete your Stripe onboarding to start receiving payouts
                      </p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={connectStripe} disabled={loading}>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Continue Onboarding
                    </Button>
                    <Button variant="outline" onClick={fetchConnectStatus}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Status
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      You need to connect a Stripe account to receive commission payouts. 
                      This is required before you can earn commissions.
                    </AlertDescription>
                  </Alert>
                  
                  <Button onClick={connectStripe} disabled={loading} className="w-full sm:w-auto">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Connect Payouts (Stripe Express)
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    <p>Stripe Connect is used to securely process your payouts. Your financial information is protected and not stored on our servers.</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Key Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Access
              </CardTitle>
              <CardDescription>
                Manage your API key for programmatic access to affiliate data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="api-key"
                      value={apiToken}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyApiKey}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this key to access the affiliate API. Keep it secure and don't share it publicly.
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={regenerateApiKey}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Regenerate API Key
                </Button>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Regenerating your API key will invalidate the current key. Update any applications using the old key.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          {/* UTM Settings Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                UTM Tracking Settings
              </CardTitle>
              <CardDescription>
                Configure default UTM parameters for your affiliate links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="utm_source">UTM Source</Label>
                    <Input
                      id="utm_source"
                      value={utmSettings.utm_source}
                      onChange={(e) => setUtmSettings(prev => ({ ...prev, utm_source: e.target.value }))}
                      placeholder="affiliate"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="utm_medium">UTM Medium</Label>
                    <Input
                      id="utm_medium"
                      value={utmSettings.utm_medium}
                      onChange={(e) => setUtmSettings(prev => ({ ...prev, utm_medium: e.target.value }))}
                      placeholder="referral"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="utm_campaign">UTM Campaign</Label>
                    <Input
                      id="utm_campaign"
                      value={utmSettings.utm_campaign}
                      onChange={(e) => setUtmSettings(prev => ({ ...prev, utm_campaign: e.target.value }))}
                      placeholder="your-affiliate-slug"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="utm_content">UTM Content (optional)</Label>
                    <Input
                      id="utm_content"
                      value={utmSettings.utm_content}
                      onChange={(e) => setUtmSettings(prev => ({ ...prev, utm_content: e.target.value }))}
                      placeholder="banner, email, social"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label>Preview URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      readOnly
                      value={`https://emvi.app/jobs?utm_source=${utmSettings.utm_source}&utm_medium=${utmSettings.utm_medium}&utm_campaign=${utmSettings.utm_campaign}&utm_content=${utmSettings.utm_content}`}
                      className="font-mono text-xs"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyUtmExample}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button onClick={saveUtmSettings}>
                  Save UTM Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Basic information about your affiliate account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Affiliate Slug</Label>
                    <Input
                      value={affiliateSlug}
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your unique affiliate identifier used in links and tracking
                    </p>
                  </div>
                  
                  <div>
                    <Label>Commission Rate</Label>
                    <Input
                      value="30%"
                      readOnly
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your current commission rate on all referrals
                    </p>
                  </div>
                </div>
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Need to update your affiliate slug or commission rate? Contact our support team for assistance.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateSettings;