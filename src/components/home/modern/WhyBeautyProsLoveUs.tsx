import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Clock } from "lucide-react";

interface WhyBeautyProsLoveUsProps {
  isVietnamese?: boolean;
}

const WhyBeautyProsLoveUs = ({ isVietnamese = false }: WhyBeautyProsLoveUsProps) => {
  const stats = [
    {
      icon: Users,
      value: "15,000+",
      label: isVietnamese ? "Nghệ Sĩ Làm Đẹp" : "Beauty Artists",
      description: isVietnamese ? "Đã tham gia cộng đồng" : "Active on platform",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: DollarSign,
      value: "$2.8B",
      label: isVietnamese ? "Quy Mô Thị Trường" : "Market Size",
      description: isVietnamese ? "Tăng trưởng AI làm đẹp" : "AI beauty market growth",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: isVietnamese ? "Tăng Trưởng Booking" : "Booking Growth",
      description: isVietnamese ? "So với năm trước" : "Year over year increase",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Clock,
      value: "92%",
      label: isVietnamese ? "Tỷ Lệ Thành Công" : "Success Rate",
      description: isVietnamese ? "Tuyển dụng hiệu quả" : "In job placements",
      color: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 135, 0.8) 50%, rgba(124, 58, 237, 0.9) 100%)"
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isVietnamese ? "Tại Sao Chuyên Gia Làm Đẹp Yêu Thích EmviApp" : "Why Beauty Pros Love EmviApp"}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {isVietnamese 
              ? "Từ những nail tech Việt Nam đến các stylist New York, hàng nghìn chuyên gia đang xây dựng sự nghiệp thành công với chúng tôi"
              : "From Vietnamese nail techs to New York stylists, thousands of professionals are building successful careers with us"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div 
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all duration-300 group-hover:scale-105"
                >
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-lg font-semibold text-white/90 mb-2">
                    {stat.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-sm text-white/70">
                    {stat.description}
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10`} />
              </motion.div>
            );
          })}
        </div>

        {/* Additional trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 max-w-4xl mx-auto">
            <p className="text-lg text-white/80 italic">
              {isVietnamese ? (
                <>
                  "Từ khi sử dụng EmviApp, thu nhập của tôi tăng 200%. Giờ tôi có thể tập trung vào nghệ thuật thay vì lo lắng về việc tìm khách hàng."
                  <br />
                  <span className="text-sm text-white/60 not-italic">- Linh Nguyen, Nail Artist, California</span>
                </>
              ) : (
                <>
                  "Since using EmviApp, my income increased 200%. Now I can focus on my artistry instead of worrying about finding clients."
                  <br />
                  <span className="text-sm text-white/60 not-italic">- Linh Nguyen, Nail Artist, California</span>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyBeautyProsLoveUs;