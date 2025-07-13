
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Share2, Eye, MessageCircle, Star, DollarSign, Calendar, Award } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PaymentDetails {
  session_id: string;
  plan_name: string;
  amount_paid: number;
  salon_name: string;
  expires_at: string;
  is_featured: boolean;
}

const SalonListingSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      fetchPaymentDetails(sessionId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const fetchPaymentDetails = async (sessionId: string) => {
    try {
      // Get payment log details
      const { data: paymentLog } = await supabase
        .from('payment_logs')
        .select('*')
        .eq('stripe_payment_id', sessionId)
        .single();

      if (paymentLog) {
        // Get salon listing details
        const { data: salonListing } = await supabase
          .from('salon_listings')
          .select('salon_name, is_featured, expires_at')
          .eq('id', paymentLog.listing_id)
          .single();

        if (salonListing) {
          const planNames = {
            basic: 'Basic Plan',
            gold: 'Gold Plan', 
            premium: 'Premium Plan',
            annual: 'Annual Plan'
          };

          setPaymentDetails({
            session_id: sessionId,
            plan_name: planNames[paymentLog.pricing_tier as keyof typeof planNames] || 'Premium Plan',
            amount_paid: getAmountForTier(paymentLog.pricing_tier),
            salon_name: salonListing.salon_name,
            expires_at: salonListing.expires_at,
            is_featured: salonListing.is_featured || false
          });
        }
      }
    } catch (error) {
      console.error('Error fetching payment details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAmountForTier = (tier: string) => {
    const amounts = { basic: 15, gold: 45, premium: 75, annual: 199 };
    return amounts[tier as keyof typeof amounts] || 75;
  };

  return (
    <Layout>
      <Helmet>
        <title>Listing Published Successfully | EmviApp</title>
        <meta 
          name="description" 
          content="Your salon listing has been published successfully on EmviApp."
        />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container max-w-4xl mx-auto py-16 px-4">
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              🎉 Payment Successful!
            </h1>
            <p className="text-lg text-gray-600">
              Your salon listing is now live and visible to thousands of qualified buyers
            </p>
          </div>

          {/* Payment Confirmation Card */}
          {paymentDetails && !loading && (
            <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <CardTitle className="flex items-center gap-3">
                  <Star className="h-6 w-6" />
                  Listing Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{paymentDetails.salon_name}</p>
                        <p className="text-sm text-gray-600">Salon Name</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">${paymentDetails.amount_paid}</p>
                        <p className="text-sm text-gray-600">{paymentDetails.plan_name} - Paid</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {new Date(paymentDetails.expires_at).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">Listing Expires</p>
                      </div>
                    </div>
                    {paymentDetails.is_featured && (
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-semibold text-yellow-700">Featured Listing</p>
                          <p className="text-sm text-gray-600">Enhanced visibility included</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600">
                    <strong>Session ID:</strong> {paymentDetails.session_id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Keep this for your records</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium">Your listing is live</p>
                  <p className="text-sm text-gray-600">
                    Qualified buyers can now view your salon details and contact you
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium">Buyer inquiries</p>
                  <p className="text-sm text-gray-600">
                    You'll receive email notifications when buyers express interest
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Share2 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium">Promoted listing</p>
                  <p className="text-sm text-gray-600">
                    Your listing will be featured to buyers in your area for 60 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/salons")}
            >
              View All Salons
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact our support team at{" "}
              <a href="mailto:support@emviapp.com" className="text-purple-600 hover:underline">
                support@emviapp.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalonListingSuccessPage;
