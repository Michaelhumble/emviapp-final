
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BilingualExperienceSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-white to-purple-50/30">
      <div className="container mx-auto px-4">
        {/* Dual Language Title Section */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Vietnamese Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10"
          >
            <div className="relative inline-block">
              <Sparkles className="absolute -left-10 -top-6 w-8 h-8 text-purple-500 opacity-80" />
              <h2 className="font-playfair font-bold text-2xl md:text-4xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                Hãy Cùng Nhau Trải Nghiệm EmviApp ✨
              </h2>
              <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-400 w-full mt-2 rounded-full" />
            </div>
          </motion.div>
          
          {/* English Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block">
              <Sparkles className="absolute -left-10 -top-6 w-8 h-8 text-purple-500 opacity-80" />
              <h2 className="font-playfair font-bold text-2xl md:text-4xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                Let's Experience EmviApp Together ✨
              </h2>
              <div className="h-1 bg-gradient-to-r from-purple-600 to-pink-400 w-full mt-2 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Subheading Block */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* English Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-600">Your Business, Supercharged</h3>
            <p className="text-gray-700">
              We help bring customers straight to your salon. Our platform connects you with skilled technicians, 
              delivers irresistible offers, and streamlines shop management — all in one elegant solution.
            </p>
          </motion.div>

          {/* Vietnamese Subheading */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-purple-600">Kinh Doanh Của Bạn, Được Nâng Cấp</h3>
            <p className="text-gray-700">
              Chúng tôi giúp bạn mang khách hàng đến tận tiệm. Giúp bạn tìm những thợ giỏi, có kinh nghiệm, 
              và đưa ra những ưu đãi tốt nhất — để bạn quản lý tiệm dễ dàng và đạt hiệu quả cao.
            </p>
          </motion.div>
        </div>
        
        {/* Feature Block */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* English Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl shadow-sm"
          >
            <p className="text-gray-700">
              EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business.
            </p>
          </motion.div>

          {/* Vietnamese Feature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl shadow-sm"
          >
            <p className="text-gray-700">
              Hãy để A.I thông minh của EmviApp lo mọi thứ cho bạn — bạn chỉ cần tập trung làm điều mình yêu thích và phát triển sự nghiệp của mình.
            </p>
          </motion.div>
        </div>
        
        {/* Reminder Block */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          {/* English Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white to-pink-50 p-6 rounded-xl shadow-sm border border-pink-100"
          >
            <p className="text-gray-700">
              Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 🥲
            </p>
          </motion.div>

          {/* Vietnamese Reminder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-white to-pink-50 p-6 rounded-xl shadow-sm border border-pink-100"
          >
            <p className="text-gray-700">
              Nếu bạn không dùng thử EmviApp... Chắc chắn bạn đang bỏ lỡ một công nghệ có thể giải quyết rất nhiều việc cùng một lúc. 🥲
            </p>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/how-it-works">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-6 text-lg shadow-md rounded-xl"
            >
              See How It Works
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BilingualExperienceSection;
