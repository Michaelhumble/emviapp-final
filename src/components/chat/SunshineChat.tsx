import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Sun, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { Message } from './types';

interface SunshineChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SunshineChat = ({ isOpen, onClose }: SunshineChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasShownGreeting, setHasShownGreeting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show initial greeting
  useEffect(() => {
    if (isOpen && !hasShownGreeting) {
      setMessages([{
        id: 'greeting',
        content: "Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!",
        isUser: false,
        timestamp: new Date()
      }]);
      setHasShownGreeting(true);
    }
  }, [isOpen, hasShownGreeting]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '...',
      isUser: false,
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: userMessage.content,
          conversationHistory: messages
            .filter(msg => !msg.typing)
            .map(msg => ({
              content: msg.content,
              isUser: msg.isUser
            })),
          userId: user?.id,
          userName: user?.user_metadata?.display_name || user?.email?.split('@')[0],
          language: 'auto'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: data.message || "I'm here to help! What can I do for you?",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat(assistantMessage));
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Sorry, I'm having trouble right now. Please try again!",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat(errorMessage));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-20 right-4 w-96 h-[500px] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 p-4 flex items-center justify-between relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-16 h-16 bg-white/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -right-4 w-12 h-12 bg-white/20 rounded-full"
              />
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                <Sun className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white text-lg drop-shadow-sm">
                  Little Sunshine
                </h3>
                <p className="text-white/90 text-sm">
                  Your Beauty Assistant
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 relative z-10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[80%] rounded-2xl p-3 shadow-sm
                  ${message.isUser 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                    : 'bg-white border border-orange-100'
                  }
                `}>
                  {message.typing ? (
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-orange-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-orange-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-orange-400 rounded-full"
                      />
                    </div>
                  ) : (
                    <p className={`text-sm leading-relaxed ${
                      message.isUser ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-orange-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Little Sunshine anything..."
                className="flex-1 px-4 py-3 rounded-full border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-orange-50/50"
                disabled={isProcessing}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 shadow-lg"
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};