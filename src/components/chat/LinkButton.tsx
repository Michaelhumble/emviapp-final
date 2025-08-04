import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  onClick?: () => void;
}

export const LinkButton = ({ href, label, icon, description, onClick }: LinkButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Use internal navigation for same-tab routing - never open new tabs
      window.location.href = href;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 max-w-full font-premium font-semibold tracking-wide border-2 border-white/20"
      style={{
        fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
        letterSpacing: '-0.01em',
        boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3), 0 4px 16px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
    >
      {icon || <ExternalLink className="h-4 w-4 flex-shrink-0" />}
      <span className="text-sm font-semibold truncate">{label}</span>
      <ArrowRight className="h-4 w-4 flex-shrink-0" />
    </motion.button>
  );
};