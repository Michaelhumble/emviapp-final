import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabaseBypass } from '@/types/supabase-bypass';
import { ChatIcon } from './ChatIcon';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!",
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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      console.log('🌟 Sending message to sunshine-chat:', currentInput);
      
      const { data, error } = await supabaseBypass.functions.invoke('sunshine-chat', {
        body: {
          message: currentInput,
          conversationHistory: messages.map(msg => ({
            content: msg.content,
            isUser: msg.sender === 'user'
          }))
        }
      });

      if (error) {
        console.error('🌟 Sunshine chat error:', error);
        throw error;
      }

      console.log('🌟 Received response:', data);

      const response: Message = {
        id: `assistant-${Date.now()}`,
        content: data.message || "I'm here to help! How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('🌟 Chat error:', error);
      
      const errorResponse: Message = {
        id: `error-${Date.now()}`,
        content: "I'm experiencing a brief technical hiccup! Please try again in a moment.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl border border-orange-200 overflow-hidden z-[9998]"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChatIcon size={28} />
              <div>
                <h3 className="font-bold text-lg">Little Sunshine</h3>
                <p className="text-xs text-orange-100">AI Assistant</p>
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
                          : 'bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-orange-100' : 'text-orange-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 px-4 py-3 rounded-2xl">
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
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input area */}
            <div className="p-4 border-t border-orange-100 bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
              <div className="flex space-x-2">
                <Textarea
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
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};