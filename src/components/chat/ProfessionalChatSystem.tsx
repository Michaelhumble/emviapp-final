import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
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
  const location = useLocation();
  const { isSignedIn, userRole } = useAuth();

  // Build route-aware + role-aware initial CTAs
  const getInitialCTAs = (
    path: string,
    signedIn: boolean,
    role?: string
  ): Array<{ label: string; route: string; variant?: 'primary' | 'secondary' }> => {
    const ctas: Array<{ label: string; route: string; variant?: 'primary' | 'secondary' }> = [];

    const isAuthRoute = path.startsWith('/auth') || path === '/signin' || path === '/login';
    if (isAuthRoute) {
      ctas.push(
        { label: 'Sign In', route: '/signin', variant: 'primary' },
        { label: 'Sign Up', route: '/auth/signup', variant: 'secondary' }
      );
      return ctas;
    }

    if (path === '/jobs' || /^\/jobs\/in\//.test(path) || /^\/jobs\/[^/]+\/[^/]+$/.test(path)) {
      ctas.push(
        { label: '📝 Post a Job', route: '/post-job', variant: 'primary' },
        { label: '🔍 Find Artists', route: '/artists', variant: 'secondary' }
      );
    } else if (/^\/jobs\/[^/]+$/.test(path) && !/^\/jobs\/in\//.test(path)) {
      ctas.push(
        { label: 'Apply Now', route: `${path}?action=apply`, variant: 'primary' },
        { label: 'Contact', route: '/contact', variant: 'secondary' }
      );
    } else if (path === '/salons') {
      ctas.push({ label: '🏢 List Your Salon', route: '/posting/salon', variant: 'primary' });
    } else if (path === '/artists') {
      ctas.push(
        { label: 'Browse Artists', route: '/artists', variant: 'primary' },
        { label: 'Contact Artist', route: '/contact', variant: 'secondary' }
      );
    } else if (/^\/artists\/[^/]+$/.test(path)) {
      ctas.push(
        { label: 'Contact This Artist', route: '/contact', variant: 'primary' },
        { label: 'Book Now', route: '/booking-services', variant: 'secondary' }
      );
    } else if (path === '/booking-services') {
      ctas.push({ label: 'Book Now', route: '/booking-services', variant: 'primary' });
    } else if (path === '/contact') {
      ctas.push({ label: 'Open Contact Form', route: '/contact', variant: 'primary' });
    } else if (path === '/pricing' && signedIn) {
      ctas.push({ label: 'Upgrade Plan', route: '/pricing', variant: 'primary' });
    } else if (path === '/dashboard/artist/booking-calendar-new') {
      ctas.push(
        { label: 'Invite Client', route: '/dashboard/artist/booking-calendar-new?invite=1', variant: 'primary' },
        { label: 'Upgrade Plan', route: '/pricing', variant: 'secondary' }
      );
    } else if (path === '/dashboard/artist/inbox') {
      ctas.push(
        { label: 'Respond', route: '/dashboard/artist/inbox', variant: 'primary' },
        { label: 'Book Now', route: '/booking-services', variant: 'secondary' }
      );
    }

    // Role-aware preference injection
    const prependIfMissing = (btn: { label: string; route: string; variant?: 'primary' | 'secondary' }) => {
      if (!ctas.find(b => b.label === btn.label)) ctas.unshift(btn);
    };

    if (role === 'owner') {
      prependIfMissing({ label: '📝 Post a Job', route: '/post-job', variant: 'primary' });
      prependIfMissing({ label: 'Upgrade Plan', route: '/pricing', variant: 'secondary' });
    } else if (role === 'artist') {
      prependIfMissing({ label: 'Find Jobs', route: '/jobs', variant: 'primary' });
      prependIfMissing({ label: 'Build Portfolio', route: '/profile', variant: 'secondary' });
    }

    return ctas;
  };

  // Inject route-aware CTAs into the first assistant message
  useEffect(() => {
    const routeCTAs = getInitialCTAs(location.pathname, isSignedIn, userRole as any);
    if (routeCTAs.length === 0) return;
    setMessages(prev => {
      if (prev.length > 0 && !prev[0].isUser) {
        const first = prev[0];
        const updated = { ...first, ctaButtons: first.ctaButtons && first.ctaButtons.length ? first.ctaButtons : routeCTAs };
        return [updated, ...prev.slice(1)];
      }
      return prev;
    });
  }, [location.pathname, isSignedIn, userRole]);

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
      
      // Check if we're in PWA mode and handle accordingly
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone;
      
      if (isStandalone && !window.isSecureContext) {
        throw new Error('Chat temporarily unavailable in PWA mode. Please use the web version.');
      }
      
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
              background: 'linear-gradient(145deg, #ffffff 0%, #fefefe 100%)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: `
                0 32px 64px -12px rgba(0, 0, 0, 0.18),
                0 0 0 1px rgba(255, 255, 255, 0.9),
                inset 0 1px 0 rgba(255, 255, 255, 1),
                0 2px 4px rgba(251, 191, 36, 0.1)
              `,
              backdropFilter: 'blur(20px)',
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
                borderRadius: '28px 28px 0 0',
                padding: '24px',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
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
                    <h3 className="text-white font-bold text-lg tracking-wide drop-shadow-sm">Little Sunshine</h3>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-green-300 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.p 
                        className="text-white/95 text-sm font-medium tracking-wide drop-shadow-sm"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        Always here for you ✨
                      </motion.p>
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
                background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
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
                    className={`max-w-[85%] rounded-2xl px-5 py-4 relative ${
                      message.isUser
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                        : 'bg-white border border-gray-100 text-gray-800 shadow-lg'
                    }`}
                    style={{
                      boxShadow: message.isUser
                        ? '0 8px 25px rgba(251, 146, 60, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                    
                    {/* Smart Suggestions with Cute CTA Buttons */}
                    {message.ctaButtons && message.ctaButtons.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                        className="mt-4 space-y-3"
                      >
                        {/* Cute suggestion header */}
                        <motion.div 
                          className="flex items-center gap-2 text-xs text-amber-600 font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9 }}
                        >
                          <span className="animate-bounce">✨</span>
                          <span>I can help you with this!</span>
                          <span className="animate-bounce delay-75">✨</span>
                        </motion.div>
                        
                        <div className="flex flex-wrap gap-2">
                          {message.ctaButtons.map((cta, index) => (
                            <motion.button
                              key={index}
                              onClick={() => window.location.href = cta.route}
                              className={`
                                group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold
                                transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30
                                ${cta.variant === 'primary'
                                  ? 'bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 text-white hover:from-orange-500 hover:via-amber-600 hover:to-yellow-600'
                                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                                }
                              `}
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 300 }}
                              whileHover={{ 
                                scale: 1.05,
                                rotate: [0, -1, 1, 0],
                                transition: { duration: 0.3 }
                              }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {/* Sparkle effects */}
                              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                              <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse delay-200" />
                              
                              {/* Shimmer */}
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                              
                              {/* Button content */}
                              <span className="relative z-10">{cta.label}</span>
                            </motion.button>
                          ))}
                        </div>
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
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-orange-400 focus:outline-none resize-none text-gray-800 placeholder-gray-500 transition-all duration-200"
                    style={{
                      background: '#ffffff',
                    }}
                  />
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