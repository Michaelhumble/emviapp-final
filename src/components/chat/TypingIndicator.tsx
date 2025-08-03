import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

interface TypingIndicatorProps {
  isDarkMode?: boolean;
  language: 'en' | 'vi';
  fontSize: 'small' | 'normal' | 'large';
}

const fontSizeClasses = {
  small: 'text-xs',
  normal: 'text-sm',
  large: 'text-base'
};

export const TypingIndicator = ({ isDarkMode = false, language, fontSize }: TypingIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start mb-4"
    >
      <div className={`${
        isDarkMode 
          ? 'bg-gray-800/90 text-gray-100 border-gray-600/30' 
          : 'bg-white/90 text-gray-800 border-orange-100/50'
      } border p-4 rounded-2xl shadow-lg backdrop-blur-sm max-w-[75%]`}>
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex-shrink-0"
          >
            <Sun size={16} className="text-orange-400" />
          </motion.div>
          <span className={`${fontSizeClasses[fontSize]} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {language === 'vi' ? 'Sunshine đang suy nghĩ...' : 'Sunshine is thinking...'}
          </span>
          <div className="flex gap-1 flex-shrink-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-orange-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};