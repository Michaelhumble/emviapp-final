import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sun, Sparkles, RotateCcw, Type, Moon, Settings } from 'lucide-react';
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

interface ChatSession {
  userName: string;
  language: 'en' | 'vi';
  lastActive: number;
  messages: Message[];
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
  const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large'>('normal');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const IDLE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
  
  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('sunshine-chat-session');
    if (savedSession) {
      try {
        const session: ChatSession = JSON.parse(savedSession);
        const timeSinceLastActive = Date.now() - session.lastActive;
        
        if (timeSinceLastActive < IDLE_TIMEOUT) {
          // Resume session
          setUserName(session.userName);
          setLanguage(session.language);
          setMessages(session.messages || []);
        } else {
          // Session expired, clear it
          localStorage.removeItem('sunshine-chat-session');
        }
      } catch (e) {
        localStorage.removeItem('sunshine-chat-session');
      }
    }
    
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Save session to localStorage
  const saveSession = (updatedMessages?: Message[]) => {
    const session: ChatSession = {
      userName,
      language,
      lastActive: Date.now(),
      messages: updatedMessages || messages
    };
    localStorage.setItem('sunshine-chat-session', JSON.stringify(session));
  };

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

  // Save session when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveSession(messages);
    }
  }, [messages, userName, language]);

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
    if (userName) {
      return language === 'vi' 
        ? `Chào ${userName}, rất vui được gặp lại anh/chị! Em có thể giúp gì cho anh/chị hôm nay? 😊`
        : `Hi ${userName}, welcome back! Need any help today? 😊`;
    }
    return "Hi, I'm Sunshine! 🌞 What's your name? I can chat in Vietnamese or English—whatever you prefer! 😊";
  };

  const clearChat = () => {
    localStorage.removeItem('sunshine-chat-session');
    setMessages([]);
    setUserName('');
    setLanguage('en');
    
    const greeting: Message = {
      id: Date.now().toString(),
      text: getInitialGreeting(),
      isUser: false,
      timestamp: new Date()
    };
    setMessages([greeting]);
    setShowMenu(false);
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
    setShowMenu(false);
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

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
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
      const hasJobIntent = messageToSend.toLowerCase().includes('job') || messageToSend.toLowerCase().includes('việc') || messageToSend.toLowerCase().includes('tìm việc');
      const hasSalonIntent = messageToSend.toLowerCase().includes('salon') || messageToSend.toLowerCase().includes('đăng') || messageToSend.toLowerCase().includes('list');
      
      if (hasJobIntent || hasSalonIntent) {
        const contextualActions = detectedLang === 'vi' ? [
          ...(hasJobIntent ? [{ id: 'find-jobs', label: '💅 Tìm việc nail', action: () => handleQuickAction('Em muốn tìm việc làm nail') }] : []),
          ...(hasSalonIntent ? [{ id: 'list-salon', label: '🏪 Đăng salon', action: () => handleQuickAction('Em muốn đăng tin salon') }] : [])
        ] : [
          ...(hasJobIntent ? [{ id: 'find-jobs', label: '💅 Find Jobs', action: () => handleQuickAction('I want to find nail jobs') }] : []),
          ...(hasSalonIntent ? [{ id: 'list-salon', label: '🏪 List Salon', action: () => handleQuickAction('I want to list my salon') }] : [])
        ];
        
        if (contextualActions.length > 0) {
          aiResponse.quickActions = contextualActions;
        }
      }

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);

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

  const fontSizeClasses = {
    small: 'text-xs',
    normal: 'text-sm',
    large: 'text-base'
  };

  return (
    <>
      {/* Floating Sparkles Background Animation */}
      <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300/20"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              scale: 0
            }}
            animate={{
              y: -50,
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>

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

      {/* Chat Window - Premium Messenger-style */}
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
                ? 'bottom-0 left-0 right-0 h-[70vh] max-h-[70vh]' 
                : 'bottom-6 right-6 w-[380px] h-[60vh] max-h-[500px]'
            } z-[9998] overflow-hidden rounded-t-3xl ${isMobile ? '' : 'rounded-b-3xl'}`}
            style={{ 
              background: isDarkMode ? `
                linear-gradient(145deg, 
                  rgba(30, 30, 40, 0.98) 0%, 
                  rgba(25, 25, 35, 0.96) 30%, 
                  rgba(20, 20, 30, 0.98) 60%, 
                  rgba(15, 15, 25, 0.98) 100%
                )
              ` : `
                linear-gradient(145deg, 
                  rgba(255, 252, 247, 0.98) 0%, 
                  rgba(254, 249, 242, 0.96) 30%, 
                  rgba(255, 245, 237, 0.98) 60%, 
                  rgba(254, 243, 232, 0.98) 100%
                ),
                radial-gradient(circle at 30% 20%, rgba(255, 165, 0, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(255, 193, 7, 0.04) 0%, transparent 50%)
              `,
              backdropFilter: 'blur(30px) saturate(200%)',
              boxShadow: isMobile 
                ? '0 -15px 60px rgba(0,0,0,0.1), 0 -8px 30px rgba(251,146,60,0.15), inset 0 1px 0 rgba(255,255,255,0.8)' 
                : '0 30px 80px rgba(0,0,0,0.1), 0 15px 40px rgba(251,146,60,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.8)'
            }}
          >
            {/* Premium Header with Controls */}
            <div className="relative overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between relative z-10"
                style={{
                  background: isDarkMode 
                    ? 'linear-gradient(135deg, #4a5568 0%, #2d3748 30%, #1a202c 60%, #171923 100%)'
                    : 'linear-gradient(135deg, #ff8a00 0%, #ffa500 30%, #ffb347 60%, #ffd700 100%)',
                }}
              >
                {/* Animated light rays */}
                <motion.div
                  animate={{ 
                    background: [
                      `radial-gradient(circle at 30% 40%, rgba(255,255,255,${isDarkMode ? '0.1' : '0.3'}) 0%, transparent 70%)`,
                      `radial-gradient(circle at 70% 60%, rgba(255,255,255,${isDarkMode ? '0.1' : '0.3'}) 0%, transparent 70%)`,
                      `radial-gradient(circle at 30% 40%, rgba(255,255,255,${isDarkMode ? '0.1' : '0.3'}) 0%, transparent 70%)`
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
                    <p className="text-white/90 text-xs drop-shadow">
                      {userName ? `Chatting with ${userName}` : 'Your EmviApp assistant'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 relative z-10">
                  {/* Settings Menu */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowMenu(!showMenu)}
                    className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center text-white hover:bg-white/35 transition-all backdrop-blur-sm"
                  >
                    <Settings size={14} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeChat}
                    className="w-8 h-8 bg-white/25 rounded-full flex items-center justify-center text-white hover:bg-white/35 transition-all backdrop-blur-sm"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>
              
              {/* Settings Menu */}
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-4 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/50 p-3 space-y-2 z-20"
                    style={{ minWidth: '180px' }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={clearChat}
                      className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      <RotateCcw size={14} />
                      Clear Chat & Start Over
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setFontSize(fontSize === 'small' ? 'normal' : fontSize === 'normal' ? 'large' : 'small')}
                      className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      <Type size={14} />
                      Font: {fontSize}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-all"
                    >
                      {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages Container - Glassmorphism */}
            <div 
              className={`flex-1 px-6 py-4 overflow-y-auto space-y-4 ${isDarkMode ? 'bg-black/5' : 'bg-white/5'}`}
              style={{ 
                maxHeight: isMobile ? 'calc(70vh - 140px)' : '320px',
                paddingBottom: '1rem'
              }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`max-w-[75%] p-4 rounded-2xl shadow-lg relative backdrop-blur-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border border-blue-400/30' 
                      : isDarkMode
                        ? 'bg-gray-800/90 text-gray-100 border border-gray-600/30'
                        : 'bg-white/90 text-gray-800 border border-orange-100/50'
                  }`}>
                    <p className={`${fontSizeClasses[fontSize]} leading-relaxed whitespace-pre-wrap`}>
                      {message.text}
                    </p>
                    
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
                            className={`px-3 py-1.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-full ${fontSizeClasses[fontSize]} font-medium shadow-md border border-white/20 backdrop-blur-sm`}
                          >
                            {action.label}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    
                    {!message.isUser && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute -bottom-1 -left-1 w-5 h-5 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center shadow-sm border border-white/30"
                      >
                        <Sun size={10} className="text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* AI Thinking Indicator - Enhanced */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className={`${isDarkMode ? 'bg-gray-800/90 text-gray-100 border-gray-600/30' : 'bg-white/90 text-gray-800 border-orange-100/50'} border p-4 rounded-2xl shadow-lg backdrop-blur-sm`}>
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      >
                        <Sun size={16} className="text-orange-400" />
                      </motion.div>
                      <span className={`${fontSizeClasses[fontSize]} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {language === 'vi' ? 'Sunshine đang suy nghĩ...' : 'Sunshine is thinking...'}
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Always accessible, premium design */}
            <div className={`p-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md border-t ${isDarkMode ? 'border-gray-700/30' : 'border-orange-200/30'}`}>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                    disabled={isLoading}
                    className={`w-full py-3 px-4 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-orange-200 text-gray-800 placeholder-gray-500'} rounded-2xl focus:border-orange-400 focus:outline-none ${fontSizeClasses[fontSize]} disabled:opacity-50 transition-all shadow-inner`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20"
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