import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Calendar, Search, MapPin } from "lucide-react";
import nailServicesImage from "@/assets/nail-services-ai.jpg";
import hairServicesImage from "@/assets/hair-services-ai.jpg";
import makeupServicesImage from "@/assets/makeup-services-ai.jpg";

interface ModernServiceFeaturesProps {
  isVietnamese?: boolean;
}

const ModernServiceFeatures = ({ isVietnamese = false }: ModernServiceFeaturesProps) => {
  const features = [
    {
      icon: Search,
      title: isVietnamese ? "Tìm Kiếm Thông Minh" : "Smart Search",
      description: isVietnamese ? "AI tìm nghệ sĩ phù hợp với phong cách và ngân sách của bạn" : "AI finds artists that match your style and budget perfectly",
      image: nailServicesImage,
      alt: "Professional nail technician using AI color matching for perfect manicure",
      stats: isVietnamese ? "95% độ chính xác" : "95% accuracy"
    },
    {
      icon: Calendar,
      title: isVietnamese ? "Đặt Lịch Dễ Dàng" : "Easy Booking",
      description: isVietnamese ? "Đặt lịch ngay lập tức với hệ thống thông minh, không cần gọi điện" : "Instant booking with smart scheduling, no phone calls needed",
      image: hairServicesImage,
      alt: "Hair stylist providing consultation with AI technology in modern salon",
      stats: isVietnamese ? "30 giây đặt lịch" : "30-second booking"
    },
    {
      icon: MapPin,
      title: isVietnamese ? "Gần Bạn Nhất" : "Near You",
      description: isVietnamese ? "Tìm salon và nghệ sĩ trong khu vực với đánh giá thật từ khách hàng" : "Find nearby salons and artists with real customer reviews",
      image: makeupServicesImage,
      alt: "Makeup artist applying professional makeup with AI color matching technology",
      stats: isVietnamese ? "2km bán kính" : "2km radius"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20"
      />
      
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">
              {isVietnamese ? "Dịch Vụ Hàng Đầu" : "Premium Services"}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {isVietnamese ? "Trải Nghiệm Làm Đẹp Hoàn Hảo" : "Perfect Beauty Experience"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isVietnamese 
              ? "Từ nail art đến hair styling, makeup đến skincare - kết nối với hàng nghìn chuyên gia được xác minh"
              : "From nail art to hair styling, makeup to skincare - connect with thousands of verified professionals"
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Stats overlay */}
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {feature.stats}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {isVietnamese ? "Sẵn Sàng Trải Nghiệm?" : "Ready to Experience?"}
            </h3>
            <p className="text-xl mb-8 text-white/90">
              {isVietnamese 
                ? "Hơn 2,500 dịch vụ đang chờ bạn khám phá"
                : "Over 2,500 services waiting for you to discover"
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking-services">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6">
                  {isVietnamese ? "Khám Phá Dịch Vụ" : "Explore Services"}
                </Button>
              </Link>
              <Link to="/salons">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold px-8 py-6">
                  {isVietnamese ? "Tìm Salon Gần Bạn" : "Find Nearby Salons"}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernServiceFeatures;