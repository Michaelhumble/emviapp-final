
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Store, TrendingUp, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";
import { validateRoute } from "@/utils/routeValidator";

const SalonDashboardActionButtons = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  const [loadingPromotion, setLoadingPromotion] = useState(false);
  
  const handleActionClick = (action: string) => {
    setLoadingPromotion(true);
    setTimeout(() => {
      toast.info(`${action} feature coming soon!`);
      setLoadingPromotion(false);
    }, 600);
  };
  
  const handleButtonClick = (path: string, featureName: string) => {
    if (validateRoute(path)) {
      navigate(path);
    } else {
      toast.info(`${featureName} feature coming soon!`);
      navigate("/dashboard/owner");
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {isVietnamese ? "Hành Động Nhanh Cho Tiệm" : t("Salon Quick Actions")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white h-auto py-4 px-4 flex flex-col items-center justify-center gap-2 relative transition-all duration-300 shadow-md hover:shadow-lg rounded-lg border border-[#8A6B59]/20 font-playfair"
          onClick={() => handleButtonClick("/post-job", "Post a Job")}
        >
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-inter">
            {isVietnamese ? "HOT" : t("Hot")}
          </div>
          <PlusCircle className="h-10 w-10 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold text-lg">
              {isVietnamese ? "Đăng Tuyển Dụng Mới" : t("Post a New Job")}
            </span>
            <span className="text-sm font-normal opacity-90 font-inter">
              {isVietnamese ? "Tìm thợ nail nhanh chóng" : t("Find nail techs quickly")}
            </span>
            {isVietnamese && (
              <span className="text-xs text-white/80 mt-1 font-inter">{t("Đăng tuyển dụng để tìm nhân viên phù hợp.")}</span>
            )}
          </div>
        </Button>
        
        <Button 
          className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg border border-[#8A6B59]/20 font-playfair"
          onClick={() => handleButtonClick("/sell-salon/new", "List Salon for Sale")}
        >
          <Store className="h-8 w-8 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold">
              {isVietnamese ? "Đăng Bán Tiệm" : t("List Salon for Sale")}
            </span>
            <span className="text-xs font-normal opacity-90 font-inter">
              {isVietnamese ? "Đăng bán tiệm của bạn" : t("List your salon")}
            </span>
          </div>
        </Button>
        
        <Button 
          className="bg-gradient-to-r from-[#9A7B69] to-[#B8956A] hover:from-[#8A6B59] hover:to-[#A8855A] text-white h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg rounded-lg border border-[#8A6B59]/20 font-playfair"
          onClick={() => handleActionClick(isVietnamese ? "Quảng Bá Tiệm" : t("Promote My Business"))}
          disabled={loadingPromotion}
        >
          {loadingPromotion ? (
            <RefreshCw className="h-8 w-8 mb-1 animate-spin" />
          ) : (
            <TrendingUp className="h-8 w-8 mb-1" />
          )}
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold">
              {isVietnamese ? "Quảng Bá Tiệm" : t("Promote My Business")}
            </span>
            <span className="text-xs font-normal opacity-90 font-inter">
              {isVietnamese ? "Tăng độ phổ biến" : t("Boost visibility")}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SalonDashboardActionButtons;
