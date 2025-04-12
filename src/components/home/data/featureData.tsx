
import React from "react";
import {
  Users,
  Store,
  ImageIcon,
  Home,
  Calendar,
  TrendingUp,
  Zap,
  Award,
  DollarSign,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const useFeatureData = () => {
  const { isVietnamese } = useTranslation();
  
  return [
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Hire Amazing Artists",
      description: isVietnamese 
        ? "Tìm thợ giỏi, dễ thương và chuyên nghiệp" 
        : "Find qualified, pre-screened nail techs and beauty professionals for your salon."
    },
    {
      icon: <Store className="h-6 w-6 text-primary" />,
      title: "Find Your Next Salon",
      description: isVietnamese 
        ? "Tìm tiệm phù hợp nhanh chóng" 
        : "Browse salon listings and connect directly with owners looking to sell."
    },
    {
      icon: <ImageIcon className="h-6 w-6 text-primary" />,
      title: "Post Your Portfolio",
      description: isVietnamese 
        ? "Đăng hình ảnh tác phẩm của bạn" 
        : "Showcase your best work and attract clients who love your style."
    },
    {
      icon: <Home className="h-6 w-6 text-primary" />,
      title: "Rent or List Booths",
      description: isVietnamese 
        ? "Thuê ghế hoặc đăng tìm thợ dễ dàng" 
        : "Find the perfect spot to grow your business or fill your empty chairs."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Stay Booked & Grow Income",
      description: isVietnamese 
        ? "Tăng thu nhập, giữ khách đều đặn" 
        : "Manage appointments and increase your revenue with smart tools."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "Track Earnings & Analytics",
      description: isVietnamese 
        ? "Theo dõi tiền tip, doanh thu, và hiệu suất" 
        : "See your growth with easy-to-understand metrics and insights."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Get Discovered Online",
      description: isVietnamese 
        ? "Cho người ta thấy tài năng của bạn" 
        : "Get discovered and build your following with social boosting."
    },
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Go Viral With Your Work",
      description: isVietnamese 
        ? "Dễ lan toả trên mạng xã hội" 
        : "Stand out with professional tools designed for the beauty industry."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      title: "Get Paid Weekly",
      description: isVietnamese 
        ? "Thanh toán thường xuyên không trễ hẹn" 
        : "Find opportunities with regular pay schedules that respect your value."
    }
  ];
};
