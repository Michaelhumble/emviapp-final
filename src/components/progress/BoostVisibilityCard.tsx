
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Star, Zap, ShoppingCart } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export interface BoostVisibilityCardProps {
  boostStatus?: any;
  credits?: number;
  loading?: boolean;
}

// Updated BoostVisibilityCard component to fix t() usage
const BoostVisibilityCard = ({ boostStatus = {}, credits = 0, loading = false }: BoostVisibilityCardProps) => {
  const { isVietnamese } = useTranslation();
  
  // Translation text
  const boostVisibilityText = isVietnamese ? "Tăng Khả Năng Hiển Thị" : "Boost Your Visibility";
  const standOutText = isVietnamese ? "Nổi bật khỏi đám đông và có được nhiều khách hàng hơn với các tùy chọn quảng cáo này." : "Stand out from the crowd and get more clients with these promotional options.";
  const featuredArtistText = isVietnamese ? "Vị Trí Nghệ Sĩ Nổi Bật" : "Featured Artist Spot";
  const appearHomepageText = isVietnamese ? "Xuất hiện trên trang chủ và nhận được nhiều lượt xem hồ sơ gấp 5 lần" : "Appear on the homepage and get 5x more profile views";
  const applyNowText = isVietnamese ? "Đăng Ký Ngay" : "Apply Now";
  const verifiedBadgeText = isVietnamese ? "Huy Hiệu Đã Xác Minh" : "Verified Badge";
  const gainClientTrustText = isVietnamese ? "Có được sự tin tưởng của khách hàng với xác minh chất lượng của chúng tôi" : "Gain client trust with our quality verification";
  const getVerifiedText = isVietnamese ? "Xác Minh" : "Get Verified";
  const specialOfferText = isVietnamese ? "Gói Ưu Đãi Đặc Biệt" : "Special Offer Bundle";
  const getFeaturedVerifiedText = isVietnamese ? "Nhận nổi bật, huy hiệu đã xác minh và hỗ trợ ưu tiên cùng nhau" : "Get featured, verified badge, and priority support together";
  const getBundleText = isVietnamese ? "Nhận Gói" : "Get The Bundle";
  
  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center text-blue-700">
          <TrendingUp className="mr-2 h-5 w-5 text-blue-500" />
          {boostVisibilityText}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          {standOutText}
        </p>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <Star className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">
                  {featuredArtistText}
                </h3>
                <p className="text-xs text-blue-700 mb-2">
                  {appearHomepageText}
                </p>
                <Button size="sm" variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
                  {applyNowText}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg border border-amber-100">
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-amber-800">
                  {verifiedBadgeText}
                </h3>
                <p className="text-xs text-amber-700 mb-2">
                  {gainClientTrustText}
                </p>
                <Button size="sm" variant="outline" className="bg-white border-amber-200 text-amber-700 hover:bg-amber-50">
                  {getVerifiedText}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-100">
            <div className="flex items-start">
              <ShoppingCart className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-purple-800">
                  {specialOfferText}
                </h3>
                <p className="text-xs text-purple-700 mb-2">
                  {getFeaturedVerifiedText}
                </p>
                <div className="flex items-center mb-2">
                  <span className="text-xs line-through text-gray-500 mr-2">$29.99</span>
                  <span className="text-sm font-bold text-purple-700">$19.99</span>
                </div>
                <Button size="sm" variant="outline" className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50">
                  {getBundleText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostVisibilityCard;
