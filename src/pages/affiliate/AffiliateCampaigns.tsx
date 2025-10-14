import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Copy, ExternalLink, TrendingUp, Eye, BarChart3, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Campaign {
  id: string;
  campaign_name: string;
  campaign_type: string;
  target_page: string;
  deep_link_path: string;
  custom_slug: string;
  clicks_count: number;
  conversions_count: number;
  conversion_rate: number;
  is_active: boolean;
  created_at: string;
}

const AffiliateCampaigns = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    campaign_name: '',
    campaign_type: 'general',
    target_page: '/jobs',
    custom_slug: '',
    utm_params: {
      utm_source: 'affiliate',
      utm_medium: 'referral',
      utm_campaign: '',
      utm_content: ''
    }
  });

  useEffect(() => {
    if (user) {
      fetchAffiliateData();
    }
  }, [user]);

  const fetchAffiliateData = async () => {
    try {
      // Get affiliate ID
      const { data: affiliate } = await supabase
        .from('affiliate_partners')
        .select('id, slug')
        .eq('user_id', user?.id)
        .single();

      if (affiliate) {
        setAffiliateId(affiliate.id);
        setFormData(prev => ({
          ...prev,
          utm_params: { ...prev.utm_params, utm_campaign: affiliate.slug }
        }));
        await fetchCampaigns(affiliate.id);
      }
    } catch (error) {
      console.error('Error fetching affiliate data:', error);
      toast.error('Failed to load affiliate data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async (affId: string) => {
    const { data, error } = await supabase
      .from('affiliate_campaigns')
      .select('*')
      .eq('affiliate_id', affId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      toast.error('Failed to load campaigns');
    } else {
      setCampaigns(data || []);
    }
  };

  const generateSlug = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `${formData.campaign_type}-${timestamp}${random}`;
  };

  const createCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!affiliateId) {
      toast.error('Affiliate not found');
      return;
    }

    try {
      const slug = formData.custom_slug || generateSlug();
      const deepLinkPath = `${formData.target_page}?${new URLSearchParams(formData.utm_params as any).toString()}`;

      const { data, error } = await supabase
        .from('affiliate_campaigns')
        .insert({
          affiliate_id: affiliateId,
          campaign_name: formData.campaign_name,
          campaign_type: formData.campaign_type,
          target_page: formData.target_page,
          deep_link_path: deepLinkPath,
          custom_slug: slug,
          utm_params: formData.utm_params
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Campaign created successfully!');
      setDialogOpen(false);
      setFormData({
        campaign_name: '',
        campaign_type: 'general',
        target_page: '/jobs',
        custom_slug: '',
        utm_params: {
          utm_source: 'affiliate',
          utm_medium: 'referral',
          utm_campaign: '',
          utm_content: ''
        }
      });
      await fetchCampaigns(affiliateId);

    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error('Failed to create campaign');
    }
  };

  const copyLink = (campaign: Campaign) => {
    const link = `https://emvi.app/c/${campaign.custom_slug}`;
    navigator.clipboard.writeText(link);
    toast.success('Campaign link copied!');
  };

  const toggleCampaignStatus = async (campaignId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('affiliate_campaigns')
        .update({ is_active: !currentStatus })
        .eq('id', campaignId);

      if (error) throw error;

      toast.success(currentStatus ? 'Campaign paused' : 'Campaign activated');
      if (affiliateId) await fetchCampaigns(affiliateId);

    } catch (error) {
      console.error('Error toggling campaign:', error);
      toast.error('Failed to update campaign');
    }
  };

  return (
    <>
      <Helmet>
        <title>Campaign Manager - Affiliate Portal - EmviApp</title>
        <meta name="description" content="Create and manage deep link campaigns with advanced tracking and analytics." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campaign Manager</h1>
              <p className="text-muted-foreground">
                Create targeted campaigns with custom tracking links
              </p>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Set up a targeted campaign with custom tracking parameters
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={createCampaign} className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="campaign_name">Campaign Name *</Label>
                    <Input
                      id="campaign_name"
                      value={formData.campaign_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, campaign_name: e.target.value }))}
                      placeholder="e.g., Summer Beauty Jobs Promo"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="campaign_type">Campaign Type *</Label>
                      <Select
                        value={formData.campaign_type}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, campaign_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="seasonal">Seasonal</SelectItem>
                          <SelectItem value="product_launch">Product Launch</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="social_media">Social Media</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="content">Content Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="target_page">Target Page *</Label>
                      <Select
                        value={formData.target_page}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, target_page: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="/jobs">Jobs Page</SelectItem>
                          <SelectItem value="/artists">Artists Page</SelectItem>
                          <SelectItem value="/salons">Salons Page</SelectItem>
                          <SelectItem value="/pricing">Pricing Page</SelectItem>
                          <SelectItem value="/">Home Page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="custom_slug">Custom Slug (Optional)</Label>
                    <Input
                      id="custom_slug"
                      value={formData.custom_slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, custom_slug: e.target.value }))}
                      placeholder="leave blank for auto-generated"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Create a memorable slug like "summer-jobs" or "salon-owners"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="utm_campaign">UTM Campaign</Label>
                      <Input
                        id="utm_campaign"
                        value={formData.utm_params.utm_campaign}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          utm_params: { ...prev.utm_params, utm_campaign: e.target.value }
                        }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="utm_content">UTM Content</Label>
                      <Input
                        id="utm_content"
                        value={formData.utm_params.utm_content}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          utm_params: { ...prev.utm_params, utm_content: e.target.value }
                        }))}
                        placeholder="e.g., button, banner, post"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">Create Campaign</Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.filter(c => c.is_active).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.clicks_count, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.conversions_count, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {campaigns.length > 0
                    ? (campaigns.reduce((sum, c) => sum + c.conversion_rate, 0) / campaigns.length).toFixed(1)
                    : '0.0'}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Campaigns</CardTitle>
              <CardDescription>Manage and track all your affiliate campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {campaigns.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No campaigns yet</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                      <TableHead className="text-right">Conversions</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.campaign_name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {campaign.campaign_type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              /c/{campaign.custom_slug}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyLink(campaign)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{campaign.clicks_count}</TableCell>
                        <TableCell className="text-right">{campaign.conversions_count}</TableCell>
                        <TableCell className="text-right">{campaign.conversion_rate.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge variant={campaign.is_active ? 'default' : 'secondary'}>
                            {campaign.is_active ? 'Active' : 'Paused'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleCampaignStatus(campaign.id, campaign.is_active)}
                            >
                              {campaign.is_active ? 'Pause' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateCampaigns;
