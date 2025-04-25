import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const DepositOptions = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      id: 'artist',
      title: {
        english: 'Artist Access Pass',
        vietnamese: 'Vé Truy Cập Nghệ Sĩ'
      },
      price: 29,
      benefits: [
        {
          english: 'Get premium tools & visibility at launch',
          vietnamese: 'Nhận công cụ cao cấp & khả năng hiển thị khi ra mắt'
        },
        {
          english: 'Client booking priority',
          vietnamese: 'Ưu tiên đặt chỗ khách hàng'
        }
      ],
      buttonText: {
        english: 'Reserve My Artist Access',
        vietnamese: 'Đặt Trước Quyền Truy Cập Nghệ Sĩ'
      },
      stripeLink: '/checkout?plan=artist_access',
    },
    {
      id: 'salon',
      featured: true,
      title: {
        english: 'Salon Pro Pass',
        vietnamese: 'Vé Chuyên Nghiệp Salon'
      },
      price: 79,
      benefits: [
        {
          english: 'Unlock marketing tools & priority listings',
          vietnamese: 'Mở khóa công cụ tiếp thị & danh sách ưu tiên'
        },
        {
          english: 'Team management dashboard',
          vietnamese: 'Bảng điều khiển quản lý nhóm'
        }
      ],
      buttonText: {
        english: 'Secure My Salon Spot',
        vietnamese: 'Đảm Bảo Vị Trí Salon Của Tôi'
      },
      stripeLink: '/checkout?plan=salon_pro',
    },
    {
      id: 'freelancer',
      title: {
        english: 'Freelancer Boost Pass',
        vietnamese: 'Vé Tăng Cường Freelancer'
      },
      price: 39,
      benefits: [
        {
          english: 'Enhance your profile & early booking',
          vietnamese: 'Nâng cao hồ sơ & đặt chỗ sớm'
        },
        {
          english: 'Business growth tools',
          vietnamese: 'Công cụ tăng trưởng kinh doanh'
        }
      ],
      buttonText: {
        english: 'Join as Freelancer',
        vietnamese: 'Tham Gia với Tư Cách Freelancer'
      },
      stripeLink: '/checkout?plan=freelancer_boost',
    }
  ];

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {t({
            english: "Not ready for full commitment?",
            vietnamese: "Chưa sẵn sàng cam kết đầy đủ?"
          })}
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t({
            english: "Reserve your spot with a small deposit",
            vietnamese: "Đặt chỗ của bạn với một khoản đặt cọc nhỏ"
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`h-full transform transition-all duration-300 hover:scale-[1.02] ${
              plan.featured ? 'shadow-xl ring-2 ring-emvi-accent' : 'shadow-lg hover:shadow-xl'
            }`}>
              <div className={`bg-gradient-to-r ${
                plan.featured 
                  ? 'from-emvi-accent to-purple-400' 
                  : 'from-gray-100 to-gray-200'
              } h-2 rounded-t-lg`} />
              
              <CardHeader>
                <CardTitle className="text-xl text-center">
                  {t(plan.title)}
                  <div className="text-3xl font-bold mt-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    ${plan.price}
                    <span className="text-base ml-1 text-gray-500">
                      {t({
                        english: "deposit",
                        vietnamese: "đặt cọc"
                      })}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {plan.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{t(benefit)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-4">
                <Button 
                  className={`w-full transform transition-all duration-200 ${
                    plan.featured 
                      ? 'bg-emvi-accent hover:bg-emvi-accent/90' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => window.location.href = plan.stripeLink}
                >
                  {t(plan.buttonText)}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DepositOptions;
