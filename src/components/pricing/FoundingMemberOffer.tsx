
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FoundersEarlyAccess from './FoundersEarlyAccess';

const FoundingMemberOffer = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Premium background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-gray-50/30 z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge 
              variant="outline" 
              className="mb-6 px-6 py-2 bg-white border-emvi-accent/30 text-emvi-accent text-sm font-medium"
            >
              {t({
                english: "EXCLUSIVE EARLY ACCESS",
                vietnamese: "TRUY CẬP SỚM ĐẶC QUYỀN"
              })}
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              {t({
                english: "Don't Just Work in the Beauty Industry — Own It.",
                vietnamese: "Đừng Chỉ Làm Việc Trong Ngành Làm Đẹp — Làm Chủ Nó."
              })}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t({
                english: "Join thousands unlocking exclusive tools and job opportunities with Early Access to EmviApp.",
                vietnamese: "Tham gia cùng hàng ngàn người mở khóa công cụ độc quyền và cơ hội việc làm với Quyền Truy Cập Sớm vào EmviApp."
              })}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <p className="text-base text-emvi-accent flex items-center justify-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-emvi-accent rounded-full animate-pulse" />
                {t({
                  english: "1,200+ beauty professionals have already secured their VIP status",
                  vietnamese: "1,200+ chuyên gia làm đẹp đã đảm bảo trạng thái VIP của họ"
                })}
              </p>
            </motion.div>
            
            <Button 
              size="lg" 
              className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl px-8 py-5 text-lg group"
              asChild
            >
              <Link to="/early-access-dashboard">
                {t({
                  english: "Get Early Access Now",
                  vietnamese: "Nhận Quyền Truy Cập Sớm Ngay"
                })}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <FoundersEarlyAccess />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="italic text-gray-500">
            {t({
              english: "Limited spots available — this opportunity will disappear once we launch.",
              vietnamese: "Số lượng chỗ có hạn — cơ hội này sẽ biến mất khi chúng tôi ra mắt."
            })}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FoundingMemberOffer;
