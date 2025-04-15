
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="border-b py-3 px-4 flex items-center justify-between bg-primary/5">
      <div>
        <h3 className="font-medium text-primary">EmviApp Assistant</h3>
        <p className="text-xs text-muted-foreground">Ask me anything about beauty services</p>
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
