
import React from "react";
import { motion } from "framer-motion";

interface AIFeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    accentColor: string;
  };
  index: number;
}

const AIFeatureCard = ({ feature, index }: AIFeatureCardProps) => {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div 
        className={`relative p-8 md:p-10 rounded-3xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${feature.accentColor}`}
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.4)"
        }}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
        
        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon with premium styling */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
              {feature.icon}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-playfair font-bold text-2xl md:text-3xl text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium group-hover:text-gray-800 transition-colors duration-300">
              {feature.description}
            </p>
          </div>
        </div>
        
        {/* Premium shine effect */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />
        
        {/* Subtle border glow on hover */}
        <div className="absolute inset-0 rounded-3xl border border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default AIFeatureCard;
