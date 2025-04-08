
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { Users, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/auth";

interface ReferralProgressCardProps {
  referralStats: any;
  loading: boolean;
}

const ReferralProgressCard = ({ referralStats, loading }: ReferralProgressCardProps) => {
  const { t } = useTranslation();
  const { userRole } = useAuth();
  
  // Determine target milestone based on user role
  const getTargetMilestone = () => {
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      return 3;
    } else if (userRole === 'salon' || userRole === 'owner') {
      return 2;
    } else {
      return 5; // Default for customers and others
    }
  };
  
  const targetMilestone = getTargetMilestone();
  
  // Calculate progress
  const calculateProgress = () => {
    if (!referralStats) return { completed: 0, percentage: 0 };
    
    const completed = referralStats.completed || 0;
    const percentage = Math.min((completed / targetMilestone) * 100, 100);
    
    return { completed, percentage };
  };
  
  const { completed, percentage } = calculateProgress();
  
  return (
    <Card className="h-full overflow-hidden border-purple-100 shadow-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-purple-50 to-fuchsia-50">
        <CardTitle className="flex items-center text-lg font-medium">
          <Users className="h-5 w-5 mr-2 text-purple-500" />
          {t('referral_progress', { 
            english: 'Referral Progress', 
            vietnamese: 'Giới thiệu bạn bè' 
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ) : (
          <>
            <div className="text-xl font-bold mb-3 flex items-center">
              <span>
                {completed}/{targetMilestone} 
                <span className="text-sm ml-1 font-normal text-gray-500">
                  {t('referrals_completed', { 
                    english: 'referrals completed', 
                    vietnamese: 'giới thiệu hoàn thành' 
                  })}
                </span>
              </span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="ml-2">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="w-60 p-3">
                    <p>
                      {t('referral_requirement_tooltip', { 
                        english: 'Your referrals must complete bookings to count!', 
                        vietnamese: 'Phần thưởng sẽ được mở khóa khi bạn bè hoàn thành đặt lịch!' 
                      })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div className="mb-3">
              <Progress 
                value={percentage} 
                className="h-2" 
                indicatorClassName="bg-gradient-to-r from-purple-400 to-fuchsia-400" 
              />
            </div>
            
            <div className="text-sm text-gray-500">
              {completed >= targetMilestone ? (
                <p className="text-purple-600 font-medium">
                  {t('milestone_reached', { 
                    english: 'Milestone reached! 🎉', 
                    vietnamese: 'Đã đạt mốc! 🎉' 
                  })}
                </p>
              ) : (
                <p>
                  {t('more_referrals_needed', { 
                    english: `${targetMilestone - completed} more to reach milestone`, 
                    vietnamese: `Còn ${targetMilestone - completed} giới thiệu để đạt mốc` 
                  })}
                </p>
              )}
              
              <p className="mt-2 text-xs text-gray-400">
                {t('referral_reward', { 
                  english: 'Earn 20 credits per successful referral', 
                  vietnamese: 'Nhận 20 điểm cho mỗi lượt giới thiệu thành công' 
                })}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralProgressCard;
