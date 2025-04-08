
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, UserCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from '@/context/auth';
import { useState, useEffect } from 'react';

const ProfileCompletionCard = () => {
  const { t } = useTranslation();
  const { userProfile, userRole } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [checklistItems, setChecklistItems] = useState<{ name: string; completed: boolean }[]>([]);
  
  useEffect(() => {
    if (!userProfile) return;
    
    // Define the checklist items based on the user profile data
    const items = [
      {
        name: t({ 
          english: 'Profile Picture', 
          vietnamese: 'Ảnh hồ sơ' 
        }),
        completed: !!userProfile.avatar_url
      },
      {
        name: t({ 
          english: 'Bio & Specialty', 
          vietnamese: 'Tiểu sử & Chuyên môn' 
        }),
        completed: !!(userProfile.bio && userProfile.specialty)
      },
      {
        name: t({ 
          english: 'Portfolio Uploaded', 
          vietnamese: 'Bộ sưu tập đã tải lên' 
        }),
        completed: !!(userProfile.portfolio_urls && userProfile.portfolio_urls.length > 0)
      },
      {
        name: t({ 
          english: 'Services Added', 
          vietnamese: 'Dịch vụ đã thêm' 
        }),
        completed: !!(userProfile.skills && userProfile.skills.length > 0)
      },
      {
        name: t({ 
          english: 'Referral Link Shared', 
          vietnamese: 'Đã chia sẻ liên kết giới thiệu' 
        }),
        completed: !!(userProfile.referral_count && userProfile.referral_count > 0)
      }
    ];
    
    setChecklistItems(items);
    
    // Calculate completion percentage
    const completedItems = items.filter(item => item.completed).length;
    const percentage = Math.round((completedItems / items.length) * 100);
    setCompletionPercentage(percentage);
  }, [userProfile, t]);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.1
      }
    }
  };
  
  const progressVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: `${completionPercentage}%`,
      transition: { 
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.4 + (i * 0.1),
        duration: 0.3
      }
    })
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="border border-purple-100 shadow-sm overflow-hidden backdrop-blur-sm bg-white/90">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-4">
          <CardTitle className="flex items-center text-lg font-medium">
            <UserCheck className="h-5 w-5 text-purple-500 mr-2" />
            {t({
              english: 'Your Profile Progress',
              vietnamese: 'Tiến Độ Hồ Sơ'
            })}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium text-lg">
                {completionPercentage}% {t({
                  english: 'Complete',
                  vietnamese: 'Hoàn thành'
                })}
              </div>
              <div className="text-sm text-gray-500">
                {t({
                  english: `${checklistItems.filter(item => item.completed).length} of ${checklistItems.length} tasks done`,
                  vietnamese: `${checklistItems.filter(item => item.completed).length} / ${checklistItems.length} nhiệm vụ`
                })}
              </div>
            </div>
            
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"
                variants={progressVariants}
                initial="hidden"
                animate="visible"
              />
            </div>
          </div>
          
          <div className="space-y-3 mb-6">
            {checklistItems.map((item, index) => (
              <motion.div 
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center"
              >
                {item.completed ? (
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    <XCircle className="h-4 w-4 text-gray-400" />
                  </div>
                )}
                <span className={`text-sm ${item.completed ? 'text-gray-800' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-center text-gray-600">
              {t({
                english: 'Complete your profile to unlock more bookings!',
                vietnamese: 'Hoàn thiện hồ sơ để nhận nhiều lượt đặt hơn!'
              })}
            </p>
          </div>
          
          <Button asChild className="w-full" variant={completionPercentage === 100 ? "outline" : "default"}>
            <Link to="/profile/edit" className="flex items-center justify-center">
              {t({
                english: 'Update Profile',
                vietnamese: 'Cập Nhật Hồ Sơ'
              })}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCompletionCard;
