
import React from 'react';
import SalonPhotoUpload from '../SalonPostPhotoUpload';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Camera, CheckCircle2 } from 'lucide-react';

interface SalonPhotoStepProps {
  photos: File[];
  onPhotosChange: (photos: File[]) => void;
}

export const SalonPhotoStep = ({ photos, onPhotosChange }: SalonPhotoStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t({
            english: 'Photos',
            vietnamese: 'Hình Ảnh'
          })}
        </h2>
        <p className="text-gray-600 mt-2">
          {t({
            english: 'Upload high-quality photos to showcase your salon',
            vietnamese: 'Tải lên hình ảnh chất lượng cao để giới thiệu salon của bạn'
          })}
        </p>
      </div>

      <Card className="p-4 bg-blue-50/50 border border-blue-100">
        <CardContent className="p-0 space-y-4">
          <h3 className="font-medium text-blue-800 flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-blue-600" />
            {t({
              english: 'Photo Tips',
              vietnamese: 'Mẹo Chụp Ảnh'
            })}
          </h3>

          <ul className="space-y-2 text-sm text-blue-700 pl-8 list-disc">
            <li>
              {t({
                english: 'Include photos of the exterior, interior, work stations, and equipment',
                vietnamese: 'Thêm hình ảnh bên ngoài, bên trong, nơi làm việc, và thiết bị'
              })}
            </li>
            <li>
              {t({
                english: 'Clean and organize your space before taking photos',
                vietnamese: 'Dọn dẹp và tổ chức không gian trước khi chụp ảnh'
              })}
            </li>
            <li>
              {t({
                english: 'Use natural light when possible for better results',
                vietnamese: 'Sử dụng ánh sáng tự nhiên khi có thể để có kết quả tốt hơn'
              })}
            </li>
            <li>
              {t({
                english: 'Listings with 5+ high-quality photos sell 3x faster',
                vietnamese: 'Tin đăng có 5+ hình ảnh chất lượng cao bán nhanh hơn 3 lần'
              })}
            </li>
          </ul>
        </CardContent>
      </Card>

      <SalonPhotoUpload
        photoUploads={photos}
        setPhotoUploads={onPhotosChange}
        maxPhotos={8}
      />

      {photos.length === 0 && (
        <div className="flex items-center gap-2 text-amber-600 mt-2 p-2 bg-amber-50 rounded-md border border-amber-200">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">
            {t({
              english: 'Adding photos greatly increases buyer interest and response rate',
              vietnamese: 'Thêm hình ảnh sẽ làm tăng đáng kể sự quan tâm và tỷ lệ phản hồi của người mua'
            })}
          </p>
        </div>
      )}

      {photos.length > 0 && photos.length < 3 && (
        <div className="flex items-center gap-2 text-amber-600 mt-2 p-2 bg-amber-50 rounded-md border border-amber-200">
          <Camera className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">
            {t({
              english: 'We recommend adding at least 5 photos for best results',
              vietnamese: 'Chúng tôi khuyên bạn nên thêm ít nhất 5 hình ảnh để có kết quả tốt nhất'
            })}
          </p>
        </div>
      )}

      {photos.length >= 5 && (
        <div className="flex items-center gap-2 text-green-600 mt-2 p-2 bg-green-50 rounded-md border border-green-200">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">
            {t({
              english: 'Great job! You have added enough photos to attract serious buyers',
              vietnamese: 'Tuyệt vời! Bạn đã thêm đủ hình ảnh để thu hút người mua tiềm năng'
            })}
          </p>
        </div>
      )}
    </div>
  );
};
