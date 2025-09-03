import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { DollarSign, TrendingUp, Users, Shield, Calculator } from 'lucide-react';
import { flags } from '@/utils/featureFlags';
import { 
  PayoutIllustration, 
  AnalyticsIllustration, 
  CommunityIllustration, 
  FreedomIllustration 
} from './IconIllustrations';

const ValuePropsSection = () => {
  const { t } = useTranslation();

  const valueProps = [
    {
      icon: DollarSign,
      illustration: PayoutIllustration,
      title: {
        english: "Real monthly payouts",
        vietnamese: "Thanh toán hàng tháng thực tế"
      } as Translation,
      description: {
        english: "Get paid monthly via Stripe Connect with transparent reporting",
        vietnamese: "Được trả lương hàng tháng qua Stripe Connect với báo cáo minh bạch"
      } as Translation,
      gradient: "from-green-500/20 to-emerald-500/10"
    },
    {
      icon: TrendingUp,
      illustration: AnalyticsIllustration,
      title: {
        english: "Track clicks & conversions",
        vietnamese: "Theo dõi lượt nhấp & chuyển đổi"
      } as Translation,
      description: {
        english: "Real-time analytics dashboard with detailed performance metrics",
        vietnamese: "Bảng điều khiển phân tích thời gian thực với các chỉ số hiệu suất chi tiết"
      } as Translation,
      gradient: "from-blue-500/20 to-indigo-500/10"
    },
    {
      icon: Shield,
      illustration: FreedomIllustration,
      title: {
        english: "No lock-in",
        vietnamese: "Không bị ràng buộc"
      } as Translation,
      description: {
        english: "Join or leave anytime with no minimum commitments required",
        vietnamese: "Tham gia hoặc rời đi bất kỳ lúc nào mà không cần cam kết tối thiểu"
      } as Translation,
      gradient: "from-purple-500/20 to-pink-500/10"
    },
    {
      icon: Users,
      illustration: CommunityIllustration,
      title: {
        english: "Trusted by the community",
        vietnamese: "Được cộng đồng tin tưởng"
      } as Translation,
      description: {
        english: "Join 500+ creators earning with our transparent affiliate program",
        vietnamese: "Tham gia cùng 500+ người sáng tạo đang kiếm tiền với chương trình cộng tác viên minh bạch"
      } as Translation,
      gradient: "from-orange-500/20 to-red-500/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section className="section-premium bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-5 md:px-6 max-w-[680px] md:max-w-7xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-section-title mb-6 md:mb-8 max-w-[22ch] md:max-w-5xl mx-auto">
            {t({ english: "Why choose our affiliate program?", vietnamese: "Tại sao chọn chương trình cộng tác viên của chúng tôi?" })}
          </h2>
          <p className="text-base md:text-body-large text-muted-foreground max-w-[46ch] md:max-w-4xl mx-auto font-medium">
            {t({ 
              english: "Join thousands of creators earning real money by promoting the beauty industry's fastest-growing platform",
              vietnamese: "Tham gia cùng hàng nghìn người sáng tạo đang kiếm tiền thực sự bằng cách quảng bá nền tảng phát triển nhanh nhất trong ngành làm đẹp"
            })}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-7xl mx-auto mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon;
            const IllustrationComponent = prop.illustration;
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="h-full value-card-premium p-6 md:p-10 text-center group cursor-pointer relative">
                  {/* Gradient Halo Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Custom SVG Illustrations */}
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br ${prop.gradient} flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                      {/* Premium inline SVG illustrations */}
                      {index === 0 && (
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-primary" viewBox="0 0 48 48" fill="none">
                          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="3"/>
                          <path d="M18 20L24 26L30 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M24 14V26" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          <path d="M16 34H32" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-primary" viewBox="0 0 48 48" fill="none">
                          <path d="M6 36L18 24L22 28L42 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M34 8H42V16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="6" y="36" width="36" height="6" rx="2" fill="currentColor" opacity="0.2"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-primary" viewBox="0 0 48 48" fill="none">
                          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" strokeWidth="3"/>
                          <path d="M18 24L22 28L30 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M24 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M24 36V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className="w-8 h-8 md:w-12 md:h-12 text-primary" viewBox="0 0 48 48" fill="none">
                          <circle cx="24" cy="12" r="6" stroke="currentColor" strokeWidth="3"/>
                          <circle cx="12" cy="36" r="6" stroke="currentColor" strokeWidth="3"/>
                          <circle cx="36" cy="36" r="6" stroke="currentColor" strokeWidth="3"/>
                          <path d="M18 18L18 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          <path d="M30 18L30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          <path d="M18 30L30 30" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                    {t(prop.title)}
                  </h3>
                  <p className="text-sm md:text-body-premium text-muted-foreground leading-relaxed">
                    {t(prop.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center glass-hero-card p-8 md:p-16 border-2 border-primary/20 relative overflow-hidden group max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 space-y-8">
            <div className="inline-flex p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 border-2 border-primary/20 shadow-lg">
              <Calculator className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-hero-secondary text-gray-900 max-w-[20ch] md:max-w-3xl mx-auto">
                Calculate Your Potential Earnings
              </h3>
              <p className="text-base md:text-body-large text-gray-600 max-w-[46ch] md:max-w-4xl mx-auto">
                See how much you could earn based on your audience and engagement with our sophisticated earnings calculator
              </p>
            </div>
            <Button 
              size="lg" 
              className="btn-magnetic focus-ring-premium text-white h-12 md:h-16 px-8 md:px-12 text-lg md:text-xl font-bold min-w-[200px] md:min-w-[300px] rounded-xl md:rounded-2xl shadow-2xl touch-manipulation"
            >
              Try Calculator
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropsSection;