
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingFAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: {
        english: "When will EmviApp launch?",
        vietnamese: "Khi nào EmviApp sẽ ra mắt?"
      },
      answer: {
        english: "We're launching soon! Founding members will get priority access before public release.",
        vietnamese: "Chúng tôi sắp ra mắt! Thành viên sáng lập sẽ được ưu tiên truy cập trước khi phát hành công khai."
      }
    },
    {
      question: {
        english: "Is my payment secure?",
        vietnamese: "Thanh toán của tôi có an toàn không?"
      },
      answer: {
        english: "Yes, all payments are processed with industry-standard encryption and security. We never store your financial details.",
        vietnamese: "Có, tất cả các khoản thanh toán được xử lý với mã hóa và bảo mật theo tiêu chuẩn ngành. Chúng tôi không bao giờ lưu trữ thông tin tài chính của bạn."
      }
    },
    {
      question: {
        english: "What happens after I pay?",
        vietnamese: "Điều gì xảy ra sau khi tôi thanh toán?"
      },
      answer: {
        english: "You'll receive instant confirmation and status updates. You'll be first to access EmviApp and enjoy exclusive perks.",
        vietnamese: "Bạn sẽ nhận được xác nhận ngay lập tức và cập nhật trạng thái. Bạn sẽ là người đầu tiên truy cập EmviApp và tận hưởng các đặc quyền độc quyền."
      }
    },
    {
      question: {
        english: "Can I cancel or get a refund?",
        vietnamese: "Tôi có thể hủy hoặc được hoàn tiền không?"
      },
      answer: {
        english: "Yes, you can request a refund anytime before official launch if you change your mind.",
        vietnamese: "Có, bạn có thể yêu cầu hoàn tiền bất cứ lúc nào trước khi ra mắt chính thức nếu bạn thay đổi ý định."
      }
    },
    {
      question: {
        english: "Why should I join now?",
        vietnamese: "Tại sao tôi nên tham gia ngay bây giờ?"
      },
      answer: {
        english: "These VIP offers will disappear after public launch. Lock in your discount and get early access benefits.",
        vietnamese: "Những ưu đãi VIP này sẽ biến mất sau khi ra mắt công khai. Khóa mức giảm giá của bạn và nhận các lợi ích truy cập sớm."
      }
    },
    {
      question: {
        english: "How will I get updates about launch progress?",
        vietnamese: "Làm thế nào để tôi nhận được cập nhật về tiến độ ra mắt?"
      },
      answer: {
        english: "You'll receive exclusive email updates on our progress, new features, and your special access details.",
        vietnamese: "Bạn sẽ nhận được email cập nhật độc quyền về tiến trình của chúng tôi, các tính năng mới và chi tiết truy cập đặc biệt của bạn."
      }
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold font-playfair">
          {t({
            english: "Frequently Asked Questions",
            vietnamese: "Câu Hỏi Thường Gặp"
          })}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {t(faq.question)}
              </AccordionTrigger>
              <AccordionContent>
                {t(faq.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default PricingFAQ;
