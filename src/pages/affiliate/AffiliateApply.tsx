import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AffiliateApply = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: user?.email || '',
    website_url: '',
    social_media_links: {
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: ''
    },
    audience_size: '',
    audience_description: '',
    promotion_channels: [] as string[],
    experience_level: '',
    why_join: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to apply');
      navigate('/sign-in?redirect=/affiliate/apply');
      return;
    }

    try {
      setLoading(true);

      // Check if user already has an application
      const { data: existingApp } = await supabase
        .from('affiliate_applications')
        .select('id, status')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingApp) {
        if (existingApp.status === 'pending') {
          toast.info('Your application is already under review');
          navigate('/affiliate/dashboard');
          return;
        } else if (existingApp.status === 'approved') {
          toast.info('You are already an approved affiliate!');
          navigate('/affiliate/dashboard');
          return;
        }
      }

      // Submit application
      const { error } = await supabase
        .from('affiliate_applications')
        .insert({
          user_id: user.id,
          ...formData
        });

      if (error) throw error;

      toast.success('Application submitted successfully! We\'ll review it within 24-48 hours.');
      navigate('/affiliate/dashboard');

    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleChannel = (channel: string) => {
    setFormData(prev => ({
      ...prev,
      promotion_channels: prev.promotion_channels.includes(channel)
        ? prev.promotion_channels.filter(c => c !== channel)
        : [...prev.promotion_channels, channel]
    }));
  };

  return (
    <>
      <Helmet>
        <title>Apply for Affiliate Program - EmviApp</title>
        <meta name="description" content="Join EmviApp's affiliate program and earn up to 35% recurring commissions promoting beauty job platform." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-300">
              <Sparkles className="h-3 w-3 mr-1" />
              Now Accepting Applications
            </Badge>
            <h1 className="text-4xl font-bold mb-3">Join Our Affiliate Program</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn up to 35% recurring commissions by promoting EmviApp to beauty professionals
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-violet-600 mb-3" />
                <h3 className="font-semibold mb-1">20-35% Commission</h3>
                <p className="text-sm text-muted-foreground">Tier-based rates on all paid subscriptions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-violet-600 mb-3" />
                <h3 className="font-semibold mb-1">90-Day Attribution</h3>
                <p className="text-sm text-muted-foreground">Long cookie window for maximum conversions</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-8 w-8 text-violet-600 mb-3" />
                <h3 className="font-semibold mb-1">Monthly Payouts</h3>
                <p className="text-sm text-muted-foreground">Direct deposits via Stripe Connect</p>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Tell us about yourself and how you plan to promote EmviApp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website_url">Website or Blog URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Social Media */}
                <div>
                  <Label>Social Media Profiles (Optional)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <Input
                      placeholder="Instagram handle"
                      value={formData.social_media_links.instagram}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social_media_links: { ...prev.social_media_links, instagram: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="TikTok handle"
                      value={formData.social_media_links.tiktok}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social_media_links: { ...prev.social_media_links, tiktok: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="YouTube channel"
                      value={formData.social_media_links.youtube}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social_media_links: { ...prev.social_media_links, youtube: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Twitter/X handle"
                      value={formData.social_media_links.twitter}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social_media_links: { ...prev.social_media_links, twitter: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                {/* Audience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="audience_size">Audience Size *</Label>
                    <Select
                      value={formData.audience_size}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, audience_size: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1k">0 - 1,000</SelectItem>
                        <SelectItem value="1k-5k">1,000 - 5,000</SelectItem>
                        <SelectItem value="5k-10k">5,000 - 10,000</SelectItem>
                        <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                        <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                        <SelectItem value="100k+">100,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience_level">Affiliate Experience *</Label>
                    <Select
                      value={formData.experience_level}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Just starting out</SelectItem>
                        <SelectItem value="intermediate">Some experience</SelectItem>
                        <SelectItem value="advanced">Very experienced</SelectItem>
                        <SelectItem value="professional">Professional affiliate marketer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Audience Description */}
                <div>
                  <Label htmlFor="audience_description">Describe Your Audience *</Label>
                  <Textarea
                    id="audience_description"
                    value={formData.audience_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, audience_description: e.target.value }))}
                    required
                    placeholder="Who follows you? What content do they engage with? What are their interests?"
                    rows={3}
                  />
                </div>

                {/* Promotion Channels */}
                <div>
                  <Label>How will you promote EmviApp? * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {['Blog', 'Email Newsletter', 'Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'Facebook', 'LinkedIn', 'Online Communities'].map((channel) => (
                      <Button
                        key={channel}
                        type="button"
                        variant={formData.promotion_channels.includes(channel) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleChannel(channel)}
                        className="justify-start"
                      >
                        {formData.promotion_channels.includes(channel) && (
                          <CheckCircle2 className="h-3 w-3 mr-2" />
                        )}
                        {channel}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Why Join */}
                <div>
                  <Label htmlFor="why_join">Why do you want to join our affiliate program? *</Label>
                  <Textarea
                    id="why_join"
                    value={formData.why_join}
                    onChange={(e) => setFormData(prev => ({ ...prev, why_join: e.target.value }))}
                    required
                    placeholder="Tell us about your interest in beauty industry, why EmviApp resonates with you, and how you plan to promote us effectively..."
                    rows={4}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1 md:flex-none">
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => navigate('/affiliates')}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default AffiliateApply;
