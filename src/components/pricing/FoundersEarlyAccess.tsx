
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
      featured: true,
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
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foundersPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`h-full transform transition-all duration-300 hover:scale-[1.02] ${
                plan.featured ? 'shadow-xl ring-2 ring-emvi-accent/20' : 'shadow-lg'
              }`}>
                <div className={`bg-gradient-to-r ${
                  plan.featured 
                    ? 'from-emvi-accent/20 to-purple-200/20' 
                    : 'from-gray-50 to-gray-100/50'
                } h-2 rounded-t-lg`} />
                
                <CardHeader>
                  <CardTitle className="flex flex-col items-center space-y-4">
                    {plan.featured && (
                      <Badge 
                        variant="outline" 
                        className="mb-2 bg-emvi-accent/5 text-emvi-accent border-emvi-accent/20"
                      >
                        Most Popular
                      </Badge>
                    )}
                    <span className="text-xl font-semibold">{t(plan.title)}</span>
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

                <CardFooter>
                  <Button 
                    className={`w-full ${
                      plan.featured 
                        ? 'bg-emvi-accent hover:bg-emvi-accent/90' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
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
      </div>
    </section>
  );
};

export default FoundersEarlyAccess;
