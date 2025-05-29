
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Share2, Eye, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ConfettiExplosion from "@/components/ui/ConfettiExplosion";

const SalonListingSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [salonDetails, setSalonDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        // No session ID, show generic success
        setIsLoading(false);
        return;
      }

      try {
        // Verify the Stripe session and get salon details
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });

        if (error) {
          console.error('Payment verification error:', error);
          toast.error('Payment verification failed');
          setIsLoading(false);
          return;
        }

        if (data?.success) {
          setSalonDetails({
            salonId: data.salon_id || 'salon-' + Math.random().toString(36).substr(2, 9),
            salonName: data.salon_name || 'Your Salon',
            planType: data.pricing_tier || 'Basic',
            totalAmount: data.total_amount || '19.99',
            featuredAddon: data.featured_addon === 'true'
          });
          toast.success('Payment successful! Your salon listing is now live.');
        } else {
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify payment');
      } finally {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying payment...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Salon Listed Successfully | EmviApp</title>
        <meta 
          name="description" 
          content="Your salon listing has been published successfully on EmviApp."
        />
      </Helmet>
      
      <ConfettiExplosion />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="container max-w-2xl mx-auto py-16 px-4">
          <div className="text-center mb-8">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
              🎉 Salon Listed Successfully!
            </h1>
            <p className="text-lg text-gray-600">
              {salonDetails?.salonName || 'Your salon'} is now live and visible to potential buyers
            </p>
            {salonDetails?.featuredAddon && (
              <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                VIP Featured Listing Active
              </div>
            )}
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Your Listing Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Plan:</span>
                  <span className="ml-2 capitalize">{salonDetails?.planType || 'Basic'}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Total Paid:</span>
                  <span className="ml-2">${salonDetails?.totalAmount || '19.99'}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t space-y-3">
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
                    <p className="font-medium">Maximum visibility</p>
                    <p className="text-sm text-gray-600">
                      Your listing will be promoted to buyers in your area
                    </p>
                  </div>
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
