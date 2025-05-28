
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useStripe } from "@/hooks/useStripe";

interface StripeCheckoutProps {
  amount: number;
  productName: string;
  buttonText?: string;
  onSuccess?: () => void;
  mode?: "payment" | "subscription";
  isSubscription?: boolean;
  subscriptionInterval?: "month" | "year";
  setupOnly?: boolean;
  pricingOptions?: any;
  formData?: any;
}

const StripeCheckout = ({
  amount,
  productName,
  buttonText = "Pay Now / Thanh Toán Ngay",
  onSuccess,
  pricingOptions,
  formData,
  ...otherProps
}: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { initiatePayment } = useStripe();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Authentication Required / Yêu Cầu Xác Thực", {
        description: "You must be logged in to make a purchase / Bạn phải đăng nhập để thực hiện mua hàng"
      });
      return;
    }

    setLoading(true);
    
    try {
      const success = await initiatePayment(pricingOptions, formData);
      
      if (success && onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment Failed / Thanh Toán Thất Bại", {
        description: "Please try again or contact support. / Vui lòng thử lại hoặc liên hệ hỗ trợ."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading} 
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing... / Đang xử lý...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default StripeCheckout;
