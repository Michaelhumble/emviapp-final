
import React from 'react';
import { motion } from 'framer-motion';
import CommunityFAQ from '@/components/community/CommunityFAQ';

const QandASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <CommunityFAQ />
        </motion.div>
      </div>
    </section>
  );
};

export default QandASection;
