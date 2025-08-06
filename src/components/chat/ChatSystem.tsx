import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Little Sunshine ☀️ How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    console.log('🤖 [SUNSHINE] Sending message:', currentInput);

    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: { message: currentInput }
      });

      console.log('🤖 [SUNSHINE] Response received:', { data, error });

      if (error) {
        throw new Error(error.message || 'Failed to get response');
      }

      // Brief realistic typing delay
      setTimeout(() => {
        setIsTyping(false);
        setLoading(false);
        const botMessage = { 
          id: Date.now() + 1, 
          text: data?.message || "I'm here to help!", 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, botMessage]);
      }, 800);
    } catch (error) {
      console.error('🤖 [SUNSHINE] Error:', error);
      setIsTyping(false);
      setLoading(false);
      const errorMessage = { 
        id: Date.now() + 1, 
        text: "I'm having trouble right now, but I'm here to help! Try again!", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Enhanced Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-xl z-50 flex items-center justify-center transition-all duration-300 hover:shadow-2xl"
          >
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Enhanced Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 w-80 h-[500px] bg-white rounded-2xl shadow-2xl border border-orange-200 z-50 flex flex-col overflow-hidden"
          >
            {/* Premium Header */}
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  ☀️
                </div>
                <div>
                  <h3 className="font-bold text-lg">Little Sunshine</h3>
                  <p className="text-orange-100 text-xs">Your Beauty Assistant</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-orange-200 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Enhanced Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-orange-50/30 to-white">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg'
                        : 'bg-white text-gray-800 shadow-md border border-orange-100'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Enhanced Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 shadow-md border border-orange-100 px-4 py-3 rounded-2xl max-w-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-orange-400 rounded-full"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Sunshine is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Premium Input */}
            <div className="p-4 border-t border-orange-100 bg-gradient-to-r from-orange-50/50 to-white">
              <div className="flex gap-3 items-end">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 border border-orange-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-sm"
                  disabled={loading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatSystem;