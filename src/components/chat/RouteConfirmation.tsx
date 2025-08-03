import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';

interface RouteConfirmationProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  language: 'en' | 'vi';
}

export const RouteConfirmation = ({ 
  title, 
  description, 
  onConfirm, 
  onCancel, 
  language 
}: RouteConfirmationProps) => {
  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 relative z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <ExternalLink className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg font-semibold flex-1 justify-center"
          >
            <ArrowRight className="h-4 w-4" />
            {language === 'vi' ? 'Đi thôi!' : 'Let\'s go!'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCancel}
            className="px-6 py-3 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-all duration-200 font-semibold"
          >
            {language === 'vi' ? 'Để sau' : 'Maybe later'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  // Render modal using portal to body for highest z-index
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};