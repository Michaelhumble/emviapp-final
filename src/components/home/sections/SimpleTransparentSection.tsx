
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, DollarSign, Eye, Lock, CheckCircle } from "lucide-react";
import SimplePrincipleCard from "../cards/SimplePrincipleCard";
import PricingDialog from "../dialogs/PricingDialog";
import { useTranslation } from "@/hooks/useTranslation";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const SimpleTransparentSection: React.FC = () => {
  const { isVietnamese } = useTranslation();
  
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        {/* Section Number Badge */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-full px-4 py-2">
            <span className="w-6 h-6 bg-emerald-600 text-white text-sm font-semibold rounded-full flex items-center justify-center">
              2
            </span>
            <span className="text-emerald-700 font-medium text-sm">
              {isVietnamese ? "Nguyên Tắc Cốt Lõi" : "Core Principles"}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
            {isVietnamese ? (
              <>
                Đơn Giản,{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Minh Bạch, Công Bằng
                </span>
              </>
            ) : (
              <>
                Simple,{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Transparent, Fair
                </span>
              </>
            )}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-primary">
            {isVietnamese 
              ? "Chúng tôi tin rằng công nghệ nên làm cuộc sống dễ dàng hơn, không phức tạp hơn. EmviApp được xây dựng trên những nguyên tắc cốt lõi này."
              : "We believe technology should make life easier, not more complicated. EmviApp is built on these core principles that guide everything we do."
            }
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <SimplePrincipleCard
            icon={<Sparkles className="h-6 w-6" />}
            title={isVietnamese ? "Đăng đầu tiên miễn phí cho mọi người" : "First post is always free"}
          />
          <SimplePrincipleCard
            icon={<Clock className="h-6 w-6" />}
            title={isVietnamese ? "Không hợp đồng ràng buộc. Huỷ bất kỳ lúc nào" : "No contracts, cancel anytime"}
          />
          <SimplePrincipleCard
            icon={<DollarSign className="h-6 w-6" />}
            title={isVietnamese ? "Giá rõ ràng, không phí ẩn" : "Flat prices, no hidden fees"}
          />
          <SimplePrincipleCard
            icon={<Eye className="h-6 w-6" />}
            title={isVietnamese ? "Hiển thị ngay lập tức" : "Instant visibility & social boosting"}
          />
          <SimplePrincipleCard
            icon={<Lock className="h-6 w-6" />}
            title={isVietnamese ? "Bạn hoàn toàn kiểm soát mọi thứ" : "You stay in control"}
          />
          <SimplePrincipleCard
            icon={<CheckCircle className="h-6 w-6" />}
            title={isVietnamese ? "Hỗ trợ nhiệt tình khi bạn cần" : "Expert support when you need it"}
          />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PricingDialog />
        </motion.div>
      </div>
    </section>
  );
};

export default SimpleTransparentSection;
