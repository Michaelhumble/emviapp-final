import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabaseBypass } from '@/types/supabase-bypass';
import { X, Send, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LittleSunshineIcon } from './LittleSunshineIcon';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface LittleSunshineWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LittleSunshineWindow = ({ isOpen, onClose }: LittleSunshineWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "✨ Hi there! I'm Little Sunshine, your premium AI assistant. I'm here to illuminate your path to success! How can I help you today?",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages([welcomeMessage]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Call the sunshine-chat edge function
      const { data, error } = await supabaseBypass.functions.invoke('sunshine-chat', {
        body: {
          message: input,
          conversationHistory: messages
            .filter(m => !m.isTyping)
            .slice(-10) // Keep last 10 messages for context
            .map(msg => ({
              content: msg.content,
              isUser: msg.sender === 'user'
            }))
        }
      });

      if (error) {
        console.error('Sunshine chat error:', error);
        throw error;
      }

      const response: Message = {
        id: `assistant-${Date.now()}`,
        content: data.message || "✨ I'm here to help! How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(m => !m.isTyping).concat([response]));
      setIsLoading(false);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorResponse: Message = {
        id: `error-${Date.now()}`,
        content: "✨ I'm experiencing a brief technical hiccup! Please try again in a moment. I'm here and ready to help! 🌟",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(m => !m.isTyping).concat([errorResponse]));
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3">
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-orange-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
      <span className="text-xs text-orange-600 ml-2">Little Sunshine is thinking...</span>
    </div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 right-6 z-[9998]"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-3xl blur-xl scale-110" />
        
        <div className="relative w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50 overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-4 text-white">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 via-transparent to-orange-700/20" />
            
            {/* Sparkle effects */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                  style={{
                    left: `${10 + (i * 10)}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LittleSunshineIcon size={28} />
                <div>
                  <h3 className="font-bold text-lg">Little Sunshine</h3>
                  <p className="text-xs text-orange-100">Premium AI Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 w-8 h-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 w-8 h-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat content */}
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Messages */}
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                            : 'bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200'
                        }`}
                      >
                        {message.isTyping ? (
                          <TypingIndicator />
                        ) : (
                          <>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-orange-100' : 'text-orange-400'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input area */}
              <div className="p-4 border-t border-orange-100 bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
                <div className="flex space-x-2">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Little Sunshine anything..."
                    className="flex-1 min-h-[40px] max-h-32 resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 bg-white/80"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 w-12 h-12 p-0"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LittleSunshineWindow;