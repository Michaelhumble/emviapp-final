
import { useAuth } from "@/context/auth";
import { useTranslation } from "@/hooks/useTranslation";
import { adaptUserProfile } from "@/utils/profileAdapter";

interface SalonDashboardBannerProps {
  userName?: string;
}

const SalonDashboardBanner = ({ userName }: SalonDashboardBannerProps) => {
  const { userProfile } = useAuth();
  const adaptedProfile = adaptUserProfile(userProfile);
  const { t } = useTranslation();
  const displayName = userName || adaptedProfile?.salon_name || adaptedProfile?.full_name || "Salon Owner";
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-800">
        {t("Welcome back, " + displayName + "!")}
      </h1>
      <p className="text-blue-600 mt-2">
        {t("Let's grow your salon today.")}
      </p>
      
      {/* Vietnamese welcome text for salon owners - making it more prominent */}
      <p className="text-blue-700 text-sm font-medium mt-3 bg-blue-50 px-3 py-2 inline-block rounded-md border border-blue-100">
        {t("Chúng tôi ở đây để giúp bạn phát triển salon của bạn.")} <span className="text-blue-500 ml-1">{t("We're here to help you grow your salon.")}</span>
      </p>
    </div>
  );
};

export default SalonDashboardBanner;
