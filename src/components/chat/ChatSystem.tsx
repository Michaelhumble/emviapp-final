import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Crown, Camera, Mic, Palette, Volume2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PremiumFeatures from './PremiumFeatures';
import VoiceChat from './VoiceChat';
import PhotoUpload from './PhotoUpload';
import AIImageGeneration from './AIImageGeneration';
import { isFeatureEnabled, type PremiumFeature } from '@/config/premiumFeatures';

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Little Sunshine ☀️ How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showAIImageGen, setShowAIImageGen] = useState(false);
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

  const handleFeatureSelect = (feature: PremiumFeature) => {
    switch (feature) {
      case 'VOICE_CHAT':
        setShowVoiceChat(true);
        break;
      case 'PHOTO_UPLOAD':
        setShowPhotoUpload(true);
        break;
      case 'AI_IMAGE_GEN':
        setShowAIImageGen(true);
        break;
      default:
        // Handle other features
        break;
    }
    setShowPremiumFeatures(false);
  };

  const handlePhotoAnalyzed = (analysis: string) => {
    const botMessage = { 
      id: Date.now(), 
      text: analysis, 
      sender: 'bot' 
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleImageGenerated = (imageUrl: string, prompt: string) => {
    const botMessage = { 
      id: Date.now(), 
      text: `I've created your custom design! Here's a beautiful ${prompt} - what do you think?`, 
      sender: 'bot' 
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      {/* Compact Mobile-Friendly Little Sunshine Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Inner Rotating Ring */}
              <motion.div
                className="absolute inset-1 rounded-full border border-white/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner Rotating Gradient */}
              <motion.div
                className="absolute inset-2 rounded-full opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.8), transparent)'
                }}
              />

              {/* White Sun Icon */}
              <div className="flex items-center justify-center w-full h-full relative z-10">
                <span 
                  className="text-4xl"
                  style={{
                    filter: 'brightness(0) invert(1)', // Makes emoji white
                    WebkitFilter: 'brightness(0) invert(1)'
                  }}
                >
                  ☀️
                </span>
              </div>
              
              {/* Smaller Online Dot */}
              <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Billion-Dollar Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] z-50 flex flex-col overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Premium Header with Glassmorphism */}
            <div 
              className="relative text-white p-6 flex justify-between items-center"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 50%, #FF4500 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/20 rounded-full"
                    animate={{
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-4 relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">☀️</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/30 to-orange-300/30"></div>
                </motion.div>
                <div>
                  <motion.h3 
                    className="font-bold text-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Little Sunshine
                  </motion.h3>
                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                    <p className="text-orange-100 text-sm">Your Beauty AI Assistant</p>
                  </motion.div>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  console.log('🔥 Closing chat window');
                  setIsOpen(false);
                }}
                className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10 z-20 relative"
                style={{ zIndex: 20 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Premium Messages Container */}
            <div 
              className="flex-1 p-6 overflow-y-auto space-y-4 relative chat-scroll"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 248, 240, 0.6), rgba(255, 255, 255, 0.8))',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Ambient Background Effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
              </div>
              
              <div className="relative z-10">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`max-w-xs px-5 py-4 rounded-2xl relative overflow-hidden ${
                        msg.sender === 'user'
                          ? 'text-white shadow-lg'
                          : 'bg-white/80 text-gray-800 shadow-md border border-white/50'
                      }`}
                      style={msg.sender === 'user' ? {
                        background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 100%)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(255, 107, 0, 0.3)'
                      } : {
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {msg.sender === 'user' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                      )}
                      <p className="text-sm leading-relaxed relative z-10 font-medium">{msg.text}</p>
                    </motion.div>
                  </motion.div>
                ))}
              
                {/* Premium Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <motion.div 
                      className="bg-white/90 text-gray-800 shadow-lg px-5 py-4 rounded-2xl max-w-xs relative overflow-hidden"
                      style={{
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                              animate={{
                                scale: [1, 1.4, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">Sunshine is thinking...</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Billion-Dollar Input Section */}
            <div 
              className="p-6 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Premium Feature Shortcuts */}
              <motion.div 
                className="flex gap-3 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { icon: Mic, action: () => setShowVoiceChat(true), color: 'from-purple-500 to-purple-600', title: 'Voice Chat' },
                  { icon: Camera, action: () => setShowPhotoUpload(true), color: 'from-blue-500 to-blue-600', title: 'Photo Upload' },
                  { icon: Palette, action: () => setShowAIImageGen(true), color: 'from-pink-500 to-pink-600', title: 'AI Generation' },
                  { icon: Crown, action: () => setShowPremiumFeatures(true), color: 'from-yellow-500 to-orange-500', title: 'Premium' }
                ].map((feature, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={feature.action}
                    className={`p-3 rounded-xl text-white transition-all duration-300 bg-gradient-to-r ${feature.color} shadow-lg hover:shadow-xl relative overflow-hidden group`}
                    title={feature.title}
                    style={{
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <feature.icon className="w-4 h-4 relative z-10" />
                  </motion.button>
                ))}
              </motion.div>

              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Ask me anything..."
                    disabled={loading}
                    className="w-full px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0 border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                    }}
                  />
                  {input && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    </motion.div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: input.trim() 
                      ? 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 100%)'
                      : 'rgba(156, 163, 175, 0.5)',
                    boxShadow: input.trim() 
                      ? '0 8px 25px rgba(255, 107, 0, 0.4)'
                      : '0 4px 15px rgba(156, 163, 175, 0.2)'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 transform rotate-45 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  <Send className="w-5 h-5 text-white relative z-10" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Feature Modals */}
      <PremiumFeatures 
        isOpen={showPremiumFeatures}
        onClose={() => setShowPremiumFeatures(false)}
        onFeatureSelect={handleFeatureSelect}
      />
      
      <VoiceChat 
        isOpen={showVoiceChat}
        onClose={() => setShowVoiceChat(false)}
      />
      
      <PhotoUpload 
        isOpen={showPhotoUpload}
        onClose={() => setShowPhotoUpload(false)}
        onPhotoAnalyzed={handlePhotoAnalyzed}
      />
      
      <AIImageGeneration 
        isOpen={showAIImageGen}
        onClose={() => setShowAIImageGen(false)}
        onImageGenerated={handleImageGenerated}
      />
    </>
  );
};

export default ChatSystem;