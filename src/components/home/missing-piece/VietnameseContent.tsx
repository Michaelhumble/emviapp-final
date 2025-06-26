
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface VietnameseContentProps {
  itemVariants: any;
}

const VietnameseContent = ({ itemVariants }: VietnameseContentProps) => {
  return (
    <div className="space-y-8">
      <motion.h3 
        className="text-3xl md:text-4xl font-playfair font-bold text-gray-800"
        variants={itemVariants}
      >
        ✨ Hãy Cùng Nhau Trải Nghiệm EmviApp
      </motion.h3>
      
      <motion.div 
        className="space-y-6"
        variants={itemVariants}
      >
        <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-400">
          <h4 className="text-xl font-bold text-purple-800 mb-3">Kinh Doanh Của Bạn, Được Nâng Cấp</h4>
          <p className="text-gray-700 leading-relaxed">
            Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-400">
          <p className="text-gray-700">
            <span className="font-semibold text-blue-800">Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn</span> — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
          </p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-6 border-l-4 border-orange-400">
          <p className="text-gray-700">
            Nếu bạn không dùng thử EmviApp... Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔
          </p>
        </div>
      </motion.div>
      
      <motion.div 
        className="pt-4"
        variants={itemVariants}
      >
        <Link to="/auth/signup">
          <Button size="lg" className="group">
            Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ →
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default VietnameseContent;
