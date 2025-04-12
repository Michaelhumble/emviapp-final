
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const MissingPieceSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-primary mr-2" />
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Find What You've Been Looking For — Right Now
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with the people, places, and opportunities that will take your beauty career to the next level.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissingPieceSection;
