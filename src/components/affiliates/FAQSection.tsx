import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation, Translation } from '@/hooks/useTranslation';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      id: "commission-structure",
      question: {
        english: "How much commission do I earn and when do I get paid?",
        vietnamese: "Tôi kiếm được bao nhiêu hoa hồng và khi nào tôi được thanh toán?"
      } as Translation,
      answer: {
        english: "You earn 30% recurring commission on all successful referrals. Payments are processed monthly via Stripe Connect with a minimum payout threshold of $50. Payments are typically sent on the 15th of each month for the previous month's earnings.",
        vietnamese: "Bạn kiếm được hoa hồng định kỳ 30% trên tất cả các giới thiệu thành công. Thanh toán được xử lý hàng tháng qua Stripe Connect với ngưỡng thanh toán tối thiểu là $50. Thanh toán thường được gửi vào ngày 15 hàng tháng cho thu nhập của tháng trước."
      } as Translation
    },
    {
      id: "cookie-tracking",
      question: {
        english: "How long is the attribution window?",
        vietnamese: "Thời gian cửa sổ ghi nhận là bao lâu?"
      } as Translation,
      answer: {
        english: "We use a 90-day attribution window with last-touch attribution model. This means if someone clicks your link, you'll earn commission on any purchase they make within 90 days, even if they don't purchase immediately.",
        vietnamese: "Chúng tôi sử dụng cửa sổ ghi nhận 90 ngày với mô hình ghi nhận lần chạm cuối. Điều này có nghĩa là nếu ai đó nhấp vào liên kết của bạn, bạn sẽ kiếm được hoa hồng cho bất kỳ giao dịch mua nào họ thực hiện trong vòng 90 ngày, ngay cả khi họ không mua ngay lập tức."
      } as Translation
    },
    {
      id: "tracking-fallbacks",
      question: {
        english: "What happens if cookies are blocked or disabled?",
        vietnamese: "Điều gì xảy ra nếu cookie bị chặn hoặc vô hiệu hóa?"
      } as Translation,
      answer: {
        english: "We use multiple tracking methods including server-side tracking and fingerprinting as fallbacks when cookies are unavailable. Our system also supports UTM parameters and referral codes to ensure accurate attribution even in privacy-focused environments.",
        vietnamese: "Chúng tôi sử dụng nhiều phương pháp theo dõi bao gồm theo dõi phía máy chủ và dấu vân tay làm phương án dự phòng khi cookie không khả dụng. Hệ thống của chúng tôi cũng hỗ trợ tham số UTM và mã giới thiệu để đảm bảo ghi nhận chính xác ngay cả trong môi trường tập trung vào quyền riêng tư."
      } as Translation
    },
    {
      id: "payout-cadence",
      question: {
        english: "When and how are payouts processed?",
        vietnamese: "Khi nào và làm thế nào các khoản thanh toán được xử lý?"
      } as Translation,
      answer: {
        english: "Payouts are processed monthly via Stripe Connect on the 15th of each month for commissions earned in the previous month. You need to complete Stripe Connect onboarding to receive payments. All transactions are secure and comply with financial regulations.",
        vietnamese: "Thanh toán được xử lý hàng tháng qua Stripe Connect vào ngày 15 hàng tháng cho hoa hồng kiếm được trong tháng trước. Bạn cần hoàn thành quá trình đăng ký Stripe Connect để nhận thanh toán. Tất cả các giao dịch đều an toàn và tuân thủ các quy định tài chính."
      } as Translation
    },
    {
      id: "test-vs-live",
      question: {
        english: "Is there a difference between test mode and live mode commissions?",
        vietnamese: "Có sự khác biệt giữa hoa hồng ở chế độ thử nghiệm và chế độ thực tế không?"
      } as Translation,
      answer: {
        english: "Test mode transactions do not generate real commissions - they're only for testing the integration. Only live mode transactions with real payments will generate commissions that are paid out to affiliates.",
        vietnamese: "Giao dịch ở chế độ thử nghiệm không tạo ra hoa hồng thực - chúng chỉ dành cho việc thử nghiệm tích hợp. Chỉ có các giao dịch ở chế độ thực tế với thanh toán thực mới tạo ra hoa hồng được trả cho các cộng tác viên."
      } as Translation
    },
    {
      id: "prohibited-traffic",
      question: {
        english: "What types of traffic or promotion methods are prohibited?",
        vietnamese: "Những loại lưu lượng truy cập hoặc phương pháp quảng bá nào bị cấm?"
      } as Translation,
      answer: {
        english: "Prohibited methods include: bidding on our trademark terms in PPC campaigns, spam email marketing, adult/illegal content association, misleading advertising, and incentivized traffic (paying users to sign up). We require honest, transparent promotion that clearly identifies the affiliate relationship per FTC guidelines.",
        vietnamese: "Các phương pháp bị cấm bao gồm: đặt giá thầu trên các thuật ngữ thương hiệu của chúng tôi trong chiến dịch PPC, tiếp thị email spam, liên kết với nội dung người lớn/bất hợp pháp, quảng cáo sai lệch, và lưu lượng truy cập được khuyến khích (trả tiền để người dùng đăng ký). Chúng tôi yêu cầu quảng bá trung thực, minh bạch và xác định rõ mối quan hệ cộng tác viên theo hướng dẫn của FTC."
      } as Translation
    },
    {
      id: "application-approval",
      question: {
        english: "How long does the application approval process take?",
        vietnamese: "Quá trình phê duyệt đơn đăng ký mất bao lâu?"
      } as Translation,
      answer: {
        english: "Most applications are reviewed and approved within 24 hours during business days. We evaluate based on content quality, audience relevance, and adherence to our program guidelines. You'll receive an email notification once your application is processed.",
        vietnamese: "Hầu hết các đơn đăng ký được xem xét và phê duyệt trong vòng 24 giờ trong ngày làm việc. Chúng tôi đánh giá dựa trên chất lượng nội dung, sự phù hợp của khán giả và việc tuân thủ các hướng dẫn chương trình của chúng tôi. Bạn sẽ nhận được email thông báo sau khi đơn đăng ký được xử lý."
      } as Translation
    },
    {
      id: "support-resources",
      question: {
        english: "What support and resources do you provide to affiliates?",
        vietnamese: "Bạn cung cấp những hỗ trợ và tài nguyên gì cho các cộng tác viên?"
      } as Translation,
      answer: {
        english: "We provide a comprehensive dashboard with real-time analytics, marketing materials (banners, logos, screenshots), dedicated affiliate support, monthly performance reports, and best practices guides. Our team is available to help with custom creative requests for high-performing affiliates.",
        vietnamese: "Chúng tôi cung cấp một bảng điều khiển toàn diện với phân tích thời gian thực, tài liệu tiếp thị (banner, logo, ảnh chụp màn hình), hỗ trợ cộng tác viên chuyên dụng, báo cáo hiệu suất hàng tháng, và hướng dẫn thực hành tốt nhất. Đội ngũ của chúng tôi sẵn sàng giúp đỡ với các yêu cầu sáng tạo tùy chỉnh cho các cộng tác viên hiệu suất cao."
      } as Translation
    }
  ];

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t({ english: "Frequently Asked Questions", vietnamese: "Câu hỏi thường gặp" })}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t({ english: "Everything you need to know", vietnamese: "Mọi thứ bạn cần biết" })}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t({ 
              english: "Get answers to common questions about our affiliate program, payments, and policies",
              vietnamese: "Nhận câu trả lời cho các câu hỏi thường gặp về chương trình cộng tác viên, thanh toán và chính sách của chúng tôi"
            })}
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={faq.id}
                  className="bg-card/50 border border-border/50 rounded-2xl px-6 hover:border-primary/20 transition-all duration-300 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-6">
                    {t(faq.question)}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                    {t(faq.answer)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Contact info */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-3">
              {t({ english: "Still have questions?", vietnamese: "Vẫn còn câu hỏi?" })}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t({ 
                english: "Our affiliate support team is here to help you succeed",
                vietnamese: "Đội ngũ hỗ trợ cộng tác viên của chúng tôi sẵn sàng giúp bạn thành công"
              })}
            </p>
            <a 
              href="mailto:affiliates@emvi.app"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
            >
              affiliates@emvi.app
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;