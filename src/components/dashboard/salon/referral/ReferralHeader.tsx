
import { Users } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

interface ReferralHeaderProps {
  showIntroduction?: boolean;
}

const ReferralHeader = ({ showIntroduction = true }: ReferralHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <>
      {showIntroduction && (
        <div className="mb-3 py-2 px-3 bg-blue-50 rounded-md border border-blue-100">
          <p className="text-blue-700 text-sm font-medium">
            {t("Giới thiệu chủ tiệm khác để nhận thưởng từ Emvi.")} 
            <span className="text-blue-500 text-xs block mt-1">
              {t("Invite other salon owners and earn Emvi rewards.")}
            </span>
          </p>
        </div>
      )}
      
      <CardTitle className="text-lg flex items-center">
        <Users className="h-5 w-5 text-blue-500 mr-2" />
        {t("Salon Referral Program")}
      </CardTitle>
    </>
  );
};

export default ReferralHeader;
