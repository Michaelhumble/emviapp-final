
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SectionHeader from "@/components/home/sections/SectionHeader";

const BilingualWhySomeSalons = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Why Some Salons Stay Full — And Others Don't" 
          vietnameseTitle="Tại Sao Một Số Salon Luôn Đông Khách — Còn Những Salon Khác Thì Không"
          description="The difference between struggling and thriving in today's beauty industry"
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* English Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="prose prose-lg"
            >
              <h3 className="font-playfair text-xl font-medium mb-4 text-gray-900">The Secret is Simple</h3>
              <p className="text-gray-700">
                In today's beauty industry, the most successful salons have mastered one critical skill: 
                client retention. They don't just attract new customers—they keep them coming back, again and again.
              </p>
              <p className="text-gray-700">
                This isn't about gimmicks or discounts. It's about creating personalized experiences 
                that make clients feel valued, understood, and eager to return.
              </p>
              <p className="text-gray-700 font-medium">
                EmviApp's Client Growth System helps you master this art with intelligent tools that keep your chairs filled.
              </p>
            </motion.div>

            {/* Vietnamese Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="prose prose-lg"
            >
              <h3 className="font-playfair text-xl font-medium mb-4 text-gray-900">Bí Quyết Rất Đơn Giản</h3>
              <p className="text-gray-700">
                Trong ngành làm đẹp hiện nay, các salon thành công nhất đã thành thạo một kỹ năng quan trọng: 
                giữ chân khách hàng. Họ không chỉ thu hút khách hàng mới mà còn khiến họ quay lại, lần này qua lần khác.
              </p>
              <p className="text-gray-700">
                Đây không phải là về các mánh khóe hay giảm giá. Đó là về việc tạo ra những trải nghiệm cá nhân hóa 
                khiến khách hàng cảm thấy được đánh giá cao, được thấu hiểu và háo hức quay trở lại.
              </p>
              <p className="text-gray-700 font-medium">
                Hệ thống Phát triển Khách hàng của EmviApp giúp bạn làm chủ nghệ thuật này với các công cụ thông minh giúp ghế của bạn luôn đầy.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg font-playfair italic text-emvi-accent">
              {t({
                english: "Join EmviApp early to unlock exclusive client retention tools.",
                vietnamese: "Tham gia EmviApp sớm để mở khóa các công cụ giữ chân khách hàng độc quyền."
              })}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BilingualWhySomeSalons;
