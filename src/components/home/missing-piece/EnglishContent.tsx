
import React from "react";
import { motion } from "framer-motion";

const EnglishContent = () => {
  const contentBlocks = [
    {
      title: "Your Business, Supercharged",
      content: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.",
      gradient: "from-blue-500/10 via-purple-500/10 to-pink-500/10",
      accentColor: "border-blue-200"
    },
    {
      title: "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business.",
      content: "",
      gradient: "from-purple-500/10 via-pink-500/10 to-rose-500/10",
      accentColor: "border-purple-200",
      isAIBlock: true
    },
    {
      title: "Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔",
      content: "",
      gradient: "from-amber-500/10 via-orange-500/10 to-red-500/10",
      accentColor: "border-amber-200",
      isWarning: true
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
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          <div 
            className={`relative p-8 md:p-10 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${block.accentColor}`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 100%)`,
              boxShadow: "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.3)"
            }}
          >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} rounded-2xl opacity-50`} />
            
            {/* Content */}
            <div className="relative z-10 space-y-4">
              <h3 className={`font-playfair font-bold text-gray-800 leading-tight ${
                block.isAIBlock ? 'text-2xl md:text-3xl' : 
                block.isWarning ? 'text-xl md:text-2xl' : 
                'text-2xl md:text-3xl'
              }`}>
                {block.title}
              </h3>
              
              {block.content && (
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                  {block.content}
                </p>
              )}
            </div>
            
            {/* Subtle shine effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default EnglishContent;
