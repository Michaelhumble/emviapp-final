import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Crown, Camera, Mic, Palette, Volume2, ArrowUp, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PremiumFeatures from './PremiumFeatures';
import VoiceChat from './VoiceChat';
import PhotoUpload from './PhotoUpload';
import AIImageGeneration from './AIImageGeneration';
import { isFeatureEnabled, type PremiumFeature } from '@/config/premiumFeatures';

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showAIImageGen, setShowAIImageGen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom with smooth transition
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Show scroll to top button after scrolling
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollToTop(scrollHeight - scrollTop - clientHeight > 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    chatContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: { message: currentInput }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response');
      }

      // Realistic typing delay with shimmer effect
      setTimeout(() => {
        setIsTyping(false);
        setLoading(false);
        const botMessage = { 
          id: Date.now() + 1, 
          text: data?.message || "I'm here to help!", 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1200);
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
      {/* 🌟 BILLION-DOLLAR FLOATING CHAT BUBBLE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-50"
          >
            {/* Luxury Ambient Glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 165, 0, 0.4), rgba(255, 215, 0, 0.2), transparent 70%)',
                filter: 'blur(20px)',
                transform: 'translateY(8px)'
              }}
            />

            {/* Premium Shadow Base */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'rgba(0, 0, 0, 0.1)',
                filter: 'blur(8px)',
                transform: 'translateY(4px) scale(0.95)'
              }}
            />

            <motion.button
              whileHover={{ 
                scale: 1.1,
                y: -3,
                boxShadow: "0 20px 40px rgba(255, 165, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.3)"
              }}
              whileTap={{ 
                scale: 0.95,
                y: 1
              }}
              onClick={() => setIsOpen(true)}
              className="relative w-16 h-16 rounded-full transition-all duration-500 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #FFB366 0%, #FF8A00 25%, #FFD700 50%, #FFA500 75%, #FF6B00 100%)',
                boxShadow: `
                  0 15px 35px rgba(255, 165, 0, 0.3),
                  0 5px 15px rgba(0, 0, 0, 0.1),
                  0 0 0 1px rgba(255, 255, 255, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `,
                border: '2px solid rgba(255, 255, 255, 0.3)'
              }}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1],
              }}
              transition={{
                rotate: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                scale: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            >
              {/* Inner Glassmorphism Layer */}
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
                animate={{
                  background: [
                    'rgba(255, 255, 255, 0.2)',
                    'rgba(255, 255, 255, 0.3)',
                    'rgba(255, 255, 255, 0.2)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Premium Shimmer Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ x: '-100%', skewX: -20 }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(255, 215, 0, 0.4), rgba(255, 255, 255, 0.6), transparent)',
                  transform: 'skewX(-20deg)',
                  width: '50%'
                }}
              />

              {/* Animated Sun Icon */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                animate={{
                  y: [0, -1, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span
                  className="text-4xl relative"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))',
                    textShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ☀️
                </motion.span>
              </motion.div>

              {/* Orbiting Sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 215, 0, 0.6)'
                  }}
                  animate={{
                    x: [0, 25 * Math.cos(i * Math.PI / 2), 0, -25 * Math.cos(i * Math.PI / 2), 0],
                    y: [0, 25 * Math.sin(i * Math.PI / 2), 0, -25 * Math.sin(i * Math.PI / 2), 0],
                    scale: [0, 1, 1, 1, 0],
                    opacity: [0, 1, 1, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}

              {/* Live Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)'
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 10px rgba(16, 185, 129, 0.6)',
                    '0 0 20px rgba(16, 185, 129, 0.8)',
                    '0 0 10px rgba(16, 185, 129, 0.6)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-2 h-2 bg-white rounded-full" />
              </motion.div>
            </motion.button>

            {/* Luxury Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-14 -left-12 px-4 py-2 rounded-xl text-white text-sm font-medium whitespace-nowrap"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              Chat with Little Sunshine ☀️
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-black/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💎 PREMIUM CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden
                      w-80 h-[550px] sm:w-96 sm:h-[650px] 
                      max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(40px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: `
                0 32px 64px rgba(0, 0, 0, 0.15),
                0 0 0 1px rgba(255, 255, 255, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                0 0 120px rgba(255, 165, 0, 0.1)
              `
            }}
          >
            {/* 🎨 LUXURY HEADER */}
            <div 
              className="relative text-white p-6 flex justify-between items-center"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FFB366 25%, #FF6B00 50%, #FFA500 75%, #FF4500 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '28px 28px 0 0'
              }}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    animate={{
                      x: [0, Math.random() * 100 - 50],
                      y: [0, Math.random() * 50 - 25],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                    style={{
                      left: `${10 + i * 10}%`,
                      top: `${20 + Math.random() * 60}%`
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-4 relative z-10">
                {/* Animated Sunshine Avatar */}
                <motion.div 
                  className="w-14 h-14 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                  }}
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <span className="text-4xl relative z-10">☀️</span>
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      background: [
                        'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)',
                        'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.3), transparent 60%)',
                        'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 60%)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className="font-bold text-xl truncate"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
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
                    <motion.div 
                      className="w-2 h-2 bg-emerald-300 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-orange-100 text-sm truncate font-medium">
                      Inspired by Sunshine ☀️
                    </p>
                  </motion.div>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-white/10 z-20 relative"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* 💬 MESSAGES CONTAINER */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4 relative"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 248, 240, 0.4), rgba(255, 255, 255, 0.6))',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* Subtle Sunbeam Pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 20%, rgba(255, 165, 0, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.05) 49%, rgba(255, 255, 255, 0.05) 51%, transparent 52%)
                  `,
                  backgroundSize: '200px 200px, 300px 300px, 20px 20px'
                }}
              />
              
              <div className="relative z-10 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -1 }}
                      className={`max-w-[85%] px-4 py-3 rounded-3xl relative overflow-hidden group ${
                        msg.sender === 'user'
                          ? 'text-white'
                          : 'bg-white/80 text-gray-800 border border-white/50'
                      }`}
                      style={msg.sender === 'user' ? {
                        background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 50%, #FFA500 100%)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(255, 107, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      } : {
                        backdropFilter: 'blur(30px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                      }}
                    >
                      {/* Shimmer effect for user messages */}
                      {msg.sender === 'user' && (
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
                          }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        />
                      )}
                      
                      <p 
                        className="text-sm leading-relaxed relative z-10 font-medium break-words"
                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      >
                        {msg.text}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              
                {/* ✨ LUXURY TYPING INDICATOR */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <motion.div 
                      className="bg-white/90 text-gray-800 px-4 py-3 rounded-3xl max-w-[85%] relative overflow-hidden"
                      style={{
                        backdropFilter: 'blur(30px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background: 'linear-gradient(135deg, #FF8A00, #FFA500)'
                              }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.4, 1, 0.4],
                              }}
                              transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                        <span 
                          className="text-xs text-gray-500 font-medium"
                          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                          Sunshine is thinking...
                        </span>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-3 h-3 text-orange-400" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Scroll to Top Button */}
              <AnimatePresence>
                {showScrollToTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="absolute bottom-4 right-4 p-2 rounded-full text-white shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #FF8A00, #FFA500)',
                      boxShadow: '0 4px 15px rgba(255, 138, 0, 0.4)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* 🎛️ INPUT SECTION */}
            <div 
              className="p-6 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(30px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0 0 28px 28px'
              }}
            >
              {/* Premium Feature Shortcuts */}
              <motion.div 
                className="flex gap-3 mb-4 overflow-x-auto pb-1"
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
                    className={`p-3 rounded-2xl text-white transition-all duration-300 bg-gradient-to-r ${feature.color} shadow-lg hover:shadow-xl relative overflow-hidden group flex-shrink-0`}
                    title={feature.title}
                    style={{
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"
                      transition={{ duration: 0.6 }}
                    />
                    <feature.icon className="w-4 h-4 relative z-10" />
                  </motion.button>
                ))}
              </motion.div>

              {/* Input Bar */}
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <motion.input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Send a message..."
                    disabled={loading}
                    className="w-full px-5 py-4 text-sm font-medium rounded-3xl transition-all duration-300 focus:outline-none focus:ring-0 border-0"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: input ? 
                        '0 8px 32px rgba(255, 138, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)' :
                        '0 4px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      fontFamily: 'Inter, system-ui, sans-serif'
                    }}
                    whileFocus={{
                      boxShadow: '0 0 0 3px rgba(255, 138, 0, 0.1), 0 8px 32px rgba(255, 138, 0, 0.15)'
                    }}
                  />
                  {input && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-4 rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                  style={{
                    background: input.trim() 
                      ? 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 100%)'
                      : 'rgba(156, 163, 175, 0.3)',
                    boxShadow: input.trim() 
                      ? '0 8px 25px rgba(255, 107, 0, 0.3)'
                      : '0 4px 15px rgba(156, 163, 175, 0.2)'
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 transform rotate-45 -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 0.5 }}
                  />
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