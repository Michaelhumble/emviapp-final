
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const BilingualExperienceSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-white to-purple-50/30">
      <div className="container mx-auto px-4">
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
              <h2 className="font-playfair font-bold text-3xl md:text-5xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                Hãy Cùng Nhau Trải Nghiệm EmviApp ✨
              </h2>
              <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-300 w-full mt-2 rounded-full" />
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
              <h2 className="font-playfair font-bold text-3xl md:text-5xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-3">
                Let's Experience EmviApp Together ✨
              </h2>
              <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-300 w-full mt-2 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BilingualExperienceSection;
