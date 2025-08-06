import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  UserPlus, 
  Home, 
  Search, 
  Building2, 
  MessageCircle, 
  Info,
  LogIn
} from 'lucide-react';

interface ChatCTAButtonProps {
  label: string;
  route: string;
  intent: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const iconMap = {
  'post-job': Briefcase,
  'signup': UserPlus,
  'signin': LogIn,
  'sell-salon': Home,
  'browse-jobs': Search,
  'browse-salons': Building2,
  'contact': MessageCircle,
  'about': Info,
};

const colorMap = {
  'post-job': 'from-orange-500 to-orange-600',
  'signup': 'from-blue-500 to-blue-600',
  'signin': 'from-blue-500 to-blue-600',
  'sell-salon': 'from-purple-500 to-purple-600',
  'browse-jobs': 'from-green-500 to-green-600',
  'browse-salons': 'from-indigo-500 to-indigo-600',
  'contact': 'from-gray-500 to-gray-600',
  'about': 'from-teal-500 to-teal-600',
};

const ChatCTAButton: React.FC<ChatCTAButtonProps> = ({ 
  label, 
  route, 
  intent,
  variant = 'primary' 
}) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[intent as keyof typeof iconMap] || Briefcase;
  const colorClass = colorMap[intent as keyof typeof colorMap] || 'from-orange-500 to-orange-600';

  const handleClick = () => {
    navigate(route);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`
        group relative inline-flex items-center gap-2 px-5 py-3 rounded-3xl text-sm font-semibold
        text-white overflow-hidden transition-all duration-300 shadow-xl
        hover:scale-105 hover:shadow-2xl active:scale-95 border border-white/20
        bg-gradient-to-r ${colorClass}
      `}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }}
    >
      {/* Premium glow effect */}
      <div className="absolute inset-0 -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glass morphism border */}
      <div className="absolute inset-0 rounded-3xl border border-white/30 bg-white/5 backdrop-blur-sm" />
      
      {/* Animated shimmer */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out skew-x-12" />
      </div>
      
      {/* Sparkle effect on hover */}
      <div className="absolute top-1 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300" />
      <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500 delay-200" />
      
      {/* Icon with cute bounce */}
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <IconComponent className="h-4 w-4 relative z-10 drop-shadow-sm" />
      </motion.div>
      
      {/* Label with gradient text */}
      <span className="relative z-10 bg-gradient-to-b from-white to-white/90 bg-clip-text text-transparent font-bold tracking-wide">
        {label}
      </span>
    </motion.button>
  );
};

export default ChatCTAButton;