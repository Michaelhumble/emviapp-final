
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
  isSupport?: boolean;
}

export const ChatHeader = ({ onClose, isSupport = false }: ChatHeaderProps) => {
  return (
    <div className="border-b py-3 px-4 flex items-center justify-between bg-gradient-to-r from-orange-50 to-yellow-50">
      <div>
        <h3 className="font-medium bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          ☀️ Sunshine AI
        </h3>
        <p className="text-xs text-muted-foreground">
          Your friendly beauty assistant
        </p>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={onClose}
        className="text-muted-foreground"
      >
        <X size={18} />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};
