
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';

// Define TypeScript interfaces for the responses
interface PaymentData {
  session_id?: string;
  payment_intent?: string;
  payment_status?: string;
  amount_total?: number;
  customer_email?: string;
  payment_method_types?: string[];
  metadata?: {
    listing_id?: string;
    user_id?: string;
    plan_type?: string;
  };
}

interface SuccessState {
  paymentIntent: string | null;
  paymentAmount: number | null;
  customerEmail: string | null;
  paymentMethod: string | null;
  paymentStatus: string | null;
  hasErrors: boolean;
  errorMessage: string | null;
  planType: string | null;
  listingId: string | null;
}

const PaymentSuccess: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<SuccessState>({
    paymentIntent: null,
    paymentAmount: null,
    customerEmail: null,
    paymentMethod: null,
    paymentStatus: null,
    hasErrors: false,
    errorMessage: null,
    planType: null,
    listingId: null
  });

  // Get the session_id from the URL
  const sessionId = searchParams.get('session_id');
  
  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setPaymentData(prev => ({
          ...prev,
          hasErrors: true,
          errorMessage: t("No session ID provided")
        }));
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId }
        });

        if (error) {
          console.error("Verification error:", error);
          setPaymentData(prev => ({
            ...prev,
            hasErrors: true,
            errorMessage: t("Failed to verify payment")
          }));
          setLoading(false);
          return;
        }

        // Process the response
        const sessionData = data as PaymentData;
        if (!sessionData || !sessionData.payment_status) {
          setPaymentData(prev => ({
            ...prev,
            hasErrors: true,
            errorMessage: t("Invalid payment data received")
          }));
        } else {
          setPaymentData({
            paymentIntent: sessionData.payment_intent || null,
            paymentAmount: sessionData.amount_total ? sessionData.amount_total / 100 : null, // Convert from cents
            customerEmail: sessionData.customer_email || null,
            paymentMethod: sessionData.payment_method_types?.[0] || null,
            paymentStatus: sessionData.payment_status || null,
            hasErrors: false,
            errorMessage: null,
            planType: sessionData.metadata?.plan_type || null,
            listingId: sessionData.metadata?.listing_id || null
          });
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setPaymentData(prev => ({
          ...prev,
          hasErrors: true,
          errorMessage: t("An unexpected error occurred")
        }));
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, t]);

  if (loading) {
    return (
      <Layout>
        <div className="container max-w-3xl py-16">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
              <p>{t("Verifying your payment...")}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (paymentData.hasErrors) {
    return (
      <Layout>
        <div className="container max-w-3xl py-16">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="rounded-full bg-red-100 p-3 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-center">{t("Payment Verification Failed")}</h1>
              <p className="text-gray-600 mb-6 text-center">{paymentData.errorMessage || t("We couldn't verify your payment. Please contact support.")}</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/pricing')}>
                  {t("Back to Pricing")}
                </Button>
                <Button onClick={() => navigate('/dashboard')}>
                  {t("Go to Dashboard")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-3xl py-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">{t("Payment Successful!")}</h1>
              <p className="text-gray-600">{t("Thank you for your payment. Your transaction has been completed.")}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">{t("Payment Status")}:</span>
                <span className="text-green-600 font-medium">{paymentData.paymentStatus === 'paid' ? t("Paid") : t("Processing")}</span>
              </div>
              
              {paymentData.paymentAmount && (
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">{t("Amount")}:</span>
                  <span>${paymentData.paymentAmount.toFixed(2)} USD</span>
                </div>
              )}
              
              {paymentData.customerEmail && (
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">{t("Email")}:</span>
                  <span>{paymentData.customerEmail}</span>
                </div>
              )}
              
              {paymentData.paymentIntent && (
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">{t("Payment ID")}:</span>
                  <span className="text-xs font-mono bg-gray-100 p-1 rounded">{paymentData.paymentIntent}</span>
                </div>
              )}
              
              {paymentData.planType && (
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">{t("Plan")}:</span>
                  <span>{paymentData.planType === 'job' ? t("Job Listing") : t("Salon Profile")}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button onClick={() => navigate('/dashboard')} className="flex items-center justify-center gap-2">
                {t("Go to Dashboard")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              {paymentData.listingId && paymentData.planType === 'job' && (
                <Button variant="outline" onClick={() => navigate(`/jobs/${paymentData.listingId}`)}>
                  {t("View Your Job Listing")}
                </Button>
              )}
              
              {paymentData.listingId && paymentData.planType === 'salon' && (
                <Button variant="outline" onClick={() => navigate(`/salons/${paymentData.listingId}`)}>
                  {t("View Your Salon Profile")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;
