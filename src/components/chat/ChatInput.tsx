
import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TextareaAutosize from 'react-textarea-autosize';

export interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  isProcessing: boolean;
}

export const ChatInput = ({ onSendMessage, isProcessing }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (message.trim() === '' || isProcessing) return;
    
    const content = message.trim();
    setMessage('');
    
    try {
      await onSendMessage(content);
    } catch (error) {
      console.error('Error sending message:', error);
    }
    
    // Focus back on the textarea after sending
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter without Shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1 bg-background rounded-lg border relative">
        <TextareaAutosize
          ref={textareaRef}
          className="w-full p-3 pr-10 bg-transparent resize-none focus:outline-none min-h-[50px] max-h-[200px]"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          rows={1}
        />
      </div>
      
      <Button 
        type="button" 
        size="icon" 
        onClick={handleSend}
        disabled={isProcessing || message.trim() === ''}
        className="shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground"
      >
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};
