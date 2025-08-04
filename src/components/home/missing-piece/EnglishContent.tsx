
import React from "react";
import { motion } from "framer-motion";

const EnglishContent = () => {
  const contentBlocks = [
    {
      title: "Your Business, Supercharged",
      content: "We help bring customers straight to your salon. Our platform connects you with skilled technicians, delivers irresistible offers, and streamlines shop management — all in one elegant solution.",
      gradient: "from-blue-500/20 via-purple-500/15 to-pink-500/20",
      accentColor: "border-blue-300/50",
      sparkles: true
    },
    {
      title: "EmviApp's intelligent AI handles the complex work — so you can focus on your passion and growing your business.",
      content: "",
      gradient: "from-purple-500/20 via-pink-500/15 to-rose-500/20",
      accentColor: "border-purple-300/50",
      isAIBlock: true,
      sparkles: true
    },
    {
      title: "Without EmviApp, you might be missing out on opportunities that your competitors are already embracing. 😔",
      content: "",
      gradient: "from-amber-500/20 via-orange-500/15 to-red-500/20",
      accentColor: "border-amber-300/50",
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
            className={`relative p-10 md:p-12 rounded-3xl backdrop-blur-sm border-2 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20 ${block.accentColor}`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5)"
            }}
          >
            {/* Enhanced gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${block.gradient} rounded-3xl opacity-60`} />
            
            {/* Sparkle effects for premium blocks */}
            {block.sparkles && (
              <>
                <div className="absolute top-6 right-8 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse" />
                <div className="absolute top-12 right-12 w-1 h-1 bg-purple-300 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            )}
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              <h3 className={`font-playfair font-bold text-gray-800 leading-[1.15] tracking-tight ${
                block.isAIBlock ? 'text-2xl md:text-3xl lg:text-4xl' : 
                block.isWarning ? 'text-xl md:text-2xl lg:text-3xl' : 
                'text-2xl md:text-3xl lg:text-4xl'
              }`}>
                {block.title}
              </h3>
              
              {block.content && (
                <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-manrope font-medium tracking-wide">
                  {block.content}
                </p>
              )}
            </div>
            
            {/* Enhanced shine effect */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Premium border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 blur-xl" />
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default EnglishContent;
