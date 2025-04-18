
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

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

    // Show success message and redirect after delay
    toast.success("Payment successful!");
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 5000);

    setLoading(false);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-md mx-auto p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully. You can now proceed with creating your post.
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
