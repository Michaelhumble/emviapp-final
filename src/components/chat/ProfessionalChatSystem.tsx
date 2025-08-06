import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  ctaButtons?: Array<{
    label: string;
    route: string;
    icon?: string;
    variant?: 'primary' | 'secondary';
  }>;
}

const ProfessionalChatSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi, I am Sunshine, what\'s your name? Em biết nói tiếng Việt nữa đó!',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('🤖 [SUNSHINE] Sending message to Little Sunshine:', currentInput);
      
      // Call the real Little Sunshine edge function
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: { message: currentInput }
      });

      if (error) {
        console.error('❌ [SUNSHINE] Error calling edge function:', error);
        throw error;
      }

      console.log('✅ [SUNSHINE] Response from Little Sunshine:', data);
      
      // Create AI response with the actual trained response
      const aiResponse = data.message || "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!";
      
      // Smart CTA buttons based on Little Sunshine's response content
      let ctaButtons: Array<{ label: string; route: string; variant?: 'primary' | 'secondary' }> = [];
      
      // Check if the response suggests specific actions
      if (aiResponse.toLowerCase().includes('post') && aiResponse.toLowerCase().includes('job')) {
        ctaButtons = [{ label: '📝 Post a Job', route: '/post-job', variant: 'primary' }];
      } else if (aiResponse.toLowerCase().includes('browse') && aiResponse.toLowerCase().includes('job')) {
        ctaButtons = [{ label: '🔍 Browse Jobs', route: '/jobs', variant: 'primary' }];
      } else if (aiResponse.toLowerCase().includes('salon') && aiResponse.toLowerCase().includes('sell')) {
        ctaButtons = [{ label: '🏢 List Your Salon', route: '/sell-salon', variant: 'primary' }];
      } else if (aiResponse.toLowerCase().includes('sign up')) {
        ctaButtons = [{ label: '✨ Sign Up Now', route: '/auth/signup', variant: 'primary' }];
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        ctaButtons
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ [SUNSHINE] Chat error:', error);
      
      // Fallback message that maintains Little Sunshine's personality
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Magical Sunshine Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Glowing aura */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, transparent 100%)',
                filter: 'blur(8px)',
                transform: 'scale(1.8)',
              }}
              animate={{
                scale: [1.8, 2.2, 1.8],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Orbiting sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-200 rounded-full"
                style={{
                  boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
                }}
                animate={{
                  x: [
                    Math.cos((i * Math.PI * 2) / 6) * 40,
                    Math.cos(((i * Math.PI * 2) / 6) + Math.PI * 2) * 40,
                  ],
                  y: [
                    Math.sin((i * Math.PI * 2) / 6) * 40,
                    Math.sin(((i * Math.PI * 2) / 6) + Math.PI * 2) * 40,
                  ],
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear",
                }}
              />
            ))}

            <motion.button
              whileHover={{ 
                scale: 1.15, 
                y: -3,
                rotateZ: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 30%, #ea580c 70%, #dc2626 100%)',
                boxShadow: '0 8px 32px rgba(251, 191, 36, 0.6), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
                }}
                animate={{
                  x: [-100, 100],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Sun Icon with sparkle effect */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <motion.div
                  className="text-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotateZ: [0, -5, 5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ☀️
                </motion.div>
                
                {/* Inner sparkles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${30 + i * 15}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Pulsing heart for unread messages */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white text-xs">💌</span>
              </motion.div>
              
              {/* Enhanced tooltip */}
              <motion.div 
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                initial={{ y: 10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <span>✨</span>
                  <span className="font-medium">Meet Little Sunshine!</span>
                  <span>✨</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-600" />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
            style={{
              background: 'linear-gradient(145deg, #fef7ed 0%, #fed7aa 20%, #fdba74 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 1px rgba(255, 255, 255, 0.8),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
              `,
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                borderRadius: '24px 24px 0 0',
                padding: '20px',
              }}
            >
              {/* Animated background patterns */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay transform -translate-x-16 -translate-y-16" />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full mix-blend-overlay transform translate-x-12 translate-y-12" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Animated Avatar */}
                  <motion.div
                    className="w-12 h-12 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)',
                    }}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-2xl">☀️</span>
                    
                    {/* Sparkle animations */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                        style={{
                          top: `${10 + i * 10}%`,
                          right: `${5 + i * 15}%`,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </motion.div>

                  <div>
                    <h3 className="text-white font-bold text-lg">Little Sunshine</h3>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-green-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-white/90 text-sm">✨ Inspired by Sunshine ✨</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4"
              style={{
                height: 'calc(100% - 140px)',
                background: 'linear-gradient(to bottom, #fef7ed 0%, #fed7aa 50%, #fdba74 100%)',
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 relative ${
                      message.isUser
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-800 shadow-md'
                    }`}
                    style={{
                      boxShadow: message.isUser
                        ? '0 4px 12px rgba(99, 102, 241, 0.3)'
                        : '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* CTA Buttons */}
                    {message.ctaButtons && message.ctaButtons.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 space-y-2"
                      >
                        {message.ctaButtons.map((cta, index) => (
                          <motion.button
                            key={index}
                            onClick={() => window.location.href = cta.route}
                            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              cta.variant === 'primary'
                                ? 'bg-gradient-to-r from-orange-500 to-yellow-600 text-white hover:from-orange-600 hover:to-yellow-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {cta.label}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      <span className="text-sm text-gray-600">Sunshine is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Enhanced Input Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 border-t border-orange-200/50"
              style={{
                background: 'linear-gradient(to right, #ffffff 0%, #fef7ed 100%)',
                borderRadius: '0 0 24px 24px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  {/* Animated background for input */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-100 opacity-50 animate-pulse" />
                  
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="🌟 Ask me anything! Jobs, salons, beauty tips... I'm here to help! 💬"
                    rows={1}
                    className="relative z-10 w-full px-5 py-4 rounded-xl border-2 border-orange-300/50 focus:border-orange-400 focus:outline-none resize-none text-gray-800 placeholder-orange-400 transition-all duration-300 shadow-lg font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fffbf5 100%)',
                      boxShadow: 'inset 0 2px 4px rgba(234, 88, 12, 0.05), 0 4px 12px rgba(251, 191, 36, 0.15)',
                    }}
                  />
                  
                  {/* Floating sparkle decorations */}
                  <motion.div
                    className="absolute top-3 right-4 text-orange-300"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                  
                  {/* Encouraging animation when empty */}
                  {!inputMessage && (
                    <motion.div
                      className="absolute left-5 top-4 text-orange-400 text-sm pointer-events-none font-medium"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💭 What's on your mind today?
                    </motion.div>
                  )}
                </div>
                
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #ea580c 100%)',
                    boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: -100 }}
                    whileHover={{ x: 100 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <motion.div
                    className="relative z-10"
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 text-white" />
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfessionalChatSystem;