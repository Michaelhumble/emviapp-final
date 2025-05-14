
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";

interface StripeCheckoutProps {
  amount: number;
  productName: string;
  buttonText?: string;
  onSuccess?: () => void;
  mode?: "payment" | "subscription";
  isSubscription?: boolean;
  subscriptionInterval?: "month" | "year";
  setupOnly?: boolean;
}

const StripeCheckout = ({
  amount,
  productName,
  buttonText = "Pay Now",
  onSuccess,
  mode = "payment",
  isSubscription = false,
  subscriptionInterval = "month",
  setupOnly = false
}: StripeCheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You must be logged in to make a purchase");
      return;
    }

    setLoading(true);
    
    try {
      // This is a placeholder for edge function call
      // In a real implementation, this would call a Supabase Edge Function
      // that creates a Stripe Checkout session
      toast.info("Processing your payment", {
        description: setupOnly 
          ? "Saving your payment method..."
          : isSubscription 
            ? "We're setting up your plan..." 
            : "Processing your payment..."
      });
      
      // Simulating a response
      setTimeout(() => {
        setLoading(false);
        
        if (setupOnly) {
          toast.success("Payment method saved!", {
            description: "Your card has been saved for future purchases"
          });
        } else if (isSubscription) {
          toast.success(`Subscribed to ${productName}!`, {
            description: `Your ${subscriptionInterval}ly subscription has been activated`
          });
        } else {
          toast.success(`Payment complete for ${productName}!`, {
            description: "Your payment has been processed"
          });
        }
        
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
      
      /* Real implementation would be:
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          amount, 
          productName, 
          mode, 
          isSubscription,
          subscriptionInterval,
          setupOnly,
          logoUrl: 'https://emvi.app/images/logo/emvi-logo.png' // Updated logo URL for Stripe checkout
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.location.href = data.url;
      }
      */
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Payment processing failed", {
        description: "Please try again or contact support."
      });
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      disabled={loading} 
      className="w-full"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default StripeCheckout;
