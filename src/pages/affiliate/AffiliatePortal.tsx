import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Clock, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ApplicationData {
  full_name: string;
  email: string;
  website_url: string;
  social_media: string;
  audience_size: string;
  promotion_methods: string;
  experience: string;
  why_emviapp: string;
}

const AffiliatePortal = () => {
  const { user, userProfile } = useAuth();
  const [affiliateStatus, setAffiliateStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    full_name: userProfile?.full_name || '',
    email: user?.email || '',
    website_url: '',
    social_media: '',
    audience_size: '',
    promotion_methods: '',
    experience: '',
    why_emviapp: ''
  });

  useEffect(() => {
    if (user) {
      checkAffiliateStatus();
    }
  }, [user]);

  useEffect(() => {
    if (userProfile) {
      setApplicationData(prev => ({
        ...prev,
        full_name: userProfile.full_name || '',
        email: user?.email || ''
      }));
    }
  }, [userProfile, user]);

  const checkAffiliateStatus = async () => {
    try {
      setLoading(true);
      
      const { data: affiliate, error } = await supabase
        .from('affiliate_partners')
        .select('status')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (affiliate) {
        setAffiliateStatus(affiliate.status);
        
        // If approved, redirect to dashboard
        if (affiliate.status === 'approved') {
          window.location.href = '/affiliate/dashboard';
          return;
        }
      }

    } catch (error) {
      console.error('Error checking affiliate status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitApplication = async () => {
    // Validate required fields
    const requiredFields: (keyof ApplicationData)[] = ['full_name', 'email', 'promotion_methods', 'why_emviapp'];
    const missingFields = requiredFields.filter(field => !applicationData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Generate affiliate slug from name
      const { data: generatedSlug } = await supabase.rpc('generate_affiliate_slug', {
        base_name: applicationData.full_name
      });

      // Submit application
      const { error } = await supabase
        .from('affiliate_partners')
        .insert({
          user_id: user?.id,
          slug: generatedSlug,
          status: 'pending',
          commission_rate: 0.30, // 30% default rate
          total_clicks: 0,
          total_conversions: 0,
          total_commissions: 0
        });

      if (error) throw error;

      // Also store application details in user profile metadata (optional)
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          website: applicationData.website_url || null,
          bio: applicationData.why_emviapp.substring(0, 500) || null
        })
        .eq('id', user?.id);

      // Don't fail if profile update fails
      if (profileError) {
        console.warn('Profile update failed:', profileError);
      }

      setAffiliateStatus('pending');
      toast.success('Application submitted successfully! We\'ll review it within 1-2 business days.');

    } catch (error: any) {
      console.error('Error submitting application:', error);
      
      if (error.code === '23505') { // Unique constraint violation
        toast.error('You have already submitted an application');
        checkAffiliateStatus(); // Refresh status
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } finally {
      setSubmitting(false);
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

  // Show application status if already submitted
  if (affiliateStatus === 'pending') {
    return (
      <>
        <Helmet>
          <title>Application Pending - Affiliate Portal - EmviApp</title>
        </Helmet>
        
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-4">Application Under Review</h1>
                <p className="text-muted-foreground mb-6">
                  Thanks for applying to the EmviApp Affiliate Program! We're currently reviewing your application 
                  and will notify you via email within 1-2 business days.
                </p>
                <Badge variant="secondary" className="mb-6">Pending Review</Badge>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>What happens next:</p>
                  <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Application submitted successfully</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span>Review in progress (1-2 business days)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                      <span>Email notification when approved</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button variant="outline" asChild>
                    <Link to="/affiliates">Back to Affiliate Info</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Layout>
      </>
    );
  }

  if (affiliateStatus === 'suspended' || affiliateStatus === 'rejected') {
    return (
      <>
        <Helmet>
          <title>Application Status - Affiliate Portal - EmviApp</title>
        </Helmet>
        
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto border-destructive">
              <CardContent className="p-8 text-center">
                <div className="text-destructive mb-4">
                  {affiliateStatus === 'rejected' ? '❌' : '⚠️'}
                </div>
                <h1 className="text-2xl font-bold mb-4">
                  Application {affiliateStatus === 'rejected' ? 'Rejected' : 'Suspended'}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {affiliateStatus === 'rejected' 
                    ? 'Unfortunately, we cannot approve your affiliate application at this time.'
                    : 'Your affiliate account has been suspended. Please contact support for more information.'
                  }
                </p>
                <Badge variant="destructive" className="mb-6">
                  {affiliateStatus === 'rejected' ? 'Rejected' : 'Suspended'}
                </Badge>
                <div className="space-y-4">
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    If you believe this is an error, please reach out to our support team.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Layout>
      </>
    );
  }

  // Show application form for new users
  return (
    <>
      <Helmet>
        <title>Affiliate Application - EmviApp</title>
        <meta name="description" content="Apply to become an EmviApp affiliate and start earning 30% commission promoting the beauty industry's leading job platform." />
      </Helmet>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Affiliate Program Application</h1>
              <p className="text-muted-foreground">
                Join the EmviApp Affiliate Program and start earning 30% commission on every referral
              </p>
            </div>

            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle>Tell Us About Yourself</CardTitle>
                <CardDescription>
                  Please provide some information about your background and how you plan to promote EmviApp
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={applicationData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      disabled
                    />
                  </div>
                </div>

                {/* Online Presence */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website_url">Website/Blog URL</Label>
                    <Input
                      id="website_url"
                      value={applicationData.website_url}
                      onChange={(e) => handleInputChange('website_url', e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="social_media">Main Social Media Profile</Label>
                    <Input
                      id="social_media"
                      value={applicationData.social_media}
                      onChange={(e) => handleInputChange('social_media', e.target.value)}
                      placeholder="@yourusername or profile URL"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="audience_size">Audience Size</Label>
                  <Select value={applicationData.audience_size} onValueChange={(value) => handleInputChange('audience_size', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your audience size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1k">0 - 1,000 followers</SelectItem>
                      <SelectItem value="1k-10k">1,000 - 10,000 followers</SelectItem>
                      <SelectItem value="10k-50k">10,000 - 50,000 followers</SelectItem>
                      <SelectItem value="50k-100k">50,000 - 100,000 followers</SelectItem>
                      <SelectItem value="100k+">100,000+ followers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Marketing Experience */}
                <div>
                  <Label htmlFor="promotion_methods">How do you plan to promote EmviApp? *</Label>
                  <Textarea
                    id="promotion_methods"
                    value={applicationData.promotion_methods}
                    onChange={(e) => handleInputChange('promotion_methods', e.target.value)}
                    placeholder="Describe your promotion strategy (social media, blog posts, email marketing, etc.)"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Previous Affiliate Marketing Experience</Label>
                  <Textarea
                    id="experience"
                    value={applicationData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="Tell us about your experience with affiliate marketing or promoting other products/services"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="why_emviapp">Why do you want to promote EmviApp? *</Label>
                  <Textarea
                    id="why_emviapp"
                    value={applicationData.why_emviapp}
                    onChange={(e) => handleInputChange('why_emviapp', e.target.value)}
                    placeholder="Explain why you're interested in promoting EmviApp and how it aligns with your audience"
                    rows={4}
                  />
                </div>

                {/* Agreement */}
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">Program Terms</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• 30% commission on all successful referrals</p>
                      <p>• $50 minimum payout threshold</p>
                      <p>• Monthly payouts on the 15th</p>
                      <p>• 30-day attribution window</p>
                      <p>• Must comply with FTC disclosure requirements</p>
                      <p>• No PPC advertising on EmviApp brand terms</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={submitApplication} 
                    disabled={submitting}
                    className="flex-1"
                  >
                    {submitting ? 'Submitting Application...' : 'Submit Application'}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/affiliates">Back</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
                    <div>
                      <h4 className="font-medium">Application Review</h4>
                      <p className="text-sm text-muted-foreground">We'll review your application within 1-2 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
                    <div>
                      <h4 className="font-medium">Email Notification</h4>
                      <p className="text-sm text-muted-foreground">You'll receive an email with the approval decision</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary text-primary-foreground w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
                    <div>
                      <h4 className="font-medium">Start Earning</h4>
                      <p className="text-sm text-muted-foreground">Access your dashboard, create links, and start promoting EmviApp</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AffiliatePortal;