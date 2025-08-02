import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, ExternalLink, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  feedback?: 'up' | 'down' | null;
  language?: 'en' | 'vi';
}

interface ChatMessageProps {
  message: Message;
  index: number;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
  onLinkClick: (url: string, title: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  index,
  onFeedback,
  onLinkClick
}) => {
  // Parse message content for links
  const parseMessageContent = (content: string) => {
    // Pattern to match [text](url) format
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      // Add text before link
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }

      // Add link button
      const linkText = match[1];
      const linkUrl = match[2];
      const isInternalLink = linkUrl.startsWith('/');
      
      parts.push(
        <Button
          key={`link-${match.index}`}
          variant="outline"
          size="sm"
          className="mx-1 my-1 bg-white/80 border-orange-300 text-amber-800 hover:bg-orange-50 hover:border-orange-400 text-xs px-3 py-1 h-auto rounded-lg inline-flex items-center gap-1"
          onClick={() => onLinkClick(linkUrl, linkText)}
        >
          {isInternalLink ? <ArrowRight className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
          {linkText}
        </Button>
      );

      lastIndex = linkPattern.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts.length > 1 ? parts : content;
  };

  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] ${message.role === 'assistant' ? 'space-y-2' : ''}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-3 rounded-2xl text-sm shadow-sm ${
            message.role === 'user'
              ? 'bg-gradient-to-r from-orange-400 to-amber-400 text-white rounded-br-md'
              : 'bg-white/80 text-amber-900 border border-orange-200/50 rounded-bl-md'
          }`}
        >
          {message.role === 'assistant' ? parseMessageContent(message.content) : message.content}
        </motion.div>
        
        {/* Feedback buttons for assistant messages */}
        {message.role === 'assistant' && message.id !== 'welcome' && (
          <div className="flex gap-1 justify-start">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full ${
                  message.feedback === 'up' 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-amber-600 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => onFeedback(message.id, 'up')}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className={`h-7 w-7 rounded-full ${
                  message.feedback === 'down' 
                    ? 'text-red-600 bg-red-50' 
                    : 'text-amber-600 hover:text-red-600 hover:bg-red-50'
                }`}
                onClick={() => onFeedback(message.id, 'down')}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};