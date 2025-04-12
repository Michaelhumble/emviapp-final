
import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Store,
  ImageIcon,
  Home,
  Calendar,
  TrendingUp,
  Zap,
  Award,
  DollarSign,
} from "lucide-react";
import FeatureCard from "../cards/FeatureCard";
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

const WhatYouCanDoSection: React.FC = () => {
  const { isVietnamese } = useTranslation();

  return (
    <section 
      id="what-you-can-do" 
      className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full filter blur-3xl opacity-20" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif tracking-tight">
            What You Can Do With EmviApp
            {isVietnamese && <span className="block text-xl md:text-2xl text-gray-600 mt-2">EmviApp giúp bạn làm được gì?</span>}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            The all-in-one platform for salons, artists, and beauty professionals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon={<Users className="h-6 w-6 text-primary" />}
            title="Hire Amazing Artists"
            description={isVietnamese ? "Tìm thợ giỏi, dễ thương và chuyên nghiệp" : "Find qualified, pre-screened nail techs and beauty professionals for your salon."}
          />
          <FeatureCard
            icon={<Store className="h-6 w-6 text-primary" />}
            title="Find Your Next Salon"
            description={isVietnamese ? "Tìm tiệm phù hợp nhanh chóng" : "Browse salon listings and connect directly with owners looking to sell."}
          />
          <FeatureCard
            icon={<ImageIcon className="h-6 w-6 text-primary" />}
            title="Post Your Portfolio"
            description={isVietnamese ? "Đăng hình ảnh tác phẩm của bạn" : "Showcase your best work and attract clients who love your style."}
          />
          <FeatureCard
            icon={<Home className="h-6 w-6 text-primary" />}
            title="Rent or List Booths"
            description={isVietnamese ? "Thuê ghế hoặc đăng tìm thợ dễ dàng" : "Find the perfect spot to grow your business or fill your empty chairs."}
          />
          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-primary" />}
            title="Stay Booked & Grow Income"
            description={isVietnamese ? "Tăng thu nhập, giữ khách đều đặn" : "Manage appointments and increase your revenue with smart tools."}
          />
          <FeatureCard
            icon={<TrendingUp className="h-6 w-6 text-primary" />}
            title="Track Earnings & Analytics"
            description={isVietnamese ? "Theo dõi tiền tip, doanh thu, và hiệu suất" : "See your growth with easy-to-understand metrics and insights."}
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6 text-primary" />}
            title="Get Discovered Online"
            description={isVietnamese ? "Cho người ta thấy tài năng của bạn" : "Get discovered and build your following with social boosting."}
          />
          <FeatureCard
            icon={<Award className="h-6 w-6 text-primary" />}
            title="Go Viral With Your Work"
            description={isVietnamese ? "Dễ lan toả trên mạng xã hội" : "Stand out with professional tools designed for the beauty industry."}
          />
          <FeatureCard
            icon={<DollarSign className="h-6 w-6 text-primary" />}
            title="Get Paid Weekly"
            description={isVietnamese ? "Thanh toán thường xuyên không trễ hẹn" : "Find opportunities with regular pay schedules that respect your value."}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhatYouCanDoSection;
