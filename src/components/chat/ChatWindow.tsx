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
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enhanced welcome message with better context
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
  }, [isOpen]);

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

    // Add thinking indicator immediately
    const thinkingMessage: Message = {
      id: `thinking-${Date.now()}`,
      content: "thinking...",
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, thinkingMessage]);
    }, 300);

    try {
      console.log('🌟 Sending message to GPT-4.1 Sunshine:', currentInput);
      console.log('🌟 Enhanced conversation context with', messages.length, 'messages');
      
      const { data, error } = await supabaseBypass.functions.invoke('sunshine-chat', {
        body: {
          message: currentInput,
          conversationHistory: messages
            .filter(msg => msg.id !== 'welcome') // Exclude welcome message from context
            .slice(-20) // Keep last 20 messages for richer context
            .map(msg => ({
              content: msg.content,
              isUser: msg.sender === 'user'
            }))
        }
      });

      if (error) {
        console.error('🌟 Sunshine chat error:', error);
        throw error;
      }

      console.log('🌟 GPT-4.1 Premium response received:', data);
      console.log('🌟 Model used:', data.model, '| Quality:', data.quality);

      const response: Message = {
        id: `assistant-${Date.now()}`,
        content: data.message || "✨ I'm here to help! How can I assist you today?",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(msg => !msg.content.includes("thinking...")).concat([response]));
    } catch (error) {
      console.error('🌟 Chat error:', error);
      
      const errorResponse: Message = {
        id: `error-${Date.now()}`,
        content: "✨ I'm experiencing a brief moment to think better! Please try again. I'm here and ready to help! 🌟",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(msg => !msg.content.includes("thinking...")).concat([errorResponse]));
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
        className="fixed bottom-16 right-4 sm:bottom-24 sm:right-6 w-[95vw] max-w-sm sm:w-96 bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-orange-200 overflow-hidden z-[9998]"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Header with thinking pulse effect */}
        <motion.div 
          className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-3 sm:p-4 text-white"
          animate={isLoading ? {
            boxShadow: [
              "0 0 20px rgba(255, 165, 0, 0.3)",
              "0 0 30px rgba(255, 165, 0, 0.6)",
              "0 0 20px rgba(255, 165, 0, 0.3)",
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: isLoading ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ChatIcon size={isMobile ? 24 : 28} />
              <div>
                <h3 className="font-bold text-base sm:text-lg">Little Sunshine</h3>
                <p className="text-xs text-orange-100">
                  {isLoading ? "🧠 Thinking deeply for you..." : "Your Beauty Industry Assistant ✨"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 w-7 h-7 sm:w-8 sm:h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 w-7 h-7 sm:w-8 sm:h-8 p-0"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
          </motion.div>

        {/* Chat content */}
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Messages */}
            <ScrollArea className="h-80 sm:h-96 p-3 sm:p-4">
              <div className="space-y-3 sm:space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-xs px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                          : 'bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 text-gray-800'
                      }`}
                    >
                      {message.content === "thinking..." ? (
                        <div className="flex items-center space-x-3 py-1">
                          {/* Animated thinking dots */}
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-2.5 h-2.5 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full"
                                animate={{
                                  scale: [1, 1.4, 1],
                                  opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut",
                                }}
                              />
                            ))}
                          </div>
                          
                          {/* Sparkle effect */}
                          <motion.div
                            className="relative"
                            animate={{
                              rotate: [0, 360],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <span className="text-orange-400 text-sm">✨</span>
                          </motion.div>
                          
                          <div className="flex flex-col">
                            <span className="text-xs text-orange-600 font-medium">Little Sunshine is thinking...</span>
                            <span className="text-xs text-orange-400 italic">Crafting the perfect response</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed">{message.content}</p>
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

            {/* Enhanced Input area with responsive design */}
            <div className="p-3 sm:p-4 border-t border-orange-100 bg-gradient-to-r from-orange-50/50 to-yellow-50/50">
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Little Sunshine anything..."
                  className="flex-1 min-h-[36px] sm:min-h-[40px] max-h-24 sm:max-h-32 resize-none border-orange-200 focus:border-orange-400 focus:ring-orange-400/20 bg-white/80 text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 w-10 h-10 sm:w-12 sm:h-12 p-0"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};