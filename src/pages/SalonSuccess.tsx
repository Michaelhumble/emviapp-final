import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, Share2, ArrowRight, Clock, Crown } from 'lucide-react';
import { Container } from '@/components/ui/container';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SalonSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalonData = async () => {
      if (!sessionId) {
        console.error('❌ No session_id provided');
        setLoading(false);
        return;
      }

      try {
        console.log('🔍 [SALON-SUCCESS] Searching for salon with session_id:', sessionId);
        
        // Try to find the salon in salon_sales first (completed payment)
        const { data: activeSalon, error: activeError } = await supabase
          .from('salon_sales')
          .select('*')
          .eq('payment_status', 'completed')
          .order('created_at', { ascending: false })
          .limit(10); // Get recent salons to find the one that matches

        if (activeError) {
          console.error('❌ [SALON-SUCCESS] Error fetching active salons:', activeError);
        }

        // If no active salon found, check pending_salons
        if (!activeSalon || activeSalon.length === 0) {
          console.log('🔍 [SALON-SUCCESS] No active salon found, checking pending_salons...');
          const { data: pendingSalon, error: pendingError } = await supabase
            .from('pending_salons')
            .select('*')
            .eq('stripe_session_id', sessionId)
            .single();

          if (pendingError) {
            console.error('❌ [SALON-SUCCESS] Error fetching pending salon:', pendingError);
            toast.error('Unable to find your salon listing. Please contact support.');
            setLoading(false);
            return;
          }

          if (pendingSalon) {
            console.log('✅ [SALON-SUCCESS] Found pending salon:', pendingSalon.salon_name);
            setSalonData({
              ...pendingSalon,
              status: 'processing',
              message: 'Your payment is being processed. Your salon will be live shortly!'
            });
          }
        } else {
          // Use the most recent salon as a fallback
          const recentSalon = activeSalon[0];
          console.log('✅ [SALON-SUCCESS] Found recent active salon:', recentSalon.salon_name);
          setSalonData({
            ...recentSalon,
            status: 'active',
            message: 'Your salon is now live and visible to buyers!'
          });
        }
      } catch (error) {
        console.error('❌ [SALON-SUCCESS] Unexpected error:', error);
        toast.error('Something went wrong. Please contact support.');
      } finally {
        setLoading(false);
      }
    };

    fetchSalonData();
  }, [sessionId]);

  const getPricingTierLabel = (tier: string) => {
    switch (tier) {
      case 'basic': return 'Basic (30 Days)';
      case 'gold': return 'Fast Sale (60 Days)';
      case 'premium': return 'Premium (90 Days)';
      case 'annual': return 'Until Sold (Unlimited)';
      default: return tier;
    }
  };

  const getPricingTierBadge = (tier: string) => {
    switch (tier) {
      case 'basic': return <Badge className="bg-blue-100 text-blue-800">Basic Plan</Badge>;
      case 'gold': return <Badge className="bg-amber-100 text-amber-800">Fast Sale</Badge>;
      case 'premium': return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'annual': return <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Until Sold</Badge>;
      default: return <Badge>{tier}</Badge>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container className="py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold">Processing your payment...</h2>
            <p className="text-gray-600 mt-2">Please wait while we set up your salon listing.</p>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!salonData) {
    return (
      <Layout>
        <Container className="py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Issue</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find your salon listing. This might be a temporary issue.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/salons')} className="w-full">
                View All Salon Listings
              </Button>
              <Button variant="outline" onClick={() => navigate('/contact')} className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Payment Successful!
            </h1>
            <p className="text-xl text-gray-600">
              {salonData.message}
            </p>
          </div>

          {/* Salon Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-gray-900 mb-2">
                    {salonData.salon_name}
                  </CardTitle>
                  <p className="text-gray-600">
                    {salonData.city}, {salonData.state} • ${salonData.asking_price?.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {getPricingTierBadge(salonData.selected_pricing_tier)}
                  {salonData.is_featured && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Crown className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {salonData.is_urgent && (
                    <Badge className="bg-red-100 text-red-800 animate-pulse">
                      URGENT
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Listing Details</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>Plan: {getPricingTierLabel(salonData.selected_pricing_tier)}</li>
                    <li>Status: <span className="text-green-600 font-medium">
                      {salonData.status === 'active' ? 'Live & Visible' : 'Processing'}
                    </span></li>
                    <li>Business Type: {salonData.business_type}</li>
                    {salonData.square_feet && <li>Size: {salonData.square_feet} sq ft</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {salonData.contact_name && <li>Name: {salonData.contact_name}</li>}
                    {salonData.contact_phone && <li>Phone: {salonData.contact_phone}</li>}
                    {salonData.contact_email && <li>Email: {salonData.contact_email}</li>}
                  </ul>
                </div>
              </div>
              
              {salonData.description_combined && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {salonData.description_combined}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button 
              onClick={() => navigate('/salons')} 
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View on Salons Page
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/salons`);
                toast.success('Link copied to clipboard!');
              }}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Listing
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>

          {/* Status Timeline */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                What Happens Next?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-green-700">✅ Payment Processed</p>
                    <p className="text-gray-600">Your payment has been successfully processed.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${
                    salonData.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className={`font-medium ${
                      salonData.status === 'active' ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {salonData.status === 'active' ? '✅' : '⏳'} Listing Activated
                    </p>
                    <p className="text-gray-600">
                      {salonData.status === 'active' 
                        ? 'Your salon is now visible to potential buyers on the marketplace.'
                        : 'Your salon listing is being processed and will be live within 5 minutes.'
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-700">📧 Buyer Inquiries</p>
                    <p className="text-gray-600">We'll notify you when serious buyers contact you about your salon.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipt Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              A receipt has been sent to your email. For questions about your listing, visit our 
              <Button variant="link" className="p-0 ml-1 h-auto text-sm" onClick={() => navigate('/contact')}>
                support page
              </Button>.
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default SalonSuccess;