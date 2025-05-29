
import React from 'react';
import { motion } from 'framer-motion';
import SalonPhotoUpload from '../SalonPostPhotoUpload';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Camera, CheckCircle2, Star, Heart, Zap, TrendingUp } from 'lucide-react';

interface SalonPhotoStepProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export const SalonPhotoStep = ({ photos, onPhotosChange }: SalonPhotoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {t({
              english: 'Showcase Your Beautiful Salon',
              vietnamese: 'Khoe Salon Tuyệt Đẹp Của Bạn'
            })}
          </h2>
          <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500">
            <Star className="h-6 w-6 text-white" />
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t({
            english: 'Professional photos increase buyer interest by 500% and help you sell faster at a higher price',
            vietnamese: 'Hình ảnh chuyên nghiệp tăng sự quan tâm của người mua lên 500% và giúp bạn bán nhanh hơn với giá cao hơn'
          })}
        </p>
      </motion.div>

      {/* Stats Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">
              {t({
                english: '5x More Views',
                vietnamese: '5x Nhiều Lượt Xem Hơn'
              })}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">
              {t({
                english: '3x Faster Sale',
                vietnamese: '3x Bán Nhanh Hơn'
              })}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-800 font-semibold">
              {t({
                english: 'Higher Offers',
                vietnamese: 'Giá Cao Hơn'
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Photo Tips Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-500">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-blue-800">
                {t({
                  english: 'Must-Have Photos',
                  vietnamese: 'Ảnh Bắt Buộc'
                })}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                {t({
                  english: 'Salon exterior & storefront',
                  vietnamese: 'Mặt tiền & bên ngoài salon'
                })}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                {t({
                  english: 'Reception area & waiting space',
                  vietnamese: 'Khu vực tiếp khách & chờ'
                })}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                {t({
                  english: 'Work stations & equipment',
                  vietnamese: 'Ghế làm việc & thiết bị'
                })}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3" />
                {t({
                  english: 'Clean, organized workspace',
                  vietnamese: 'Không gian làm việc sạch sẽ'
                })}
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-purple-500">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-purple-800">
                {t({
                  english: 'Pro Photography Tips',
                  vietnamese: 'Mẹo Chụp Ảnh Chuyên Nghiệp'
                })}
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-purple-700">
              <li className="flex items-center gap-2">
                <Star className="h-3 w-3" />
                {t({
                  english: 'Use natural lighting when possible',
                  vietnamese: 'Sử dụng ánh sáng tự nhiên khi có thể'
                })}
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-3 w-3" />
                {t({
                  english: 'Show your salon at its best',
                  vietnamese: 'Hiển thị salon ở trạng thái đẹp nhất'
                })}
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-3 w-3" />
                {t({
                  english: 'Include unique selling features',
                  vietnamese: 'Bao gồm tính năng độc đáo'
                })}
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-3 w-3" />
                {t({
                  english: 'Take photos from multiple angles',
                  vietnamese: 'Chụp từ nhiều góc độ khác nhau'
                })}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Photo Upload Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SalonPhotoUpload
          photoUploads={photos}
          setPhotoUploads={onPhotosChange}
          maxPhotos={8}
        />
      </motion.div>

      {/* Photo Count Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {photos.length === 0 && (
          <div className="flex items-center gap-3 text-amber-600 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">
              {t({
                english: 'Photos dramatically increase buyer interest - add some to get started!',
                vietnamese: 'Hình ảnh làm tăng đáng kể sự quan tâm của người mua - hãy thêm một số để bắt đầu!'
              })}
            </p>
          </div>
        )}

        {photos.length > 0 && photos.length < 5 && (
          <div className="flex items-center gap-3 text-orange-600 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <Camera className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">
              {t({
                english: `Great start! Add ${5 - photos.length} more photos for maximum impact`,
                vietnamese: `Khởi đầu tuyệt vời! Thêm ${5 - photos.length} ảnh nữa để có tác động tối đa`
              })}
            </p>
          </div>
        )}

        {photos.length >= 5 && (
          <div className="flex items-center gap-3 text-green-600 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <p className="font-medium">
              {t({
                english: 'Perfect! Your salon photos will attract serious buyers',
                vietnamese: 'Hoàn hảo! Hình ảnh salon của bạn sẽ thu hút người mua nghiêm túc'
              })}
            </p>
          </div>
        )}
      </motion.div>

      {/* Success Story */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-indigo-500 flex-shrink-0">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-indigo-800 mb-2">
              {t({
                english: 'Success Story',
                vietnamese: 'Câu Chuyện Thành Công'
              })}
            </h4>
            <p className="text-indigo-700 italic leading-relaxed">
              {t({
                english: '"I uploaded 8 high-quality photos of my salon and received 12 serious inquiries within the first week. The photos helped buyers visualize owning my business!"',
                vietnamese: '"Tôi đã tải lên 8 hình ảnh chất lượng cao về salon và nhận được 12 lời hỏi nghiêm túc trong tuần đầu tiên. Hình ảnh giúp người mua hình dung việc sở hữu doanh nghiệp của tôi!"'
              })}
            </p>
            <p className="text-indigo-600 text-sm mt-2 font-medium">
              - {t({
                english: 'Sarah M., Luxury Hair Studio Owner',
                vietnamese: 'Sarah M., Chủ Studio Tóc Cao Cấp'
              })}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
