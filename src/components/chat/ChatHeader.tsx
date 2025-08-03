
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
  isSupport?: boolean;
}

export const ChatHeader = ({ onClose, isSupport = false }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        {/* Sunshine Avatar */}
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-lg animate-pulse">☀️</span>
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-ping"></div>
        </div>
        
        <div>
          <h3 className="font-semibold text-white text-lg drop-shadow-md">
            ☀️ Sunshine AI
          </h3>
          <p className="text-xs text-orange-100">
            Your smartest beauty business assistant
          </p>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="text-white hover:bg-white/10 hover:text-white"
      >
        <X size={18} />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};
