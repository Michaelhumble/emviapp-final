
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
    <section className="py-16 bg-gradient-to-r from-primary/5 to-pink-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif tracking-tight">
            We Keep It Simple, Transparent, and Fair
            {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">Chúng tôi làm mọi thứ rõ ràng & công bằng</span>}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            No games, no surprises—just the tools you need to succeed.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          <SimplePrincipleCard
            icon={<Sparkles className="h-5 w-5" />}
            title={isVietnamese ? "Đăng đầu tiên miễn phí cho mọi người" : "First post is always free"}
          />
          <SimplePrincipleCard
            icon={<Clock className="h-5 w-5" />}
            title={isVietnamese ? "Không hợp đồng ràng buộc. Huỷ bất kỳ lúc nào" : "No contracts, cancel anytime"}
          />
          <SimplePrincipleCard
            icon={<DollarSign className="h-5 w-5" />}
            title={isVietnamese ? "Giá rõ ràng, không phí ẩn" : "Flat prices, no hidden fees"}
          />
          <SimplePrincipleCard
            icon={<Eye className="h-5 w-5" />}
            title={isVietnamese ? "Hiển thị ngay lập tức" : "Instant visibility & social boosting"}
          />
          <SimplePrincipleCard
            icon={<Lock className="h-5 w-5" />}
            title={isVietnamese ? "Bạn hoàn toàn kiểm soát mọi thứ" : "You stay in control"}
          />
          <SimplePrincipleCard
            icon={<CheckCircle className="h-5 w-5" />}
            title={isVietnamese ? "Hỗ trợ nhiệt tình khi bạn cần" : "Expert support when you need it"}
          />
        </motion.div>

        <div className="mt-12 text-center">
          <PricingDialog />
        </div>
      </div>
    </section>
  );
};

export default SimpleTransparentSection;
