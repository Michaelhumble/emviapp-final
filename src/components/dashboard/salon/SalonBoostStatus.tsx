
import { useAuth } from "@/context/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow, isAfter } from "date-fns";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";
import { vi } from "date-fns/locale";

const SalonBoostStatus = () => {
  const { user, userProfile } = useAuth();
  const { t } = useTranslation();
  const [isBoosted, setIsBoosted] = useState(false);
  const [boostEndDate, setBoostEndDate] = useState<Date | null>(null);
  const preferredLanguage = userProfile?.preferred_language || "English";
  const isVietnamese = preferredLanguage === 'vi' || preferredLanguage === 'Vietnamese';
  
  useEffect(() => {
    if (userProfile?.boosted_until) {
      const boostDate = new Date(userProfile.boosted_until);
      setIsBoosted(isAfter(boostDate, new Date()));
      setBoostEndDate(boostDate);
    } else {
      setIsBoosted(false);
      setBoostEndDate(null);
    }
  }, [userProfile]);
  
  const handleBoostClick = () => {
    toast.info(isVietnamese ? "Đang chuyển đến trang tăng độ phổ biến..." : "Redirecting to salon boost options...");
    // In a real implementation, this would navigate to a boost page or open a modal
  };
  
  return (
    <Card className={`mb-6 border ${isBoosted ? 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50' : 'border-gray-200'}`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-3 md:mb-0">
            {isBoosted ? (
              <>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-amber-100 p-2 rounded-full mr-3"
                >
                  <Flame className="h-5 w-5 text-amber-500" />
                </motion.div>
                <div>
                  <h3 className="font-medium text-amber-800">
                    {isVietnamese ? "Hồ sơ tiệm của bạn đang được tăng cường!" : "Your salon profile is currently boosted!"}
                  </h3>
                  {boostEndDate && (
                    <p className="text-sm text-amber-700">
                      {isVietnamese ? "Tăng cường của bạn hết hạn trong" : "Your boost expires in"}{" "}
                      {formatDistanceToNow(boostEndDate, { 
                        locale: isVietnamese ? vi : undefined 
                      })}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <Flame className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-medium">
                    {isVietnamese ? "Tăng độ phổ biến của tiệm để thu hút khách hàng" : "Boost your salon for more visibility"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {isVietnamese ? "Tăng cường hồ sơ tiệm của bạn để thu hút nhiều thợ nail hơn" : "Boost your salon profile to attract more nail technicians"}
                  </p>
                </div>
              </>
            )}
          </div>
          
          {!isBoosted && (
            <Button 
              className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
              size="sm"
              onClick={handleBoostClick}
            >
              {isVietnamese ? "Tăng Ngay" : "Boost Now"} <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBoostStatus;
