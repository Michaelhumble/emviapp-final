
import React from "react";
import { motion } from "framer-motion";

const FounderMessage = () => {
  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">From the Founder</span>
          </div>
          <p className="text-lg md:text-xl italic text-gray-700 mb-2">
            "We started with just a water container, a dream, and a lot of hustle. This platform is for every artist who ever cleaned before sunrise, and every owner who paid themselves last."
          </p>
          <p className="text-sm text-gray-500 font-medium">
            Chúng tôi hiểu bạn. Đây là nơi bạn thuộc về.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
