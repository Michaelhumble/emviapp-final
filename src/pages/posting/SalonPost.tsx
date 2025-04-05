
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { SalonPostForm } from "@/components/posting/salon/SalonPostForm";
import SalonPostOptions from "@/components/posting/salon/SalonPostOptions";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import ThankYouModal from "@/components/posting/ThankYouModal";
import { toast } from "sonner";
import { PricingOptions } from "@/utils/posting/types";

const SalonPost = () => {
  const [isNationwide, setIsNationwide] = useState(false);
  const [fastSalePackage, setFastSalePackage] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    console.log("Form values:", values);
    console.log("Photo uploads:", photoUploads);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsPaymentModalOpen(true);
    }, 1500);
  };
  
  const handlePaymentSuccess = () => {
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    toast.info("Redirecting to boost options...");
  };

  // Complete PricingOptions object with all required properties
  const pricingOptions: PricingOptions = {
    isFirstPost: false,
    isNationwide: isNationwide,
    fastSalePackage: fastSalePackage,
    showAtTop: false,
    bundleWithJobPost: false,
    isHotListing: false,
    isUrgent: false,
    bundleWithSalonPost: false,
    boostVisibility: false,
    featuredListing: false,
    extendedDuration: false
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif mb-8">List a Salon For Sale</h1>
          
          <SalonPostForm
            onSubmit={handleSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            onNationwideChange={setIsNationwide}
            onFastSaleChange={setFastSalePackage}
          />
        </div>
      </div>
      
      <PaymentConfirmationModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="salon"
        price={99}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="salon"
        onBoostClick={handleBoostClick}
      />
    </Layout>
  );
};

export default SalonPost;
