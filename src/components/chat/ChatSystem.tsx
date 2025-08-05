import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X, Sun, Sparkles, RotateCcw, Type, Moon, Settings, ArrowRight, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { useChatRouting } from '@/hooks/useChatRouting';
import { ChatToggleButton } from './ChatToggleButton';
import { ChatFloatingBadge } from './ChatFloatingBadge';

import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { detectLanguage, extractName } from '@/utils/languageDetection';
import { trackChatEvent, chatEvents, trackSignupInitiated } from '@/utils/chatAnalytics';
import { trackConversionEvent, conversionEvents } from '@/utils/conversionTracking';
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
  const [lastGreetingId, setLastGreetingId] = useState<string>('');
  const [conversionPopupShown, setConversionPopupShown] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
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
  
  // Smart session management - separate name storage from conversation history
  useEffect(() => {
    // Check for existing name in current browser session
    const savedName = sessionStorage.getItem('sunshine-user-name');
    const savedLanguage = sessionStorage.getItem('sunshine-user-language');
    
    // Only get conversation history from localStorage for conversion popup logic
    const hasShownConversionPopup = localStorage.getItem('sunshine-conversion-popup-shown');
    const currentPath = window.location.pathname;
    
    // Track if this is a new user (no session name)
    setIsNewUser(!savedName);
    
    // Restore name and language from session (if exists)
    if (savedName) {
      setUserName(savedName);
      setLanguage((savedLanguage as 'en' | 'vi') || 'en');
      console.log('🧠 Restored user session:', { name: savedName, language: savedLanguage });
    }
    
    // Show conversion popup on high-value pages after delay (only for new users)
    const targetPages = ['/jobs', '/salons', '/', '/community', '/post-job', '/sell-salon'];
    const isTargetPage = targetPages.includes(currentPath);
    
    if (isTargetPage && !hasShownConversionPopup && !savedName) {
      // Random delay between 3-6 seconds for new users
      const randomDelay = Math.random() * 3000 + 3000;
      const conversionTimer = setTimeout(() => {
        setConversionPopupShown(true);
        localStorage.setItem('sunshine-conversion-popup-shown', 'true');
        // Auto-show the chat button with conversion message
        setShowButton(true);
      }, randomDelay);
      
      return () => clearTimeout(conversionTimer);
    } else {
      // Normal timer for existing users
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Save user name and language to sessionStorage (persists only for browser session)
  const saveUserSession = (name?: string, lang?: 'en' | 'vi') => {
    if (name) {
      sessionStorage.setItem('sunshine-user-name', name);
      sessionStorage.setItem('sunshine-user-language', lang || language);
      console.log('💾 Saved user session:', { name, language: lang || language });
    }
  };

  // Clear conversation history when chat closes (but keep name in session)
  const clearConversationHistory = () => {
    setMessages([]);
    console.log('🗑️ Conversation history cleared (name preserved for session)');
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

  // Save user session when name or language changes
  useEffect(() => {
    if (userName) {
      saveUserSession(userName, language);
    }
  }, [userName, language]);

  // Use shared language detection
  const detectAndSetLanguage = (text: string) => {
    const detectedLang = detectLanguage(text);
    setLanguage(detectedLang);
    return detectedLang;
  };

  // Generate contextual follow-up suggestions for better conversation flow
  const generateFollowUpSuggestion = (userMessage: string, botResponse: string) => {
    const lowerMessage = userMessage.toLowerCase();
    const lowerResponse = botResponse.toLowerCase();
    
    // Follow-up after job posting intent
    if (lowerMessage.includes('đăng việc') || lowerMessage.includes('post job') || 
        lowerMessage.includes('tuyển') || lowerResponse.includes('post')) {
      return language === 'vi' 
        ? "\n\nBạn cần biết chi phí hoặc thông tin cần thiết để đăng tin không?" 
        : "\n\nWould you like to know what info you need to post a job, or do you have any questions about pricing?";
    }
    
    // Follow-up after salon selling intent
    if (lowerMessage.includes('bán salon') || lowerMessage.includes('sell salon') ||
        lowerMessage.includes('bán tiệm') || lowerResponse.includes('sell')) {
      return language === 'vi'
        ? "\n\nAnh/chị muốn biết cách đăng tin hiệu quả hoặc giá bán hợp lý không?"
        : "\n\nThat's exciting! I can give you some tips on pricing your salon or preparing the listing. What would you like to know?";
    }
    
    // Follow-up after signup intent
    if (lowerMessage.includes('đăng ký') || lowerMessage.includes('sign up') ||
        lowerMessage.includes('join') || lowerResponse.includes('sign up')) {
      return language === 'vi'
        ? "\n\nRất vui khi anh/chị tham gia! Sau khi đăng ký, anh/chị sẽ có thể đăng tin tuyển dụng, quản lý ứng viên và nhiều tính năng khác nữa."
        : "\n\nSo glad you're joining! After signing up, you'll be able to post jobs, manage applicants, and access many more features.";
    }
    
    // Follow-up after blog intent
    if (lowerMessage.includes('blog') || lowerMessage.includes('tin tức') ||
        lowerMessage.includes('bài viết') || lowerResponse.includes('blog')) {
      return language === 'vi'
        ? "\n\nCó nhiều bài viết hay về ngành làm đẹp và kinh doanh salon đấy! Anh/chị có muốn em giới thiệu loại bài viết nào đặc biệt không?"
        : "\n\nThere are lots of great articles about the beauty industry and salon business! Would you like me to recommend any specific type of content?";
    }
    
    return '';
  };

  const extractAndSetName = (text: string) => {
    // Only extract name if we don't already have one in session
    if (!userName) {
      const extractedName = extractName(text);
      if (extractedName) {
        setUserName(extractedName);
        console.log('✅ Name extracted and saved for session:', extractedName);
      }
      return extractedName;
    }
    return userName; // Return existing name if already set
  };

  // Generate randomized conversion-focused greetings that don't repeat
  const getConversionGreeting = () => {
    const englishGreetings = [
      "Hi there! 👋 Are you looking to hire staff, find a job, or buy/sell a salon? I'll help you get started and your FIRST POST IS FREE! 🎉",
      "Welcome to EmviApp! 🌟 I'm Sunshine - your personal beauty business assistant. Looking to hire, job hunt, or grow your salon? Let's make it happen! ✨",
      "Hey! 💫 Need help with hiring, job searching, or salon business? I've got insider tips and your first listing is completely FREE!",
      "🚀 Ready to boost your beauty business? I'm here to help with hiring, job hunting, or salon growth - plus your first post won't cost a thing!",
      "Welcome! I'm Sunshine ☀️ Whether you're hiring, job searching, or growing your salon - I've got the insider secrets to make it happen FAST!"
    ];
    
    const vietnameseGreetings = [
      "Chào anh/chị! 👋 Anh/chị đang muốn tuyển nhân viên, tìm việc, hay mua/bán salon không? Em sẽ hỗ trợ và ĐĂNG TIN MIỄN PHÍ lần đầu! 🎉",
      "Chào mừng đến EmviApp! 🌟 Em là Sunshine - trợ lý kinh doanh làm đẹp của anh/chị. Cần tuyển dụng, tìm việc hay phát triển salon? Cùng em làm ngay nhé! ✨",
      "Xin chào! 💫 Cần hỗ trợ tuyển dụng, tìm việc hay kinh doanh salon? Em có bí quyết hay và đăng tin đầu tiên HOÀN TOÀN MIỄN PHÍ!",
      "🚀 Sẵn sàng phát triển business làm đẹp chưa ạ? Em ở đây hỗ trợ tuyển dụng, tìm việc hay phát triển salon - và tin đầu tiên không tốn một xu!",
      "Chào mừng! Em là Sunshine ☀️ Dù anh/chị muốn tuyển dụng, tìm việc hay phát triển salon - em có bí quyết để làm thành công NHANH CHÓNG!"
    ];
    
    const greetings = language === 'vi' ? vietnameseGreetings : englishGreetings;
    
    // Avoid repeating the last greeting
    let availableGreetings = greetings;
    if (lastGreetingId) {
      availableGreetings = greetings.filter((_, index) => index.toString() !== lastGreetingId);
    }
    
    const randomIndex = Math.floor(Math.random() * availableGreetings.length);
    const selectedGreeting = availableGreetings[randomIndex];
    const greetingId = greetings.indexOf(selectedGreeting).toString();
    
    setLastGreetingId(greetingId);
    return selectedGreeting;
  };

  const getInitialGreeting = () => {
    // NEVER use names in greetings - just be friendly
    if (userName) {
      // If we know the user's name, just be friendly without using it
      return language === 'vi' 
        ? `Xin chào! 😊`
        : `Hi there! 😊`;
    }
    
    // For new users without a name, use EXACT greeting as specified
    return "Hi, my name is Sunshine! What's your name? Em biết nói tiếng Việt 🌸";
  };

  const clearChat = () => {
    // Clear conversation history and reset states
    clearConversationHistory();
    setUserName('');
    setLanguage('en');
    
    // Clear session storage
    sessionStorage.removeItem('sunshine-user-name');
    sessionStorage.removeItem('sunshine-user-language');
    
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
    
    // ALWAYS start with a fresh conversation when opening chat
    // Simple greeting based on whether we know the name or not
    const greeting: Message = {
      id: Date.now().toString(),
      text: getInitialGreeting(),
      isUser: false,
      timestamp: new Date()
    };
    setMessages([greeting]);
    
    console.log('🚀 Chat opened - fresh conversation started', { 
      hasUserName: !!userName, 
      userName, 
      language 
    });
  };

  const closeChat = () => {
    setIsOpen(false);
    setShowButton(true);
    setShowMenu(false);
    
    // Clear conversation history but keep user name in session
    clearConversationHistory();
    
    console.log('💾 Chat closed - conversation cleared, name preserved for session');
  };

  // Generate AI response with conversational routing
  const generateResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    // Extract name from user message before sending
    const extractedName = extractAndSetName(userMessage);
    
    try {
      const { data, error } = await supabase.functions.invoke('sunshine-chat', {
        body: {
          message: userMessage,
          userId: userId,
          userName: extractedName || userName || null,
          language: detectAndSetLanguage(userMessage),
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
      
      // Add contextual follow-up suggestions
      const followUp = generateFollowUpSuggestion(userMessage, botMessage.text);
      if (followUp) {
        botMessage.text += followUp;
      }

      setMessages(prev => [...prev, botMessage]);
      // No need to save conversation to localStorage - only session name matters
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
        ? "Em xin lỗi, có chút vấn đề kỹ thuật! Nhưng em vẫn có thể giúp anh/chị đăng việc, bán salon, hoặc tham gia cộng đồng. Anh/chị cần gì ạ?"
        : "Sorry, there's a small technical hiccup! But I can still help you post jobs, sell salons, or join our community. What do you need?";
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      // No need to save conversation to localStorage - only session name matters
    } finally {
      // Always clear loading state
      setIsLoading(false);
    }
  };

  // Detect route intent from user message and AI response - INTERNAL ROUTING ONLY
  const detectRouteIntent = (userMessage: string, aiResponse: string) => {
    const message = userMessage.toLowerCase();
    const response = aiResponse.toLowerCase();
    
    // Job posting intent - INTERNAL ROUTE
    if (message.includes('đăng việc') || message.includes('post job') || 
        message.includes('tuyển') || message.includes('hiring') ||
        response.includes('post') || response.includes('đăng việc')) {
      return {
        destination: '/post-job',
        title: language === 'vi' ? 'Đăng tin tuyển thợ' : 'Post a Job',
        requiresAuth: false
      };
    }
    
    // Salon selling intent - INTERNAL ROUTE
    if (message.includes('sell salon') || message.includes('bán salon') ||
        message.includes('đăng salon') || message.includes('list salon') ||
        message.includes('bán tiệm')) {
      return {
        destination: '/sell-salon',
        title: language === 'vi' ? 'Bán tiệm' : 'Sell Salon',
        requiresAuth: false
      };
    }
    
    // Sign up intent - INTERNAL ROUTE
    if (message.includes('sign up') || message.includes('đăng ký') || 
        message.includes('tạo tài khoản') || message.includes('join') ||
        response.includes('sign up') || response.includes('đăng ký')) {
      return {
        destination: '/auth/signup?redirect=%2F',
        title: language === 'vi' ? 'Tham gia cộng đồng làm đẹp' : 'Join Our Beauty Community',
        requiresAuth: false
      };
    }
    
    // Blog intent - INTERNAL ROUTE
    if (message.includes('blog') || message.includes('tin tức') || 
        message.includes('bài viết') || response.includes('blog')) {
      return {
        destination: '/blog',
        title: language === 'vi' ? 'Xem bài viết mới' : 'Read Latest Blog',
        requiresAuth: false
      };
    }
    
    return null;
  };

  // Generate contextual quick actions - INTERNAL ROUTING ONLY
  const generateQuickActions = (response: string, userMessage: string) => {
    const actions = [];
    const lowerResponse = response.toLowerCase();
    const lowerMessage = userMessage.toLowerCase();
    
    // Post job action - INTERNAL ROUTE
    if ((lowerResponse.includes('post') && lowerResponse.includes('job')) || 
        (lowerMessage.includes('đăng việc') || lowerMessage.includes('post job'))) {
      if (language === 'vi') {
        actions.push({ 
          id: 'post', 
          label: 'Đăng tin tuyển thợ tại đây', 
          action: () => handleRouteAction('/post-job')
        });
      } else {
        actions.push({ 
          id: 'post', 
          label: 'Post a Job Here', 
          action: () => handleRouteAction('/post-job')
        });
      }
    }
    
    // Sell salon action - INTERNAL ROUTE
    if ((lowerResponse.includes('sell') || lowerResponse.includes('bán')) && 
        (lowerResponse.includes('salon') || lowerResponse.includes('tiệm'))) {
      if (language === 'vi') {
        actions.push({ 
          id: 'sell', 
          label: 'Bán tiệm tại đây', 
          action: () => handleRouteAction('/sell-salon')
        });
      } else {
        actions.push({ 
          id: 'sell', 
          label: 'Sell a Salon Here', 
          action: () => handleRouteAction('/sell-salon')
        });
      }
    }
    
    // Sign up action - INTERNAL ROUTE
    if ((lowerResponse.includes('sign') && lowerResponse.includes('up')) || 
        (lowerResponse.includes('join') || lowerResponse.includes('tham gia')) ||
        (lowerMessage.includes('sign up') || lowerMessage.includes('đăng ký'))) {
      if (language === 'vi') {
        actions.push({ 
          id: 'signup', 
          label: 'Tham gia cộng đồng làm đẹp', 
          action: () => handleRouteAction('/auth/signup?redirect=%2F')
        });
      } else {
        actions.push({ 
          id: 'signup', 
          label: 'Join Our Beauty Community', 
          action: () => handleRouteAction('/auth/signup?redirect=%2F')
        });
      }
    }
    
    // Blog action - INTERNAL ROUTE
    if (lowerResponse.includes('blog') || lowerResponse.includes('tin tức') ||
        lowerMessage.includes('blog') || lowerMessage.includes('tin tức')) {
      if (language === 'vi') {
        actions.push({ 
          id: 'blog', 
          label: 'Xem bài viết mới', 
          action: () => handleRouteAction('/blog')
        });
      } else {
        actions.push({ 
          id: 'blog', 
          label: 'Read Latest Blog', 
          action: () => handleRouteAction('/blog')
        });
      }
    }
    
    // Always offer help at the end - but don't add redundant actions
    if (actions.length === 0 && (lowerMessage.includes('help') || lowerMessage.includes('giúp') || lowerMessage.includes('hỗ trợ'))) {
      if (language === 'vi') {
        actions.push({ id: 'help', label: '💬 Cần thêm hỗ trợ gì, cứ hỏi em nhé!', action: () => handleQuickAction('Em cần hỗ trợ thêm') });
      } else {
        actions.push({ id: 'help', label: '💬 Let me know if you need more help!', action: () => handleQuickAction('I need more help') });
      }
    }
    
    return actions;
  };

  // Handle route confirmation - INTERNAL ROUTING ONLY
  const handleRouteConfirm = async (destination: string, requiresAuth: boolean) => {
    // Use internal navigation with window.location.href for same-tab navigation
    window.location.href = destination;
    
    const confirmMessage = language === 'vi'
      ? `Đang dẫn anh qua đó! Em sẽ ở đây nếu anh cần giúp gì thêm 😊`
      : `Taking you there now! I'll be here if you need any more help 😊`;
    
    const confirmMsg: Message = {
      id: Date.now().toString(),
      text: confirmMessage,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, confirmMsg]);
    setMessages(prev => [...prev, confirmMsg]);
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
        ? `Perfect! Đang dẫn anh qua đó. Em sẽ ở đây hỗ trợ anh bất cứ lúc nào! 😊`
        : `Perfect! Taking you there now. I'll be here to help anytime you need! 😊`;
      
      const confirmMsg: Message = {
        id: Date.now().toString(),
        text: confirmMessage,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, confirmMsg]);
      setMessages(prev => [...prev, confirmMsg]);
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
    setInputValue("");

  // If this is a name introduction, respond with proper greeting
  if (extractedName && !userName) {
    const greetingResponse = detectedLang === 'vi' 
      ? `Chào anh ${extractedName}, rất vui được gặp anh! Em có thể giúp gì cho anh hôm nay? 😊`
      : `Hi ${extractedName}, so glad you're here! How can I help you today? 😊`;

    const greetingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: greetingResponse,
      isUser: false,
      timestamp: new Date()
    };

    const finalMessages = [...newMessages, greetingMessage];
    setMessages(finalMessages);
    return;
  }

    // For all other messages, generate normal AI response
    await generateResponse(messageToSend);
  };

  const handleQuickAction = (actionText: string) => {
    setInputValue(actionText);
    // Auto-send the quick action
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  // Handle direct route navigation for quick actions
  const handleRouteAction = (route: string) => {
    // Check if route requires authentication
    const authRequiredRoutes = ['/post-job'];
    const requiresAuth = authRequiredRoutes.includes(route);
    
    if (requiresAuth && !user) {
      // Route to signup with redirect
      const destination = `/auth/signup?redirect=${route}`;
      confirmRoute({
        destination,
        title: language === 'vi' ? 'Tham Gia Cộng Đồng Làm Đẹp' : 'Join Our Beauty Community',
        message: language === 'vi' 
          ? 'Để tiếp tục, anh/chị cần tài khoản EmviApp. Sẵn sàng tham gia cộng đồng làm đẹp chưa?'
          : 'You need an account to continue. Ready to join our beauty community?',
        requiresAuth: false
      });
    } else {
      // Direct navigation for authenticated users or public routes
      window.location.href = route;
    }
  };

  const fontSizeClasses = {
    small: 'text-sm font-premium',
    normal: 'text-base font-premium',
    large: 'text-lg font-premium'
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

      {/* Enhanced Sunshine Chat Toggle Button with Conversion Hooks */}
      <ChatToggleButton
        isOpen={isOpen}
        onClick={openChat}
        hasUnreadMessages={conversionPopupShown && !isOpen} // Show notification for conversion popup
        userName={userName}
      />

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
                    <h3 className="text-white font-luxury font-semibold text-xl drop-shadow-md tracking-wide">
                      ☀️ Sunshine
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow font-premium tracking-wide">
                      {userName ? `Chatting with ${userName}` : 'Your premium beauty assistant'}
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
                    className={`w-full py-3.5 px-5 font-premium font-medium ${isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white/95 border-orange-200/50 text-gray-800 placeholder-gray-500'} rounded-2xl focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/30 ${fontSizeClasses[fontSize]} disabled:opacity-50 transition-all shadow-inner backdrop-blur-sm border-2 tracking-wide`}
                    style={{
                      fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
                      letterSpacing: '-0.01em'
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  aria-label={language === 'vi' ? 'Gửi tin nhắn' : 'Send message'}
                  className="w-14 h-14 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white rounded-2xl flex items-center justify-center shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border-2 border-white/30 focus:ring-4 focus:ring-orange-400/50 focus:outline-none hover:shadow-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #ff8a00 0%, #ff6b6b 25%, #e056fd 50%, #686de0 100%)',
                    boxShadow: '0 8px 32px rgba(255, 138, 0, 0.3), 0 4px 16px rgba(224, 86, 253, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
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
};