import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { UserPlus, Share, DollarSign } from 'lucide-react';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: {
        english: "Apply & get your link",
        vietnamese: "Đăng ký & nhận liên kết của bạn"
      } as Translation,
      description: {
        english: "Complete our simple application process and get approved within 24 hours. Receive your unique tracking link.",
        vietnamese: "Hoàn thành quy trình đăng ký đơn giản và được phê duyệt trong vòng 24 giờ. Nhận liên kết theo dõi duy nhất của bạn."
      } as Translation,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      icon: Share,
      title: {
        english: "Share with salons/artists",
        vietnamese: "Chia sẻ với salon/nghệ sĩ"
      } as Translation,
      description: {
        english: "Promote EmviApp to beauty professionals through your content, social media, or direct outreach using your tracking link.",
        vietnamese: "Quảng bá EmviApp cho các chuyên gia làm đẹp thông qua nội dung, mạng xã hội hoặc tiếp cận trực tiếp bằng liên kết theo dõi của bạn."
      } as Translation,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      icon: DollarSign,
      title: {
        english: "Earn payouts via Stripe Connect",
        vietnamese: "Nhận thanh toán qua Stripe Connect"
      } as Translation,
      description: {
        english: "Earn 30% recurring commissions on all subscriptions. Get paid monthly via secure Stripe Connect transfers.",
        vietnamese: "Kiếm hoa hồng định kỳ 30% trên tất cả các gói đăng ký. Được trả tiền hàng tháng qua chuyển khoản Stripe Connect an toàn."
      } as Translation,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t({ english: "How It Works", vietnamese: "Cách thức hoạt động" })}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t({ 
              english: "Start earning with our affiliate program in just 3 simple steps",
              vietnamese: "Bắt đầu kiếm tiền với chương trình cộng tác viên của chúng tôi chỉ trong 3 bước đơn giản"
            })}
          </p>
        </motion.div>

        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Connecting line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform translate-x-1/2 z-0"></div>
                  )}
                  
                  <div className="relative z-10 text-center group">
                    {/* Step number */}
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 mb-6 group-hover:scale-110 transition-all duration-300"
                      whileHover={{ y: -4 }}
                    >
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
                      {t(step.title)}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      {t(step.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional info */}
        <motion.div 
          className="text-center mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/10">
            <h4 className="text-lg font-semibold mb-3 text-foreground">
              {t({ english: "Ready to get started?", vietnamese: "Sẵn sàng bắt đầu?" })}
            </h4>
            <p className="text-muted-foreground mb-4">
              {t({ 
                english: "Join hundreds of creators already earning with our transparent, high-converting affiliate program.",
                vietnamese: "Tham gia cùng hàng trăm người sáng tạo đã kiếm tiền với chương trình cộng tác viên minh bạch, chuyển đổi cao của chúng tôi."
              })}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {t({ english: "90-day cookie", vietnamese: "Cookie 90 ngày" })}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {t({ english: "30% commission", vietnamese: "Hoa hồng 30%" })}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                {t({ english: "Monthly payouts", vietnamese: "Thanh toán hàng tháng" })}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;