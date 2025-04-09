
import { Gift } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ReferralHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 bg-blue-100 rounded-full">
        <Gift className="h-5 w-5 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{t("Salon Owner Referral Program")}</h3>
        <p className="text-sm text-gray-500">{t("Refer a salon, get 50 credits")}</p>
      </div>
    </div>
  );
};

export default ReferralHeader;
