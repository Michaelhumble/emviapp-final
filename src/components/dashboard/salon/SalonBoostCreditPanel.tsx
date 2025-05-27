
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Zap, Plus } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkCredits } from "@/utils/credits";
import { useTranslation } from "@/hooks/useTranslation";

const SalonBoostCreditPanel = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchCredits = async () => {
      try {
        const userCredits = await checkCredits(user.id);
        setCredits(userCredits);
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    };
    
    fetchCredits();
    
    // Setup a refresh interval
    const interval = setInterval(fetchCredits, 60000);
    
    return () => clearInterval(interval);
  }, [user]);
  
  const handleAddCredits = () => {
    toast.info(t({ english: "Credit purchase will be available soon!", vietnamese: "Tính năng mua credit sẽ sớm có sẵn!" }));
  };
  
  const handleBoostSalon = () => {
    toast.info(t({ english: "Salon boost feature coming soon!", vietnamese: "Tính năng tăng cường salon sẽ sớm có sẵn!" }));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Credit Status Card */}
      <Card className="border-purple-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <BadgeDollarSign className="h-5 w-5 text-purple-500 mr-2" />
            {t({ english: "Credit Status", vietnamese: "Trạng Thái Credit" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-600">{t({ english: "Current Balance", vietnamese: "Số Dư Hiện Tại" })}</p>
                <p className="text-2xl font-bold text-purple-800">{credits} {t({ english: "credits", vietnamese: "credit" })}</p>
              </div>
              <Button 
                className="bg-white text-purple-600 hover:bg-purple-50 border border-purple-200"
                onClick={handleAddCredits}
                disabled={loading}
              >
                <Plus className="h-4 w-4 mr-1" />
                {t({ english: "Add Credits", vietnamese: "Thêm Credit" })}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-gray-500">{t({ english: "Featured Listing", vietnamese: "Danh Sách Nổi Bật" })}</p>
                <p className="font-medium flex items-center">
                  <BadgeDollarSign className="h-4 w-4 text-amber-500 mr-1" />
                  10 {t({ english: "credits", vietnamese: "credit" })}
                </p>
              </div>
              <div className="bg-white p-3 rounded-md border border-gray-100">
                <p className="text-gray-500">{t({ english: "Post Job", vietnamese: "Đăng Việc" })}</p>
                <p className="font-medium flex items-center">
                  <BadgeDollarSign className="h-4 w-4 text-green-500 mr-1" />
                  0 {t({ english: "credits", vietnamese: "credit" })} <span className="ml-1 text-xs text-green-500">({t({ english: "Free", vietnamese: "Miễn Phí" })})</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Salon Boost Card */}
      <Card className="border-amber-100">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 text-amber-500 mr-2" />
            {t({ english: "Salon Boost", vietnamese: "Tăng Cường Salon" })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-amber-600">{t({ english: "Boost Status", vietnamese: "Trạng Thái Tăng Cường" })}</p>
                  <p className="text-lg font-bold text-amber-800">{t({ english: "Not Active", vietnamese: "Không Hoạt Động" })}</p>
                </div>
                <Button 
                  className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white border-none"
                  onClick={handleBoostSalon}
                  disabled={loading}
                >
                  <Zap className="h-4 w-4 mr-1" />
                  {t({ english: "Boost Now", vietnamese: "Tăng Cường Ngay" })}
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-md border border-gray-100">
              <p className="text-sm text-gray-600 mb-2">{t({ english: "What you get:", vietnamese: "Những gì bạn nhận được:" })}</p>
              <ul className="text-sm space-y-1">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  {t({ english: "Featured placement", vietnamese: "Vị trí nổi bật" })}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  {t({ english: "2x more visibility", vietnamese: "Tăng 2 lần độ hiển thị" })}
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  {t({ english: "Priority in search", vietnamese: "Ưu tiên trong tìm kiếm" })}
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonBoostCreditPanel;
