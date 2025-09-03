import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { DollarSign, TrendingUp, Users, Shield } from 'lucide-react';

const ValuePropsSection = () => {
  const { t } = useTranslation();

  const valueProps = [
    {
      icon: DollarSign,
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
    <section className="section-premium bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-hero-secondary mb-4">
            {t({ english: "Why choose our affiliate program?", vietnamese: "Tại sao chọn chương trình cộng tác viên của chúng tôi?" })}
          </h2>
          <p className="text-body-premium text-muted-foreground max-w-2xl mx-auto">
            {t({ 
              english: "Join thousands of creators earning real money by promoting the beauty industry's fastest-growing platform",
              vietnamese: "Tham gia cùng hàng nghìn người sáng tạo đang kiếm tiền thực sự bằng cách quảng bá nền tảng phát triển nhanh nhất trong ngành làm đẹp"
            })}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <div className="h-full value-card-premium p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${prop.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {t(prop.title)}
                  </h3>
                  <p className="text-body-premium text-muted-foreground">
                    {t(prop.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ValuePropsSection;