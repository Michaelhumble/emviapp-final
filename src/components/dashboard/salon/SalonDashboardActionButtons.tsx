
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
        {isVietnamese ? "Hành Động Nhanh Cho Tiệm" : t({ english: "Salon Quick Actions", vietnamese: "Hành Động Nhanh Cho Tiệm" })}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 h-auto py-4 px-4 flex flex-col items-center justify-center gap-2 relative transition-colors"
          onClick={() => handleButtonClick("/post-job", "Post a Job")}
        >
          <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {isVietnamese ? "HOT" : t({ english: "Hot", vietnamese: "HOT" })}
          </div>
          <PlusCircle className="h-10 w-10 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold text-lg">
              {isVietnamese ? "Đăng Tuyển Dụng Mới" : t({ english: "Post a New Job", vietnamese: "Đăng Tuyển Dụng Mới" })}
            </span>
            <span className="text-sm font-normal opacity-90">
              {isVietnamese ? "Tìm thợ nail nhanh chóng" : t({ english: "Find nail techs quickly", vietnamese: "Tìm thợ nail nhanh chóng" })}
            </span>
            {isVietnamese && (
              <span className="text-xs text-blue-100 mt-1">{t({ english: "Post a job to find suitable employees.", vietnamese: "Đăng tuyển dụng để tìm nhân viên phù hợp." })}</span>
            )}
          </div>
        </Button>
        
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 transition-colors"
          onClick={() => handleButtonClick("/sell-salon/new", "List Salon for Sale")}
        >
          <Store className="h-8 w-8 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold">
              {isVietnamese ? "Đăng Bán Tiệm" : t({ english: "List Salon for Sale", vietnamese: "Đăng Bán Tiệm" })}
            </span>
            <span className="text-xs font-normal opacity-90">
              {isVietnamese ? "Đăng bán tiệm của bạn" : t({ english: "List your salon", vietnamese: "Đăng bán tiệm của bạn" })}
            </span>
          </div>
        </Button>
        
        <Button 
          className="bg-purple-600 hover:bg-purple-700 h-auto py-3 px-4 flex flex-col items-center justify-center gap-2 transition-colors"
          onClick={() => handleActionClick(isVietnamese ? "Quảng Bá Tiệm" : t({ english: "Promote My Business", vietnamese: "Quảng Bá Tiệm" }))}
          disabled={loadingPromotion}
        >
          {loadingPromotion ? (
            <RefreshCw className="h-8 w-8 mb-1 animate-spin" />
          ) : (
            <TrendingUp className="h-8 w-8 mb-1" />
          )}
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold">
              {isVietnamese ? "Quảng Bá Tiệm" : t({ english: "Promote My Business", vietnamese: "Quảng Bá Tiệm" })}
            </span>
            <span className="text-xs font-normal opacity-90">
              {isVietnamese ? "Tăng độ phổ biến" : t({ english: "Boost visibility", vietnamese: "Tăng độ phổ biến" })}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SalonDashboardActionButtons;
