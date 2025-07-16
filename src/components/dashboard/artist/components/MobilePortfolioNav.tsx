import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Upload, Share2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobilePortfolioNavProps {
  onBack?: () => void;
  onUpload?: () => void;
  onShare?: () => void;
  showBackButton?: boolean;
}

const MobilePortfolioNav = ({ 
  onBack, 
  onUpload, 
  onShare, 
  showBackButton = true 
}: MobilePortfolioNavProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <motion.div
      className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between bg-white/90 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-white/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Back Button */}
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </Button>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        {onUpload && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onUpload}
            className="w-10 h-10 p-0 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200"
          >
            <Upload className="w-4 h-4" />
          </Button>
        )}
        
        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="w-10 h-10 p-0 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // Navigate back to dashboard overview
            const overviewTab = document.querySelector('[value="overview"]') as HTMLElement;
            overviewTab?.click();
          }}
          className="w-10 h-10 p-0 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <Home className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MobilePortfolioNav;