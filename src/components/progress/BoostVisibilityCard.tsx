
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Rocket, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BoostStatus } from "@/components/dashboard/artist/credits/types";
import { useAuth } from "@/context/auth";
import { formatDistanceToNow } from "date-fns";

interface BoostVisibilityCardProps {
  boostStatus: BoostStatus;
  credits: number;
  loading: boolean;
}

const BoostVisibilityCard = ({ boostStatus, credits, loading }: BoostVisibilityCardProps) => {
  const { t } = useTranslation();
  const { userRole } = useAuth();
  
  // Determine if boost is applicable for this user role
  const isBoostApplicable = () => {
    return ['artist', 'nail technician/artist', 'salon', 'owner'].includes(userRole || '');
  };
  
  // Calculate remaining boost time
  const getBoostTimeRemaining = () => {
    if (!boostStatus.isActive || !boostStatus.expiresAt) return null;
    
    try {
      const expiryDate = new Date(boostStatus.expiresAt);
      return formatDistanceToNow(expiryDate, { addSuffix: false });
    } catch (error) {
      console.error("Error formatting date:", error);
      return null;
    }
  };
  
  const boostTimeRemaining = getBoostTimeRemaining();
  const canBoost = credits >= 10;
  
  // Determine boost cost based on role
  const getBoostCost = () => {
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      return 10;
    } else if (userRole === 'salon' || userRole === 'owner') {
      return 25;
    }
    return 15; // Default
  };
  
  const boostCost = getBoostCost();
  
  return (
    <Card className="h-full overflow-hidden border-blue-100 shadow-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardTitle className="flex items-center text-lg font-medium">
          <Rocket className="h-5 w-5 mr-2 text-blue-500" />
          {t('boost_visibility', { 
            english: 'Boost & Visibility', 
            vietnamese: 'Tăng Khả Năng Hiển Thị' 
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-2/3 mt-3" />
          </div>
        ) : !isBoostApplicable() ? (
          <p className="text-sm text-gray-500">
            {t('boost_not_applicable', { 
              english: 'Boost features are available for artists and salons', 
              vietnamese: 'Tính năng tăng tốc có sẵn cho nghệ sĩ và salon' 
            })}
          </p>
        ) : boostStatus.isActive ? (
          <>
            <div className="flex items-center mb-3">
              <div className="h-3 w-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <p className="text-lg font-medium text-green-600">
                {t('boost_active', { 
                  english: 'Boost Active', 
                  vietnamese: 'Đang Tăng Tốc' 
                })}
              </p>
            </div>
            
            <div className="flex items-center mb-4 text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {boostTimeRemaining ? (
                  t('time_remaining', { 
                    english: `${boostTimeRemaining} remaining`, 
                    vietnamese: `Còn ${boostTimeRemaining}` 
                  })
                ) : (
                  t('expires_soon', { 
                    english: 'Expires soon', 
                    vietnamese: 'Sắp hết hạn' 
                  })
                )}
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              {t('boost_active_benefit', { 
                english: 'Your profile appears higher in search results', 
                vietnamese: 'Hồ sơ của bạn xuất hiện cao hơn trong kết quả tìm kiếm' 
              })}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-medium mb-3 text-gray-700">
              {t('no_boost_active', { 
                english: 'No boost active', 
                vietnamese: 'Chưa kích hoạt tăng tốc' 
              })}
            </p>
            
            <Button 
              variant="default" 
              size="sm" 
              className={`w-full ${!canBoost ? 'opacity-70' : ''}`}
              disabled={!canBoost}
            >
              {t('boost_now_button', { 
                english: `Boost Now (${boostCost} credits)`, 
                vietnamese: `Tăng Tốc Ngay (${boostCost} điểm)` 
              })}
            </Button>
            
            {!canBoost && (
              <p className="text-xs text-amber-600 mt-2">
                {t('not_enough_credits', { 
                  english: `You need ${boostCost - credits} more credits`, 
                  vietnamese: `Bạn cần thêm ${boostCost - credits} điểm` 
                })}
              </p>
            )}
            
            <p className="text-xs text-gray-500 mt-3">
              {t('boost_benefit', { 
                english: 'Get noticed by more clients and rank higher in search results', 
                vietnamese: 'Được nhiều khách hàng chú ý hơn và xếp hạng cao hơn trong tìm kiếm' 
              })}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostVisibilityCard;
