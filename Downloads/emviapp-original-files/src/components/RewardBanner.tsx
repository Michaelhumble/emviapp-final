
import { Gift, X } from 'lucide-react';
import { useState } from 'react';

interface RewardBannerProps {
  message: string;
  onClose?: () => void;
  onAction?: () => void;
  actionText?: string;
  variant?: 'success' | 'info';
}

const RewardBanner = ({ 
  message, 
  onClose, 
  onAction, 
  actionText = "Claim Reward", 
  variant = 'success' 
}: RewardBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 max-w-md w-full rounded-lg shadow-lg animate-slide-up ${
      variant === 'success' 
        ? 'bg-gradient-to-r from-emerald-900/80 to-emerald-800/80 border border-emerald-600/30' 
        : 'bg-gradient-to-r from-purple-900/80 to-indigo-800/80 border border-purple-600/30'
    }`}>
      <div className="flex items-start p-4">
        <div className={`p-2 rounded-full mr-3 flex-shrink-0 ${
          variant === 'success' ? 'bg-emerald-700/50' : 'bg-purple-700/50'
        }`}>
          <Gift size={18} className={
            variant === 'success' ? 'text-emerald-300' : 'text-purple-300'
          } />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm">{message}</p>
          
          {onAction && (
            <button 
              onClick={onAction}
              className={`mt-3 px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                variant === 'success'
                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                  : 'bg-purple-700 hover:bg-purple-600 text-white'
              }`}
            >
              {actionText}
            </button>
          )}
        </div>
        
        <button 
          onClick={handleClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default RewardBanner;
