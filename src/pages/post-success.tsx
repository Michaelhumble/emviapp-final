
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const PostSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      navigate('/');
      return;
    }

    // Verify the payment and redirect
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
        }

        toast.success("Payment successful!", {
          description: "You can now create your post."
        });

        // Redirect to appropriate post creation page
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-md mx-auto p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your payment has been processed. You can now create your post.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default PostSuccess;
