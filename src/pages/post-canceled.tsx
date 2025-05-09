
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

const PostCanceled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error("Payment Canceled", {
      description: "Your payment was canceled. No charges were made."
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-md mx-auto p-6 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was canceled and no charges were made. You can try again when you're ready.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </Card>
      </div>
    </Layout>
  );
};

export default PostCanceled;
