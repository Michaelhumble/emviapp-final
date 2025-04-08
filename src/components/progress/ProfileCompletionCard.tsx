
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { UserCheck, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserProfile } from "@/context/auth/types";
import { useAuth } from "@/context/auth";

interface ProfileCompletionCardProps {
  percentage: number;
  userProfile: UserProfile | null;
  loading: boolean;
}

const ProfileCompletionCard = ({ percentage, userProfile, loading }: ProfileCompletionCardProps) => {
  const { t } = useTranslation();
  const { userRole } = useAuth();
  
  // Define checklist items based on user role
  const getChecklistItems = () => {
    const commonItems = [
      {
        name: t('profile_photo', { english: 'Profile Photo', vietnamese: 'Ảnh hồ sơ' }),
        completed: !!userProfile?.avatar_url
      },
      {
        name: t('bio', { english: 'Bio', vietnamese: 'Tiểu sử' }),
        completed: !!userProfile?.bio
      },
      {
        name: t('location', { english: 'Location', vietnamese: 'Địa điểm' }),
        completed: !!userProfile?.location
      }
    ];
    
    if (userRole === 'artist' || userRole === 'nail technician/artist') {
      return [
        ...commonItems,
        {
          name: t('specialties', { english: 'Specialties', vietnamese: 'Chuyên môn' }),
          completed: !!userProfile?.specialty
        },
        {
          name: t('portfolio', { english: 'Portfolio', vietnamese: 'Danh mục' }),
          completed: Array.isArray(userProfile?.portfolio_urls) && userProfile?.portfolio_urls.length > 0
        },
        {
          name: t('social_links', { english: 'Social Links', vietnamese: 'Liên kết mạng xã hội' }),
          completed: !!(userProfile?.instagram || userProfile?.website)
        }
      ];
    } else if (userRole === 'salon' || userRole === 'owner') {
      return [
        ...commonItems,
        {
          name: t('salon_name', { english: 'Salon Name', vietnamese: 'Tên salon' }),
          completed: !!userProfile?.salon_name
        },
        {
          name: t('contact_info', { english: 'Contact Info', vietnamese: 'Thông tin liên hệ' }),
          completed: !!(userProfile?.phone || userProfile?.contact_link)
        },
        {
          name: t('website', { english: 'Website/Social', vietnamese: 'Website/Mạng xã hội' }),
          completed: !!(userProfile?.website || userProfile?.instagram)
        }
      ];
    }
    
    // Default for customers and others
    return [
      ...commonItems,
      {
        name: t('preferences', { english: 'Preferences', vietnamese: 'Sở thích' }),
        completed: Array.isArray(userProfile?.preferences) && userProfile?.preferences.length > 0
      },
      {
        name: t('contact_method', { english: 'Contact Method', vietnamese: 'Phương thức liên hệ' }),
        completed: !!(userProfile?.phone || userProfile?.contact_link)
      }
    ];
  };
  
  const checklistItems = getChecklistItems();
  
  // Determine the progress color based on percentage
  const getProgressColor = () => {
    if (percentage >= 80) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (percentage >= 50) return "bg-gradient-to-r from-amber-400 to-yellow-500";
    return "bg-gradient-to-r from-rose-400 to-red-500";
  };
  
  return (
    <Card className="h-full overflow-hidden border-green-100 shadow-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardTitle className="flex items-center text-lg font-medium">
          <UserCheck className="h-5 w-5 mr-2 text-green-500" />
          {t('profile_completion', { 
            english: 'Profile Completion', 
            vietnamese: 'Hoàn Thiện Hồ Sơ' 
          })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="mt-2 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">{percentage}%</span>
              <span className="text-sm text-gray-500">
                {t('complete', { english: 'complete', vietnamese: 'hoàn thành' })}
              </span>
            </div>
            
            <Progress 
              value={percentage} 
              className="h-2 mb-4" 
              indicatorClassName={getProgressColor()} 
            />
            
            <div className="space-y-2">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  {item.completed ? (
                    <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-rose-100 flex items-center justify-center mr-2">
                      <X className="h-3 w-3 text-rose-600" />
                    </div>
                  )}
                  <span className={item.completed ? 'text-gray-700' : 'text-gray-500'}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-3">
              {t('complete_profile_bonus', { 
                english: 'Complete your profile to unlock visibility bonuses!', 
                vietnamese: 'Hoàn thành hồ sơ để mở khóa phần thưởng khả năng hiển thị!' 
              })}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
