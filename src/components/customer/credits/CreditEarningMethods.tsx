import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Star, Users, Calendar, Heart, Sparkles, RotateCw, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CreditEarningMethodsProps {
  processingOpportunity?: boolean;
}

const CreditEarningMethods: React.FC<CreditEarningMethodsProps> = ({ 
  processingOpportunity = false 
}) => {
  const { userProfile } = useAuth();
  
  const isVietnamese = userProfile?.preferred_language?.toLowerCase() === 'vietnamese' || 
                        userProfile?.preferred_language?.toLowerCase() === 'tiếng việt';
  
  const handleEarnAction = (action: string, amount: number) => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          const successful = Math.random() < 0.75;
          if (successful) {
            resolve({ success: true, credits: amount });
          } else {
            resolve({ success: false, reason: 'verification_needed' });
          }
        }, 1500);
      }),
      {
        loading: isVietnamese ? 'Đang xử lý...' : 'Processing...',
        success: (data: any) => isVietnamese 
          ? `Bạn đã nhận được ${data.credits} điểm Emvi!`
          : `You earned ${data.credits} Emvi Credits!`,
        error: isVietnamese 
          ? 'Cần xác minh thêm, hãy thử lại sau.'
          : 'Additional verification needed, please try again later.',
      }
    );
  };
  
  return (
    <div className="space-y-5">
      <div className="p-4 border border-pink-200 rounded-lg bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-pink-100 flex-shrink-0 flex items-center justify-center">
            <Users className="h-5 w-5 text-pink-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-pink-900 mb-1">
              {isVietnamese ? 'Mời bạn bè' : 'Invite Friends'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {isVietnamese
                ? 'Nhận 50 điểm cho mỗi người bạn giới thiệu sử dụng Emvi'
                : 'Earn 50 credits for each friend who joins Emvi through your invite'}
            </p>
            <Button asChild className="w-full bg-pink-600 hover:bg-pink-700">
              <Link to="/referrals">
                <Users className="h-4 w-4 mr-2" />
                {isVietnamese ? 'Xem chương trình giới thiệu' : 'View Referral Program'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">
                {isVietnamese ? 'Hoàn thành đặt lịch' : 'Complete a Booking'}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {isVietnamese ? 'Nhận 10 điểm' : 'Earn 10 credits'}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => handleEarnAction('booking', 10)}
              >
                {isVietnamese ? 'Đặt lịch ngay' : 'Book Now'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">
                {isVietnamese ? 'Viết đánh giá' : 'Write a Review'}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {isVietnamese ? 'Nhận 5 điểm' : 'Earn 5 credits'}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => handleEarnAction('review', 5)}
              >
                {isVietnamese ? 'Viết đánh giá' : 'Write Review'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-3 border rounded-lg hover:bg-gray-50 transition">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center">
              <Heart className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">
                {isVietnamese ? 'Theo dõi nghệ sĩ' : 'Follow an Artist'}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {isVietnamese ? 'Nhận 3 điểm' : 'Earn 3 credits'}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs"
                onClick={() => handleEarnAction('follow', 3)}
              >
                {isVietnamese ? 'Khám phá nghệ sĩ' : 'Discover Artists'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className={`p-3 border rounded-lg transition ${processingOpportunity ? 'border-green-200 bg-green-50' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start gap-3">
            <div className={`h-9 w-9 rounded-full flex-shrink-0 flex items-center justify-center ${processingOpportunity ? 'bg-green-100' : 'bg-purple-100'}`}>
              {processingOpportunity ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCw className="h-4 w-4 text-green-600" />
                </motion.div>
              ) : (
                <Sparkles className="h-4 w-4 text-purple-600" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-sm mb-1">
                {processingOpportunity 
                  ? (isVietnamese ? 'Đang xử lý cơ hội...' : 'Processing Opportunity...') 
                  : (isVietnamese ? 'Cơ hội đặc biệt' : 'Special Opportunity')}
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                {processingOpportunity
                  ? (isVietnamese ? 'Đang xác minh...' : 'Verifying...')
                  : (isVietnamese ? 'Kiếm điểm nhanh!' : 'Earn credits fast!')}
              </p>
              <Button 
                variant={processingOpportunity ? "outline" : "outline"}
                size="sm" 
                className={`h-7 text-xs ${processingOpportunity ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={processingOpportunity}
                onClick={() => handleEarnAction('special', 15)}
              >
                {processingOpportunity 
                  ? (isVietnamese ? 'Đang xử lý...' : 'Processing...') 
                  : (isVietnamese ? 'Kiểm tra điều kiện' : 'Check Eligibility')}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-4">
        {isVietnamese 
          ? 'Mời thêm bạn để nhận nhiều phần thưởng lớn hơn!' 
          : 'Invite more friends to unlock bigger rewards!'}
      </div>
    </div>
  );
};

export default CreditEarningMethods;
