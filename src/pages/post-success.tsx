
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, CalendarClock, RefreshCw } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { Switch } from '@/components/ui/switch';
import { format, addDays } from 'date-fns';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PaymentInfo {
  autoRenewEnabled: boolean;
  expiresAt: string;
  planType: string;
  paymentStatus: string;
  stripePaymentId: string;
}

const PostSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [cancellingSubscription, setCancellingSubscription] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/');
      return;
    }

    // Verify the payment and retrieve payment details
    const verifyPayment = async () => {
      try {
        const { data, error } = await supabase
          .from('payment_logs')
          .select('*')
          .eq('stripe_payment_id', sessionId)
          .single();

        if (error || !data) {
          // Try legacy table as fallback
          const { data: legacyData, error: legacyError } = await supabase
            .from('payments')
            .select('*')
            .eq('stripe_session_id', sessionId)
            .single();
            
          if (legacyError || !legacyData) {
            throw new Error('Payment verification failed');
          }
          
          // Payment verified through legacy table
          setPaymentInfo({
            autoRenewEnabled: false,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            planType: legacyData.payment_type || 'standard',
            paymentStatus: 'success',
            stripePaymentId: legacyData.stripe_session_id
          });
        } else {
          // Payment verified through payment_logs table
          setPaymentInfo({
            autoRenewEnabled: data.auto_renew_enabled,
            expiresAt: data.expires_at,
            planType: data.plan_type,
            paymentStatus: data.payment_status,
            stripePaymentId: data.stripe_payment_id
          });
        }

        toast.success("Payment successful!", {
          description: "Your post is now live."
        });
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error("Payment verification failed");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [navigate, searchParams]);

  const toggleAutoRenew = async () => {
    if (!paymentInfo?.autoRenewEnabled || !paymentInfo?.stripePaymentId) {
      return;
    }

    setCancellingSubscription(true);
    try {
      // Call Supabase Edge Function to cancel subscription
      const { data, error } = await supabase.functions.invoke('cancel-subscription', {
        body: { stripePaymentId: paymentInfo.stripePaymentId }
      });

      if (error) {
        throw error;
      }

      // Update local state
      setPaymentInfo(prev => prev ? { ...prev, autoRenewEnabled: false } : null);
      
      toast.success("Auto-renewal disabled", {
        description: "Your subscription will not renew automatically."
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error("Failed to cancel auto-renewal");
    } finally {
      setCancellingSubscription(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-md mx-auto p-6">
          <CardContent className="pt-6 space-y-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Your payment has been processed and your post is now active.
              </p>
            </div>
            
            {paymentInfo && (
              <div className="space-y-4 border-t pt-4">
                <h2 className="font-medium text-lg">Post Details</h2>
                
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Expires On</p>
                    <p className="font-medium">{format(new Date(paymentInfo.expiresAt), 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Plan Type</p>
                    <p className="font-medium capitalize">{paymentInfo.planType}</p>
                  </div>
                </div>
                
                {paymentInfo.autoRenewEnabled && (
                  <div className="border p-4 rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <RefreshCw className="h-5 w-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Auto-Renewal Active</p>
                        <p className="text-sm text-gray-500">
                          Your subscription will automatically renew on {format(new Date(paymentInfo.expiresAt), 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium">Auto-Renew</span>
                      <Switch 
                        checked={true} 
                        onCheckedChange={toggleAutoRenew} 
                        disabled={cancellingSubscription} 
                      />
                    </div>
                    
                    <Alert variant="info" className="bg-blue-50 text-blue-800 text-sm">
                      <AlertDescription>
                        You can cancel auto-renewal anytime from your dashboard.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            )}
            
            <div className="pt-4">
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
