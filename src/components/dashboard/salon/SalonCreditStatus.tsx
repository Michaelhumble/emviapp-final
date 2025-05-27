
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Plus } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { checkCredits } from "@/utils/credits";
import { useTranslation } from "@/hooks/useTranslation";

const SalonCreditStatus = () => {
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
    const interval = setInterval(fetchCredits, 60000); // refresh every minute
    
    return () => clearInterval(interval);
  }, [user]);
  
  const handleAddCredits = () => {
    toast.info(t({ english: "Credit purchase will be available soon!", vietnamese: "Tính năng mua credit sẽ sớm có sẵn!" }));
  };
  
  return (
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
  );
};

export default SalonCreditStatus;
