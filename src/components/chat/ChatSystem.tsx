import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sparkles, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ActionSuggestion, MessageType } from './types';
import { supabase } from '@/integrations/supabase/client';

export type { ActionSuggestion, MessageType };

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Get user ID from auth
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        // Generate a temporary ID for anonymous users
        setUserId(`anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
      }
    };
    getUser();
  }, []);

  const detectLanguage = (text: string): 'en' | 'vi' => {
    // Enhanced Vietnamese detection
    const vietnameseChars = /[ăâêôơưđàáảãạằắẳẵặầấẩẫậềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ)\b/i;
    
    return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
  };

  const extractName = (text: string): string => {
    // Enhanced name extraction patterns
    const patterns = [
      // Vietnamese patterns
      /(?:tên|name)(?:\s+(?:là|is))?\s+([a-zA-ZÀ-ỹ]+)/i,
      /(?:anh|chị|em|tôi|mình)(?:\s+tên)?\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)/i,
      // English patterns  
      /(?:i'?m|my\s+name\s+is|call\s+me)\s+([a-zA-Z]+)/i,
      // Simple single word names
      /^([a-zA-ZÀ-ỹ]{2,})$/i
    ];
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1] && match[1].length > 1) {
        const name = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        // Filter out common words that aren't names
        const excludeWords = ['anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me'];
        if (!excludeWords.includes(name.toLowerCase())) {
          return name;
        }
      }
    }
    
    return '';
  };

  const getInitialGreeting = () => {
    // Auto-detect preferred language based on browser/location
    const browserLang = navigator.language.toLowerCase();
    const isVietnamese = browserLang.includes('vi') || browserLang.includes('vn');
    
    if (isVietnamese) {
      setLanguage('vi');
      return "Chào anh/chị, em là Sunshine ☀️. Anh/chị có thể cho em biết tên để em hỗ trợ chu đáo hơn không ạ? Em cũng nói được tiếng Việt hoặc tiếng Anh nha! 😊";
    } else {
      return "Hi, I'm Sunshine! ☀️ What's your name? I can chat in Vietnamese or English—whatever you prefer! 😊";
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setShowButton(false);
    
    if (messages.length === 0) {
      const greeting: Message = {
        id: Date.now().toString(),
        text: getInitialGreeting(),
        isUser: false,
        timestamp: new Date()
      };
      setMessages([greeting]);
      setHasGreeted(true);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setShowButton(true);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const detectedLang = detectLanguage(inputValue);
    setLanguage(detectedLang);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Check for name in message
    const extractedName = extractName(inputValue);
    if (extractedName && !userName) {
      setUserName(extractedName);
      setShowQuickActions(true);
    }

    const messageToSend = inputValue;
    setInputValue('');

    try {
      // Call the Sunshine AI edge function
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: messageToSend,
          userId: userId,
          userLanguage: detectedLang
        }
      });

      if (error) {
        throw error;
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || (detectedLang === 'vi' ? 'Em xin lỗi, có lỗi xảy ra. Vui lòng thử lại! 😅' : 'Sorry, something went wrong. Please try again! 😅'),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);

      // Update language if AI detected it differently
      if (data.language && data.language !== language) {
        setLanguage(data.language);
      }

    } catch (error) {
      console.error('Error calling AI:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'vi' 
          ? 'Em đang gặp chút vấn đề kỹ thuật. Anh/chị thử lại sau chút nha! 🥰'
          : 'Having some technical issues. Please try again in a moment! 🥰',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (actionText: string) => {
    setInputValue(actionText);
    // Auto-send the quick action
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  const quickActions = language === 'vi' ? [
    { 
      text: '💅 Tìm việc nail', 
      action: () => handleQuickAction('Em muốn tìm việc làm nail'),
      color: 'from-purple-400 to-pink-400'
    },
    { 
      text: '🏪 Đăng salon', 
      action: () => handleQuickAction('Em muốn đăng tin salon'), 
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      text: '💬 Tư vấn', 
      action: () => handleQuickAction('Em cần tư vấn về ngành làm đẹp'), 
      color: 'from-green-400 to-emerald-400'
    },
    { 
      text: '🌍 English', 
      action: () => { setLanguage('en'); handleQuickAction('Please speak English'); },
      color: 'from-orange-400 to-red-400'
    }
  ] : [
    { 
      text: '💅 Find Jobs', 
      action: () => handleQuickAction('I want to find nail jobs'),
      color: 'from-purple-400 to-pink-400' 
    },
    { 
      text: '🏪 List Salon', 
      action: () => handleQuickAction('I want to list my salon'),
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      text: '💬 Get Help', 
      action: () => handleQuickAction('I need help with beauty business'),
      color: 'from-green-400 to-emerald-400'
    },
    { 
      text: '🇻🇳 Tiếng Việt', 
      action: () => { setLanguage('vi'); handleQuickAction('Xin chào, nói tiếng Việt'); },
      color: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <>
      {/* Sunshine Chat Bubble - Only shows when chat is closed */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              boxShadow: [
                "0 0 30px rgba(251, 191, 36, 0.5)",
                "0 0 50px rgba(251, 191, 36, 0.7)",
                "0 0 30px rgba(251, 191, 36, 0.5)"
              ]
            }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              duration: 0.8, 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={openChat}
            className={`fixed ${isMobile ? 'bottom-24 right-6' : 'bottom-8 right-8'} z-[9997]`}
          >
            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [-10, -20, -10], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-3 text-xl pointer-events-none"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-8, -18, -8], x: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-4 text-lg pointer-events-none"
            >
              💫
            </motion.div>
            
            {/* Main sunshine button */}
            <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 shadow-2xl flex items-center justify-center border-4 border-white/30 overflow-hidden backdrop-blur-sm`}>
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/60 to-orange-300/60 rounded-full blur-sm" />
              
              {/* Rotating rays */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sun size={isMobile ? 28 : 24} className="text-white relative z-10 w-full h-full p-3 drop-shadow-lg" />
              </motion.div>
              
              {/* Sparkle overlay */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 right-1 z-20"
              >
                <Sparkles size={8} className="text-yellow-100 drop-shadow" />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Premium Design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed ${
              isMobile 
                ? 'inset-4 top-16 bottom-4' 
                : 'bottom-6 right-6 w-96 h-[650px]'
            } z-[9998] overflow-hidden`}
            style={{ 
              background: 'linear-gradient(145deg, rgba(255,248,240,0.95) 0%, rgba(254,243,230,0.95) 50%, rgba(255,237,213,0.95) 100%)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 8px 25px rgba(251,146,60,0.15)',
              border: '1px solid rgba(255,255,255,0.6)'
            }}
          >
            {/* Premium Header */}
            <div className="relative overflow-hidden">
              <div 
                className="p-6 flex items-center justify-between relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ff8a00 0%, #ffa500 25%, #ffb347 50%, #ffd700 75%, #ffeb99 100%)',
                }}
              >
                {/* Animated light rays background */}
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)"
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                />
                
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Sun size={22} className="text-white drop-shadow-lg" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-xl drop-shadow-md">Sunshine AI</h3>
                    <p className="text-white/90 text-sm font-medium drop-shadow">Your beauty business companion</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeChat}
                  className="w-10 h-10 bg-white/25 rounded-full flex items-center justify-center text-white hover:bg-white/35 transition-all duration-200 backdrop-blur-sm relative z-10"
                >
                  <X size={20} className="drop-shadow" />
                </motion.button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4" style={{ maxHeight: isMobile ? 'calc(100vh - 280px)' : '420px' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-lg relative ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ml-4' 
                      : 'bg-white/80 text-gray-800 border border-orange-100/50 mr-4 backdrop-blur-sm'
                  }`}>
                    <p className="text-base leading-relaxed font-medium whitespace-pre-wrap">{message.text}</p>
                    {!message.isUser && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.2 }}
                        className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Sun size={12} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* AI Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 text-gray-800 border border-orange-100/50 p-4 rounded-2xl shadow-lg mr-4 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <Sun size={18} className="text-orange-400" />
                      </motion.div>
                      <span className="text-sm text-gray-600 font-medium">
                        {language === 'vi' ? 'Sunshine đang suy nghĩ...' : 'Sunshine is thinking...'}
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions - Fixed at bottom */}
            <AnimatePresence>
              {showQuickActions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-5 pb-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={action.action}
                        className={`bg-gradient-to-r ${action.color} text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-lg backdrop-blur-sm border border-white/20`}
                      >
                        {action.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Premium Input Area - Always visible at bottom */}
            <div className="p-5 bg-white/40 backdrop-blur-md border-t border-white/30">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder={language === 'vi' ? 'Nhập tin nhắn của anh/chị...' : 'Type your message...'}
                    disabled={isLoading}
                    className="w-full py-4 px-5 bg-white/80 border-2 border-orange-200/50 rounded-2xl focus:border-orange-400 focus:outline-none text-base resize-none disabled:opacity-50 backdrop-blur-sm shadow-lg transition-all duration-200 placeholder-gray-500"
                    style={{ minHeight: '52px' }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, rotateZ: 15 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border-2 border-white/20"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun size={22} />
                    </motion.div>
                  ) : (
                    <Send size={22} className="drop-shadow" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};