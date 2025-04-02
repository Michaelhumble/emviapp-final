
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import StripeCheckout from "@/components/payments/StripeCheckout";

interface PaymentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postType: 'job' | 'salon' | 'booth';
  price: number;
  options: {
    isNationwide?: boolean;
    isFirstPost?: boolean;
    fastSalePackage?: boolean;
    bundleWithJobPost?: boolean;
  };
  onSuccess: () => void;
}

const PaymentConfirmationModal = ({
  open,
  onOpenChange,
  postType,
  price,
  options,
  onSuccess
}: PaymentConfirmationModalProps) => {
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFree = price === 0;
  
  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setIsPaid(false);
      setIsLoading(false);
    }
  }, [open]);
  
  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setTimeout(() => {
      onSuccess();
      onOpenChange(false);
    }, 1500);
  };
  
  const handleFreePost = () => {
    setIsLoading(true);
    // Simulate processing of free post
    setTimeout(() => {
      handlePaymentSuccess();
    }, 1000);
  };
  
  const getPostTypeTitle = () => {
    switch (postType) {
      case 'job':
        return 'Job Post';
      case 'salon':
        return 'Salon For Sale Listing';
      case 'booth':
        return 'Booth Rental';
      default:
        return 'Post';
    }
  };
  
  const getPostDetails = () => {
    const details = [];
    
    if (options.isNationwide) {
      details.push('Nationwide Visibility');
    } else {
      details.push('Local Visibility');
    }
    
    if (postType === 'salon' && options.fastSalePackage) {
      details.push('Fast Sale Package');
      details.push('Premium Placement');
      details.push('30-Day Featured Pin');
    }
    
    if (postType === 'booth' && options.bundleWithJobPost) {
      details.push('Bundled with Job Post');
    }
    
    return details;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isPaid ? (
          <div className="py-6 flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <DialogTitle className="text-2xl text-center mb-2">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Your post will be live shortly. Thank you for using EmviApp!
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                {isFree ? 'Confirm Free Post' : `Complete Payment: ${getPostTypeTitle()}`}
              </DialogTitle>
              <DialogDescription>
                {isFree 
                  ? 'Your first post is free. We still need to add your payment method for future posts.'
                  : 'Please complete payment to publish your post.'}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-lg mb-2">Order Summary</h3>
                <div className="space-y-1 mb-4">
                  {getPostDetails().map((detail, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">• {detail}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{isFree ? 'FREE' : `$${price}`}</span>
                </div>
                {isFree && (
                  <p className="text-xs text-gray-500 mt-2">
                    Note: Your payment method will be saved for future posts, but you won't be charged for this post.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                {isFree ? (
                  <Button 
                    onClick={handleFreePost} 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Complete Free Post"}
                  </Button>
                ) : (
                  <StripeCheckout 
                    amount={price * 100} // Convert to cents for Stripe
                    productName={`EmviApp - ${getPostTypeTitle()}`}
                    buttonText="Pay and Publish"
                    onSuccess={handlePaymentSuccess}
                  />
                )}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure payment processed by Stripe</span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
