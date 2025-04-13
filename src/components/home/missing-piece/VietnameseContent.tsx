
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface VietnameseContentProps {
  itemVariants: any;
}

const VietnameseContent = ({ itemVariants }: VietnameseContentProps) => {
  return (
    <>
      <motion.div 
        className="text-center mb-10" 
        variants={itemVariants}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-6">
          <span className="bg-indigo-50 px-4 py-1 rounded-lg">Kinh Doanh Của Bạn, Được Nâng Cấp</span>
        </h3>
        <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-indigo-600">Chúng tôi giúp bạn mang khách hàng đến tận tiệm.</span>{" "}
          Giúp bạn tìm những thợ giỏi, có kinh nghiệm, và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
        </p>
      </motion.div>

      <motion.div 
        className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-10 border border-indigo-100/50 shadow-inner"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-md">
            <Sparkles size={48} className="text-indigo-600" />
          </div>
          <p className="text-xl text-gray-700 text-center md:text-left">
            <span className="font-semibold">Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn —</span><br />
            bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="text-center" 
        variants={itemVariants}
      >
        <p className="text-xl text-gray-800 font-medium mb-8">
          Nếu bạn không dùng thử EmviApp...<br />
          Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. <span className="text-2xl">😌</span>
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Hãy cùng nhau trải nghiệm những điều thú vị mà EmviApp mang đến cho bạn — ngay bây giờ
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={20} className="text-white" />
          </motion.div>
        </motion.button>
      </motion.div>
    </>
  );
};

export default VietnameseContent;
