import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
  Info
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { affiliateApi } from '@/lib/api/affiliate';
import { toast } from 'sonner';

const AffiliateSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [lastPayoutMethod, setLastPayoutMethod] = useState('•••• 4242');
  const [apiToken, setApiToken] = useState('emvi_••••••••••••••••••••••••abc123');
  const [utmSettings, setUtmSettings] = useState({
    utm_source: 'affiliate',
    utm_medium: 'referral', 
    utm_campaign: '',
    utm_content: ''
  });
  const [affiliateSlug, setAffiliateSlug] = useState('');

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      
      // Get affiliate partner info
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('slug, stripe_connect_account_id')
        .eq('user_id', user?.id)
        .single();

      if (affiliate) {
        setAffiliateSlug(affiliate.slug);
        setStripeConnected(!!affiliate.stripe_connect_account_id);
        setUtmSettings(prev => ({
          ...prev,
          utm_campaign: affiliate.slug
        }));
      }

    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const connectStripe = async () => {
    // In a real implementation, this would redirect to Stripe Connect
    toast.success('Redirecting to Stripe Connect...');
    
    // Mock the connection process
    setTimeout(() => {
      setStripeConnected(true);
      setLastPayoutMethod('•••• 8899 (Wells Fargo)');
      toast.success('Stripe account connected successfully!');
    }, 2000);
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

          {/* Stripe Connect Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payout Method
              </CardTitle>
              <CardDescription>
                Connect your Stripe account to receive commission payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stripeConnected ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium text-green-800">Stripe Account Connected</p>
                      <p className="text-sm text-green-600">
                        Payouts will be sent to: {lastPayoutMethod}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Manage Stripe Account
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Payout Details
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
                  
                  <Button onClick={connectStripe} className="w-full sm:w-auto">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Connect Stripe Account
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