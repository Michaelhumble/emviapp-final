import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { ChatMessage } from './types';

interface NewChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewChatWindow = ({ isOpen, onClose }: NewChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
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
        content: "Hi, I am Little Sunshine, how may I help you today? Em biết nói tiếng Việt nữa đó!",
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
          userName: user?.user_metadata?.display_name || 'User',
          language: 'auto'
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: data.message || "I'm here to help! What can I do for you?",
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
        content: "Sorry, I'm having trouble connecting right now. Please try again!",
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
    // Voice functionality can be added later
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-white border border-gray-200 rounded-3xl shadow-2xl z-[9999] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex items-center justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="w-full h-full bg-gradient-to-br from-white to-transparent"
                style={{
                  backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%)'
                }}
              />
            </div>

            <div className="flex items-center gap-4 relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
              >
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white text-xl">
                  Little Sunshine
                </h3>
                <p className="text-white/90 text-sm">
                  Your AI Beauty Assistant
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${
                  message.isUser ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${message.isUser 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                    : 'bg-gradient-to-br from-orange-400 to-pink-500'
                  }
                `}>
                  {message.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`
                  max-w-[80%] rounded-2xl p-4 shadow-sm
                  ${message.isUser 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                    : 'bg-white border border-gray-200'
                  }
                `}>
                  {message.content === '...' ? (
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  ) : (
                    <p className={`text-sm leading-relaxed ${
                      message.isUser ? 'text-white' : 'text-gray-800'
                    }`}>
                      {message.content}
                    </p>
                  )}
                  
                  {/* Status indicator */}
                  {message.status && message.isUser && (
                    <div className="mt-1 text-xs text-white/70">
                      {message.status === 'sending' && 'Sending...'}
                      {message.status === 'sent' && '✓'}
                      {message.status === 'error' && '⚠ Failed'}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Little Sunshine anything..."
                  className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-gray-50"
                  disabled={isProcessing}
                />
              </div>
              
              <Button
                onClick={toggleVoice}
                variant="outline"
                size="icon"
                className={`w-12 h-12 rounded-full ${
                  isListening ? 'bg-red-500 text-white border-red-500' : ''
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
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