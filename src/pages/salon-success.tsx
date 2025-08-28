import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Clock, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const SalonSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    if (!sessionId) return;
    
    setLoading(true);
    try {
      console.log('🔍 Verifying payment for session:', sessionId);
      
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId }
      });
      
      if (error) {
        console.error('Payment verification error:', error);
        toast.error('Failed to verify payment');
        return;
      }
      
      if (data) {
        console.log('✅ Payment verified:', data);
        setPaymentDetails(data);
        toast.success('Payment verified successfully!');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error('Payment verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Payment Successful - EmviApp</title>
        <meta name="description" content="Your salon listing payment was successful and your listing is now active." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900 mb-2">
                Payment Successful!
              </CardTitle>
              <p className="text-gray-600">
                Your salon listing has been successfully published and is now live.
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Verifying payment...</p>
                </div>
              )}

              {paymentDetails && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Amount:</span>
                      <span className="ml-2 font-medium">
                        ${(paymentDetails.amount_total / 100).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-medium text-green-600 capitalize">
                        {paymentDetails.payment_status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Session ID:</span>
                      <span className="ml-2 font-mono text-xs">
                        {paymentDetails.session_id?.slice(-8)}...
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Plan:</span>
                      <span className="ml-2 font-medium capitalize">
                        {paymentDetails.metadata?.plan_type || 'Salon Listing'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  What happens next?
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Your salon listing is now active and visible to potential buyers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    You'll receive notifications when buyers show interest
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    Your listing will remain active for the duration of your selected plan
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link to="/salons">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View All Listings
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/dashboard">
                    View Dashboard
                  </Link>
                </Button>
              </div>

              <div className="text-center text-sm text-gray-500 pt-4">
                <p>
                  Need help? Contact our support team at{' '}
                  <a href="mailto:support@emvi.app" className="text-purple-600 hover:underline">
                    support@emvi.app
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SalonSuccessPage;