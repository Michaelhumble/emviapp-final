import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sun, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  quickActions?: Array<{
    id: string;
    label: string;
    action: () => void;
  }>;
}

export const ChatSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState<'en' | 'vi'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const detectLanguage = (text: string): 'en' | 'vi' => {
    const vietnameseChars = /[ăâêôơưđàáảãạằắẳẵặầấẩẫậềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về|ghé|vui|cảm|ơn|xin|chào|dạ)\b/i;
    
    return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
  };

  const extractName = (text: string): string => {
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
        const excludeWords = ['anh', 'chị', 'em', 'tôi', 'mình', 'name', 'call', 'the', 'and', 'for', 'you', 'me'];
        if (!excludeWords.includes(name.toLowerCase())) {
          return name;
        }
      }
    }
    
    return '';
  };

  const getInitialGreeting = () => {
    return "Hi! I'm Sunshine. What's your name? I can chat in Vietnamese or English—whatever you prefer! 😊";
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
    }

    const messageToSend = inputValue;
    setInputValue('');

    try {
      // Call the Sunshine AI edge function
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: messageToSend,
          userId: userId,
          userLanguage: detectedLang,
          userName: userName || extractedName
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

      // Add contextual quick actions if relevant
      if (data.response && (data.response.includes('job') || data.response.includes('việc') || data.response.includes('salon') || data.response.includes('help') || data.response.includes('hỗ trợ'))) {
        const contextualActions = detectedLang === 'vi' ? [
          { id: 'find-jobs', label: '💅 Tìm việc nail', action: () => handleQuickAction('Em muốn tìm việc làm nail') },
          { id: 'list-salon', label: '🏪 Đăng salon', action: () => handleQuickAction('Em muốn đăng tin salon') }
        ] : [
          { id: 'find-jobs', label: '💅 Find Jobs', action: () => handleQuickAction('I want to find nail jobs') },
          { id: 'list-salon', label: '🏪 List Salon', action: () => handleQuickAction('I want to list my salon') }
        ];
        aiResponse.quickActions = contextualActions;
      }

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

  return (
    <>
      {/* Sunshine Chat Bubble - Only shows when chat is closed */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, y: 50 }}
            animate={{ 
              scale: 1, 
              y: 0,
              boxShadow: [
                "0 8px 25px rgba(251, 191, 36, 0.3)",
                "0 12px 35px rgba(251, 191, 36, 0.5)",
                "0 8px 25px rgba(251, 191, 36, 0.3)"
              ]
            }}
            exit={{ scale: 0, y: 50 }}
            transition={{ 
              duration: 0.5, 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={openChat}
            className={`fixed ${isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'} z-[9997]`}
          >
            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [-8, -16, -8], x: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-2 text-lg pointer-events-none"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-6, -14, -6], x: [1, -1, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-3 text-sm pointer-events-none"
            >
              💫
            </motion.div>
            
            {/* Main sunshine button */}
            <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 shadow-2xl flex items-center justify-center border-2 border-white/40 overflow-hidden backdrop-blur-sm`}>
              {/* Inner glow */}
              <div className="absolute inset-1 bg-gradient-to-br from-yellow-200/80 to-orange-300/80 rounded-full blur-sm" />
              
              {/* Rotating sun */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Sun size={isMobile ? 24 : 20} className="text-white drop-shadow-lg" />
              </motion.div>
              
              {/* Sparkle overlay */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 right-1 z-20"
              >
                <Sparkles size={6} className="text-yellow-100" />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Messenger-style sliding from bottom */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4
            }}
            className={`fixed ${
              isMobile 
                ? 'bottom-0 left-0 right-0 h-[65vh] max-h-[65vh]' 
                : 'bottom-6 right-6 w-96 h-[500px]'
            } z-[9998] overflow-hidden rounded-t-3xl ${isMobile ? '' : 'rounded-b-3xl'}`}
            style={{ 
              background: 'linear-gradient(145deg, rgba(255,252,248,0.95) 0%, rgba(254,247,237,0.95) 50%, rgba(255,243,235,0.95) 100%)',
              backdropFilter: 'blur(25px) saturate(180%)',
              boxShadow: isMobile 
                ? '0 -10px 40px rgba(0,0,0,0.1), 0 -4px 20px rgba(251,146,60,0.1)' 
                : '0 25px 50px rgba(0,0,0,0.1), 0 10px 30px rgba(251,146,60,0.15)',
              border: '1px solid rgba(255,255,255,0.7)'
            }}
          >
            {/* Premium Header with animated rays */}
            <div className="relative overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #ff8a00 0%, #ffa500 30%, #ffb347 60%, #ffd700 100%)',
                }}
              >
                {/* Animated light rays */}
                <motion.div
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 70%)",
                      "radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 0%, transparent 70%)",
                      "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.3) 0%, transparent 70%)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                />
                
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Sun size={18} className="text-white drop-shadow" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg drop-shadow">Sunshine</h3>
                    <p className="text-white/90 text-xs drop-shadow">Your EmviApp assistant</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeChat}
                  className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center text-white hover:bg-white/35 transition-all backdrop-blur-sm relative z-10"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Messages Container - Optimized for mobile */}
            <div 
              className="flex-1 px-4 py-2 overflow-y-auto space-y-3" 
              style={{ 
                maxHeight: isMobile ? 'calc(65vh - 140px)' : '320px',
                paddingBottom: '1rem'
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl shadow-md relative ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                      : 'bg-white/90 text-gray-800 border border-orange-100 backdrop-blur-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    
                    {/* Show contextual quick actions inline */}
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickActions.map((action) => (
                          <motion.button
                            key={action.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={action.action}
                            className="px-3 py-1.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full text-xs font-medium shadow-md border border-white/20"
                          >
                            {action.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    {!message.isUser && (
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                        <Sun size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* AI Thinking Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/90 text-gray-800 border border-orange-100 p-3 rounded-2xl shadow-md backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <Sun size={14} className="text-orange-400" />
                      </motion.div>
                      <span className="text-xs text-gray-600">
                        {language === 'vi' ? 'Sunshine đang suy nghĩ...' : 'Sunshine is thinking...'}
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            className="w-1 h-1 bg-orange-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at bottom, always accessible */}
            <div className="p-4 bg-white/50 backdrop-blur-md border-t border-orange-200/30">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-white border border-orange-200 rounded-2xl focus:border-orange-400 focus:outline-none text-sm disabled:opacity-50 transition-all placeholder-gray-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <Send size={18} />
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