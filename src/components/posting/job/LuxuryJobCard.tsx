
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LuxuryJobCardProps {
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
  gradientClass?: string;
}

const LuxuryJobCard: React.FC<LuxuryJobCardProps> = ({
  title,
  description,
  onClick,
  className,
  gradientClass
}) => {
  return (
    <motion.div
      whileHover={{ 
        y: -4,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "cursor-pointer relative overflow-hidden",
        "min-w-[280px] h-[220px] p-6 rounded-2xl",
        "border border-[#e8e1d5] backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "flex flex-col justify-between",
        className
      )}
    >
      <div className={cn(
        "absolute inset-0 opacity-40", 
        gradientClass || "bg-gradient-to-br from-[#f8f6f1] to-[#f1ede3]"
      )} />
      
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/40 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 leading-tight">
            {title}
          </h3>
          <p className="text-base font-medium text-gray-600">
            {description}
          </p>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="w-8 h-0.5 bg-gradient-to-r from-[#e8d9c5] to-transparent"></div>
          <div className="text-xs text-gray-400 opacity-60 italic font-light">EmviApp</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LuxuryJobCard;
