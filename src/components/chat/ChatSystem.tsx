import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sparkles, Sun, Heart, MessageCircle } from 'lucide-react';
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
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);
    
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
    // Simple Vietnamese detection
    const vietnameseChars = /[ăâêôơưđàáảãạằắẳẵặầấẩẫậềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
    const vietnameseWords = /\b(anh|chị|em|tên|là|của|và|với|trong|nha|ạ|ơi|không|gì|được|có|làm|thế|này|đó|về)\b/i;
    
    return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
  };

  const extractName = (text: string): string => {
    // English patterns
    const englishPatterns = [
      /i'?m\s+([a-zA-Z]+)/i,
      /my\s+name\s+is\s+([a-zA-Z]+)/i,
      /call\s+me\s+([a-zA-Z]+)/i,
      /^([a-zA-Z]+)$/i
    ];
    
    // Vietnamese patterns
    const vietnamesePatterns = [
      /tên\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)/i,
      /(?:anh|chị|em)\s+tên\s+(?:là\s+)?([a-zA-ZÀ-ỹ]+)/i,
      /(?:anh|chị|em)\s+([a-zA-ZÀ-ỹ]+)/i
    ];
    
    const patterns = language === 'vi' ? vietnamesePatterns : englishPatterns;
    
    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      }
    }
    
    return '';
  };

  const getInitialGreeting = () => {
    return language === 'vi' 
      ? "Chào anh/chị! Em là Sunshine của EmviApp đây 🌞. Anh/chị cho em biết tên để em phục vụ anh/chị chu đáo hơn nha?"
      : "Hi! I'm Sunshine, your EmviApp assistant 🌞. May I know your name to make this chat more personal?";
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
    if (detectedLang !== language) {
      setLanguage(detectedLang);
    }

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
        text: data.response || 'Em xin lỗi, có lỗi xảy ra. Vui lòng thử lại! 😅',
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

  const handleQuickAction = async (actionText: string) => {
    // Treat quick action as a user message
    setInputValue(actionText);
    await sendMessage();
  };

  const quickActions = language === 'vi' ? [
    { text: '💅 Tìm việc làm nail', action: () => handleQuickAction('Tôi muốn tìm việc làm nail') },
    { text: '🏪 Đăng tin salon', action: () => handleQuickAction('Tôi muốn đăng tin salon') },
    { text: '💬 Hỗ trợ khác', action: () => handleQuickAction('Tôi cần hỗ trợ') },
    { text: '🇺🇸 Switch to English', action: () => { setLanguage('en'); handleQuickAction('Please speak English'); } }
  ] : [
    { text: '💅 Find Nail Jobs', action: () => handleQuickAction('I want to find nail jobs') },
    { text: '🏪 List My Salon', action: () => handleQuickAction('I want to list my salon') },
    { text: '💬 Get Support', action: () => handleQuickAction('I need help') },
    { text: '🇻🇳 Chuyển sang tiếng Việt', action: () => { setLanguage('vi'); handleQuickAction('Xin chào, nói tiếng Việt'); } }
  ];

  return (
    <>
      {/* Sunshine Chat Bubble */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              boxShadow: [
                "0 0 20px rgba(251, 191, 36, 0.4)",
                "0 0 40px rgba(251, 191, 36, 0.6)",
                "0 0 20px rgba(251, 191, 36, 0.4)"
              ]
            }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              duration: 0.8, 
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            onClick={openChat}
            className={`fixed ${isMobile ? 'bottom-20 right-6' : 'bottom-8 right-8'} z-[9997] group`}
            style={{ zIndex: 9997 }}
          >
            {/* Floating sparkles */}
            <motion.div
              animate={{ y: [-10, -20, -10], x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-3 text-xl"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ y: [-8, -18, -8], x: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-6 -right-4 text-lg"
            >
              💫
            </motion.div>
            
            {/* Main sunshine button */}
            <div className={`relative ${isMobile ? 'w-16 h-16' : 'w-14 h-14'} rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 shadow-2xl flex items-center justify-center border-4 border-white/20 overflow-hidden`}>
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/50 to-orange-300/50 rounded-full blur-sm" />
              
              {/* Rotating rays */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sun size={isMobile ? 28 : 24} className="text-white relative z-10 w-full h-full p-3" />
              </motion.div>
              
              {/* Sparkle overlay */}
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 right-1 z-20"
              >
                <Sparkles size={8} className="text-yellow-100" />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed ${
              isMobile 
                ? 'inset-4 top-20 bottom-4' 
                : 'bottom-6 right-6 w-96 h-[600px]'
            } z-[9998] bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-lg overflow-hidden`}
            style={{ zIndex: 9998 }}
          >
            {/* Header with animated sunshine */}
            <div className="relative bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-500 p-4 flex items-center justify-between">
              {/* Animated light rays background */}
              <motion.div
                animate={{ 
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <Sun size={20} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-lg">Sunshine AI</h3>
                  <p className="text-white/80 text-sm">Your smartest beauty business assistant</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeChat}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors relative z-10"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[400px]">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                    message.isUser 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white ml-4' 
                      : 'bg-white text-gray-800 border border-orange-100 mr-4'
                  }`}>
                    <p className="text-base leading-relaxed font-medium whitespace-pre-wrap">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-gray-800 border border-orange-100 p-4 rounded-2xl shadow-lg mr-4">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sun size={16} className="text-orange-400" />
                      </motion.div>
                      <span className="text-sm text-gray-600">Sunshine đang suy nghĩ...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <AnimatePresence>
              {showQuickActions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 pb-2"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={action.action}
                        className="bg-gradient-to-r from-orange-200 to-yellow-200 hover:from-orange-300 hover:to-yellow-300 text-gray-800 font-medium py-2 px-3 rounded-xl transition-all duration-200 text-sm border border-orange-200"
                      >
                        {action.text}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="p-4 border-t border-orange-100 bg-white/50 backdrop-blur">
              <div className="flex gap-2 items-end">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-white border-2 border-orange-200 rounded-2xl focus:border-orange-400 focus:outline-none text-base resize-none disabled:opacity-50"
                    style={{ minHeight: '48px' }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <Send size={20} />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
