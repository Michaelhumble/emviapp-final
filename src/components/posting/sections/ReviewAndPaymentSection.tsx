import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PricingOptions, PostType } from "@/utils/posting/types";
import PaymentSummary from "../PaymentSummary";
import { calculateJobPostPrice } from "@/utils/posting/jobPricing";
import { calculateSalonPostPrice } from "@/utils/posting/salonPricing";
import { calculateBoothPostPrice } from "@/utils/posting/boothPricing";
import { useAuth } from "@/context/auth";
import PaymentConfirmationModal from "../PaymentConfirmationModal";

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  formData: any;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost?: boolean;
  pricingOptions: PricingOptions;
}

const ReviewAndPaymentSection = ({
  postType,
  formData,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions
}: ReviewAndPaymentSectionProps) => {
  const { userProfile } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  useEffect(() => {
    // Calculate price based on post type and options
    let price = 0;
    const options: PricingOptions = {
      ...pricingOptions,
      isFirstPost
    };
    
    switch (postType) {
      case "job":
        price = calculateJobPostPrice(options);
        break;
      case "salon":
        price = calculateSalonPostPrice(options);
        break;
      case "booth":
        price = calculateBoothPostPrice(options);
        break;
      default:
        price = 5;
    }
    
    setTotalPrice(price);
  }, [postType, pricingOptions, isFirstPost]);
  
  const handlePaymentSuccess = () => {
    onNextStep();
  };
  
  const getPostProductName = () => {
    switch (postType) {
      case "job":
        return "Job Post";
      case "salon":
        return "Salon Listing";
      case "booth":
        return "Booth Rental";
      default:
        return "Post";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Review & Payment</h2>
        <p className="text-gray-600">
          Please review your post details and proceed to payment.
        </p>
      </div>
      
      <div className="space-y-6 bg-gray-50 p-4 rounded-md border">
        {/* Post summary component would go here */}
        <h3 className="font-medium">Post Summary</h3>
        <div className="space-y-3">
          <div>
            <span className="font-medium">Title:</span> {formData.title}
          </div>
          {formData.location && (
            <div>
              <span className="font-medium">Location:</span> {formData.location}
            </div>
          )}
          {/* Other post details */}
        </div>
      </div>
      
      <PaymentSummary 
        postType={postType} 
        pricingOptions={pricingOptions}
        isFirstPost={isFirstPost}
      />
      
      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrevStep}
        >
          Back
        </Button>
        
        <Button 
          onClick={() => setShowPaymentModal(true)}
        >
          Proceed to Payment
        </Button>
      </div>
      
      <PaymentConfirmationModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        postType={postType}
        price={totalPrice}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
