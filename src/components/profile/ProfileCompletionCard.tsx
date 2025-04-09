
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, UserCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from '@/context/auth';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCompletionCard = () => {
  const { t } = useTranslation();
  const { userProfile, userRole, user } = useAuth();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [checklistItems, setChecklistItems] = useState<{ name: string; completed: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    
    const calculateProfileCompletion = async () => {
      setIsLoading(true);
      
      try {
        // Get services count for this user
        const { count: servicesCount, error: servicesError } = await supabase
          .from('services')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (servicesError) {
          console.error('Error fetching services:', servicesError);
        }
        
        // Create checklist items with real data
        const items = [
          {
            name: t({ 
              english: 'Profile Picture', 
              vietnamese: 'Ảnh hồ sơ' 
            }),
            completed: !!userProfile?.avatar_url
          },
          {
            name: t({ 
              english: 'Bio & Specialty', 
              vietnamese: 'Tiểu sử & Chuyên môn' 
            }),
            completed: !!(userProfile?.bio && userProfile?.specialty)
          },
          {
            name: t({ 
              english: 'Portfolio Uploaded', 
              vietnamese: 'Bộ sưu tập đã tải lên' 
            }),
            completed: !!(userProfile?.portfolio_urls && userProfile?.portfolio_urls.length > 0)
          },
          {
            name: t({ 
              english: 'Services Added', 
              vietnamese: 'Dịch vụ đã thêm' 
            }),
            completed: !!(servicesCount && servicesCount > 0)
          },
          {
            name: t({ 
              english: 'Referral Link Generated', 
              vietnamese: 'Đã tạo liên kết giới thiệu' 
            }),
            completed: !!userProfile?.referral_code
          }
        ];
        
        setChecklistItems(items);
        
        // Calculate completion percentage
        const completedItems = items.filter(item => item.completed).length;
        const percentage = Math.round((completedItems / items.length) * 100);
        setCompletionPercentage(percentage);
      } catch (error) {
        console.error('Error calculating profile completion:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    calculateProfileCompletion();
  }, [userProfile, user, t]);
  
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
  
  // Determine the progress color based on percentage
  const getProgressColor = () => {
    if (completionPercentage >= 80) return "bg-gradient-to-r from-green-400 to-emerald-500";
    if (completionPercentage >= 50) return "bg-gradient-to-r from-amber-400 to-yellow-500";
    return "bg-gradient-to-r from-rose-400 to-red-500";
  };
  
  if (isLoading) {
    return (
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
        </CardContent>
      </Card>
    );
  }
  
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
                className={`h-full rounded-full ${getProgressColor()}`}
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
              {completionPercentage === 100 ? 
                t({
                  english: 'Your profile is complete! Keep it updated.',
                  vietnamese: 'Hồ sơ của bạn đã hoàn thành! Hãy giữ cập nhật.'
                }) :
                t({
                  english: 'Complete your profile to unlock more bookings!',
                  vietnamese: 'Hoàn thiện hồ sơ để nhận nhiều lượt đặt hơn!'
                })
              }
            </p>
          </div>
          
          <Button asChild className="w-full" variant={completionPercentage === 100 ? "outline" : "default"}>
            <Link to="/profile/edit" className="flex items-center justify-center">
              {completionPercentage === 100 ? 
                t({
                  english: 'View Profile',
                  vietnamese: 'Xem Hồ Sơ'
                }) :
                t({
                  english: 'Update Profile',
                  vietnamese: 'Cập Nhật Hồ Sơ'
                })
              }
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfileCompletionCard;
