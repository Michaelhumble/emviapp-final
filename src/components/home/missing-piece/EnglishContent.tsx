
import React from "react";
import { motion } from "framer-motion";

const EnglishContent = () => {
  const contentBlocks = [
    {
      title: "For Salon & Spa Owners",
      content: "Find top talent, manage appointments, and grow your business with our smart AI technology and seamless booking."
    },
    {
      title: "For Beauty Artists", 
      content: "Showcase your portfolio, connect with clients, and build your brand while earning more through our exclusive network."
    },
    {
      title: "For Beauty Lovers",
      content: "Discover amazing artists, book instantly, and enjoy a personalized beauty experience tailored just for you."
    }
  ];

  return (
    <>
      {contentBlocks.map((block, index) => (
        <motion.div
          key={index}
          className="group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="h-full bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl border border-white/25 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-playfair leading-tight">
                {block.title}
              </h3>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed font-medium">
                {block.content}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default EnglishContent;
