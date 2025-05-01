
import { Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { toTranslatableText } from "../SalonTranslationHelper";
import { Link } from "react-router-dom";

interface ReferralQuickInfoProps {
  referralCount: number;
  isDiscountEligible: boolean;
}

const ReferralQuickInfo = ({ referralCount, isDiscountEligible }: ReferralQuickInfoProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="p-2 bg-blue-50 rounded-full">
        <Users className="h-4 w-4 text-blue-500" />
      </div>
      <div>
        <p className="text-gray-600">
          {t(toTranslatableText("You've referred"))} 
          <span className="font-medium text-blue-600 mx-1">{referralCount}</span>
          {t(toTranslatableText("salons"))}
        </p>
        <Link 
          to="#referral-card" 
          className="text-xs text-blue-500 hover:underline"
        >
          {t(toTranslatableText("Refer more to earn credits"))}
          {!isDiscountEligible && referralCount === 0 && (
            <span className="ml-1 text-green-500">
              {t(toTranslatableText("and Pro discounts!"))}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ReferralQuickInfo;
