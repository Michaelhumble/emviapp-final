
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { calculateJobPostPrice } from "@/utils/posting";
import PostWizardLayout from "@/components/posting/PostWizardLayout";
import PaymentConfirmationModal from "@/components/posting/PaymentConfirmationModal";
import ThankYouModal from "@/components/posting/ThankYouModal";
import JobPostForm, { JobPostFormValues } from "@/components/posting/job/JobPostForm";
import JobPostOptions from "@/components/posting/job/JobPostOptions";

const JobPost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [pricingOptions, setPricingOptions] = useState({
    isNationwide: false,
    isFirstPost: true, // Assume first post for demo
  });
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);

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
    // Set original price for "first post nationwide" case
    if (pricingOptions.isFirstPost && pricingOptions.isNationwide) {
      setOriginalPrice(20);
    } else if (userStats.referralCount >= 1 && !pricingOptions.isFirstPost) {
      setOriginalPrice(20); // Show the discount from referrals
    } else {
      setOriginalPrice(undefined);
    }
    
    setCurrentPrice(calculateJobPostPrice(userStats, pricingOptions));
  }, [pricingOptions.isNationwide]);
  
  const onSubmit = (values: JobPostFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a job.",
        variant: "destructive",
      });
      return;
    }
    
    // Update final pricing options
    const finalOptions = {
      ...pricingOptions,
      isNationwide: values.isNationwide,
    };
    setPricingOptions(finalOptions);
    
    // Calculate final price
    const finalPrice = calculateJobPostPrice(userStats, finalOptions);
    setCurrentPrice(finalPrice);
    
    // Open payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = () => {
    // This would normally save the post to the database
    console.log("Payment successful, post would be saved to database");
    setIsPaymentModalOpen(false);
    setIsThankYouModalOpen(true);
  };
  
  const handleBoostClick = () => {
    setIsThankYouModalOpen(false);
    // Simulate opening a boost modal
    setTimeout(() => {
      toast({
        title: "Boost Available",
        description: "Contact our team to boost your post visibility.",
      });
    }, 500);
  };
  
  // Handle nationwide option change from SmartAdOptions
  const handleNationwideChange = (checked: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      isNationwide: checked,
    });
  };
  
  return (
    <PostWizardLayout 
      title="Đăng Tin Tuyển Thợ / Post a Job"
      subtitle="Create a new job posting to find artists for your salon"
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <JobPostForm 
            onSubmit={onSubmit} 
            defaultNationwide={pricingOptions.isNationwide}
          />
        </div>
        
        {/* Smart Ad Options Sidebar */}
        <JobPostOptions 
          postType="job"
          isFirstPost={pricingOptions.isFirstPost}
          hasReferrals={userStats.referralCount > 0}
          price={currentPrice}
          originalPrice={originalPrice}
          pricingOptions={pricingOptions}
          onNationwideChange={handleNationwideChange}
        />
      </div>
      
      <PaymentConfirmationModal 
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        postType="job"
        price={currentPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        onSuccess={handlePaymentSuccess}
      />
      
      <ThankYouModal 
        open={isThankYouModalOpen}
        onOpenChange={setIsThankYouModalOpen}
        postType="job"
        onBoostClick={handleBoostClick}
      />
    </PostWizardLayout>
  );
};

export default JobPost;
