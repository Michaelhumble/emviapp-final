import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Crown, Camera, Mic, Palette, Volume2, ArrowUp, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import PremiumFeatures from './PremiumFeatures';
import VoiceChat from './VoiceChat';
import PhotoUpload from './PhotoUpload';
import AIImageGeneration from './AIImageGeneration';
import ChatCTAButton from './ChatCTAButton';
import { isFeatureEnabled, type PremiumFeature } from '@/config/premiumFeatures';
import { detectUserIntent, shouldShowCTAButtons, type CTAButton } from '@/utils/chatIntentDetection';

export const ChatSystem = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi, I am Sunshine, what's your name? Em biết nói tiếng Việt nữa đó!", sender: 'bot', ctaButtons: [] }
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

    const userMessage = { id: Date.now(), text: input, sender: 'user', ctaButtons: [] };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setIsTyping(true);

    // Detect user intent for CTA buttons
    const shouldShowButtons = shouldShowCTAButtons(currentInput);
    const detectedButtons = shouldShowButtons ? detectUserIntent(currentInput, !!user) : [];

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
          sender: 'bot',
          ctaButtons: detectedButtons
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
        sender: 'bot',
        ctaButtons: []
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
      sender: 'bot',
      ctaButtons: []
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleImageGenerated = (imageUrl: string, prompt: string) => {
    const botMessage = { 
      id: Date.now(), 
      text: `I've created your custom design! Here's a beautiful ${prompt} - what do you think?`, 
      sender: 'bot',
      ctaButtons: []
    };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-24 right-4 z-50 sm:bottom-6 sm:right-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full shadow-lg transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FFA500 100%)',
                boxShadow: '0 8px 32px rgba(255, 138, 0, 0.3)'
              }}
            >
              <span className="text-4xl">☀️</span>
            </motion.button>

            <div className="absolute -top-12 -left-8 bg-black/80 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
              Chat with Sunshine ☀️
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
            </div>
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
            className="fixed bottom-4 right-4 left-4 z-50 flex flex-col overflow-hidden
                      sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 
                      h-[calc(100vh-120px)] sm:h-[650px] 
                      w-auto sm:max-w-[calc(100vw-3rem)]"
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
            {/* Header */}
            <div 
              className="text-white p-4 sm:p-6 flex justify-between items-center"
              style={{
                background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 100%)',
                borderRadius: '28px 28px 0 0'
              }}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <span className="text-3xl">☀️</span>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg">Little Sunshine</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    <p className="text-orange-100 text-xs sm:text-sm">Inspired by Sunshine ☀️</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 💬 MESSAGES CONTAINER */}
            <div 
              ref={chatContainerRef}
              className="flex-1 p-3 sm:p-6 overflow-y-auto space-y-3 sm:space-y-4 relative"
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
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} flex-col`}
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

                    {/* CTA Buttons for bot messages */}
                    {msg.sender === 'bot' && msg.ctaButtons && msg.ctaButtons.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-2 mt-3 max-w-[85%]"
                      >
                        {msg.ctaButtons.map((button, buttonIndex) => (
                          <ChatCTAButton
                            key={buttonIndex}
                            label={button.label}
                            route={button.route}
                            intent={button.intent}
                          />
                        ))}
                      </motion.div>
                    )}
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
              className="p-3 sm:p-6 relative"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(30px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0 0 28px 28px'
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