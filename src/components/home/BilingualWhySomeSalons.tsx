
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/home/sections/SectionHeader";

const BilingualWhySomeSalons = () => {
  const { t, isVietnamese } = useTranslation();
  
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
              <h3 className="font-playfair text-xl font-medium mb-4 text-gray-900">Imagine This Reality</h3>
              <p className="text-gray-700">
                Every salon owner knows the struggle: vacant chairs that should be filled with clients. Meanwhile, other salons nearby have waiting lists weeks long.
              </p>
              <p className="text-gray-700 font-medium">
                The difference isn't location, talent, or even prices. It's <span className="font-bold">systematically nurturing client relationships</span> at scale.
              </p>
              <p className="text-gray-700">
                Most salons lose 30% of clients after their first visit — and never know why. Those clients silently disappear to competitors who make them feel valued.
              </p>
              <p className="text-gray-700 font-bold">
                EmviApp's Client Growth System lets you connect with 100 clients with one click — turning first-timers into lifelong customers.
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
              <h3 className="font-playfair text-xl font-medium mb-4 text-gray-900">Hãy Tưởng Tượng Điều Này</h3>
              <p className="text-gray-700">
                Mọi chủ salon đều biết nỗi khổ: những chiếc ghế trống lẽ ra phải được lấp đầy bởi khách hàng. Trong khi đó, các salon khác gần đó có danh sách chờ dài hàng tuần.
              </p>
              <p className="text-gray-700 font-medium">
                Sự khác biệt không phải là vị trí, tài năng, hay thậm chí giá cả. Đó là <span className="font-bold">việc nuôi dưỡng mối quan hệ khách hàng có hệ thống</span> ở quy mô lớn.
              </p>
              <p className="text-gray-700">
                Hầu hết các salon mất 30% khách hàng sau lần ghé thăm đầu tiên — và không bao giờ biết tại sao. Những khách hàng đó âm thầm biến mất đến các đối thủ cạnh tranh khiến họ cảm thấy được coi trọng.
              </p>
              <p className="text-gray-700 font-bold">
                Hệ thống Phát triển Khách hàng của EmviApp cho phép bạn kết nối với 100 khách hàng chỉ với một cú nhấp chuột — biến khách hàng lần đầu thành khách hàng trọn đời.
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
            <Button 
              className="bg-emvi-accent hover:bg-emvi-accent/90 transform hover:scale-[1.02] transition-all duration-200 group"
              size="lg"
              asChild
            >
              <Link to="/pricing">
                {t({
                  english: "Learn More About Client Growth",
                  vietnamese: "Tìm Hiểu Thêm Về Tăng Trưởng Khách Hàng"
                })}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BilingualWhySomeSalons;
