import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sun, Sparkles, RotateCcw, Type, Moon, Settings, ArrowRight, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { useChatRouting } from '@/hooks/useChatRouting';
import { ChatFloatingBadge } from './ChatFloatingBadge';
import { ChatAuthFlow } from './ChatAuthFlow';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { detectLanguage, extractName } from '@/utils/languageDetection';
import { trackChatEvent, chatEvents } from '@/utils/chatAnalytics';
import { processMessage } from '@/utils/messageProcessing';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  links?: Array<{
    url: string;
    label: string;
    description?: string;
  }>;
  quickActions?: Array<{
    id: string;
    label: string;
    action: () => void;
  }>;
  routeConfirmation?: {
    destination: string;
    title: string;
    requiresAuth?: boolean;
  };
  authFlow?: boolean;
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
  const [showAuthFlow, setShowAuthFlow] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { 
    pendingRoute, 
    isMinimized, 
    confirmRoute, 
    executeRoute, 
    cancelRoute, 
    restoreChat 
  } = useChatRouting();
  
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

  // Use shared language detection
  const detectAndSetLanguage = (text: string) => {
    const detectedLang = detectLanguage(text);
    setLanguage(detectedLang);
    return detectedLang;
  };

  const extractAndSetName = (text: string) => {
    const extractedName = extractName(text);
    if (extractedName && !userName) {
      setUserName(extractedName);
    }
    return extractedName;
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
    trackChatEvent(chatEvents.CHAT_CLEARED);
    
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
    trackChatEvent(chatEvents.CHAT_OPENED, { userName, language });
    
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

  // Generate AI response with conversational routing
  const generateResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: userMessage,
          userId: userId,
          userName: userName || null,
          language: language,
          isAuthenticated: !!user
        }
      });

      if (error) throw error;

      const response = data?.response || (language === 'vi' 
        ? "Em ở đây để giúp anh/chị! Anh/chị muốn biết gì về EmviApp?"
        : "I'm here to help! What would you like to know about EmviApp?");
      
      // Check for routing intent and auth requirements
      const routeInfo = detectRouteIntent(userMessage, response);
      const quickActions = routeInfo ? [] : generateQuickActions(response, userMessage);
      
      let botMessage: Message = {
        id: Date.now().toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
        quickActions,
        routeConfirmation: routeInfo
      };

      // Process message to extract and format links
      botMessage = processMessage(botMessage);

      setMessages(prev => [...prev, botMessage]);
      saveSession([...messages, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Detailed error logging for debugging
      const errorDetails = {
        message: error.message,
        type: error.name,
        userId,
        userName,
        language,
        timestamp: new Date().toISOString()
      };
      console.error('Chat error details:', errorDetails);
      
      const fallbackResponse = language === 'vi' 
        ? "Em xin lỗi, có lỗi xảy ra với kết nối. Em có thể giúp anh/chị tìm việc làm nail, thông tin salon, hoặc hỗ trợ khác!"
        : "Sorry, there was a connection error. I can still help you find nail jobs, salon info, or other support!";
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      saveSession([...messages, botMessage]);
    } finally {
      // Always clear loading state
      setIsLoading(false);
    }
  };

  // Detect route intent from user message and AI response
  const detectRouteIntent = (userMessage: string, aiResponse: string) => {
    const message = userMessage.toLowerCase();
    const response = aiResponse.toLowerCase();
    
    // Job posting intent
    if (message.includes('đăng việc') || message.includes('post job') || 
        message.includes('tuyển') || message.includes('hiring') ||
        response.includes('post') || response.includes('đăng việc')) {
      return {
        destination: '/post-job',
        title: language === 'vi' ? 'Đăng tin tuyển dụng' : 'Post a Job',
        requiresAuth: true
      };
    }
    
    // Job search intent
    if (message.includes('tìm việc') || message.includes('find job') || 
        message.includes('làm việc') || message.includes('work') ||
        response.includes('jobs') || response.includes('việc làm')) {
      return {
        destination: '/jobs',
        title: language === 'vi' ? 'Tìm việc làm' : 'Find Jobs',
        requiresAuth: false
      };
    }
    
    // Salon listing intent
    if (message.includes('salon') || message.includes('tiệm') ||
        message.includes('list salon') || message.includes('đăng salon')) {
      return {
        destination: '/sell-salon',
        title: language === 'vi' ? 'Đăng thông tin salon' : 'List Your Salon',
        requiresAuth: true
      };
    }
    
    return null;
  };

  // Generate contextual quick actions based on conversation flow
  const generateQuickActions = (response: string, userMessage: string) => {
    const actions = [];
    const lowerResponse = response.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();
    
    // Only show actions when conversation context calls for them
    if ((lowerResponse.includes('job') && lowerResponse.includes('find')) || 
        (lowerMessage.includes('tìm việc') || lowerMessage.includes('find job'))) {
      if (language === 'vi') {
        actions.push({ id: 'jobs', label: '🔍 Xem việc làm', action: () => handleQuickAction('Em muốn xem các việc làm có sẵn') });
      } else {
        actions.push({ id: 'jobs', label: '🔍 Browse Jobs', action: () => handleQuickAction('I want to browse available jobs') });
      }
    }
    
    if ((lowerResponse.includes('post') && lowerResponse.includes('job')) || 
        (lowerMessage.includes('đăng việc') || lowerMessage.includes('post job'))) {
      if (language === 'vi') {
        actions.push({ id: 'post', label: '📝 Đăng việc', action: () => handleQuickAction('Em muốn đăng tin tuyển dụng') });
      } else {
        actions.push({ id: 'post', label: '📝 Post Job', action: () => handleQuickAction('I want to post a job') });
      }
    }
    
    // Help action only when user explicitly asks for help
    if (lowerMessage.includes('help') || lowerMessage.includes('giúp') || lowerMessage.includes('hỗ trợ')) {
      if (language === 'vi') {
        actions.push({ id: 'help', label: '💬 Trò chuyện thêm', action: () => handleQuickAction('Em cần hỗ trợ thêm') });
      } else {
        actions.push({ id: 'help', label: '💬 Get More Help', action: () => handleQuickAction('I need more help') });
      }
    }
    
    return actions;
  };

  // Handle route confirmation
  const handleRouteConfirm = async (destination: string, requiresAuth: boolean) => {
    if (requiresAuth && !user) {
      // Need authentication - start auth flow
      setShowAuthFlow(true);
      
      const authMessage = language === 'vi'
        ? `Để ${destination.includes('post') ? 'đăng tin' : 'sử dụng tính năng này'}, anh/chị cần có tài khoản EmviApp. Em sẽ giúp anh/chị tạo nhanh nhé!`
        : `To ${destination.includes('post') ? 'post' : 'use this feature'}, you'll need a free EmviApp account. Let me help you sign up quickly!`;
      
      const authFlowMessage: Message = {
        id: Date.now().toString(),
        text: authMessage,
        isUser: false,
        timestamp: new Date(),
        authFlow: true
      };
      
      setMessages(prev => [...prev, authFlowMessage]);
      return;
    }
    
    // User is authenticated or auth not required - proceed with route
    confirmRoute({
      destination,
      title: destination.includes('post') ? 'Post Job' : 'Browse Jobs',
      message: language === 'vi' 
        ? `Anh/chị có muốn em dẫn qua trang này không? Em sẽ ở đây chờ để giúp tiếp!`
        : `Would you like me to take you there? I'll be here waiting to help when you return!`,
      requiresAuth
    });
  };

  // Handle auth success
  const handleAuthSuccess = () => {
    setShowAuthFlow(false);
    
    const successMessage = language === 'vi'
      ? `Tuyệt vời! Tài khoản của ${userName} đã sẵn sàng. Bây giờ em có thể giúp anh/chị với tất cả tính năng rồi!`
      : `Perfect! ${userName}'s account is ready. Now I can help you with all features!`;
    
    const successMsg: Message = {
      id: Date.now().toString(),
      text: successMessage,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, successMsg]);
  };

  // Handle route execution after confirmation
  const handleExecuteRoute = () => {
    const success = executeRoute();
    if (success) {
      // Route executed successfully - chat will minimize
      const confirmMessage = language === 'vi'
        ? `Đang dẫn anh/chị qua đó! Em sẽ ở đây nếu anh/chị cần giúp gì thêm 😊`
        : `Taking you there now! I'll be here if you need any more help 😊`;
      
      const confirmMsg: Message = {
        id: Date.now().toString(),
        text: confirmMessage,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmMsg]);
      saveSession([...messages, confirmMsg]);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const detectedLang = detectAndSetLanguage(inputValue);
    const extractedName = extractAndSetName(inputValue);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    const messageToSend = inputValue;
    setInputValue('');

    await generateResponse(messageToSend);
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
      {/* Floating Badge for Minimized Chat */}
      {isMinimized && (
        <ChatFloatingBadge
          onClick={restoreChat}
          userName={userName}
          hasUnreadMessages={false}
        />
      )}

      {/* Pending Route Confirmation Dialog */}
      <AnimatePresence>
        {pendingRoute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1001] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                  <ExternalLink className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{pendingRoute.title}</h3>
                <p className="text-gray-600 text-sm">{pendingRoute.message}</p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleExecuteRoute}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    {language === 'vi' ? 'Đi thôi!' : 'Let\'s go!'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={cancelRoute}
                    className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-300 transition-all duration-200"
                  >
                    {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <AnimatePresence>
        {showButton && !isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            className="fixed bottom-4 right-4 z-[1000]"
            style={{
              ...(isMobile && { bottom: '140px' })
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={openChat}
              className={`${isMobile ? 'h-14 w-14' : 'h-12 w-12'} rounded-full shadow-lg bg-gradient-to-br from-amber-400 via-orange-400 to-pink-400 hover:from-amber-500 hover:via-orange-500 hover:to-pink-500 border-2 border-white/20 backdrop-blur-sm relative overflow-hidden`}
              aria-label="Chat with Little Sunshine AI"
            >
              {/* Optimized floating sparkles - fewer animations */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 12, ease: "linear" },
                    scale: { repeat: Infinity, duration: 6 }
                  }}
                  className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-60"
                />
                <motion.div
                  animate={{ 
                    rotate: -360,
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 15, ease: "linear" },
                    scale: { repeat: Infinity, duration: 8, delay: 2 }
                  }}
                  className="absolute top-3 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-80"
                />
              </div>
              
              <div className="relative z-10">
                <Sparkles size={isMobile ? 24 : 20} className="text-white drop-shadow-sm" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {(isOpen && !isMinimized) && (
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
                ? 'bottom-0 left-0 right-0 top-0 h-screen' 
                : 'bottom-6 right-6 w-[500px] h-[80vh] max-h-[700px]'
            } z-[9998] overflow-hidden ${isMobile ? 'rounded-none' : 'rounded-3xl'}`}
            style={{ 
              paddingBottom: isMobile ? 'env(safe-area-inset-bottom, 24px)' : '0',
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
                maxHeight: isMobile ? 'calc(100vh - 240px)' : 'calc(80vh - 200px)',
                paddingBottom: isMobile ? '1rem' : '1rem'
              }}
            >
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  index={index}
                  isDarkMode={isDarkMode}
                  fontSize={fontSize}
                  language={language}
                  userName={userName}
                  showAuthFlow={showAuthFlow}
                  onRouteConfirm={handleRouteConfirm}
                  onRemoveRouteConfirm={(messageId) => {
                    setMessages(prev => prev.map(m => 
                      m.id === messageId 
                        ? { ...m, routeConfirmation: undefined }
                        : m
                    ));
                  }}
                  onAuthSuccess={handleAuthSuccess}
                  onAuthCancel={() => setShowAuthFlow(false)}
                />
              ))}
              
              {/* AI Thinking Indicator - Enhanced */}
              {isLoading && (
                <TypingIndicator 
                  isDarkMode={isDarkMode}
                  language={language}
                  fontSize={fontSize}
                />
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Always accessible, premium design */}
            <div 
              className={`p-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-md border-t ${isDarkMode ? 'border-gray-700/30' : 'border-orange-200/30'} sticky bottom-0`}
              style={{
                paddingBottom: isMobile ? 'calc(env(safe-area-inset-bottom, 24px) + 16px)' : '16px',
                zIndex: 10
              }}
            >
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder={language === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
                    disabled={isLoading}
                    aria-label={language === 'vi' ? 'Nhập tin nhắn chat' : 'Type chat message'}
                    aria-describedby="chat-input-help"
                    className={`w-full py-3 px-4 ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-orange-200 text-gray-800 placeholder-gray-500'} rounded-2xl focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 ${fontSizeClasses[fontSize]} disabled:opacity-50 transition-all shadow-inner`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  aria-label={language === 'vi' ? 'Gửi tin nhắn' : 'Send message'}
                  className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-white/20 focus:ring-2 focus:ring-orange-400/50 focus:outline-none"
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