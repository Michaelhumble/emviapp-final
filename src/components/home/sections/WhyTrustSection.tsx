
import React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Heart, Home, Lock } from "lucide-react";
import TrustStatCard from "../cards/TrustStatCard";
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

const WhyTrustSection: React.FC = () => {
  const { isVietnamese } = useTranslation();
  
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif tracking-tight">
            Why Artists & Salons Trust Us
            {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">Vì sao thợ & tiệm chọn EmviApp</span>}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're building a community that puts your needs first.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <TrustStatCard
            icon={<Shield className="h-5 w-5 text-primary" />}
            stat="3,000+"
            description={isVietnamese ? "Hơn 3,000 tiệm đã xác minh trên toàn nước Mỹ" : "Verified Salons"}
          />
          <TrustStatCard
            icon={<Users className="h-5 w-5 text-primary" />}
            stat="Thousands"
            description={isVietnamese ? "Hàng ngàn thợ nails đang sử dụng mỗi ngày" : "Active Artists"}
          />
          <TrustStatCard
            icon={<Heart className="h-5 w-5 text-primary" />}
            stat="100%"
            description={isVietnamese ? "Tạo bởi người trong nghề — không phải công ty lớn" : "Built by Artists, Not Corporations"}
          />
          <TrustStatCard
            icon={<Home className="h-5 w-5 text-primary" />}
            stat="4 States"
            description={isVietnamese ? "Tin dùng ở các tiểu bang lớn như GA, CA, TX" : "Trusted in GA, CA, TX & FL"}
          />
          <TrustStatCard
            icon={<Lock className="h-5 w-5 text-primary" />}
            stat="Secure"
            description={isVietnamese ? "Thanh toán an toàn. Kết nối thông minh bằng AI" : "Payments & AI Matching"}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
