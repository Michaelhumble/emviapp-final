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
      {/* 🔒 PREMIUM LUXURY SUNSHINE CHAT BUBBLE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-4 z-50"
          >
            {/* Premium Floating Shadow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(255, 140, 0, 0.3), transparent 60%)',
                filter: 'blur(12px)',
                transform: 'translateY(4px)'
              }}
            />

            {/* Luxury Sunbeam Radiance */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'conic-gradient(from 0deg, rgba(255, 215, 0, 0.4), transparent, rgba(255, 140, 0, 0.3), transparent)',
                filter: 'blur(8px)'
              }}
            />

            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ 
                scale: 0.95,
                y: 1
              }}
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 rounded-full transition-all duration-300 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FFD700 35%, #FF6B00 70%, #FF4500 100%)',
                boxShadow: `
                  0 8px 25px rgba(255, 140, 0, 0.4),
                  0 0 0 2px rgba(255, 255, 255, 0.8),
                  0 0 0 4px rgba(255, 215, 0, 0.3),
                  inset 0 2px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -2px 0 rgba(0, 0, 0, 0.1)
                `
              }}
              animate={{
                // Gentle periodic wiggle
                rotate: [0, 0, 0, 0, 5, -5, 3, -3, 0, 0, 0, 0],
                // Soft breathing glow
                boxShadow: [
                  `0 8px 25px rgba(255, 140, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8), 0 0 0 4px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`,
                  `0 12px 35px rgba(255, 140, 0, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.9), 0 0 0 4px rgba(255, 215, 0, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`,
                  `0 8px 25px rgba(255, 140, 0, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.8), 0 0 0 4px rgba(255, 215, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.1)`
                ]
              }}
              transition={{
                rotate: { 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  times: [0, 0.3, 0.4, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.9, 1]
                },
                boxShadow: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            >
              {/* Inner Premium Glow */}
              <motion.div
                className="absolute inset-1 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 60%)',
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  background: [
                    'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 60%)',
                    'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.4), transparent 60%)',
                    'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), transparent 60%)'
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Luxury Shimmer Sweep */}
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ x: '-150%' }}
                animate={{ x: '150%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), rgba(255, 215, 0, 0.4), rgba(255, 255, 255, 0.6), transparent)',
                  transform: 'skewX(-20deg)',
                  filter: 'blur(1px)'
                }}
              />

              {/* Rotating Inner Ring */}
              <motion.div
                className="absolute inset-2 rounded-full border border-white/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{
                  borderStyle: 'dashed'
                }}
              />

              {/* Premium Sun Icon with Luminous Glow */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                animate={{
                  // Occasional playful bounce
                  y: [0, 0, 0, 0, -1, 0, 0, 0],
                  scale: [1, 1, 1, 1, 1.05, 1, 1, 1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.span
                  className="text-4xl relative"
                  style={{
                    filter: `
                      brightness(0) invert(1) 
                      drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))
                      drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))
                    `,
                    WebkitFilter: `
                      brightness(0) invert(1) 
                      drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))
                      drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))
                    `
                  }}
                  animate={{
                    // Gentle breathing
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ☀️
                </motion.span>
              </motion.div>

              {/* Premium Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #34D399)',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    '0 0 8px rgba(16, 185, 129, 0.6)',
                    '0 0 12px rgba(16, 185, 129, 0.8)',
                    '0 0 8px rgba(16, 185, 129, 0.6)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </motion.div>

              {/* Sparkle Effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${15 + i * 15}%`,
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.8 + 1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.button>

            {/* First-time Tooltip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -top-12 -left-8 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
              style={{ zIndex: 60 }}
            >
              Tap to chat with Sunshine! ☀️
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Premium Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-4 right-4 z-50 flex flex-col overflow-hidden
                      w-80 h-[500px] sm:w-96 sm:h-[600px] 
                      max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* Enhanced Premium Header */}
            <div 
              className="relative text-white p-4 sm:p-6 flex justify-between items-center"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 50%, #FF4500 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Background Particles */}
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

              <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
                {/* Bigger Sunshine Icon */}
                <motion.div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-3xl sm:text-4xl">☀️</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300/30 to-orange-300/30"></div>
                </motion.div>
                <div className="flex-1 min-w-0">
                  <motion.h3 
                    className="font-bold text-lg sm:text-xl truncate"
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
                    <p className="text-orange-100 text-xs sm:text-sm truncate">
                      Always here to brighten your day ✨
                    </p>
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

            {/* Responsive Messages Container */}
            <div 
              className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 relative chat-scroll"
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
                      className={`max-w-[85%] sm:max-w-xs px-3 sm:px-5 py-2 sm:py-4 rounded-2xl relative overflow-hidden ${
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
                      <p className="text-sm leading-relaxed relative z-10 font-medium break-words">{msg.text}</p>
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
                      className="bg-white/90 text-gray-800 shadow-lg px-3 sm:px-5 py-2 sm:py-4 rounded-2xl max-w-[85%] sm:max-w-xs relative overflow-hidden"
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

            {/* Responsive Input Section */}
            <div 
              className="p-3 sm:p-6 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {/* Premium Feature Shortcuts */}
              <motion.div 
                className="flex gap-2 sm:gap-3 mb-3 sm:mb-4 overflow-x-auto pb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  { 
                    icon: Mic, 
                    action: () => setShowVoiceChat(true), 
                    color: 'from-purple-500 to-purple-600', 
                    title: 'Voice Chat',
                    href: null
                  },
                  { 
                    icon: Camera, 
                    action: () => setShowPhotoUpload(true), 
                    color: 'from-blue-500 to-blue-600', 
                    title: 'Photo Upload',
                    href: null
                  },
                  { 
                    icon: () => (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zM2.93 17.5c-.84-.15-1.43-.715-1.43-1.5v-2.64A24.905 24.905 0 0010 15c4.046 0 7.894-.896 11.5-2.64V16c0 .785-.59 1.34-1.43 1.5l-8.05 1.46c-.363.066-.737.066-1.1 0L2.93 17.5z" clipRule="evenodd" />
                      </svg>
                    ), 
                    action: () => window.open('/jobs', '_blank'), 
                    color: 'from-green-500 to-emerald-600', 
                    title: 'Browse Jobs',
                    href: '/jobs'
                  },
                  { 
                    icon: () => (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                      </svg>
                    ), 
                    action: () => window.open('/salons', '_blank'), 
                    color: 'from-pink-500 to-rose-600', 
                    title: 'Find Salons',
                    href: '/salons'
                  },
                  { 
                    icon: () => (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                    ), 
                    action: () => window.open('/artists', '_blank'), 
                    color: 'from-orange-500 to-orange-600', 
                    title: 'View Artists',
                    href: '/artists'
                  }
                ].map((feature, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={feature.action}
                    className={`p-2 sm:p-3 rounded-xl text-white transition-all duration-300 bg-gradient-to-r ${feature.color} shadow-lg hover:shadow-xl relative overflow-hidden group flex-shrink-0`}
                    title={feature.title}
                    style={{
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 relative z-10" />
                  </motion.button>
                ))}
              </motion.div>

              {/* Quick Action Messages */}
              <motion.div 
                className="flex gap-2 mb-3 sm:mb-4 overflow-x-auto pb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { text: "Find nail jobs near me", icon: "💅" },
                  { text: "Book a salon service", icon: "✨" },
                  { text: "Career advice", icon: "💼" },
                  { text: "Beauty tips", icon: "💄" }
                ].map((quickAction, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInput(quickAction.text)}
                    className="flex-shrink-0 px-3 py-2 bg-white/70 hover:bg-white/90 text-gray-700 text-xs rounded-full border border-gray-200 transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>{quickAction.icon}</span>
                    <span className="whitespace-nowrap">{quickAction.text}</span>
                  </motion.button>
                ))}
              </motion.div>

              <div className="flex gap-2 sm:gap-3 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Ask me anything..."
                    disabled={loading}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 text-sm font-medium rounded-2xl transition-all duration-300 focus:outline-none focus:ring-0 border-0"
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
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
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