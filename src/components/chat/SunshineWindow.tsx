import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Sun, User, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { ChatMessage } from './types';

interface SunshineWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SunshineWindow = ({ isOpen, onClose }: SunshineWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: "Hi! I'm Little Sunshine ☀️, your premium beauty industry assistant. How can I brighten your day and help you succeed?",
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: 'typing',
      content: '...',
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: userMessage.content,
          conversationHistory: messages
            .filter(msg => msg.id !== 'typing')
            .map(msg => ({
              content: msg.content,
              isUser: msg.isUser
            })),
          userId: user?.id,
          userName: user?.user_metadata?.full_name || 'User',
          language: 'auto'
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: data.message || "I'm here to help you shine brighter! ✨",
        isUser: false,
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing'),
        { ...userMessage, status: 'sent' },
        assistantMessage
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "Oops! Something went wrong. Let's try that again! ☀️",
        isUser: false,
        timestamp: new Date(),
        status: 'error'
      };
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing'),
        { ...userMessage, status: 'error' },
        errorMessage
      ]);
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

  const toggleVoice = () => {
    setIsListening(!isListening);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Responsive dimensions
  const getWindowClasses = () => {
    if (isFullscreen) {
      return "fixed inset-4 md:inset-8 w-auto h-auto max-w-none max-h-none";
    }
    return "fixed bottom-4 right-4 w-[95vw] max-w-[450px] h-[85vh] max-h-[650px] md:bottom-6 md:right-6 md:w-[450px] md:h-[650px]";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for fullscreen */}
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
              onClick={() => setIsFullscreen(false)}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className={`
              ${getWindowClasses()}
              bg-white border-2 border-orange-200/50 rounded-3xl shadow-2xl shadow-orange-500/25 z-[9999] flex flex-col overflow-hidden backdrop-blur-sm
            `}
          >
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 p-5 md:p-6 flex items-center justify-between relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-full h-full bg-gradient-to-br from-white via-transparent to-yellow-200"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                  }}
                />
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                    x: [0, 5, -5, 0],
                    y: [0, -3, 3, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-12 h-12 md:w-14 md:h-14 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-xl"
                >
                  <Sun className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white text-xl md:text-2xl drop-shadow-sm">
                    Little Sunshine
                  </h3>
                  <p className="text-orange-100 text-sm md:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Premium Beauty Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Maximize2 className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 bg-gradient-to-b from-orange-50/50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", damping: 20 }}
                  className={`flex items-start gap-3 md:gap-4 ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`
                    w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2
                    ${message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-300' 
                      : 'bg-gradient-to-br from-orange-400 to-amber-500 border-orange-300'
                    }
                  `}>
                    {message.isUser ? (
                      <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    ) : (
                      <Sun className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`
                    max-w-[85%] md:max-w-[80%] rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-lg border-2
                    ${message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-300/50' 
                      : 'bg-white border-orange-200/50 shadow-orange-100'
                    }
                  `}>
                    {message.content === '...' ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-orange-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                          className="w-2 h-2 bg-orange-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
                          className="w-2 h-2 bg-orange-400 rounded-full"
                        />
                      </div>
                    ) : (
                      <p className={`text-sm md:text-base leading-relaxed font-medium ${
                        message.isUser ? 'text-white' : 'text-gray-800'
                      }`}>
                        {message.content}
                      </p>
                    )}
                    
                    {/* Status indicator */}
                    {message.status && message.isUser && (
                      <div className="mt-2 text-xs text-blue-100">
                        {message.status === 'sending' && '⏳ Sending...'}
                        {message.status === 'sent' && '✅ Sent'}
                        {message.status === 'error' && '❌ Failed'}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-orange-50 to-amber-50 border-t-2 border-orange-200/50">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Little Sunshine anything..."
                    className="w-full px-4 py-3 md:px-5 md:py-4 rounded-full border-2 border-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-300/50 focus:border-orange-400 bg-white text-sm md:text-base font-medium placeholder-orange-300 transition-all duration-300"
                    disabled={isProcessing}
                  />
                </div>
                
                <Button
                  onClick={toggleVoice}
                  variant="outline"
                  size="icon"
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-2 transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white border-red-500 hover:bg-red-600' 
                      : 'border-orange-300 hover:bg-orange-100'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Mic className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg shadow-orange-500/30 border-2 border-orange-300/50 transition-all duration-300"
                >
                  <Send className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};