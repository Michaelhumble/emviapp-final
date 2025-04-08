
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface ProPlanOfferProps {
  isDiscountEligible: boolean;
  handleUpgrade: () => void;
}

const ProPlanOffer = ({ isDiscountEligible, handleUpgrade }: ProPlanOfferProps) => {
  const { t } = useTranslation();
  const REGULAR_PRICE = 99.99;
  const DISCOUNT_PRICE = 49.99;
  
  return (
    <div className="relative bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 p-4 rounded-xl">
      {isDiscountEligible && (
        <div className="absolute -top-2 -right-2 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Sparkles className="h-3 w-3 mr-1" />
          {t("50% OFF")}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-blue-800 flex items-center">
            Emvi Pro 
            <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
              {isDiscountEligible ? t("Special Offer") : t("Premium")}
            </span>
          </h3>
          
          <div className="flex items-center mt-1">
            <p className="text-lg font-bold text-blue-600">
              ${isDiscountEligible ? DISCOUNT_PRICE : REGULAR_PRICE}
              <span className="text-xs font-normal text-blue-500">/month</span>
            </p>
            
            {isDiscountEligible && (
              <p className="ml-2 text-sm line-through text-blue-400">${REGULAR_PRICE}</p>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs text-blue-500 mt-1 cursor-help">
                  {isDiscountEligible ? 
                    t("You qualify for the discount price!") : 
                    t("Giới thiệu thêm hoặc sử dụng tín dụng để nhận giảm giá.")}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-[200px]">
                  {t("Earn 50+ credits or refer a salon owner to qualify for our special price.")}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={handleUpgrade}
        >
          {t("Upgrade")}
          <ExternalLink className="h-3.5 w-3.5 ml-1" />
        </Button>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="flex items-center text-xs text-blue-700">
          <div className="h-4 w-4 mr-1 rounded-full bg-blue-100 flex items-center justify-center">✓</div>
          {t("Priority Listings")}
        </div>
        <div className="flex items-center text-xs text-blue-700">
          <div className="h-4 w-4 mr-1 rounded-full bg-blue-100 flex items-center justify-center">✓</div>
          {t("Unlimited Job Posts")}
        </div>
      </div>
    </div>
  );
};

export default ProPlanOffer;
