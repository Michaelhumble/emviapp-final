
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import PostWizardLayout from "@/components/posting/PostWizardLayout";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import ThankYouModal from "@/components/posting/ThankYouModal";
import { SalonPostForm } from "@/components/posting/salon/SalonPostForm";
import { SalonFormValues } from "@/components/posting/salon/salonFormSchema";
import SalonPostOptions from "@/components/posting/salon/SalonPostOptions";
import { calculateSalonForSalePrice } from "@/utils/posting/salonPricing";

const SalonPost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(20); // Base price
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState({
    isNationwide: false,
    fastSalePackage: false,
  });

  // Mock user stats - in a real app, this would come from the backend
  const userStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    totalSupplyPosts: 0,
    referralCount: 0,
  };
  
  // Update price when options change
  useEffect(() => {
    const updatedOptions = {
      ...pricingOptions,
      isNationwide: pricingOptions.isNationwide,
      fastSalePackage: pricingOptions.fastSalePackage,
    };
    
    setPricingOptions(updatedOptions);
    setCurrentPrice(calculateSalonForSalePrice(userStats, updatedOptions));
  }, [pricingOptions.isNationwide, pricingOptions.fastSalePackage]);
  
  const onSubmit = (values: SalonFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a salon listing.",
        variant: "destructive",
      });
      return;
    }
    
    // Update final pricing options
    const finalOptions = {
      ...pricingOptions,
      isNationwide: values.isNationwide,
      fastSalePackage: values.fastSalePackage,
    };
    setPricingOptions(finalOptions);
    
    // Calculate final price
    const finalPrice = calculateSalonForSalePrice(userStats, finalOptions);
    setCurrentPrice(finalPrice);
    
    // Open payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // This would normally save the post to the database
    console.log("Payment successful, salon listing would be saved to database");
    setIsPaymentModalOpen(false);
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    setIsThankYouModalOpen(false);
    // Simulate opening a boost modal
    setTimeout(() => {
      toast({
        title: "Boost Available",
        description: "Contact our team to boost your listing visibility.",
      });
    }, 500);
  };
  
  // Handle option changes from SmartAdOptions
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions(prev => ({ ...prev, isNationwide: checked }));
  };
  
  const handleFastSaleChange = (checked: boolean) => {
    setPricingOptions(prev => ({ 
      ...prev, 
      fastSalePackage: checked,
      // If fast sale is enabled, nationwide is implicitly included
      isNationwide: checked ? false : prev.isNationwide 
    }));
  };
  
  return (
    <PostWizardLayout 
      title="Đăng Tiệm Bán / Post a Salon for Sale"
      subtitle="List your salon for sale to reach qualified buyers"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SalonPostForm 
            onSubmit={onSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            onNationwideChange={handleNationwideChange}
            onFastSaleChange={handleFastSaleChange}
          />
        </div>
        
        {/* Smart Ad Options Sidebar */}
        <div className="space-y-6">
          <SalonPostOptions 
            postType="salon"
            price={currentPrice}
            pricingOptions={pricingOptions}
            onNationwideChange={handleNationwideChange}
            onFastSaleChange={handleFastSaleChange}
          />
        </div>
      </div>
      
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="salon"
        price={currentPrice}
        options={pricingOptions}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal 
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="salon"
        onBoostClick={handleBoostClick}
      />
    </PostWizardLayout>
  );
};

export default SalonPost;
