
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { usePostPayment } from '@/hooks/payments/usePostPayment';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const TestPayment = () => {
  const { t } = useTranslation();
  const { initiatePayment, isLoading } = usePostPayment();
  const [email, setEmail] = useState('test@example.com');
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handlePaymentClick = async () => {
    setError(null);
    setSuccess(false);
    setResponseData(null);
    
    console.log("🧪 Test payment initiated");
    
    try {
      // This is a simplified payment flow just for testing
      const result = await initiatePayment('job', {
        title: "Test Job Post",
        email: email
      }, {
        selectedPricingTier: 'premium',
        durationMonths: 1
      });

      console.log("🛑 Payment result:", result);
      setResponseData(result);
      
      if (result?.success) {
        setSuccess(true);
        // The redirect happens inside the initiatePayment function
        // We'll see this message briefly before redirect
        toast.success(t("Payment setup successful", "Thiết lập thanh toán thành công"), {
          description: t("Redirecting to checkout...", "Đang chuyển hướng đến thanh toán...")
        });
      } else {
        setError(result?.error || "Unknown error occurred");
        toast.error(t("Payment setup failed", "Thiết lập thanh toán thất bại"), {
          description: t("Please check console logs for details", "Vui lòng kiểm tra nhật ký bảng điều khiển để biết chi tiết")
        });
      }
    } catch (error: any) {
      console.error("❌ Test payment error:", error);
      setError(error.message || "Unknown error occurred");
      toast.error(t("Payment test failed", "Kiểm tra thanh toán thất bại"));
    }
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Stripe Payment</CardTitle>
          <CardDescription>
            This is a simple test page for Stripe payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Test Configuration:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                <li>Price: $49.99</li>
                <li>Duration: 1 month</li>
                <li>Tier: Premium</li>
                <li>Test email: {email}</li>
              </ul>
            </div>
            <div className="text-sm text-muted-foreground border-t pt-2">
              <p className="font-medium">Test Card Info:</p>
              <p>Card number: 4242 4242 4242 4242</p>
              <p>Any future expiration & CVC</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button 
            className="w-full" 
            onClick={handlePaymentClick} 
            disabled={isLoading}
          >
            {isLoading ? t("Processing...", "Đang xử lý...") : t("Proceed to Payment", "Tiến hành Thanh toán")}
          </Button>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="break-all">
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Payment setup was successful. Redirecting to Stripe...
              </AlertDescription>
            </Alert>
          )}
          
          {responseData && (
            <div className="w-full overflow-auto p-2 bg-slate-50 rounded-md text-xs">
              <pre className="whitespace-pre-wrap break-all">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestPayment;
