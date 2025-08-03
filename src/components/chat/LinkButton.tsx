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
      // Always open hardcoded external links in new window
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-md hover:from-blue-600 hover:to-purple-600 transition-all duration-200 max-w-full"
    >
      {icon || <ExternalLink className="h-3 w-3 flex-shrink-0" />}
      <span className="text-xs font-medium truncate">{label}</span>
      <ArrowRight className="h-3 w-3 flex-shrink-0" />
    </motion.button>
  );
};