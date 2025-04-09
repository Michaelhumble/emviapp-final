
import { Users } from "lucide-react";
import { useAuth } from "@/context/auth";
import { CardTitle } from "@/components/ui/card";

const ReferralHeader = () => {
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  return (
    <CardTitle className="flex items-center text-lg">
      <Users className="h-5 w-5 text-blue-500 mr-2" />
      {isVietnamese ? "Chương Trình Giới Thiệu" : "Referral Program"}
    </CardTitle>
  );
};

export default ReferralHeader;
