
import { forwardRef, useState, useRef, useEffect, KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ value, onChange, onSend, onFocus, onBlur }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    // Sync forwarded ref with internal ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(textareaRef.current);
      } else if (ref) {
        ref.current = textareaRef.current;
      }
    }, [ref]);
    
    // Auto-resize textarea based on content
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
      }
    }, [value]);
    
    // Handle key presses (Enter to send)
    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };
    
    // Focus event handling
    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };
    
    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    return (
      <div className={cn(
        "transition-shadow",
        isFocused && "shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      )}>
        <div className="flex gap-2 items-end">
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Message Little Sunshine..."
              className="resize-none w-full border rounded-md px-3 py-2 text-sm min-h-[40px] max-h-[120px] overflow-y-auto focus:ring-1 focus:ring-primary focus-visible:outline-none"
              style={{ 
                fontSize: '16px', // Prevent iOS zoom
                lineHeight: 1.5,
              }}
            />
          </div>
          <Button 
            onClick={onSend} 
            size="icon" 
            disabled={!value.trim()}
            className={cn(
              "h-10 w-10 shrink-0",
              !value.trim() && "opacity-50 cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
