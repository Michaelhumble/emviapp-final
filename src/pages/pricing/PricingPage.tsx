
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import FoundersEarlyAccess from '@/components/pricing/FoundersEarlyAccess';
import { GradientBackground } from '@/components/ui/gradient-background';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { Check, Star, Heart } from 'lucide-react';

const PricingPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle minimal={false} />
      </div>
      
      {/* Hero Section */}
      <GradientBackground variant="default" className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge 
              variant="outline" 
              className="mb-6 text-lg font-semibold px-4 py-1.5 bg-white/80 backdrop-blur-sm"
            >
              🚨 {t({
                english: "Limited Spots — Offer Ends Soon",
                vietnamese: "Số lượng có hạn — Ưu đãi sắp kết thúc"
              })}
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
              {t({
                english: "Unlock Your VIP Access to EmviApp — The Future of Beauty Business",
                vietnamese: "Mở khóa Quyền Truy Cập VIP vào EmviApp — Tương Lai của Kinh Doanh Làm Đẹp"
              })}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              {t({
                english: "Join thousands securing exclusive early access, lifetime discounts, and powerful tools to grow your beauty career.",
                vietnamese: "Tham gia cùng hàng nghìn người bảo đảm quyền truy cập sớm độc quyền, giảm giá trọn đời và các công cụ mạnh mẽ để phát triển sự nghiệp làm đẹp của bạn."
              })}
            </p>
          </motion.div>
        </div>
      </GradientBackground>

      {/* Founding Member Special (Main Focus) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-10">
            {t({
              english: "Founding Member Special",
              vietnamese: "Ưu Đãi Thành Viên Sáng Lập"
            })}
          </h2>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="flex flex-col items-center gap-3 mb-8">
              <span className="text-xl text-gray-500 line-through">
                $5,999/year
              </span>
              <span className="text-4xl md:text-5xl font-bold text-emvi-accent font-playfair">
                $99
                <span className="text-xl text-gray-600 font-normal">/year</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {t({
                    english: "Lifetime Discount",
                    vietnamese: "Giảm giá trọn đời"
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {t({
                    english: "3 Months Free",
                    vietnamese: "Miễn phí 3 tháng"
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {t({
                    english: "Priority Support",
                    vietnamese: "Hỗ trợ ưu tiên"
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>
                  {t({
                    english: "VIP Badge in Profile",
                    vietnamese: "Huy hiệu VIP trong hồ sơ"
                  })}
                </span>
              </div>
            </div>
            
            <Button 
              size="lg"
              className="bg-emvi-accent hover:bg-emvi-accent/90 text-white px-8 py-6 h-auto text-lg font-medium"
            >
              {t({
                english: "Claim My Founding Member Access",
                vietnamese: "Nhận Quyền Truy Cập Thành Viên Sáng Lập Của Tôi"
              })}
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Deposit Pass Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            {t({
              english: "Not ready for full commitment?",
              vietnamese: "Chưa sẵn sàng cho cam kết đầy đủ?"
            })}
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            {t({
              english: "Reserve your spot with a small deposit!",
              vietnamese: "Đặt chỗ của bạn với một khoản đặt cọc nhỏ!"
            })}
          </p>
          
          {/* Passing this to the FoundersEarlyAccess component that has the cards */}
          <FoundersEarlyAccess />
        </div>
      </section>

      {/* Referral Banner */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4">
            {t({
              english: "Invite Friends & Earn Rewards",
              vietnamese: "Mời Bạn Bè & Nhận Phần Thưởng"
            })}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {t({
              english: "Invite friends now and unlock exclusive bonuses when EmviApp launches!",
              vietnamese: "Mời bạn bè ngay và mở khóa phần thưởng độc quyền khi EmviApp ra mắt!"
            })}
          </p>
          <Button 
            size="lg"
            className="bg-emvi-accent hover:bg-emvi-accent/90"
          >
            {t({
              english: "Generate My Referral Link",
              vietnamese: "Tạo Liên Kết Giới Thiệu"
            })}
          </Button>
        </div>
      </motion.section>

      {/* Urgency + Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="h-6 w-6 text-yellow-500" />
            <Star className="h-6 w-6 text-yellow-500" />
            <Star className="h-6 w-6 text-yellow-500" />
            <Star className="h-6 w-6 text-yellow-500" />
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-medium mb-8">
            {t({
              english: "2,500+ Beauty Pros Trust EmviApp",
              vietnamese: "2,500+ Chuyên Gia Làm Đẹp Tin Tưởng EmviApp"
            })}
          </h3>
          
          <p className="text-lg text-emvi-accent font-medium max-w-3xl mx-auto mb-16">
            {t({
              english: "These offers will never return once we launch publicly.",
              vietnamese: "Những ưu đãi này sẽ không bao giờ trở lại khi chúng tôi ra mắt công khai."
            })}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-playfair font-bold mb-12 text-center">
            {t({
              english: "Frequently Asked Questions",
              vietnamese: "Câu Hỏi Thường Gặp"
            })}
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-2">
                {t({
                  english: "When will EmviApp launch?",
                  vietnamese: "Khi nào EmviApp sẽ ra mắt?"
                })}
              </h4>
              <p className="text-gray-600">
                {t({
                  english: "EmviApp is scheduled to launch in Q3 2023. Founding members will get early access at least 30 days before public launch.",
                  vietnamese: "EmviApp dự kiến ra mắt vào Quý 3 năm 2023. Thành viên sáng lập sẽ được truy cập sớm ít nhất 30 ngày trước khi ra mắt công khai."
                })}
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-2">
                {t({
                  english: "Is my payment secure?",
                  vietnamese: "Thanh toán của tôi có an toàn không?"
                })}
              </h4>
              <p className="text-gray-600">
                {t({
                  english: "Absolutely. We use industry-standard encryption and secure payment processing. Your financial information is never stored on our servers.",
                  vietnamese: "Hoàn toàn. Chúng tôi sử dụng mã hóa theo tiêu chuẩn ngành và xử lý thanh toán an toàn. Thông tin tài chính của bạn không bao giờ được lưu trữ trên máy chủ của chúng tôi."
                })}
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-2">
                {t({
                  english: "What happens after I pay?",
                  vietnamese: "Điều gì xảy ra sau khi tôi thanh toán?"
                })}
              </h4>
              <p className="text-gray-600">
                {t({
                  english: "You'll receive immediate confirmation of your founding member status, along with updates on our progress. When we're ready to launch, you'll be the first to know and get priority access.",
                  vietnamese: "Bạn sẽ nhận được xác nhận ngay lập tức về tư cách thành viên sáng lập của mình, cùng với các cập nhật về tiến trình của chúng tôi. Khi chúng tôi sẵn sàng ra mắt, bạn sẽ là người đầu tiên biết và được quyền truy cập ưu tiên."
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-purple-100 to-pink-100"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
            {t({
              english: "Secure Your Future in the Beauty Industry — Join EmviApp Today!",
              vietnamese: "Bảo đảm tương lai của bạn trong ngành công nghiệp làm đẹp — Tham gia EmviApp ngay hôm nay!"
            })}
          </h2>
          
          <Button 
            size="lg"
            className="bg-emvi-accent hover:bg-emvi-accent/90 text-white px-8 py-6 h-auto text-lg font-medium"
          >
            {t({
              english: "Get Started Now",
              vietnamese: "Bắt Đầu Ngay"
            })}
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingPage;
