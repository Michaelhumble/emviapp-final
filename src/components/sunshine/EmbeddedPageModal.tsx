import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmbeddedPageModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const EmbeddedPageModal: React.FC<EmbeddedPageModalProps> = ({
  isOpen,
  onClose,
  url,
  title
}) => {
  const isMobile = useIsMobile();

  const handleExternalLink = () => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute bg-white rounded-2xl shadow-2xl overflow-hidden ${
              isMobile 
                ? 'inset-4 top-8' 
                : 'top-16 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-5xl h-[80vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-amber-900 truncate">{title}</h3>
              </div>
              <div className="flex items-center gap-2">
                {/* External link button for mobile */}
                {isMobile && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleExternalLink}
                    className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-orange-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-orange-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 h-full">
              {isMobile ? (
                // Mobile: Show message to open in new tab
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center mb-4">
                    <ExternalLink className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    Open in New Tab
                  </h3>
                  <p className="text-amber-700 mb-6 max-w-sm">
                    For the best mobile experience, this page will open in a new tab.
                  </p>
                  <Button
                    onClick={handleExternalLink}
                    className="bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white px-6 py-3 rounded-xl"
                  >
                    Open Page
                  </Button>
                </div>
              ) : (
                // Desktop: Show embedded iframe
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  title={title}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};