import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SmartChatButton } from './SmartChatButton';
import { MobileChatInput } from './MobileChatInput';
import { useIsMobile } from '@/hooks/use-mobile';
import { useKeyboardVisible } from '@/utils/mobileLayoutManager';
import { MOBILE_LAYOUT } from '@/utils/mobileLayoutManager';
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

const SmartChatSystem: React.FC = () => {
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
  const [chatPreference, setChatPreference] = useState<'left' | 'right' | 'auto'>(() => {
    return (localStorage.getItem('chat-button-preference') as 'left' | 'right' | 'auto') || 'auto';
  });
  const [showSettings, setShowSettings] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
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

  // Save preference changes
  useEffect(() => {
    localStorage.setItem('chat-button-preference', chatPreference);
  }, [chatPreference]);
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
    } catch (error: any) {
      console.error('❌ [SUNSHINE] Chat error:', error);
      
      // Provide user-friendly error message for PWA issues
      let fallbackText = "Hi! I'm Little Sunshine ☀️ I'm having a moment, but I'm here to help! Try asking me about beauty tips or salon services!";
      
      if (error.message?.includes('WebSocket') || error.message?.includes('insecure') || error.message?.includes('PWA')) {
        fallbackText = "Hi! I'm Little Sunshine ☀️ Chat is temporarily unavailable in app mode. Please visit emvi.app in your browser for full chat features!";
      }
      
      // Fallback message that maintains Little Sunshine's personality
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackText,
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
      {/* Smart Chat Button */}
      <SmartChatButton
        onClick={() => setIsOpen(true)}
        isOpen={isOpen}
        userPreferredSide={chatPreference}
      />

      {/* Professional Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${isMobile ? 'inset-4' : 'bottom-6 right-6'} z-[10000] ${isMobile ? 'w-auto h-auto' : 'w-96 h-[600px]'} max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]`}
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

                <div className="flex items-center gap-2">
                  {/* Settings Button */}
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Chat settings"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/20"
                  >
                    <div className="text-white">
                      <p className="text-sm font-medium mb-3">Button Position Preference:</p>
                      <div className="flex gap-2">
                        {(['auto', 'left', 'right'] as const).map((option) => (
                          <button
                            key={option}
                            onClick={() => setChatPreference(option)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                              chatPreference === option
                                ? 'bg-white text-orange-600'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                          >
                            {option === 'auto' ? 'Auto' : option === 'left' ? 'Left-handed' : 'Right-handed'}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-white/75 mt-2">
                        Auto detects your usage pattern for optimal positioning
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-6 overflow-y-auto space-y-4"
              style={{
                height: isMobile ? 'calc(100vh - 320px)' : 'calc(100% - 140px)',
                background: 'linear-gradient(to bottom, #fafafa 0%, #ffffff 100%)',
                paddingBottom: isMobile ? '120px' : '24px', // Extra space for mobile input
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
                          {message.ctaButtons.map((button, buttonIndex) => (
                            <motion.a
                              key={buttonIndex}
                              href={button.route}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1 + buttonIndex * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                                button.variant === 'primary'
                                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              style={{
                                boxShadow: button.variant === 'primary' 
                                  ? '0 4px 15px rgba(168, 85, 247, 0.4)' 
                                  : 'none'
                              }}
                            >
                              <span>{button.label}</span>
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading State */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
                      <span className="text-sm text-gray-600">Sunshine is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile-optimized Input Section */}
            <MobileChatInput
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartChatSystem;