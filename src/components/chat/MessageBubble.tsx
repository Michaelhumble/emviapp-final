
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MessageType } from "./ChatSystem";

interface MessageBubbleProps {
  message: MessageType;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  // Format timestamp to display time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "max-w-[80%] group",
        message.sender === "user" ? "ml-auto" : "mr-auto"
      )}
    >
      <div 
        className={cn(
          "rounded-2xl px-4 py-2.5",
          message.sender === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted text-foreground"
        )}
      >
        {message.isTyping ? (
          <div className="flex space-x-1 items-center py-1 px-1">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        )}
      </div>
      <div 
        className={cn(
          "text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity",
          message.sender === "user" ? "text-right" : "text-left"
        )}
      >
        {formatTime(message.timestamp)}
      </div>
    </motion.div>
  );
}
