
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface VietnameseContentProps {
  itemVariants: any;
}

const VietnameseContent = ({ itemVariants }: VietnameseContentProps) => {
  return (
    <div className="space-y-8">
      {/* First block - Kinh Doanh Của Bạn, Được Nâng Cấp */}
      <motion.div 
        className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100/50"
        variants={itemVariants}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-violet-600 mb-4 font-serif">
          Kinh Doanh Của Bạn, Được Nâng Cấp
        </h3>
        
        <p className="text-gray-700 text-lg">
          Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, 
          và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
        </p>
      </motion.div>
      
      {/* Second block - AI Features */}
      <motion.div 
        className="bg-purple-50 rounded-3xl shadow-md p-6 sm:p-8 mb-8 border border-indigo-100/50 flex gap-6 items-center"
        variants={itemVariants}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
          <img 
            src="/lovable-uploads/abbf3393-89b0-4cf3-974e-9004bf6486ff.png" 
            alt="AI Icon"
            className="w-8 h-8"
          />
        </div>
        <p className="text-violet-700 text-lg font-medium">
          Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích 
          và phát triển sự nghiệp của mình.
        </p>
      </motion.div>
      
      {/* Third block - Warning/Missing Out */}
      <motion.div 
        className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 mb-8 border border-indigo-100/50"
        variants={itemVariants}
      >
        <p className="text-lg">
          <span className="text-pink-500 font-medium">Nếu bạn không dùng thử EmviApp...</span>{" "}
          Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 😔
        </p>
      </motion.div>
      
      {/* CTA Button */}
      <motion.div 
        className="pt-4 flex justify-center"
        variants={itemVariants}
      >
        <Link to="/sign-up">
          <button className="group flex items-center px-8 py-4 bg-violet-600 text-white rounded-full font-medium text-lg shadow-md hover:bg-violet-700 transition-colors">
            Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default VietnameseContent;
