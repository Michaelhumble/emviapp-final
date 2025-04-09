import { Button } from "@/components/ui/button";
import { PlusCircle, Store, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/context/auth";

const SalonDashboardActionButtons = () => {
  const { t } = useTranslation();
  const { userProfile } = useAuth();
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  const handleActionClick = (action: string) => {
    toast.info(`${action} feature coming soon!`);
  };
  
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        {isVietnamese ? "Hành Động Nhanh Cho Tiệm" : t("Salon Quick Actions")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 h-auto py-4 px-4 flex flex-col items-center justify-center gap-2 relative" asChild>
          <Link to="/post/job">
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {isVietnamese ? "HOT" : t("Hot")}
            </div>
            <PlusCircle className="h-10 w-10 mb-1" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold text-lg">
                {isVietnamese ? "Đăng Tuyển Dụng Mới" : t("Post a New Job")}
              </span>
              <span className="text-sm font-normal opacity-90">
                {isVietnamese ? "Tìm thợ nail nhanh chóng" : t("Find nail techs quickly")}
              </span>
              {isVietnamese && (
                <span className="text-xs text-blue-100 mt-1">{t("Đăng tuyển dụng để tìm nhân viên phù hợp.")}</span>
              )}
            </div>
          </Link>
        </Button>
        
        <Button 
          className="bg-indigo-600 hover:bg-indigo-700 h-auto py-3 px-4 flex flex-col items-center justify-center gap-2"
          asChild
        >
          <Link to="/sell-salon/new">
            <Store className="h-8 w-8 mb-1" />
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold">
                {isVietnamese ? "Đăng Bán Tiệm" : t("List Salon for Sale")}
              </span>
              <span className="text-xs font-normal opacity-90">
                {isVietnamese ? "Đăng bán tiệm của bạn" : t("List your salon")}
              </span>
            </div>
          </Link>
        </Button>
        
        <Button 
          className="bg-purple-600 hover:bg-purple-700 h-auto py-3 px-4 flex flex-col items-center justify-center gap-2"
          onClick={() => handleActionClick(isVietnamese ? "Quảng Bá Tiệm" : t("Promote My Business"))}
        >
          <TrendingUp className="h-8 w-8 mb-1" />
          <div className="flex flex-col items-center text-center">
            <span className="font-semibold">
              {isVietnamese ? "Quảng Bá Tiệm" : t("Promote My Business")}
            </span>
            <span className="text-xs font-normal opacity-90">
              {isVietnamese ? "Tăng độ phổ biến" : t("Boost visibility")}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SalonDashboardActionButtons;
