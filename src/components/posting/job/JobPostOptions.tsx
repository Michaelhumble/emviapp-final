
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SmartAdOptions from "@/components/posting/SmartAdOptions";
import PricingDisplay from "@/components/posting/PricingDisplay";
import { PricingOptions, generatePromotionalText } from "@/utils/postingPriceCalculator";

interface JobPostOptionsProps {
  postType: 'job';
  isFirstPost: boolean;
  hasReferrals: boolean;
  price: number;
  originalPrice?: number;
  pricingOptions: PricingOptions;
  onNationwideChange: (checked: boolean) => void;
}

const JobPostOptions = ({
  postType,
  isFirstPost,
  hasReferrals,
  price,
  originalPrice,
  pricingOptions,
  onNationwideChange,
}: JobPostOptionsProps) => {
  // Mock user stats for promotional text
  const mockUserStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    totalSupplyPosts: 0,
    referralCount: hasReferrals ? 1 : 0
  };
  
  const promotionalText = generatePromotionalText(postType, mockUserStats, pricingOptions);
  
  return (
    <div className="space-y-6">
      {/* Pricing & Ad Options */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <SmartAdOptions 
          postType={postType}
          isFirstPost={isFirstPost}
          hasReferrals={hasReferrals}
          onNationwideChange={onNationwideChange}
        />
        
        <Separator className="my-6" />
        
        <PricingDisplay
          postType={postType}
          price={price}
          options={pricingOptions}
          promotionalText={promotionalText}
          originalPrice={originalPrice}
        />
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800 flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-700" />
        <p>Bài đăng của bạn sẽ được xem bởi hàng trăm thợ trên toàn quốc. Muốn hiện lên top? Chúng tôi sẽ liên hệ để hỗ trợ nâng cấp.</p>
      </div>
    </div>
  );
};

export default JobPostOptions;
