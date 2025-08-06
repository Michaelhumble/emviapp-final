import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Sun, User, Maximize2, Minimize2, Sparkles, Crown, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { ChatMessage } from './types';

interface UltimateSunshineWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UltimateSunshineWindow = ({ isOpen, onClose }: UltimateSunshineWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        content: "✨ Hello! I'm Little Sunshine, your exclusive premium beauty industry assistant. How can I illuminate your path to success today?",
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
        content: data.message || "I'm here to brighten your success! ✨",
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
        content: "Something went wrong! Let's try again ☀️",
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

  const getWindowClasses = () => {
    if (isFullscreen) {
      return "fixed inset-4 md:inset-8 w-auto h-auto max-w-none max-h-none";
    }
    return "fixed bottom-4 right-4 w-[96vw] max-w-[480px] h-[88vh] max-h-[700px] md:bottom-6 md:right-6 md:w-[480px] md:h-[700px]";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {isFullscreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[9998]"
              onClick={() => setIsFullscreen(false)}
            />
          )}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`
              ${getWindowClasses()}
              bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 border-4 border-orange-200/60 rounded-3xl shadow-2xl shadow-orange-500/30 z-[9999] flex flex-col overflow-hidden backdrop-blur-xl
            `}
          >
            {/* Ultra Premium Header */}
            <div className="bg-gradient-to-br from-orange-500 via-amber-500 via-yellow-500 to-orange-600 p-6 md:p-8 flex items-center justify-between relative overflow-hidden">
              {/* Animated Premium Background */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  animate={{ 
                    backgroundPosition: ['0% 0%', '100% 100%'],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-full h-full bg-gradient-to-br from-white via-transparent to-yellow-200"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.4) 0%, transparent 50%)'
                  }}
                />
              </div>

              <div className="flex items-center gap-5 relative z-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.4, 1],
                    x: [0, 8, -8, 0],
                    y: [0, -5, 5, 0]
                  }}
                  transition={{ 
                    rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-14 h-14 md:w-16 md:h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border-3 border-white/60 shadow-2xl"
                >
                  <Sun className="w-7 h-7 md:w-8 md:h-8 text-white drop-shadow-xl" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-2xl md:text-3xl drop-shadow-lg">
                      Little Sunshine
                    </h3>
                    <Crown className="w-6 h-6 text-yellow-200" />
                  </div>
                  <div className="flex items-center gap-2 text-orange-100 text-sm md:text-base">
                    <Diamond className="w-4 h-4" />
                    <span className="font-semibold">Premium Beauty Assistant</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-white hover:bg-white/25 w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-6 h-6 md:w-7 md:h-7" />
                  ) : (
                    <Maximize2 className="w-6 h-6 md:w-7 md:h-7" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/25 w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  <X className="w-6 h-6 md:w-7 md:h-7" />
                </Button>
              </div>
            </div>

            {/* Ultra Premium Messages */}
            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-5 md:space-y-6 bg-gradient-to-b from-orange-50/60 via-white to-amber-50/40">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", damping: 15 }}
                  className={`flex items-start gap-4 md:gap-5 ${
                    message.isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Ultra Premium Avatar */}
                  <div className={`
                    w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 border-3 shadow-xl
                    ${message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-300/60' 
                      : 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 border-orange-300/60'
                    }
                  `}>
                    {message.isUser ? (
                      <User className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                    ) : (
                      <Sun className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
                    )}
                  </div>

                  {/* Ultra Premium Message Bubble */}
                  <div className={`
                    max-w-[82%] md:max-w-[78%] rounded-3xl md:rounded-4xl p-5 md:p-6 shadow-xl border-2
                    ${message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-300/50 shadow-blue-500/30' 
                      : 'bg-gradient-to-br from-white via-orange-50/50 to-amber-50/30 border-orange-200/60 shadow-orange-200/50'
                    }
                  `}>
                    {message.content === '...' ? (
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-3 h-3 bg-orange-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-3 h-3 bg-orange-400 rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
                          className="w-3 h-3 bg-orange-400 rounded-full"
                        />
                      </div>
                    ) : (
                      <p className={`text-base md:text-lg leading-relaxed font-medium ${
                        message.isUser ? 'text-white' : 'text-gray-800'
                      }`}>
                        {message.content}
                      </p>
                    )}
                    
                    {message.status && message.isUser && (
                      <div className="mt-3 text-sm text-blue-100">
                        {message.status === 'sending' && '⏳ Sending...'}
                        {message.status === 'sent' && '✅ Delivered'}
                        {message.status === 'error' && '❌ Failed to send'}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Ultra Premium Input */}
            <div className="p-5 md:p-8 bg-gradient-to-r from-orange-50/80 via-white to-amber-50/80 border-t-3 border-orange-200/60 backdrop-blur-sm">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask Little Sunshine anything..."
                    className="w-full px-6 py-4 md:px-7 md:py-5 rounded-full border-3 border-orange-200/60 focus:outline-none focus:ring-4 focus:ring-orange-300/60 focus:border-orange-400 bg-white/90 text-base md:text-lg font-medium placeholder-orange-400/70 transition-all duration-300 shadow-lg backdrop-blur-sm"
                    disabled={isProcessing}
                  />
                </div>
                
                <Button
                  onClick={() => setIsListening(!isListening)}
                  variant="outline"
                  size="icon"
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-3 transition-all duration-300 shadow-lg ${
                    isListening 
                      ? 'bg-red-500 text-white border-red-400 hover:bg-red-600 shadow-red-500/40' 
                      : 'border-orange-300/60 hover:bg-orange-100 shadow-orange-200/50'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6 md:w-7 md:h-7" />
                  ) : (
                    <Mic className="w-6 h-6 md:w-7 md:h-7" />
                  )}
                </Button>
                
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-600 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-700 shadow-xl shadow-orange-500/40 border-3 border-orange-300/50 transition-all duration-300"
                >
                  <Send className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-lg" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};