
import React from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

// Configuration for easy updates to pricing, features, etc.
const PRICING_CONFIG = {
  discountPercentage: 50,
  currency: '$',
  plans: [
    {
      id: 'starter',
      name: {
        english: 'Starter',
        vietnamese: 'Khởi Đầu'
      },
      originalPrice: 19.99,
      description: {
        english: 'Perfect for individuals starting their beauty journey',
        vietnamese: 'Hoàn hảo cho cá nhân bắt đầu hành trình làm đẹp'
      },
      features: [
        {
          english: 'Basic listing promotion',
          vietnamese: 'Quảng bá danh sách cơ bản'
        },
        {
          english: 'Email support',
          vietnamese: 'Hỗ trợ qua email'
        },
        {
          english: 'Mobile app access',
          vietnamese: 'Truy cập ứng dụng di động'
        },
        {
          english: '1 free job posting',
          vietnamese: '1 đăng tin tuyển dụng miễn phí'
        },
      ],
      popular: false,
      buttonText: {
        english: 'Start Free Trial',
        vietnamese: 'Bắt Đầu Dùng Thử'
      },
      accent: false
    },
    {
      id: 'pro',
      name: {
        english: 'Pro',
        vietnamese: 'Chuyên Nghiệp'
      },
      originalPrice: 29.99,
      description: {
        english: 'For growing beauty professionals and small salons',
        vietnamese: 'Dành cho các chuyên gia làm đẹp đang phát triển và các tiệm nhỏ'
      },
      features: [
        {
          english: 'Enhanced visibility',
          vietnamese: 'Khả năng hiển thị nâng cao'
        },
        {
          english: 'Priority support',
          vietnamese: 'Hỗ trợ ưu tiên'
        },
        {
          english: 'Analytics dashboard',
          vietnamese: 'Bảng điều khiển phân tích'
        },
        {
          english: '3 free job postings',
          vietnamese: '3 đăng tin tuyển dụng miễn phí'
        },
        {
          english: 'Client management tools',
          vietnamese: 'Công cụ quản lý khách hàng'
        }
      ],
      popular: true,
      buttonText: {
        english: 'Start Free Trial',
        vietnamese: 'Bắt Đầu Dùng Thử'
      },
      accent: true
    },
    {
      id: 'ultimate',
      name: {
        english: 'Ultimate',
        vietnamese: 'Cao Cấp'
      },
      originalPrice: 49.99,
      description: {
        english: 'Complete solution for established salons and chains',
        vietnamese: 'Giải pháp toàn diện cho các tiệm đã thành lập và chuỗi tiệm'
      },
      features: [
        {
          english: 'Maximum visibility',
          vietnamese: 'Khả năng hiển thị tối đa'
        },
        {
          english: 'Dedicated account manager',
          vietnamese: 'Người quản lý tài khoản riêng'
        },
        {
          english: 'Advanced analytics & reports',
          vietnamese: 'Phân tích & báo cáo nâng cao'
        },
        {
          english: 'Unlimited job postings',
          vietnamese: 'Đăng tin tuyển dụng không giới hạn'
        },
        {
          english: 'Team collaboration tools',
          vietnamese: 'Công cụ cộng tác nhóm'
        },
        {
          english: 'White-label booking system',
          vietnamese: 'Hệ thống đặt chỗ white-label'
        }
      ],
      popular: false,
      buttonText: {
        english: 'Start Free Trial',
        vietnamese: 'Bắt Đầu Dùng Thử'
      },
      accent: false
    }
  ]
};

const PricingSection: React.FC = () => {
  const { t } = useTranslation();
  
  const calculateDiscountedPrice = (originalPrice: number) => {
    const discount = originalPrice * (PRICING_CONFIG.discountPercentage / 100);
    return (originalPrice - discount).toFixed(2);
  };

  return (
    <section className="py-16 md:py-24 w-full bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-emvi-accent">
            {t({
              english: "Premium Plans for Beauty Professionals",
              vietnamese: "Gói Cao Cấp cho Chuyên Gia Làm Đẹp"
            })}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {t({
              english: "Choose the perfect plan to elevate your beauty business",
              vietnamese: "Chọn gói hoàn hảo để nâng tầm doanh nghiệp làm đẹp của bạn"
            })}
          </p>
          <div className="inline-block bg-purple-100 rounded-full px-4 py-2 text-sm text-purple-700 font-medium">
            {t({
              english: "50% OFF for founding members",
              vietnamese: "Giảm 50% cho thành viên sáng lập"
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_CONFIG.plans.map((plan) => (
            <div key={plan.id} className={`relative flex flex-col ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}>
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-5 inset-x-0 flex justify-center">
                  <Badge className="bg-[#FF7743] text-white border-0 px-3 py-1 text-sm font-medium">
                    {t({
                      english: "MOST POPULAR",
                      vietnamese: "PHỔ BIẾN NHẤT"
                    })}
                  </Badge>
                </div>
              )}
              
              <Card className={`flex-1 overflow-hidden backdrop-blur-sm bg-white/90 border border-purple-100 ${
                plan.popular 
                  ? 'shadow-lg shadow-purple-200/50 ring-2 ring-purple-200' 
                  : 'shadow-md shadow-purple-100/30'
                } rounded-2xl transition-all hover:shadow-xl hover:shadow-purple-200/40`}
              >
                <div className="p-6 md:p-8">
                  {/* Plan name and description */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold font-playfair mb-2">{t(plan.name)}</h3>
                    <p className="text-gray-600 text-sm">{t(plan.description)}</p>
                  </div>
                  
                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-1">
                      <span className="text-gray-400 line-through text-lg mr-2">
                        {PRICING_CONFIG.currency}{plan.originalPrice}
                      </span>
                      <Badge className="bg-[#FF7743] text-white border-0">
                        {PRICING_CONFIG.discountPercentage}% OFF
                      </Badge>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-gray-500 mr-1">{PRICING_CONFIG.currency}</span>
                      <span className={`text-4xl font-bold ${plan.accent ? 'text-emvi-accent' : 'text-purple-700'}`}>
                        {calculateDiscountedPrice(plan.originalPrice)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      {t({
                        english: "Lock in this price for life—limited time only!",
                        vietnamese: "Giữ giá này trọn đời—chỉ giới hạn thời gian!"
                      })}
                    </p>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className={`h-5 w-5 flex-shrink-0 ${plan.accent ? 'text-emvi-accent' : 'text-purple-600'} mr-2`} />
                        <span className="text-gray-700 text-sm">{t(feature)}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Button */}
                  <Button 
                    className={`w-full py-6 text-white font-bold rounded-xl transition-transform hover:scale-[1.02] ${
                      plan.accent 
                        ? 'bg-emvi-accent hover:bg-emvi-accent/90 shadow-lg shadow-emvi-accent/20' 
                        : 'bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-600/20'
                    }`}
                  >
                    {t(plan.buttonText)}
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            {t({
              english: "All plans include a 14-day free trial. No credit card required.",
              vietnamese: "Tất cả các gói bao gồm dùng thử miễn phí 14 ngày. Không cần thẻ tín dụng."
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
