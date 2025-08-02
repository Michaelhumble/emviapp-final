import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSunshineChat } from '@/hooks/useSunshineChat';
import { useAuth } from '@/context/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatMessage } from './ChatMessage';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  feedback?: 'up' | 'down' | null;
  language?: 'en' | 'vi';
}

type Language = 'en' | 'vi';

export const SunshineWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { sendMessage, isLoading } = useSunshineChat();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect user language and show widget after 3 seconds
  useEffect(() => {
    // Detect browser language
    const detectedLanguage = navigator.language.toLowerCase().includes('vi') ? 'vi' : 'en';
    setLanguage(detectedLanguage);
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Load conversation history for signed-in users
  useEffect(() => {
    if (user && isOpen && messages.length === 0) {
      loadConversationHistory();
    }
  }, [user, isOpen]);

  // Add welcome message when opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessages = {
        en: "Hello there! 👋 I'm Sunshine - your AI beauty business assistant created by Michael with love for the beauty community! ☀️ I'm here to help your salon shine and succeed. How can I brighten your day? ✨",
        vi: "Chào bạn! 👋 Mình là Sunshine - trợ lý AI được Michael tạo ra với tình yêu dành cho cộng đồng làm đẹp! ☀️ Mình ở đây để giúp salon của bạn tỏa sáng và thành công. Bạn muốn mình hỗ trợ gì hôm nay? ✨"
      };

      const welcomeMessage: Message = {
        id: 'welcome',
        content: welcomeMessages[language],
        role: 'assistant',
        timestamp: new Date(),
        language
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const loadConversationHistory = () => {
    // Load from localStorage for now
    const stored = localStorage.getItem(`sunshine_chat_${user?.id}`);
    if (stored) {
      try {
        const history = JSON.parse(stored);
        setMessages(history);
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    }
  };

  const saveConversationHistory = (newMessages: Message[]) => {
    if (user) {
      localStorage.setItem(`sunshine_chat_${user.id}`, JSON.stringify(newMessages));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
      language
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    
    if (isFirstMessage) {
      setIsFirstMessage(false);
    }

    try {
      // Add language context to the message
      const messageWithLanguage = `[User Language: ${language}] ${input.trim()}`;
      const response = await sendMessage(messageWithLanguage, messages);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        language
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      saveConversationHistory(finalMessages);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessages = {
        en: "I'm sorry, I'm having trouble right now. Please try again in a moment. 🌤️",
        vi: "Xin lỗi bạn, mình đang gặp một chút vấn đề. Vui lòng thử lại sau một lát nhé! 🌤️"
      };
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessages[language],
        role: 'assistant',
        timestamp: new Date(),
        language
      };
      
      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);
    }
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, feedback }
        : msg
    ));
    
    // Save feedback to localStorage for analytics
    const feedbackData = {
      messageId,
      feedback,
      timestamp: new Date(),
      userId: user?.id || 'anonymous'
    };
    
    const existingFeedback = JSON.parse(localStorage.getItem('sunshine_feedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('sunshine_feedback', JSON.stringify(existingFeedback));
  };

  const handleLinkClick = (url: string, title: string) => {
    // Check if it's an internal route (starts with /)
    if (url.startsWith('/')) {
      navigate(url);
      // Auto-focus chat input after navigation with a slight delay
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // External link - open in new tab
      window.open(url, '_blank');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className={`fixed z-50 flex flex-col ${
              isMobile 
                ? 'inset-4 rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50' 
                : 'bottom-20 right-6 w-[420px] h-[600px] rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50'
            } shadow-2xl border border-orange-200/50 backdrop-blur-sm`}
            style={{
              background: isMobile 
                ? 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fef9c3 100%)'
                : 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fef9c3 100%)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-orange-200/30">
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative"
                  animate={isFirstMessage ? { rotate: [0, 15, -15, 0] } : {}}
                  transition={{ duration: 2, repeat: isFirstMessage ? Infinity : 0 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sun className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  {isFirstMessage && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 opacity-20"
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-amber-900">Sunshine ☀️</h3>
                  <p className="text-xs text-amber-700">
                    {language === 'vi' ? 'Trợ lý làm đẹp' : 'Beauty Business Assistant'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newLang = language === 'en' ? 'vi' : 'en';
                    setLanguage(newLang);
                    setMessages([]); // Reset to get new welcome message
                  }}
                  className="h-8 px-2 text-xs font-medium text-amber-700 hover:text-amber-900 hover:bg-orange-100/50"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'VI' : 'EN'}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-amber-700 hover:text-amber-900 hover:bg-orange-100/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-hide">
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  index={index}
                  onFeedback={handleFeedback}
                  onLinkClick={handleLinkClick}
                />
              ))}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/80 border border-orange-200/50 p-3 rounded-2xl rounded-bl-md text-sm">
                    <div className="flex items-center gap-2">
                      <Sun className="h-3 w-3 text-yellow-500 animate-spin" />
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-orange-200/30 bg-white/60 backdrop-blur-sm">
              <div className="flex gap-4">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'vi' ? 'Hỏi mình bất cứ điều gì... ✨' : 'Ask me anything... ✨'}
                  className="flex-1 px-5 py-4 text-sm border border-orange-200 rounded-3xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent placeholder-amber-600/70 text-amber-900 mobile-input-safe"
                  disabled={isLoading}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className={`h-14 w-14 rounded-3xl bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg ${
                      isMobile ? 'h-12 w-12 rounded-2xl' : 'h-14 w-14'
                    }`}
                  >
                    <Send className={`${isMobile ? 'h-5 w-5' : 'h-5 w-5'}`} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotate: [0, 10, -10, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              boxShadow: "0 10px 30px rgba(255, 165, 0, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              rotate: { duration: 2, repeat: Infinity, repeatDelay: 3 }
            }}
            className={`fixed z-50 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all duration-300 ${
              isMobile 
                ? 'bottom-20 right-4 w-16 h-16' 
                : 'bottom-6 right-6 w-14 h-14'
            }`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 165, 0, 0.3))',
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sun className={`${isMobile ? 'h-8 w-8' : 'h-6 w-6'} text-white`} />
            </motion.div>
            
            {/* Pulsing ring effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-orange-300"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

    </>
  );
};