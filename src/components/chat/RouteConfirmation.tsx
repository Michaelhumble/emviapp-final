import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-3 p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl border border-blue-200/50 shadow-sm"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <ExternalLink className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
          <p className="text-gray-600 text-xs mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
      
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onConfirm}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md font-medium"
        >
          <ArrowRight className="h-3 w-3" />
          {language === 'vi' ? 'Đi thôi!' : 'Let\'s go!'}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 text-xs rounded-full hover:bg-gray-300 transition-all duration-200 font-medium"
        >
          {language === 'vi' ? 'Để sau' : 'Maybe later'}
        </motion.button>
      </div>
    </motion.div>
  );
};