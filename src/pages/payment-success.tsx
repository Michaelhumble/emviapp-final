
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";
import { EmviLogo } from '@/components/branding/EmviLogo';

export default function PaymentSuccessPage() {
  const { t } = useTranslation();
  const [verifyingPayment, setVerifyingPayment] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get session ID from URL
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        
        if (!sessionId) {
          // No session ID provided, check for free post
          const isFree = params.get('free') === 'true';
          const paymentLogId = params.get('payment_log_id');
          
          if (isFree && paymentLogId) {
            // This is a free post success - redirect to post success page
            navigate(`/post-success?payment_log_id=${paymentLogId}&free=true`);
            return;
          }
          
          throw new Error('No session ID provided');
        }
        
        // Verify the payment session
        const { data, error } = await supabase.functions.invoke('verify-checkout-session', {
          body: { sessionId }
        });
        
        if (error) throw new Error(error.message);
        
        if (!data || !data.success) {
          throw new Error(data?.error || 'Failed to verify payment');
        }
        
        console.log('Payment verification successful:', data);
        
        // Redirect to post success page with payment log ID
        navigate(`/post-success?payment_log_id=${data.payment_log_id}`);
      } catch (err: any) {
        console.error('Error verifying payment:', err);
        setError(err.message || 'Failed to verify payment');
        setVerifyingPayment(false);
      }
    };
    
    verifyPayment();
  }, [location.search, navigate]);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <EmviLogo size="medium" className="mb-8" />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {verifyingPayment ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              {t("Verifying your payment...", "Đang xác minh thanh toán của bạn...")}
            </p>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 font-semibold mb-4">
              {t("Payment Verification Failed", "Xác minh thanh toán không thành công")}
            </p>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("Go Back to Homepage", "Quay lại Trang chủ")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
