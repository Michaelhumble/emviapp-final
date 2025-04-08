
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { UserProfile } from "@/context/auth/types";

interface ArtistGoalsProgressProps {
  artistProfile: UserProfile | null;
}

const ArtistGoalsProgress = ({ artistProfile }: ArtistGoalsProgressProps) => {
  const { t } = useTranslation();
  
  // Calculate profile completion percentage
  const getProfileCompletion = () => {
    if (!artistProfile) return 30;
    
    let totalFields = 8;
    let completedFields = 0;
    
    if (artistProfile.full_name) completedFields++;
    if (artistProfile.bio) completedFields++;
    if (artistProfile.specialty) completedFields++;
    if (artistProfile.avatar_url) completedFields++;
    if (artistProfile.instagram) completedFields++;
    if (artistProfile.phone) completedFields++;
    if (artistProfile.location) completedFields++;
    if (artistProfile.skills && artistProfile.skills.length > 0) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };
  
  const profileCompletion = getProfileCompletion();
  
  // Determine next steps message based on completion
  const getNextStepsMessage = () => {
    if (profileCompletion < 40) {
      return t({
        english: "Start with adding your photo and basic info",
        vietnamese: "Bắt đầu với việc thêm ảnh và thông tin cơ bản"
      });
    } else if (profileCompletion < 70) {
      return t({
        english: "Add your specialties and social links",
        vietnamese: "Thêm chuyên môn và liên kết mạng xã hội của bạn"
      });
    } else if (profileCompletion < 100) {
      return t({
        english: "Almost there! Complete your location and skills",
        vietnamese: "Gần hoàn thành! Bổ sung địa điểm và kỹ năng của bạn"
      });
    } else {
      return t({
        english: "Your profile is complete! Update anytime.",
        vietnamese: "Hồ sơ của bạn đã hoàn thành! Cập nhật bất cứ lúc nào."
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="backdrop-blur-sm bg-white/90 border border-purple-100 shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-xl">
                🎯
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {t({
                    english: "My Goals & Progress",
                    vietnamese: "Mục tiêu & Tiến độ của tôi"
                  })}
                </h3>
                <p className="text-sm text-gray-500">
                  {t({
                    english: "Complete your profile to unlock referrals",
                    vietnamese: "Hoàn thành hồ sơ để mở khóa giới thiệu"
                  })}
                </p>
              </div>
            </div>
            
            <Link to="/profile">
              <Button size="sm" variant="outline" className="gap-1">
                {profileCompletion === 100 ? 
                  t({
                    english: "View Profile",
                    vietnamese: "Xem hồ sơ"
                  }) : 
                  t({
                    english: "Continue Setup",
                    vietnamese: "Tiếp tục thiết lập"
                  })}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{t({
                  english: "Profile Completion",
                  vietnamese: "Hoàn thành hồ sơ"
                })}</span>
                <span className="text-sm font-bold">{profileCompletion}%</span>
              </div>
              
              <Progress 
                value={profileCompletion} 
                className="h-2" 
                indicatorClassName={profileCompletion === 100 ? 
                  "bg-gradient-to-r from-green-400 to-emerald-500" : 
                  "bg-gradient-to-r from-purple-400 to-indigo-500"} 
              />
              
              <p className="text-xs text-gray-500 mt-2">{getNextStepsMessage()}</p>
            </div>
            
            {profileCompletion < 100 && (
              <motion.div 
                className="bg-purple-50 border border-purple-100 rounded-lg p-3 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex gap-2">
                  <Target className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-purple-800 font-medium">
                      {t({
                        english: "Pro tip:",
                        vietnamese: "Mẹo chuyên nghiệp:"
                      })}
                    </p>
                    <p className="text-purple-700 text-xs mt-0.5">
                      {t({
                        english: "Artists with complete profiles get up to 3x more client views and referrals!",
                        vietnamese: "Các nghệ sĩ có hồ sơ đầy đủ nhận được lượt xem khách hàng và giới thiệu cao gấp 3 lần!"
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ArtistGoalsProgress;
