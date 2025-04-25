
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

const FoundersEarlyAccess = () => {
  const { t } = useTranslation();
  
  const foundersPlans = [
    {
      id: 'artist',
      title: {
        english: 'Artist Access Pass',
        vietnamese: 'Vé Truy Cập Nghệ Sĩ'
      },
      price: 29,
      description: {
        english: 'Get premium tools & visibility at launch.',
        vietnamese: 'Nhận công cụ cao cấp & khả năng hiển thị khi ra mắt.'
      },
      buttonText: {
        english: 'Reserve My Artist Access',
        vietnamese: 'Đặt Trước Quyền Truy Cập Nghệ Sĩ'
      },
      stripeLink: '/checkout?plan=artist_access',
    },
    {
      id: 'salon',
      title: {
        english: 'Salon Pro Pass',
        vietnamese: 'Vé Chuyên Nghiệp Salon'
      },
      price: 79,
      description: {
        english: 'Unlock marketing tools & priority job listings.',
        vietnamese: 'Mở khóa công cụ tiếp thị & danh sách việc làm ưu tiên.'
      },
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
      description: {
        english: 'Enhance your profile & early booking features.',
        vietnamese: 'Nâng cao hồ sơ & tính năng đặt chỗ sớm.'
      },
      buttonText: {
        english: 'Join as Freelancer',
        vietnamese: 'Tham Gia với Tư Cách Freelancer'
      },
      stripeLink: '/checkout?plan=freelancer_boost',
    },
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <Badge 
            variant="outline" 
            className="mb-4 bg-primary/5 text-primary px-4 py-1.5"
          >
            {t({
              english: "Limited Time Offer",
              vietnamese: "Ưu Đãi Có Thời Hạn"
            })}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            {t({
              english: "🎉 Founder's Early Access",
              vietnamese: "🎉 Quyền Truy Cập Sớm Của Người Sáng Lập"
            })}
          </h2>
          <h3 className="text-xl md:text-2xl text-emvi-dark mb-4">
            {t({
              english: "Unlock 3 Months FREE + Lifetime Discount!",
              vietnamese: "Mở Khóa 3 Tháng MIỄN PHÍ + Giảm Giá Trọn Đời!"
            })}
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t({
              english: "Reserve your spot today with a small deposit and be part of EmviApp's VIP launch community.",
              vietnamese: "Đặt chỗ ngay hôm nay với một khoản đặt cọc nhỏ và trở thành một phần của cộng đồng ra mắt VIP của EmviApp."
            })}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {foundersPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full backdrop-blur-sm bg-white/90 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    <span className="text-xl mb-4">{t(plan.title)}</span>
                    <div className="text-3xl font-bold font-serif">
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
                  <p className="text-center text-gray-600 mb-6">
                    {t(plan.description)}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    className="w-full bg-emvi-accent hover:bg-emvi-accent/90"
                    size="lg"
                    onClick={() => window.location.href = plan.stripeLink}
                  >
                    {t(plan.buttonText)}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-emvi-accent font-medium">
            {t({
              english: "🚨 Limited Spots Available — Offer expires soon.",
              vietnamese: "🚨 Số Lượng Chỗ Có Hạn — Ưu đãi sẽ hết hạn sớm."
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundersEarlyAccess;
