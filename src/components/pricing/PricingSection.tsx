
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MobileButton } from '@/components/ui/mobile-button';

// Configuration for easy updates
const PRICING_CONFIG = {
  discountPercentage: 50,
  accentColor: '#9b87f5', // EmviApp purple
  badgeColor: '#FF7743', // Orange accent
  plans: [
    {
      name: {
        english: 'Starter',
        vietnamese: 'Khởi Đầu'
      },
      description: {
        english: 'Perfect for individuals getting started',
        vietnamese: 'Hoàn hảo cho cá nhân bắt đầu'
      },
      originalPrice: 19.99,
      discountedPrice: 9.99,
      features: [
        {
          english: '3 Job Listings per month',
          vietnamese: '3 Danh sách công việc mỗi tháng'
        },
        {
          english: 'Basic Profile Visibility',
          vietnamese: 'Khả năng hiển thị hồ sơ cơ bản'
        },
        {
          english: 'Standard Client Management',
          vietnamese: 'Quản lý khách hàng tiêu chuẩn'
        },
        {
          english: 'Mobile Access',
          vietnamese: 'Truy cập di động'
        },
        {
          english: 'Basic Appointment Scheduling',
          vietnamese: 'Lập lịch hẹn cơ bản'
        }
      ]
    },
    {
      name: {
        english: 'Pro',
        vietnamese: 'Chuyên Nghiệp'
      },
      description: {
        english: 'For growing professionals and businesses',
        vietnamese: 'Cho các chuyên gia và doanh nghiệp đang phát triển'
      },
      originalPrice: 29.99,
      discountedPrice: 14.99,
      popular: true,
      features: [
        {
          english: '10 Job Listings per month',
          vietnamese: '10 Danh sách công việc mỗi tháng'
        },
        {
          english: 'Enhanced Profile Visibility',
          vietnamese: 'Khả năng hiển thị hồ sơ nâng cao'
        },
        {
          english: 'Advanced Client Management',
          vietnamese: 'Quản lý khách hàng nâng cao'
        },
        {
          english: 'Featured Placement',
          vietnamese: 'Vị trí nổi bật'
        },
        {
          english: 'Priority Support',
          vietnamese: 'Hỗ trợ ưu tiên'
        },
        {
          english: 'Advanced Appointment Scheduling',
          vietnamese: 'Lập lịch hẹn nâng cao'
        },
        {
          english: 'Monthly Analytics Reports',
          vietnamese: 'Báo cáo phân tích hàng tháng'
        }
      ]
    },
    {
      name: {
        english: 'Ultimate',
        vietnamese: 'Tối Thượng'
      },
      description: {
        english: 'For established salons and power users',
        vietnamese: 'Cho các tiệm nail đã thành lập và người dùng nâng cao'
      },
      originalPrice: 49.99,
      discountedPrice: 24.99,
      features: [
        {
          english: 'Unlimited Job Listings',
          vietnamese: 'Danh sách công việc không giới hạn'
        },
        {
          english: 'Maximum Profile Visibility',
          vietnamese: 'Khả năng hiển thị hồ sơ tối đa'
        },
        {
          english: 'Premium Client Management',
          vietnamese: 'Quản lý khách hàng cao cấp'
        },
        {
          english: 'Featured Placement',
          vietnamese: 'Vị trí nổi bật'
        },
        {
          english: 'Priority Support',
          vietnamese: 'Hỗ trợ ưu tiên'
        },
        {
          english: 'Premium Appointment Scheduling',
          vietnamese: 'Lập lịch hẹn cao cấp'
        },
        {
          english: 'Weekly Analytics Reports',
          vietnamese: 'Báo cáo phân tích hàng tuần'
        },
        {
          english: 'Dedicated Account Manager',
          vietnamese: 'Người quản lý tài khoản chuyên biệt'
        }
      ]
    }
  ]
};

const PricingSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-4 bg-gradient-to-r from-purple-600 to-emvi-accent bg-clip-text text-transparent">
            {t({
              english: "Pricing that Delivers Value",
              vietnamese: "Giá Cả Mang Lại Giá Trị"
            })}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            {t({
              english: "Whether you're a freelance artist, salon owner, or beauty enterprise, our pricing is crafted to ensure your investment pays off.",
              vietnamese: "Dù bạn là nghệ sĩ tự do, chủ salon, hay doanh nghiệp làm đẹp, giá của chúng tôi được thiết kế để đảm bảo đầu tư của bạn sinh lời."
            })}
          </p>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_CONFIG.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden bg-white backdrop-blur-sm bg-opacity-90 shadow-lg border border-gray-100 ${
                plan.popular ? 'ring-2 ring-emvi-accent' : ''
              }`}
              style={{
                boxShadow: plan.popular 
                  ? '0 10px 30px -5px rgba(155, 135, 245, 0.3)' 
                  : '0 10px 30px -5px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <Badge 
                  className="absolute top-4 right-4 bg-[#FF7743] text-white border-0 font-medium px-3 py-1"
                >
                  {t({
                    english: "Most Popular",
                    vietnamese: "Phổ Biến Nhất"
                  })}
                </Badge>
              )}
              
              {/* Plan header */}
              <div className={`p-6 ${plan.popular ? 'bg-purple-50' : ''}`}>
                <h3 className="text-xl font-bold font-playfair">
                  {t(plan.name)}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{t(plan.description)}</p>
              </div>
              
              {/* Plan pricing */}
              <div className="px-6 py-4 border-t border-b border-gray-100">
                {/* Discount badge */}
                <Badge 
                  className="bg-[#FF7743] text-white border-0 mb-2 font-medium"
                >
                  {PRICING_CONFIG.discountPercentage}% OFF
                </Badge>
                
                {/* Original price */}
                <div className="line-through text-gray-400 text-sm">
                  ${plan.originalPrice.toFixed(2)}/{t({english: "month", vietnamese: "tháng"})}
                </div>
                
                {/* Discounted price */}
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-emvi-accent">
                    ${plan.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-500 ml-1 mb-1">
                    /{t({english: "month", vietnamese: "tháng"})}
                  </span>
                </div>
                
                {/* Lock-in price message */}
                <p className="text-xs text-gray-500 mt-2 italic">
                  {t({
                    english: "Lock in this price for life—limited time only!",
                    vietnamese: "Giữ nguyên giá này mãi mãi—chỉ trong thời gian giới hạn!"
                  })}
                </p>
              </div>
              
              {/* Features list */}
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2 mt-0.5" />
                      <span className="text-gray-700">{t(feature)}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Action button */}
                <div className="mt-8">
                  <MobileButton
                    className={`w-full py-3 ${
                      plan.popular ? 'bg-emvi-accent hover:bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
                    } text-white font-medium rounded-xl transition-transform transform hover:scale-105 shadow-md`}
                  >
                    {t({
                      english: "Start Free Trial",
                      vietnamese: "Bắt Đầu Dùng Thử"
                    })}
                  </MobileButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Save reminder */}
        <div className="text-center text-gray-500 text-sm mb-16">
          {t({
            english: "All plans include a 14-day free trial. No credit card required to start.",
            vietnamese: "Tất cả các gói đều có 14 ngày dùng thử miễn phí. Không cần thẻ tín dụng để bắt đầu."
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
