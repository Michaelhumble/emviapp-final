
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function ChatHeader({ 
  onClose, 
  title = "Little Sunshine", 
  subtitle = "Your AI Assistant" 
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-background shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Sparkles size={18} className="text-primary" />
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
        <X size={16} />
      </Button>
    </div>
  );
}
