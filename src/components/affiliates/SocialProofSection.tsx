import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { Shield, TrendingUp, Clock, Award } from 'lucide-react';

const SocialProofSection = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: Shield,
      title: {
        english: "Stripe Connect",
        vietnamese: "Stripe Connect"
      } as Translation,
      subtitle: {
        english: "Secure Payments",
        vietnamese: "Thanh toán an toàn"
      } as Translation
    },
    {
      icon: TrendingUp,
      title: {
        english: "Real-time Analytics", 
        vietnamese: "Phân tích thời gian thực"
      } as Translation,
      subtitle: {
        english: "Live Dashboard",
        vietnamese: "Bảng điều khiển trực tiếp"
      } as Translation
    },
    {
      icon: Clock,
      title: {
        english: "24/7 Tracking",
        vietnamese: "Theo dõi 24/7"
      } as Translation,
      subtitle: {
        english: "Never Miss a Commission",
        vietnamese: "Không bao giờ bỏ lỡ hoa hồng"
      } as Translation
    },
    {
      icon: Award,
      title: {
        english: "Trusted Platform",
        vietnamese: "Nền tảng đáng tin cậy"
      } as Translation,
      subtitle: {
        english: "500+ Active Affiliates",
        vietnamese: "500+ cộng tác viên hoạt động"
      } as Translation
    }
  ];

  const testimonial = {
    quote: {
      english: "The EmviApp affiliate program has been incredibly transparent and profitable. Their real-time tracking and monthly payouts make it easy to build a sustainable income stream.",
      vietnamese: "Chương trình cộng tác viên EmviApp đã cực kỳ minh bạch và có lợi nhuận. Việc theo dõi thời gian thực và thanh toán hàng tháng giúp dễ dàng xây dựng một dòng thu nhập bền vững."
    } as Translation,
    author: {
      english: "Beauty Content Creator",
      vietnamese: "Người sáng tạo nội dung làm đẹp"
    } as Translation,
    metrics: {
      english: "Earning $2,400+ monthly",
      vietnamese: "Kiếm được $2,400+ hàng tháng"
    } as Translation
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        {/* Trust badges */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t({ english: "Trusted by Beauty Professionals Worldwide", vietnamese: "Được các chuyên gia làm đẹp trên toàn thế giới tin tưởng" })}
            </h2>
            <p className="text-muted-foreground">
              {t({ 
                english: "Built with enterprise-grade security and transparency",
                vietnamese: "Được xây dựng với tính bảo mật và minh bạch cấp doanh nghiệp"
              })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {badges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">
                    {t(badge.title)}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t(badge.subtitle)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="relative">
            {/* Quote background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent rounded-3xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl transform -rotate-1"></div>
            
            {/* Content */}
            <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl">
              <div className="text-center">
                {/* Quote icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg 
                    className="w-8 h-8 text-primary" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                  "{t(testimonial.quote)}"
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">BC</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground">
                      {t(testimonial.author)}
                    </div>
                    <div className="text-sm text-primary font-medium">
                      {t(testimonial.metrics)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { 
              number: "500+", 
              label: t({ english: "Active Affiliates", vietnamese: "Cộng tác viên hoạt động" }) 
            },
            { 
              number: "$1M+", 
              label: t({ english: "Paid in Commissions", vietnamese: "Đã trả hoa hồng" }) 
            },
            { 
              number: "99.9%", 
              label: t({ english: "Payment Reliability", vietnamese: "Độ tin cậy thanh toán" }) 
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;