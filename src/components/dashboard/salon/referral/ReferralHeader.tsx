
import { BadgePercent } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { toTranslatableText } from "../SalonTranslationHelper";

const ReferralHeader = () => {
  const { t } = useTranslation();
  
  return (
    <CardTitle className="flex items-center text-lg">
      <BadgePercent className="h-5 w-5 text-blue-500 mr-2" />
      {t(toTranslatableText("Referral Program"))}
    </CardTitle>
  );
};

export default ReferralHeader;
