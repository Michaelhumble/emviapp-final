
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { toTranslatableText } from "../SalonTranslationHelper";

interface ProPlanOfferProps {
  isDiscountEligible: boolean;
  handleUpgrade: () => void;
}

const ProPlanOffer = ({ isDiscountEligible, handleUpgrade }: ProPlanOfferProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="border border-dashed border-purple-200 rounded-lg p-4 relative overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <p className="font-medium text-gray-800">
              {t(toTranslatableText("Upgrade to Pro"))}
            </p>
            {isDiscountEligible && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                20% OFF
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {isDiscountEligible
              ? t(toTranslatableText("Special offer! Save 20% on your subscription."))
              : t(toTranslatableText("Unlock premium features to grow your salon."))}
          </p>
        </div>
        <Button 
          onClick={handleUpgrade}
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          {t(toTranslatableText("Upgrade"))}
        </Button>
      </div>
    </div>
  );
};

export default ProPlanOffer;
