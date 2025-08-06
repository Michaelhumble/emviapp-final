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
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        w-full max-w-xs mx-auto mt-3 px-6 py-4 rounded-2xl text-white font-semibold
        bg-gradient-to-r ${colorClass} shadow-lg hover:shadow-xl 
        transition-all duration-300 flex items-center justify-center gap-3
        text-sm relative overflow-hidden group
      `}
      style={{
        fontFamily: 'Inter, system-ui, sans-serif'
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.6 }}
      />
      
      <IconComponent className="w-5 h-5 relative z-10" />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
};

export default ChatCTAButton;