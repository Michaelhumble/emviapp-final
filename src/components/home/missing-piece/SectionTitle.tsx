
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SectionTitleProps {
  language: "en" | "vi";
  itemVariants: any;
}

const SectionTitle = ({ language, itemVariants }: SectionTitleProps) => {
  return (
    <motion.div 
      className="text-center mb-14"
      variants={itemVariants}
    >
      <div className="inline-block relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-3 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600">
          {language === "en" ? (
            "Let's Experience EmviApp Together"
          ) : (
            "Hãy Cùng Nhau Trải Nghiệm Emviapp"
          )}
        </h2>
        <motion.div 
          className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
          initial={{ width: "0%", x: "-50%" }}
          whileInView={{ width: "60%", x: "-50%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        />
        <motion.div 
          className="absolute -top-7 -right-10 text-yellow-400"
          animate={{ 
            rotate: [0, 20, 0, -20, 0],
            scale: [1, 1.2, 1, 1.2, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3
          }}
        >
          <Sparkles size={32} className="text-yellow-400 drop-shadow-md" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SectionTitle;
