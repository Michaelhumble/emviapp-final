
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { usePostPayment } from '@/hooks/payments/usePostPayment';
import { toast } from "sonner";
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const TestPayment = () => {
  const { t } = useTranslation();
  const { initiatePayment, isLoading } = usePostPayment();
  const [email, setEmail] = useState('test@example.com');

  const handlePaymentClick = async () => {
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

      console.log("Payment result:", result);
      
      if (!result?.success) {
        toast.error(t("Payment setup failed", "Thiết lập thanh toán thất bại"), {
          description: t("Please check console logs for details", "Vui lòng kiểm tra nhật ký bảng điều khiển để biết chi tiết")
        });
      }
      
      // Note: The redirect happens inside the initiatePayment function
      // so we don't need to handle it here
      
    } catch (error) {
      console.error("❌ Test payment error:", error);
      toast.error(t("Payment test failed", "Kiểm tra thanh toán thất bại"));
    }
  };

  return (
    <div className="container mx-auto py-10">
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
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handlePaymentClick} 
            disabled={isLoading}
          >
            {isLoading ? t("Processing...", "Đang xử lý...") : t("Proceed to Payment", "Tiến hành Thanh toán")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestPayment;
