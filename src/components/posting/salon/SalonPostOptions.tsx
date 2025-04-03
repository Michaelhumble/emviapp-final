
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SmartAdOptions from "@/components/posting/SmartAdOptions";
import PricingDisplay from "@/components/posting/PricingDisplay";
import { PricingOptions } from "@/utils/posting/types";
import { generatePromotionalText } from "@/utils/posting/promotionalText";

interface SalonPostOptionsProps {
  postType: 'salon';
  price: number;
  pricingOptions: PricingOptions;
  onNationwideChange: (checked: boolean) => void;
  onFastSaleChange: (checked: boolean) => void;
}

const SalonPostOptions = ({
  postType,
  price,
  pricingOptions,
  onNationwideChange,
  onFastSaleChange,
}: SalonPostOptionsProps) => {
  // Mock user stats for promotional text
  const mockUserStats = {
    totalJobPosts: 0,
    totalSalonPosts: 0,
    totalBoothPosts: 0,
    totalSupplyPosts: 0,
    referralCount: 0
  };
  
  const promotionalText = generatePromotionalText(postType, mockUserStats, pricingOptions);
  
  return (
    <div className="space-y-6">
      {/* Pricing & Ad Options */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <SmartAdOptions 
          postType={postType}
          onNationwideChange={onNationwideChange}
          onFastSaleChange={onFastSaleChange}
        />
        
        <Separator className="my-6" />
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-medium">Total Price</span>
            </div>
            <div className="text-lg font-bold">${price}</div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {promotionalText}
          </p>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800 flex items-start">
        <Info className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-700" />
        <p>Cơ hội tuyệt vời để bán nhanh. Chúng tôi giúp quảng bá tiệm của bạn đến hàng ngàn người có nhu cầu mua lại.</p>
      </div>
    </div>
  );
};

export default SalonPostOptions;
